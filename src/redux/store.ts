import {Course} from "../models/Course";
import {combineReducers} from "redux";
import {coursesReducer} from "./reducers";
import {configureStore} from "@reduxjs/toolkit";

export type StateType = {
    courses: Course[];
}
const reducer = combineReducers<StateType>({
    courses: coursesReducer as any
})
export const store = configureStore({reducer})