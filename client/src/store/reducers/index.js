import { combineReducers } from "redux";
import users from "./users";
import bc from "./bc";

export default combineReducers ({
  bc,
  users
});
