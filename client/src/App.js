import React, { useState } from "react";
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <>
      <Link to='/BubblePage'>
        <button>BubblePage</button>
      </Link>

      <div className='App'>
        <Route exact path='/Login'>
          <Login />
        </Route>
        {
          /* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */
          <PrivateRoute path='/BubblePage'>
            <BubblePage />
          </PrivateRoute>
        }
      </div>
    </>
  );
}
function PrivateRoute({ children, ...rest }) {
  const checkToken = localStorage.getItem("token");
  return (
    <Route {...rest}>{checkToken ? children : <Redirect to='/Login' />}</Route>
  );
}

export default withRouter(App);
