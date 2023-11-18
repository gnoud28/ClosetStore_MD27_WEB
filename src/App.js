import logo from "./logo.svg";
import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/Home/Home";

import Product from "./pages/Product/Product";
import { AdminTemplate } from "./template/AdminTemplate/AdminTemplate";
import AdminChart from "./pages/Chart/Chart";
import Login from "./pages/Login/Login";
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <AdminTemplate path="/product" exact Component={Product} />
        <AdminTemplate path="/chart" exact Component={AdminChart} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
