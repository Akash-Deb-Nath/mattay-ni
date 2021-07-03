import { createContext, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavBar from './Components/NavBar/NavBar';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute exact path="/home">
            <Home></Home>
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider >
  );
}

export default App;
