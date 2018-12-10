import actionCreatorFactory, { Action } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { combineEpics } from "redux-observable";
import { map } from "rxjs/operators";
import ofAction, { ofLocationChange } from "utils/fsa-redux-observable";

import MinuteIndex from "models/MinuteIndex";

import { titleList, createNewMinute as create } from "MinutesStorage";

// action
const actionCreator = actionCreatorFactory("TOP");

interface MinutesState {
  minuteList: MinuteIndex[];
}

const initialState = {
  "minuteList": []
};

export const loadMinuteIndex = actionCreator<MinuteIndex[]>("LOAD_MINUTE_INDEX");
export const createNewMinute = actionCreator<string>("CREATE_NEW_MINUTE");

export const topReducer = reducerWithInitialState<MinutesState>(initialState)
  .case(loadMinuteIndex, (state, payload) => ({...state, "minuteList": payload}))
  .build();

const loadMinuteIndexStartedEpic = action$ => action$.pipe(
  ofLocationChange("/"),
  map(() => loadMinuteIndex(titleList()))
);

const createNewMinuteEpic = action$ => action$.pipe(
  ofAction<string>(createNewMinute),
  map((action: Action<string>) => {
    create(action.payload);
    return loadMinuteIndex(titleList());
  })
);

export const epic = combineEpics(
  loadMinuteIndexStartedEpic,
  createNewMinuteEpic
);

