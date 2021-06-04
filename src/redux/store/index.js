import {
  createStore, //compose,
  applyMiddleware,
} from "redux";
import ReduxThunk from "redux-thunk";
import allReducers from "./../reducers";

//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  applyMiddleware(ReduxThunk)
  //composeEnhancer(applyMiddleware(ReduxThunk))
);

export default store;
