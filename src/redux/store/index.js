import {
  createStore, //compose,
  applyMiddleware,
} from "redux";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import allReducers from "./../reducers";

//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  applyMiddleware(ReduxThunk, promiseMiddleware)

  //composeEnhancer(applyMiddleware(ReduxThunk))
);
// console.log(store)

export default store;
