import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navigation from './Componante/Navigation/Navigation';
import Home from './Componante/Home/Home';
import Login from './Componante/Login/Login'
import NotFound from './Componante/NotFound/NotFound';
import { createContext, useState } from 'react';
import PrivateRoute from './Componante/PrivetRoute/PrivetRoute';
import CheckOut from './Componante/CheckOut/CheckOut';
import CheckoutSuccess from './Componante/CheckOut/CheckoutSuccess';
import Orders from './Componante/Orders/Orders';
import Admin from './Componante/Admin/Admin';
import AddProduct from './Componante/Admin/AddProduct';
import ManageProduct from './Componante/Admin/ManageProduct';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Navigation></Navigation>
      <Router>
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/orders">
            <Orders/>
          </PrivateRoute>
          <Route exact path="/">
            <Home/>
          </Route>
          <PrivateRoute path="/checkOut/:productId">
            <CheckOut/>
          </PrivateRoute>
          <Route path="/checkoutsuccess">
            <CheckoutSuccess/>
          </Route>
          <PrivateRoute>
            <Admin/>
            <Route path="/admin">
            <AddProduct/>
            </Route>
            <Route path="/addProduct">
              <AddProduct/>
            </Route>
            <Route path="/manageProduct">
              <ManageProduct/>
            </Route>
          </PrivateRoute>
          <Route path="*">
              <NotFound/>
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
