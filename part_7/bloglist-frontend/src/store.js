import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import notificationReducer from "./reducer/notificationReducer";
import blogReducer from "./reducer/blogReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
