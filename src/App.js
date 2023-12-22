import logo from "./logo.svg";
import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Product from "./pages/Product/Product";
import { AdminTemplate } from "./template/AdminTemplate/AdminTemplate";
import AdminChart from "./pages/Chart/Chart";
import Login from "./pages/Login/Login";
import Category from "./pages/Category/Category";
import User from "./pages/User/User";
import Order from "./pages/Order/Order";
import Banner from "./pages/Banner/Banner";
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <AdminTemplate path="/product" exact Component={Product} />
        <AdminTemplate path="/order" exact Component={Order} />
        <AdminTemplate path="/chart" exact Component={AdminChart} />
        <AdminTemplate path="/category" exact Component={Category} />
        <AdminTemplate path="/user" exact Component={User} />
        <AdminTemplate path="/banner" exact Component={Banner} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
