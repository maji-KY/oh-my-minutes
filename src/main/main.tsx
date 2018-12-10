import "assets/favicon.ico";

import * as React from "react";
import * as ReactDOM from "react-dom";

import MinutesTaker from "MinutesTaker";

import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import { ConnectedRouter, connectRouter, routerMiddleware } from "connected-react-router";

import { Route, Switch } from "react-router";
import createHashHistory from "history/createHashHistory";

import MyAppBarCntr from "containers/MyAppBar";
import MinuteCntr from "containers/Minute";
import TopCntr from "containers/Top";


import * as MinutesModule from "modules/Minutes";
import * as TopModule from "modules/Top";

const history = createHashHistory();
const rootEpic = combineEpics(
  MinutesModule.epic,
  TopModule.epic,
);
const epicMiddleware = createEpicMiddleware();

const reducer = combineReducers({
  "router": connectRouter(history),
  // "form": formReducer,
  "minutesReducer": MinutesModule.minutesReducer,
  "topReducer": TopModule.topReducer
});

const middleware = [routerMiddleware(history), epicMiddleware];

const isDev = process.env.NODE_ENV !== "production";

const anyWindow: any = window;

const composeEnhancers = isDev && anyWindow["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(
    ...isDev ? [...middleware, createLogger()] : middleware
  ),
  anyWindow.devToolsExtension ? anyWindow.devToolsExtension() : (f: any) => f,
));

epicMiddleware.run(rootEpic);

const containerElement = document.getElementById("main");

ReactDOM.render(
  <Provider store={store}>
    <div>
      <MyAppBarCntr />
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={TopCntr} />
          <Route exact path="/minute/:title" component={MinuteCntr} />
          <Route render={() => <div>Page Not Found</div>} />
        </Switch>
      </ConnectedRouter>
    </div>
  </Provider>,
  containerElement
);

import { newSpeech, setMinutesTaker } from "modules/Minutes";

const mt = new MinutesTaker((speech) => {
  store.dispatch(newSpeech(speech));
});
store.dispatch(setMinutesTaker(mt));
