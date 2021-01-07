import React, { Component } from "react";
import { get, getByEmail, post, getAll, getAllFood } from "../Calls";
import { foodRoute, userRoute } from "../ApiRoutes";
import Collapsible from "react-collapsible";
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      fridgeHeight: 800,
    };
  }

  async componentDidMount() {
    let userr = await get(userRoute, this.props.location.state.user);
    this.setState({
      user: userr,
    });
    console.log(this.state.user);

    let foods = await getAllFood(foodRoute, this.props.location.state.user);
    console.log(foods);

    const fridge = document.getElementsByClassName("fridge");
    fridge[0].style.height = 800 + "px";
    let height = 500;
    console.log(fridge[0].style.height);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const almost = document.getElementById("almost");
    const exp = document.getElementById("exp");
    const little = document.getElementById("little");

    const cheese = document.getElementById("cheese");
    const milks = document.getElementById("milks");
    const alcool = document.getElementById("alcool");
    const beef = document.getElementById("beef");
    const chick = document.getElementById("chick");
    const lamb = document.getElementById("lamb");
    const pork = document.getElementById("pork");
    const liquids = document.getElementById("liquids");
    const fruits = document.getElementById("fruits");
    const vegs = document.getElementById("vegs");
    const fish = document.getElementById("fish");
    const cooked = document.getElementById("cooked");
    const desert = document.getElementById("desert");

    for (let i = 0; i < foods.length; i++) {
      const li = document.createElement("li");

      li.innerText = foods[i].FoodName;
      const date = new Date(foods[i].FoodExpirationDate);
      //var dateString = new Date(date. getTime() - (date. getTimezoneOffset() * 60000 ))
      var month = date.getUTCMonth() + 1; //months from 1-12
      var day = date.getUTCDate();
      var year = date.getUTCFullYear();
      console.log(day, month, year, parseFloat(dd), parseFloat(mm), yyyy);
      if (
        (year == yyyy && mm == month && day <= dd) ||
        year < yyyy ||
        (year == yyyy && month < mm)
      ) {
        exp.appendChild(li);
      } else {
        if (year == yyyy && month == parseFloat(mm) && day - dd <= 3) {
          li.innerText +=
            " - expira in " + (day - parseFloat(dd) + 1) + " zile";
          little.appendChild(li);
        } else {
          if (year == yyyy && month == mm && day - dd <= 14) {
            li.innerText += " - expira in " + (day - dd + 1) + " zile";
            almost.appendChild(li);
          }
        }
      }
      const liFridge = document.createElement("li");
      liFridge.innerText =
        foods[i].FoodName + " (" + foods[i].FoodQuantity + ")";
      // height += 40;
      // fridge[0].style.height = height + "px";
      if (foods[i].FoodType === "Branzeturi") {
        cheese.appendChild(liFridge);
        console.log("Lungime:", cheese.childNodes.length);
      } else if (foods[i].FoodType === "Lactate") {
        milks.appendChild(liFridge);
      } else if (foods[i].FoodType === "Alcool") {
        alcool.appendChild(liFridge);
      } else if (foods[i].FoodType === "Lichide") {
        liquids.appendChild(liFridge);
      } else if (foods[i].FoodType === "Carne de Porc") {
        pork.appendChild(liFridge);
      } else if (foods[i].FoodType === "Carne de Vita") {
        beef.appendChild(liFridge);
      } else if (foods[i].FoodType === "Carne de Pui") {
        chick.appendChild(liFridge);
      } else if (foods[i].FoodType === "Carne de Miel") {
        lamb.appendChild(liFridge);
      } else if (foods[i].FoodType === "Fructe") {
        fruits.appendChild(liFridge);
      } else if (foods[i].FoodType === "Legume") {
        vegs.appendChild(liFridge);
      } else if (foods[i].FoodType === "Desert") {
        desert.appendChild(liFridge);
      }
    }
  }

  regFood = () => {
    this.props.history.push({
      pathname: "/registerFood",
      state: { userId: this.state.user.UserId },
    });
  };

  open = (name) => {
    const fridge = document.getElementsByClassName("fridge");
    const element = document.getElementById(name);
    // const newHeight = this.state.fridgeHeight + element.childNodes.length * 20;
    // fridge[0].style.height = newHeight + "px";
    // this.setState({
    //   fridgeHeight: newHeight,
    // });
    // console.log(this.state.fridgeHeight);
  };

  close = (name) => {
    const fridge = document.getElementsByClassName("fridge");
    const element = document.getElementById(name);
    const newHeight = this.state.fridgeHeight - element.childNodes.length * 20;
    // fridge[0].style.height = newHeight + "px";
    // this.setState({
    //   fridgeHeight: newHeight,
    // });
    // console.log(this.state.fridgeHeight);
  };

  render() {
    return (
      <div>
        <div className="door">
          <ul id="almost">Aproape Expirate</ul>
          <ul id="exp">Expirate</ul>
          <ul id="little">Foarte putin pana la expirare</ul>
        </div>
        <div className="fridge">
          <Collapsible
            onOpen={() => {
              this.open("cheese");
            }}
            onClose={() => {
              this.close("cheese");
            }}
            trigger="Branzeturi"
            triggerTagName="ul"
          >
            <ul id="cheese"></ul>
          </Collapsible>

          <Collapsible
            onOpen={() => {
              this.open("milks");
            }}
            onClose={() => {
              this.close("milks");
            }}
            trigger="Lactate"
            triggerTagName="ul"
          >
            <ul id="milks"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("alcool");
            }}
            onClose={() => {
              this.close("alcool");
            }}
            trigger="Alcool"
            triggerTagName="ul"
          >
            <ul id="alcool"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("liquids");
            }}
            onClose={() => {
              this.close("liquids");
            }}
            trigger="Lichide"
            triggerTagName="ul"
          >
            <ul id="liquids"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("beef");
            }}
            onClose={() => {
              this.close("beef");
            }}
            trigger="Carne de Vita"
            triggerTagName="ul"
          >
            <ul id="beef"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("chick");
            }}
            onClose={() => {
              this.close("chick");
            }}
            trigger="Carne de Pui"
            triggerTagName="ul"
          >
            <ul id="chick"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("lamb");
            }}
            onClose={() => {
              this.close("lamb");
            }}
            trigger="Carne de Miel"
            triggerTagName="ul"
          >
            <ul id="lamb"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("pork");
            }}
            onClose={() => {
              this.close("pork");
            }}
            trigger="Carne de Porc"
            triggerTagName="ul"
          >
            <ul id="pork"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("fruits");
            }}
            onClose={() => {
              this.close("fruits");
            }}
            trigger="Fructe"
            triggerTagName="ul"
          >
            <ul id="fruits"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("vegs");
            }}
            onClose={() => {
              this.close("vegs");
            }}
            trigger="Legume"
            triggerTagName="ul"
          >
            <ul id="vegs"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("fish");
            }}
            onClose={() => {
              this.close("fish");
            }}
            trigger="Peste"
            triggerTagName="ul"
          >
            <ul id="fish"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("cooked");
            }}
            onClose={() => {
              this.close("cooked");
            }}
            trigger="Mancare gatita"
            triggerTagName="ul"
          >
            <ul id="cooked"></ul>
          </Collapsible>
          <Collapsible
            onOpen={() => {
              this.open("desert");
            }}
            onClose={() => {
              this.close("desert");
            }}
            trigger="Desert"
            triggerTagName="ul"
          >
            <ul id="desert"></ul>
          </Collapsible>

        </div>
        <button id="addFood" onClick={this.regFood}>
          Add Your Food
        </button>
      </div>
    );
  }
}
