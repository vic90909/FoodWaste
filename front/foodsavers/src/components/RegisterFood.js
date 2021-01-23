import React, { Component } from "react";
import "../App.css";
import { post } from "../Calls";
import { foodRoute } from "../ApiRoutes";


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
    this.state.food.UserId = this.props.location.state.userId;
    this.state.food.Available="False";
      let res = await post(foodRoute, this.state.food)
        .then((food) => {
          if (food.message === undefined) {
            alert("Bravo, ajuti lumea!");
            this.props.history.push({
              pathname: "/main",
              state: { user: this.state.food.UserId },
            });
          } else {
            alert(food.message);
            return food.message;
          }
          console.log(food, this.state.food);
        })
        .catch((e) => {
          alert(e);
        });
      
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      //console.log(this.state.formErrors);
      this.saveFood();
    } else {
      console.error("Unu sau mai multe campuri are erori");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    let newFood = this.state.food;
    newFood[e.target.name] = e.target.value;
    this.setState({ Food: newFood });
    switch (name) {
      case "FoodName":
        formErrors.FoodName =
          value.length < 3
            ? "minimum 3 characaters required"
            : value.length > 255
            ? "Food Name too long"
            : "";
        break;
      case "FoodQuantity":
        formErrors.FoodQuantity =
          value.length < 3
            ? "minimum 3 characaters required"
            : value.length > 255
            ? "Food Name too long"
            : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  haveAccount = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    console.log(this.props.location.state.userId);
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Add Food</h1>
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

            {/* <div className="lastName">
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
            </div> */}

            <div className="selectType">
              <label htmlFor="FoodType">Food Type</label>
              <select
                className="select"
                id="FoodType"
                placeholder="Food Type"
                type="text"
                name="FoodType"
                noValidate
                onChange={this.handleChange}
              >
                <option>Branzeturi</option>
                <option>Lactate</option>
                <option>Alcool</option>
                <option>Lichide</option>
                <option>Carne de Porc</option>
                <option>Carne de Vita</option>
                <option>Carne de Pui</option>
                <option>Carne de Miel</option>
                <option>Fructe</option>
                <option>Legume</option>
                <option>Peste</option>
                <option>Mancare gatita</option>
                <option>Desert</option>
              </select>
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
              <label htmlFor="FoodExpirationDate">
                Food Expiration Date (year-month-date)
              </label>
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
              <button type="submit">Add it</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterFood;
