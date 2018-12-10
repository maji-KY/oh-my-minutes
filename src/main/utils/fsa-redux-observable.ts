import { Action, ActionCreator, isType } from "typescript-fsa";
import { filter } from "rxjs/operators";
import { OperatorFunction } from "rxjs";
import { LOCATION_CHANGE } from "connected-react-router";

export default function ofAction<P>(actionCreator: ActionCreator<P>): OperatorFunction<any, Action<P>> {
  return filter(action => isType(action, actionCreator));
}

export function ofLocationChange<P>(pathname: string): OperatorFunction<any, Action<P>> {
  return filter(action => {
    return action.type === LOCATION_CHANGE && action.payload.location.pathname === pathname;
  });
}
export function ofLocationChangeRegExp<P>(pathname: RegExp): OperatorFunction<any, Action<P>> {
  return filter(action => {
    return action.type === LOCATION_CHANGE && pathname.test(action.payload.location.pathname);
  });
}
