import React, { Component } from "react";
import {
  get,
  post,
  getAll,
  getAllFood,
  getFriendsIds,
  deleteFriendship,
  getUserGroups,
  update,
  deleteSmth,
} from "../Calls";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  foodRoute,
  userRoute,
  friendsRoute,
  link,
  groupRoute,
  groupUsersRoute,
} from "../ApiRoutes";
import Collapsible from "react-collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUsers,
  faTrash,
  faPlusCircle,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal.js";
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      friends: [],
      foods: [],
      groups: [],
      user: null,
      fridgeHeight: 800,
      day: null,
      year: null,
      month: null,
      dd: null,
      mm: null,
      yyyy: 0,
      obj: [],
      newFriend: {
        UserId: 0,
        UserFriendId: 0,
      },
      idAdd: null,
      show: false,
      show2: false,
      idGet: null,
      sidebarOpen: "inline",
      GroupDescription: null,
      friendFoods: [],
      dummy: null,
      foodTypes: [
        "Branzeturi",
        "Lactate",
        "Alcool",
        "Lichide",
        "Carne de Porc",
        "Carne de Vita",
        "Carne de Pui",
        "Carne de Miel",
        "Fructe",
        "Legume",
        "Peste",
        "Mancare gatita",
        "Desert",
      ],
    };
    this.delete = this.delete.bind(this);
    this.deleteFriendshipMain = this.deleteFriendshipMain.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.getFriendFood = this.getFriendFood.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  showModal = (id) => {
    this.setState({ show: true, idAdd: id });
    console.log(this.state.idAdd);
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showModal2 = (id) => {
    this.setState({ show2: true, idGet: id });
  };

  hideModal2 = () => {
    this.setState({ show2: false });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState.users);
  // }

  async componentDidMount() {
    console.log("begin");
    try {
      var userr = await get(userRoute, this.props.location.state.user);
      this.setState({
        user: userr,
      });
    } catch (e) {
      console.log(e);
    }

    try {
      var groups = await getUserGroups(groupRoute, this.state.user.UserId);
      this.setState({
        groups: groups,
      });
      console.log(groups);
    } catch (e) {
      console.log(e);
    }

    try {
      var allUsers = await getAll(userRoute);

      var foods = await getAllFood(foodRoute, this.props.location.state.user);

      var friendsIds = await getFriendsIds(link, this.state.user.UserId);
    } catch (e) {
      alert(e);
    }

    var array = [this.state.user];

    try {
      friendsIds.map(async (item) => {
        var hold = await get(userRoute, item.UserFriendId);
        allUsers = allUsers.filter((el) => el.UserId != item.UserFriendId);
        array.push(hold);
      });
    } catch (e) {
      console.log(e);
    }

    array = array.filter((el) => el.UserId != this.state.user.UserId);
    allUsers = allUsers.filter((el) => el.UserId != this.state.user.UserId);

    for (let i = 0; i < array.length; i++) console.log(array[i]);

    let friends = await getAll(friendsRoute);

    var filtered = [];
    let ok = true;

    for (let arr of allUsers) {
      ok = true;

      for (let filter of array) {
        if (arr.UserId === filter.UserId) {
          ok = false;
        }
      }

      if (ok == true) {
        filtered.push(arr);
      }
    }
    this.setState({
      users: filtered,
      foods: foods,
      friends: array,
    });

    var today = new Date();

    this.setState({
      dd: parseFloat(String(today.getDate()).padStart(2, "0")),
      mm: parseFloat(String(today.getMonth() + 1).padStart(2, "0")),
      yyyy: parseFloat(today.getFullYear()),
    });

    this.state.foods.map((item, index) => {
      const date = new Date(item.FoodExpirationDate);
      var month = date.getUTCMonth() + 1;
      var day = date.getUTCDate();
      var year = date.getUTCFullYear();
      var plus = -1;
      //aceeasi luna
      if (
        year === this.state.yyyy &&
        month === this.state.mm &&
        day - this.state.dd <= 7 &&
        day - this.state.dd >= 1
      ) {
        plus = 0;
        //luna impara
      } else if (
        this.state.mm % 2 === 1 &&
        year === this.state.yyyy &&
        month === this.state.mm + 1 &&
        day + 31 - this.state.dd <= 7 &&
        day + 31 - this.state.dd >= 1
      ) {
        plus = 31;
      }
      //luna para, dar nu februarie
      else if (
        this.state.mm % 2 === 0 &&
        this.state.mm !== 2 &&
        year === this.state.yyyy &&
        month === this.state.mm + 1 &&
        day + 30 - this.state.dd <= 7 &&
        day + 30 - this.state.dd >= 1
      ) {
        plus = 30;
      }
      //februarie nebisect
      else if (
        this.state.mm === 2 &&
        year % 4 === 1 &&
        year === this.state.yyyy &&
        month === this.state.mm + 1 &&
        day + 28 - this.state.dd <= 7 &&
        day + 28 - this.state.dd >= 1
      ) {
        plus = 28;
      }
      //februarie bisect
      else if (
        this.state.mm === 2 &&
        year % 4 === 0 &&
        year === this.state.yyyy &&
        month === this.state.mm + 1 &&
        day + 29 - this.state.dd <= 7 &&
        day + 29 - this.state.dd >= 1
      ) {
        plus = 29;
      }
      if (plus !== -1) {
        toast("Iti expira " + item.FoodName);
      }
    });
  }

  regFood = () => {
    this.props.history.push({
      pathname: "/registerFood",
      state: { userId: this.state.user.UserId },
    });
  };

  open = () => {};

  close = () => {};

  async deleteGroupUser(id) {
    try {
      await deleteSmth(groupUsersRoute, id);
    } catch (err) {
      console.log(err);
    }
  }

  deleteFriendshipMain = async (url, id1, id2) => {
    await deleteFriendship(url, id1, id2);
    const newFriends = this.state.friends.filter((el) => el.UserId != id2);
    await get(userRoute, id2)
      .then((newUser) => {
        const allUsers = this.state.users;
        allUsers.push(newUser);
        console.log(this.state.users);
        this.setState({
          users: allUsers,
          friends: newFriends,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  delete = (id, friendNew) => {
    const newUsers = this.state.users.filter((el) => el.UserId != id);
    const friendsNew = this.state.friends;
    friendsNew.push(friendNew);

    this.setState({
      friends: friendsNew,
      users: newUsers,
    });
  };

  async friendAdd(item) {
    var friendNew = this.state.newFriend;
    friendNew.UserId = this.state.user.UserId;
    friendNew.UserFriendId = item.UserId;
    await post(friendsRoute, friendNew);
    const newFriend = await get(userRoute, friendNew.UserFriendId);
    this.delete(item.UserId, newFriend);
  }

  async createGroup() {
    const group = {
      CreatorId: this.state.user.UserId,
      GroupDescription: this.state.GroupDescription,
      GroupsUsers: [],
    };
    await post(groupRoute, group)
      .then((e1) => {
        let newGroups = this.state.groups;
        newGroups.push(e1);
        this.setState({
          groups: newGroups,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getFriendFood(id) {
    try {
      let foodFriend = await getAllFood(foodRoute, id);

      this.setState({
        friendFoods: foodFriend,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async takeFood(id) {
    try {
      let food = await get(foodRoute, id);
      food.UserId = this.state.user.UserId;
      food.Available = "False";
      let f = await deleteSmth(foodRoute, id);

      let newFoods = this.state.foods;
      await post(foodRoute, food);
      newFoods.push(food);
      var newFriendsFood = this.state.friendFoods.filter(
        (el) => el.FoodId != id
      );
      this.setState({
        foods: newFoods,
        friendFoods: newFriendsFood,
      });
    } catch (e) {
      console.log(e);
    }
  }

  returnFoodName(foodName, av) {
    if (av === true) return <p>{foodName}</p>;
    else return null;
  }

  render() {
    return (
      <div className="all">
        <div className="Friendship">
          <div className="UserCollaps">
            {" "}
            <Collapsible
              easing="ease"
              trigger="Users"
              contentInnerClassName="UserCollapsInner"
              className="UserCollapsTrigger"
              openedClassName="UserCollapsTrigger"
            >
              <ul>
                {this.state.users.map((item, index) => {
                  let obj = false;
                  this.state.friends.find((el) => {
                    if (el.UserId == item.UserId) obj = true;
                    return null;
                  });
                  if (obj != true)
                    return (
                      <li className="liAddFriend" key={index}>
                        <button
                          className="buttonAddFriend"
                          onClick={() => {
                            this.friendAdd(item);
                          }}
                        >
                          <FontAwesomeIcon icon={faUserPlus} />
                        </button>{" "}
                        {item.UserName + " " + item.UserSurname}{" "}
                      </li>
                    );
                  else return 0;
                })}
              </ul>
            </Collapsible>
          </div>

          <div className="FriendsCollaps">
            {" "}
            <Collapsible
              easing="ease"
              trigger="Friends"
              contentInnerClassName="FriendsCollapsInner"
              className="FriendsCollapsTrigger"
              openedClassName="FriendsCollapsTrigger"
            >
              <ul>
                {this.state.friends.map((item) => {
                  return (
                    <li key={item.UserId}>
                      {item.UserName + " " + item.UserSurname}
                      {"\n"}
                      <br />
                      <button
                        className="buttonAddFriend"
                        onClick={() => {
                          this.showModal(item.UserId);
                        }}
                      >
                        <FontAwesomeIcon icon={faUsers} />
                      </button>{" "}
                      <button
                        className="buttonAddFriend"
                        onClick={() => {
                          this.deleteFriendshipMain(
                            link,
                            this.state.user.UserId,
                            item.UserId
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>{" "}
                      <button
                        className="buttonAddFriend"
                        onClick={() => {
                          this.getFriendFood(item.UserId);
                          this.showModal2(item.UserId);
                        }}
                      >
                        <FontAwesomeIcon icon={faUtensils} />
                      </button>{" "}
                    </li>
                  );
                })}
              </ul>
            </Collapsible>
          </div>
          <div className="groupInput">
            <div>
              <label style={{ color: "white" }}>Add a new group</label>
            </div>
            <div className="addGroup">
              <div>
                <input
                  id="inputGroup"
                  type="text"
                  onChange={(e) => {
                    this.setState({
                      GroupDescription: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div>
                <button
                  onClick={async () => {
                    this.createGroup();
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="arctic">
          <div className="door">
            <Collapsible
              trigger={
                <i style={{ fontSize: "20px" }}>
                  Expira in mai putin de o luna
                </i>
              }
              triggerTagName="ul"
            >
              <ul id="almost">
                {this.state.foods.map((item, index) => {
                  const date = new Date(item.FoodExpirationDate);
                  var month = parseFloat(date.getUTCMonth()) + 1;
                  var day = parseFloat(date.getUTCDate());
                  var year = parseFloat(date.getUTCFullYear());
                  var plus = -1;
                  //aceeasi luna
                  if (
                    year === this.state.yyyy &&
                    month === this.state.mm &&
                    day - this.state.dd <= 31 &&
                    day - this.state.dd > 7
                  ) {
                    plus = 0;
                    //luna impara
                  } else if (
                    this.state.mm % 2 === 1 &&
                    year === this.state.yyyy &&
                    month === this.state.mm + 1 &&
                    day + 31 - this.state.dd <= 31 &&
                    day + 31 - this.state.dd > 7
                  ) {
                    plus = 31;
                  }
                  //luna para, dar nu februarie
                  else if (
                    this.state.mm % 2 === 0 &&
                    this.state.mm !== 2 &&
                    year === this.state.yyyy &&
                    month === this.state.mm + 1 &&
                    day + 30 - this.state.dd <= 31 &&
                    day + 30 - this.state.dd > 7
                  ) {
                    plus = 31;
                  }
                  //februarie nebisect
                  else if (
                    this.state.mm === 2 &&
                    year % 4 === 1 &&
                    year === this.state.yyyy &&
                    month === this.state.mm + 1 &&
                    day + 28 - this.state.dd <= 31 &&
                    day + 28 - this.state.dd > 7
                  ) {
                    plus = 28;
                  }
                  //februarie bisect
                  else if (
                    this.state.mm === 2 &&
                    year % 4 === 0 &&
                    year === this.state.yyyy &&
                    month === this.state.mm + 1 &&
                    day + 29 - this.state.dd <= 31 &&
                    day + 29 - this.state.dd > 7
                  ) {
                    plus = 29;
                  }
                  if (plus !== -1)
                    return (
                      <li style={{ marginRight: "10px " }} key={index}>
                        {" "}
                        {item.FoodName +
                          " - expira in " +
                          (day + plus - this.state.dd) +
                          " zile"}{" "}
                      </li>
                    );
                  else return null;
                })}
              </ul>
            </Collapsible>
            <Collapsible
              trigger={<i style={{ fontSize: "20px" }}>Expirate</i>}
              triggerTagName="ul"
            >
              <ul id="exp">
                {this.state.foods.map((item, index) => {
                  const date = new Date(item.FoodExpirationDate);
                  var month = date.getUTCMonth() + 1;
                  var day = date.getUTCDate();
                  var year = date.getUTCFullYear();

                  if (
                    (year === this.state.yyyy &&
                      this.state.mm === month &&
                      day <= this.state.dd) ||
                    year < this.state.yyyy ||
                    (year === this.state.yyyy && month < this.state.mm)
                  ) {
                    return (
                      <li key={index}> {item.FoodName + " a expirat deja"} </li>
                    );
                  } else return null;
                })}
              </ul>
            </Collapsible>
            <Collapsible
              trigger={
                <i style={{ fontSize: "20px" }}>Mai putin de o saptamana</i>
              }
              triggerTagName="ul"
            >
              <ul id="little">
                {this.state.foods.map((item, index) => {
                  const date = new Date(item.FoodExpirationDate);
                  var month = date.getUTCMonth() + 1;
                  var day = date.getUTCDate();
                  var year = date.getUTCFullYear();
                  var plus = -1;
                  //aceeasi luna
                  if (
                    year === this.state.yyyy &&
                    month === this.state.mm &&
                    day - this.state.dd <= 7 &&
                    day - this.state.dd >= 1
                  ) {
                    plus = 0;
                    //luna impara
                  } else if (
                    this.state.mm % 2 === 1 &&
                    year === this.state.yyyy &&
                    month === this.state.mm + 1 &&
                    day + 31 - this.state.dd <= 7 &&
                    day + 31 - this.state.dd >= 1
                  ) {
                    plus = 31;
                  }
                  //luna para, dar nu februarie
                  else if (
                    this.state.mm % 2 === 0 &&
                    this.state.mm !== 2 &&
                    year === this.state.yyyy &&
                    month === this.state.mm + 1 &&
                    day + 30 - this.state.dd <= 7 &&
                    day + 30 - this.state.dd >= 1
                  ) {
                    plus = 30;
                  }
                  //februarie nebisect
                  else if (
                    this.state.mm === 2 &&
                    year % 4 === 1 &&
                    year === this.state.yyyy &&
                    month === this.state.mm + 1 &&
                    day + 28 - this.state.dd <= 7 &&
                    day + 28 - this.state.dd >= 1
                  ) {
                    plus = 28;
                  }
                  //februarie bisect
                  else if (
                    this.state.mm === 2 &&
                    year % 4 === 0 &&
                    year === this.state.yyyy &&
                    month === this.state.mm + 1 &&
                    day + 29 - this.state.dd <= 7 &&
                    day + 29 - this.state.dd >= 1
                  ) {
                    plus = 29;
                  }
                  if (plus !== -1) {
                    //toast("Iti expira "+item.FoodName)
                    return (
                      <li style={{ marginRight: "10px " }} key={index}>
                        {" "}
                        {item.FoodName +
                          " - expira in " +
                          (day + plus - this.state.dd) +
                          " zile"}{" "}
                      </li>
                    );
                  } else return null;
                })}
              </ul>
            </Collapsible>
          </div>
          <div className="fridge">
            {this.state.foodTypes.map((item) => {
              return (
                <Collapsible
                  trigger={<i style={{ fontSize: "20px" }}>{item}</i>}
                  triggerTagName="ul"
                >
                  <ul>
                    {this.state.foods.map((item2) => {
                      if (item2.FoodType == item) {
                        var styleLi = {
                          color: "",
                          cursor: "grab",
                        };
                        if (item2.Available == "True") {
                          styleLi.color = "green";
                        } else {
                          styleLi.color = "red";
                        }

                        return (
                          <li
                            style={styleLi}
                            onDoubleClick={async (ev) => {
                              if (item2.Available == "True") {
                                item2.Available = "False";
                                ev.target.style.color = "red";
                              } else {
                                item2.Available = "True";
                                ev.target.style.color = "green";
                              }
                              try {
                                await update(foodRoute, item2, item2.FoodId);
                              } catch (er) {
                                alert(er);
                              }
                            }}
                          >
                            {" "}
                            <button
                              className="buttonAddFriend"
                              onClick={async () => {
                                await deleteSmth(foodRoute, item2.FoodId);
                                let newFoods = this.state.foods.filter(
                                  (el) => el.FoodId != item2.FoodId
                                );
                                this.setState({
                                  foods: newFoods,
                                });
                              }}
                              style={{ marginRight: "10px" }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            {item2.FoodName}
                          </li>
                        );
                      }
                    })}
                  </ul>
                </Collapsible>
              );
            })}
          </div>
        </div>
        <button id="addFood" onClick={this.regFood}>
          🍕 Add Your Food 🍕
        </button>

        <div className="Groups">
          <h3 style={{ textAlign: "center" }}>
            <i>Your Groups</i>
          </h3>
          {this.state.groups.map((item) => {
            return (
              <div class="groupItems">
                <Collapsible
                  trigger={item.GroupDescription}
                  triggerTagName="ul"
                >
                  {item.GroupsUsers.map((item2) => {
                    let usName = "";
                    let usSurName = "";
                    let us = this.state.friends.find(
                      (el) => el.UserId == item2.UserId
                    );
                    for (var i in us) {
                      if (i == "UserName") usName = us[i];
                      else if (i == "UserSurname") {
                        usSurName = us[i];
                      }
                    }
                    if (usName !== "")
                      return (
                        <p>
                          <button
                            style={{ marginRight: "10px ", marginLeft: "10px" }}
                            onClick={() => {
                              this.deleteGroupUser(item2.GroupsUsersId);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          {usName + " " + usSurName}
                        </p>
                      );
                    else return null;
                  })}
                </Collapsible>
              </div>
            );
          })}
        </div>

        <button
          id="groups"
          onClick={(item) => {
            let side = document.querySelector(".Groups");
            if (this.state.sidebarOpen === "none") {
              side.style.display = "inline";
              item.target.style.animation = "buttonopen 1s forwards";
              side.style.animation = "sidebaropen 1s forwards";
              this.setState({
                sidebarOpen: "inline",
              });
            } else {
              side.style.animation = "sidebarclose 1s forwards";
              item.target.style.animation = "buttonclose 1s forwards";

              this.setState({
                sidebarOpen: "none",
              });
            }
          }}
        >
          👥
        </button>
        <ToastContainer />
        <Modal show={this.state.show} handleClose={this.hideModal}>
          {this.state.groups.map((item) => {
            return (
              <div className="modalGroups">
                <div>
                  <button
                    onClick={async () => {
                      const groupUser = {
                        GroupId: item.GroupId,
                        UserId: this.state.idAdd,
                      };
                      try {
                        await post(groupUsersRoute, groupUser);
                        var groups = await getUserGroups(
                          groupRoute,
                          this.state.user.UserId
                        );
                        this.setState({
                          groups: groups,
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                </div>
                <div>
                  <p>{item.GroupDescription}</p>
                </div>
              </div>
            );
          })}
        </Modal>
        <Modal show={this.state.show2} handleClose={this.hideModal2}>
          {this.state.friendFoods.map((item) => {
            if (item.Available == "True")
              return (
                <div className="modalGroups">
                  <div>
                    <button
                      onClick={() => {
                        this.takeFood(item.FoodId);
                      }}
                    >
                      {" "}
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                  </div>
                  <div>
                    <p>{item.FoodName}</p>
                  </div>
                </div>
              );
          })}
        </Modal>
        <div className="sharedButton">
          <div>
            <FacebookShareButton
              url="https://www.localhost:3000"
              hashtag="#NoFoodWaste"
              appId="Hellow"
              quote="Share your food with us, don't waste it anymore!"
              style={{ marginRight: "10px" }}
            >
              <FacebookIcon
                size={"4rem"} // You can use rem value instead of numbers
                round
              >
                Buna ziua
              </FacebookIcon>
            </FacebookShareButton>
          </div>
          <WhatsappShareButton
            title="Hey, come and help us save the planet, don't waste anymore food!!🍕🍳🥓🧆🍦🥘🍪🍰🥣🍤🦪🥮☕🍾🍓🍉🍍🥕🌶 !!"
            url="http://www.google.ro"
          >
            <WhatsappIcon
              size={"4rem"} // You can use rem value instead of numbers
              round
            >
              Buna ziua
            </WhatsappIcon>
          </WhatsappShareButton>
          <div></div>
        </div>
      </div>
    );
  }
}
