import React, { Component } from "react";
import { get, getByEmail, post, getAll } from "../Calls";
import { userRoute } from "../ApiRoutes";
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    let userr = await get(userRoute, this.props.location.state.user);
    this.setState({
      user: userr,
    });
    console.log(this.state.user);
  }

  regFood = () => {
    this.props.history.push({
      pathname: "/registerFood",
      state: { userId: this.state.user.UserId },
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.regFood}></button>
      </div>
    );
  }
}
