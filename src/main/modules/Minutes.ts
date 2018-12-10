import { Observable } from "rxjs";

import actionCreatorFactory, {Action} from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { combineEpics, StateObservable } from "redux-observable";
import { map, mergeMap, take, ignoreElements } from "rxjs/operators";
import ofAction, { ofLocationChangeRegExp } from "utils/fsa-redux-observable";

import MinutesStorage from "MinutesStorage";
import Speech from "models/Speech";
import MinutesTaker from "MinutesTaker";
import Minute from "models/Minute";
import SpeechRecognition from "models/SpeechRecognition";

// action
const actionCreator = actionCreatorFactory("MINUTES");

function getMt(store$: StateObservable<any>): Observable<MinutesTaker> {
  return store$.pipe(take(1), map(x => x.minutesReducer.mt));
}

function getMs(store$: StateObservable<any>): Observable<MinutesStorage> {
  return store$.pipe(take(1), map(x => x.minutesReducer.ms));
}

interface MinutesState {
  mt?: MinutesTaker;
  ms? : MinutesStorage;
  data? : Minute;
  recording: boolean;
  context: string;
}

const initialState = {
  "recording": false,
  "context": "undefined"
};

export const newSpeech = actionCreator<SpeechRecognition[]>("NEW_SPEECH");
export const changeMinute = actionCreator<Minute>("CHANGE_MINUTE");
export const changeContext = actionCreator<string>("CHANGE_CONTEXT");
export const setStorage = actionCreator<MinutesStorage>("SET_STORAGE");
export const recStart = actionCreator<{}>("REC_START");
export const recStop = actionCreator<{}>("REC_STOP");
export const clearMinute = actionCreator<{}>("CLEAR_MINUTE");
export const setMinutesTaker = actionCreator<MinutesTaker>("SET_MINUTES_TAKER");

export const minutesReducer = reducerWithInitialState<MinutesState>(initialState)
  .case(changeMinute, (state, payload) => ({...state, "data": payload}))
  .case(changeContext, (state, payload) => ({...state, "context": payload}))
  .case(setStorage, (state, payload) => ({...state, "ms": payload, "data": payload ? payload.getMinute() : undefined}))
  .case(setMinutesTaker, (state, payload) => ({...state, "mt": payload}))
  .case(recStart, (state, payload) => ({...state, "recording": true}))
  .case(recStop, (state, payload) => ({...state, "recording": false}))
  .build();

const newSpeechEpic = (action$, store$) => action$.pipe(
  ofAction(newSpeech),
  mergeMap((action: Action<SpeechRecognition[]>) => {
    return getMs(store$).pipe(map(ms => {
      ms.record(new Speech(action.payload, action.payload[0].transcript, true, +new Date()));
      return changeMinute(ms.getMinute());
    }));
  })
);

const clearMinuteEpic = (action$, store$) => action$.pipe(
  ofAction(clearMinute),
  mergeMap(() => {
    return getMs(store$).pipe(map(ms => {
      ms.clear();
      return changeMinute(ms.getMinute());
    }));
  })
);

const changeContextEpic = action$ => action$.pipe(
  ofAction(changeContext),
  map((action: Action<string>) => setStorage(new MinutesStorage(action.payload)))
);

const recStartEpic = (action$, store$) => action$.pipe(
  ofAction(recStart),
  mergeMap(() => getMt(store$).pipe(map(x => x.start()))),
  ignoreElements()
);

const recStopEpic = (action$, store$) => action$.pipe(
  ofAction(recStop),
  mergeMap(() => getMt(store$).pipe(map(x => x.stop()))),
  ignoreElements()
);

const minutesLocation = /^\/minute\/(.*)/;
const changeMinuteLocationEpic = (action$) => action$.pipe(
  ofLocationChangeRegExp(minutesLocation),
  map(({"payload": { "location": { pathname } }}: any) => changeContext(pathname.match(minutesLocation)[1]))
);

export const epic = combineEpics(
  clearMinuteEpic,
  changeContextEpic,
  newSpeechEpic,
  recStartEpic,
  recStopEpic,
  changeMinuteLocationEpic
);

