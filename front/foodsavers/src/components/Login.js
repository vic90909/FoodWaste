import React, { Component } from "react";
import { getByEmail, getUserByEmail } from "../Calls";
import { userRoute } from "../ApiRoutes";
import "../App.css";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: "Not yet",
      email: "Not yet",
    };
  }
  LoginClick = async () => {
    const email = document.getElementById("ipEmail");
    const pass = document.getElementById("ipPass");
    let password;
    password = await getByEmail(userRoute, email.value);
    const user = await getUserByEmail(userRoute, email.value);
    if (password === parseFloat(pass.value)) {
      this.props.history.push({
        pathname: "/main",
        state: { user: user.UserId },
      });
    } else {
      alert("Email sau parola incorecte");
    }
  };
  RegisterClick = () => {
    this.props.history.push("/register");
  };
  render() {
    return (
      <div className="wrapper">
        <div className="titleLogin">Food Savers - WebRangers</div>
        <div className="form-wrapper">
          <label>Email:</label>
          <input type="text" id="ipEmail"></input>
          <label>Password:</label>
          <input type="password" id="ipPass"></input>

          <button onClick={this.LoginClick}>Log In</button>
          <button onClick={this.RegisterClick}>Register</button>
        </div>
        <div className="footer">
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Helping people in need while reducing
            food waste makes you a hero! <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Food Savers is an innovative app that
            provides you the chance to recycle food and donate it to people that
            need it the most! <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You are not a member yet? Make sure
            you <a style={{color: 'pink', cursor: 'pointer'}} onClick={()=>{this.props.history.push("/register");}}>register</a> and than the fun can begin!
          </p>
        </div>
      </div>
    );
  }
}
