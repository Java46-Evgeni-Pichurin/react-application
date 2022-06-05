import {Course} from "../models/Course";
import {combineReducers} from "redux";
import {clientDataReducer, coursesReducer, operationCodeReducer} from "./reducers";
import {configureStore} from "@reduxjs/toolkit";
import {ClientData} from "../models/ClientData";
import {OperationCode} from "../models/OperationCode";

export type StateType = {
    courses: Course[],
    clientData: ClientData,
    operationCode: OperationCode,
}

const reducer = combineReducers<StateType>({
    courses: coursesReducer as any,
    clientData: clientDataReducer as any,
    operationCode: operationCodeReducer as any,
})

export const store = configureStore({reducer});
