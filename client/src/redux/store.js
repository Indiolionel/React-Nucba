
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./rootReducers";


const initialState = {};
const middleware = [thunk]

export const store = createStore(
    rootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)
    ))

