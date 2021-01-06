import React, { Component } from "react";
import "../App.css";
import { get, getByEmail, post } from "../Calls";
import { userRoute,foodRoute } from "../ApiRoutes";

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

class RegisterFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      food: {
        FoodName: "",
        FoodExpirationDate: "",
        FoodType: "",
        FoodQuantity: "",
        Available: "Unknown",
        UserId: 0,
      },
      formErrors: {
        FoodName: "",
        FoodExpirationDate: "",
        FoodType: "",
        FoodQuantity: "",
        Available: "",
        UserId: 0,
      },
    };
  }

  saveFood = async () => {
    this.state.food.UserId=this.props.location.state.userId;
    
    try {
      let res = await post(foodRoute, this.state.food)
        .then((food) => {
          console.log(food,this.state.food);
          alert("gg");
        })
        .catch((e) => {
          console.log(e);
        });

      if (res.hasErrors) {
        alert(res.message);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(this.state.formErrors);
      this.saveFood();
      this.props.history.push({pathname:"/main",state:{user:this.state.food.UserId}});
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    let newFood = this.state.food;
    console.log(e.target.name, e.target.value, newFood);
    newFood[e.target.name] = e.target.value;
    this.setState({ Food: newFood });
    switch (name) {
      case "user.FoodName":
        formErrors.FoodName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.FoodType =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.FoodQuantity = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.UserPass =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "age":
        formErrors.UserId = value < 18 ? "Minimun 18 years old" : "";
        break;
      case "phone":
        formErrors.Available =
          value.length < 10 ? "minimum 6 characaters required" : "";
        break;
      case "address":
        formErrors.FoodExpirationDate =
          value.length < 10 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  haveAccount = () => {
    this.props.history.push("/");
  };

  componentDidMount(){
    console.log(this.props.location.state.userId)
  }

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
              <label htmlFor="FoodName">Food Name</label>
              <input
                className={formErrors.FoodName.length > 0 ? "error" : null}
                placeholder="Food Name"
                type="text"
                name="FoodName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.FoodName.length > 0 && (
                <span className="errorMessage">{formErrors.FoodName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="FoodType">Food Type</label>
              <input
                className={formErrors.FoodType.length > 0 ? "error" : null}
                id="FoodType"
                placeholder="Food Type"
                type="text"
                name="FoodType"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.FoodType.length > 0 && (
                <span className="errorMessage">{formErrors.FoodType}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="FoodQuantity">Food Quantity</label>
              <input
                className={formErrors.FoodQuantity.length > 0 ? "error" : null}
                placeholder="Food Quantity"
                type="email"
                name="FoodQuantity"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.FoodQuantity.length > 0 && (
                <span className="errorMessage">{formErrors.FoodQuantity}</span>
              )}
            </div>
            
            <div className="password">
              <label htmlFor="FoodExpirationDate">Food Expiration Date (year-month-date)</label>
              <input
                className={
                  formErrors.FoodExpirationDate.length > 0 ? "error" : null
                }
                placeholder="2020-1-20"
                type="text"
                name="FoodExpirationDate"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.FoodExpirationDate.length > 0 && (
                <span className="errorMessage">
                  {formErrors.FoodExpirationDate}
                </span>
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

export default RegisterFood;
