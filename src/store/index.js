import { applyMiddleware, combineReducers, createStore } from "redux";
import ThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./auth/auth";
import uiReducer from "./ui/ui";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer
});

const composedEnhencer = composeWithDevTools(applyMiddleware(ThunkMiddleware));

const store = createStore(rootReducer, composedEnhencer);

export default store;
