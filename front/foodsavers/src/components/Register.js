import React, { Component } from "react";
import "./Register.css";
import {get,getByEmail,post} from '../Calls'
import {userRoute} from '../ApiRoutes'

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user:{
            UserName: "",
            UserSurname: "",
            UserEmail: "",
            UserPass: "",
            UserAge: 0,
            UserPhone: "",
            UserAdress: "",
        },
    //   firstName: null,
    //   lastName: null,
    //   email: null,
    //   address: null,
    //   phone: null,
    //   age: null,
    //   password: null,
      formErrors: {
        UserName: "",
        UserSurname: "",
        UserEmail: "",
        UserPass: "",
        UserAge: 0,
        UserPhone: "",
        UserAdress: "",
      },
    };
  }

  saveUser =async()=>{
      try{
        
        let res = await post(userRoute, this.state.user).then(user=>{
            alert("gg");
        }).catch(e=>{
            console.log(e);
        });

        if (res.hasErrors){
            alert(res.message)
            return;
        }
      }catch(e){
          console.log(e);
      }
    
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
    //   console.log(`
    //     --SUBMITTING--
    //     First Name: ${this.state.firstName}
    //     Last Name: ${this.state.lastName}
    //     Email: ${this.state.email}
    //     Password: ${this.state.password}
    //     Address: ${this.state.address}
    //     Phone: ${this.state.phone}
    //     Age: ${this.state.age}
    //   `);
    console.log(this.state.formErrors);
      this.saveUser()
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    let newUser = this.state.user;    
    console.log(e.target.name,e.target.value,newUser);    
    newUser[e.target.name] = e.target.value;
    this.setState({User: newUser});
    switch (name) {
      case "user.UserName":
        formErrors.UserName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.UserSurname =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.UserEmail = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.UserPass =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "age":
        formErrors.UserAge = value < 18 ? "Minimun 18 years old" : "";
        break;
        case "phone":
            formErrors.UserPhone = value.length < 10 ? "minimum 6 characaters required" : "";
            break;
        case "address":
            formErrors.UserAdress = value.length < 10 ? "minimum 6 characaters required" : "";
            break;
        default:

        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  haveAccount = () => {
    this.props.history.push("/");
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form
            className="formRegister"
            onSubmit={this.handleSubmit}
            noValidate
          >
            <div className="firstName">
              <label htmlFor="UserName">First Name</label>
              <input
                className={formErrors.UserName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="UserName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.UserName.length > 0 && (
                <span className="errorMessage">{formErrors.UserName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="UserSurname">Last Name</label>
              <input
                className={formErrors.UserSurname.length > 0 ? "error" : null}
                id="UserSurname"
                placeholder="Last Name"
                type="text"
                name="UserSurname"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.UserSurname.length > 0 && (
                <span className="errorMessage">{formErrors.UserSurname}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="UserEmail">Email</label>
              <input
                className={formErrors.UserEmail.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="UserEmail"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.UserEmail.length > 0 && (
                <span className="errorMessage">{formErrors.UserEmail}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="UserAge">Age</label>
              <input
                className={formErrors.UserAge.length > 0 ? "error" : null}
                placeholder="Age"
                type="number"
                name="UserAge"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.UserAge.length > 0 && (
                <span className="errorMessage">{formErrors.UserAge}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="UserPhone">Phone</label>
              <input
                className={formErrors.UserPhone.length > 0 ? "error" : null}
                placeholder="Phone"
                type="text"
                name="UserPhone"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.UserPass.length > 0 && (
                <span className="errorMessage">{formErrors.UserPhone}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="UserAdress">Address</label>
              <input
                className={formErrors.UserAdress.length > 0 ? "error" : null}
                placeholder="Address"
                type="text"
                name="UserAdress"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.UserAdress.length > 0 && (
                <span className="errorMessage">{formErrors.UserAdress}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="UserPass">Password</label>
              <input
                className={formErrors.UserPass.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="UserPass"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.UserPass.length > 0 && (
                <span className="errorMessage">{formErrors.UserPass}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small onClick={this.haveAccount}>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
