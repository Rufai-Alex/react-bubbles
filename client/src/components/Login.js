import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [formValue, setformValue] = useState({
    userName: "",
    password: ""
  });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const onchange = e => {
    return setformValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const onsubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", {
        username: formValue.userName,
        password: formValue.password
      })
      .then(response => {
        const token = response.data.payload;
        localStorage.setItem("token", token);
        history.push("/BubblePage");

        // debugger;
      })
      .catch(err => {
        alert(err.response.data.error);
      });
  };
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>

      <div>
        <input
          name='userName'
          value={formValue.userName}
          placeholder='enter your user-name'
          type='text'
          onChange={onchange}
        />
        <input
          name='password'
          value={formValue.password}
          placeholder='enter your password'
          type='text'
          onChange={onchange}
        />
        <input type='submit' onClick={onsubmit} />
      </div>
    </div>
  );
};

export default Login;
