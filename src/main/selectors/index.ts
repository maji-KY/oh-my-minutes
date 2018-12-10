import { createSelector } from "reselect";

const getPathNameFromLocation = ({ "router": { "location": { pathname } } }) => pathname;

const MINUTE_LOCATION = "/minute/";

export const minuteTitleFromLocationSelector = () => createSelector(
  [ getPathNameFromLocation ],
  (location: string) => {
    return location.startsWith(MINUTE_LOCATION) ? location.substring(MINUTE_LOCATION.length) : "";
  }
);

export const isViewingMinuteSelector = () => createSelector(
  [ getPathNameFromLocation ],
  (location: string) => {
    return location.startsWith("/minute/");
  }
);
