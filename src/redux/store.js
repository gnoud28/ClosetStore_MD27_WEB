import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { ProductReducer } from "./reducer/ProductReducer";
import { CategoryReducer } from "./reducer/CategoryReducer";
import { ChartReducer } from "./reducer/ChartReducer";

const rootReducer = combineReducers({
  ProductReducer,
  CategoryReducer,
  ChartReducer,
});

let middleWare = applyMiddleware(reduxThunk);
let composeCustom = compose(middleWare);

export const store = createStore(rootReducer, composeCustom);
