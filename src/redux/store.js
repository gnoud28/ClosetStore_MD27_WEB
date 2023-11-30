import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { ProductReducer } from "./reducer/ProductReducer";
import { CategoryReducer } from "./reducer/CategoryReducer";
import { ChartReducer } from "./reducer/ChartReducer";
import { UserReducer } from "./reducer/UserReducer";
import { OrderReducer } from "./reducer/OrderReducer";

const rootReducer = combineReducers({
  ProductReducer,
  CategoryReducer,
  ChartReducer,
  UserReducer,
  OrderReducer,
});

let middleWare = applyMiddleware(reduxThunk);
let composeCustom = compose(middleWare);

export const store = createStore(rootReducer, composeCustom);
