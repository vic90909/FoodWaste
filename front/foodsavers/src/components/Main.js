import React, { Component } from "react";
import {
  get,
  getByEmail,
  post,
  getAll,
  getAllFood,
  getFriendsIds,
  deleteFriendship,
  getUserGroups,
  update,
  deleteSmth
} from "../Calls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import disableScroll from "disable-scroll";
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
  faSortNumericUpAlt,
  faUtensils

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
      show2:false,
      idGet:null,
      sidebarOpen: "inline",
      GroupDescription: null,
      friendFoods:[],
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
    this.getFriendFood=this.getFriendFood.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.users);
  }

  

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
    console.log(this.state.groups);
    console.log(userr);

    try{
      var allUsers = await getAll(userRoute);

      var foods = await getAllFood(foodRoute, this.props.location.state.user);
  
      var friendsIds = await getFriendsIds(link, this.state.user.UserId);
    }catch(e){
      alert(e);
    }

    

    var array = [this.state.user];

    try{
      friendsIds.map(async (item) => {
        var hold = await get(userRoute, item.UserFriendId);
        allUsers = allUsers.filter((el) => el.UserId != item.UserFriendId);
        array.push(hold);
      });
    }catch(e){
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
      dd: String(today.getDate()).padStart(2, "0"),
      mm: String(today.getMonth() + 1).padStart(2, "0"),
      yyyy: today.getFullYear(),
    });

    const almost = document.getElementById("almost");
    const exp = document.getElementById("exp");
    const little = document.getElementById("little");

    for (let i = 0; i < foods.length; i++) {
      const li = document.createElement("li");

      li.innerText = foods[i].FoodName;
      const date = new Date(foods[i].FoodExpirationDate);
      //var dateString = new Date(date. getTime() - (date. getTimezoneOffset() * 60000 ))
      var month = date.getUTCMonth() + 1; //months from 1-12
      var day = date.getUTCDate();
      var year = date.getUTCFullYear();
      if (
        (year == this.state.yyyy &&
          this.state.mm == month &&
          day <= this.state.dd) ||
        year < this.state.yyyy ||
        (year == this.state.yyyy && month < this.state.mm)
      ) {
        toast(`🍕 ${foods[i].FoodName} a expirat deja`);
      } else {
        if (
          year == this.state.yyyy &&
          month == parseFloat(this.state.mm) &&
          day - this.state.dd <= 3
        ) {
          li.innerText +=
            " - expira in " + (day - parseFloat(this.state.dd) + 1) + " zile";
          little.appendChild(li);
        } else {
          if (
            year == this.state.yyyy &&
            month == this.state.mm &&
            day - this.state.dd <= 14
          ) {
            // li.innerText += " - expira in " + (day - this.state.dd + 1) + " zile";
            // almost.appendChild(li);
          }
        }
      }

      // const liFridge = document.createElement("li");
      // liFridge.innerText =
      //   foods[i].FoodName + " (" + foods[i].FoodQuantity + ")";
      // if (foods[i].FoodType === "Branzeturi") {
      //   cheese.appendChild(liFridge);
      //   //console.log("Lungime:", cheese.childNodes.length);
      // } else if (foods[i].FoodType === "Lactate") {
      //   milks.appendChild(liFridge);
      // } else if (foods[i].FoodType === "Alcool") {
      //   alcool.appendChild(liFridge);
      // } else if (foods[i].FoodType === "Lichide") {
      //   liquids.appendChild(liFridge);
      // } else if (foods[i].FoodType === "Carne de Vita") {
      //   beef.appendChild(liFridge);
      // } else if (foods[i].FoodType === "Carne de Pui") {
      //   chick.appendChild(liFridge);
      // } else if (foods[i].FoodType === "Carne de Miel") {
      //   lamb.appendChild(liFridge);
      // } else if (foods[i].FoodType === "Fructe") {
      //   fruits.appendChild(liFridge);
      // } else if (foods[i].FoodType === "Legume") {
      //   vegs.appendChild(liFridge);
      // } else if (foods[i].FoodType === "Desert") {
      //   desert.appendChild(liFridge);
      // }
    }
  }

  regFood = () => {
    this.props.history.push({
      pathname: "/registerFood",
      state: { userId: this.state.user.UserId },
    });
  };

  open = () => {};

  close = () => {};

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
    console.log(this.state.users);
    this.setState({
      friends: friendsNew,
      users: newUsers,
    });
    console.log(this.state.users);
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
        newGroups.push(group);
        this.setState({
          groups: newGroups,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getFriendFood(id){
    
    try{
      let foodFriend = await getAllFood(foodRoute,id);
      console.log(foodFriend);
      this.setState({
        friendFoods:foodFriend,
      })
    }catch(e){
      console.log(e);
    }
  }

  async takeFood(id){
    try{
      let food=await get(foodRoute,id);
      food.UserId=this.state.user.UserId;

      let f=await deleteSmth(foodRoute,id);

      let newFoods=this.state.foods;
      await post(foodRoute,food);
      newFoods.push(food);
      var newFriendsFood=this.state.friendFoods.filter(el=>el.FoodId!=id);
      this.setState({
        foods:newFoods,
        friendFoods:newFriendsFood
      })
    }catch(e){
      console.log(e);
    }
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
                  });

                  // console.log("obj", obj);
                  // console.log(this.state.users);

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
                      {item.UserName + " " + item.UserSurname}{" "}
                    </li>
                  );
                })}
              </ul>
            </Collapsible>
          </div>
          <div className="groupInput">
            <div>
              <label style={{color:"white"}}>Add a new group</label>
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
          <Collapsible trigger="Aproape Expirate" triggerTagName="ul">
            <ul id="almost">
              {this.state.foods.map((item, index) => {
                const date = new Date(item.FoodExpirationDate);
                var month = date.getUTCMonth() + 1;
                var day = date.getUTCDate();
                var year = date.getUTCFullYear();
                if (
                  year == this.state.yyyy &&
                  month == this.state.mm &&
                  day - this.state.dd <= 14 &&
                  day - this.state.dd > 3
                )
                  return (
                    <li key={index}>
                      {" "}
                      {item.FoodName +
                        " - expira in " +
                        (day - this.state.dd + 1) +
                        " zile"}{" "}
                    </li>
                  );
                else return;
              })}
            </ul>
          </Collapsible>
          <Collapsible trigger="Expirate" triggerTagName="ul">
            <ul id="exp">
              {this.state.foods.map((item, index) => {
                const date = new Date(item.FoodExpirationDate);
                var month = date.getUTCMonth() + 1;
                var day = date.getUTCDate();
                var year = date.getUTCFullYear();

                if (
                  (year == this.state.yyyy &&
                    this.state.mm == month &&
                    day <= this.state.dd) ||
                  year < this.state.yyyy ||
                  (year == this.state.yyyy && month < this.state.mm)
                ) {
                  return (
                    <li key={index}> {item.FoodName + " a expirat deja"} </li>
                  );
                } else return;
              })}
            </ul>
          </Collapsible>
          <Collapsible
            trigger="Foarte putin pana la expirare"
            triggerTagName="ul"
          >
            <ul id="little"></ul>
          </Collapsible>
        </div>
        <div className="fridge">
          {this.state.foodTypes.map((item) => {
            return (
              <Collapsible trigger={item} triggerTagName="ul">
                <ul>
                  {this.state.foods.map((item2) => {
                    if (item2.FoodType == item) {
                      var styleLi={
                        color:""
                      };
                      if(item2.Available=="True"){
                        styleLi.color="red"
                      }else{
                        styleLi.color="blue"
                      }
                      console.log(item2.FoodName,styleLi,item2.Available);
                      return <li style={styleLi} onDoubleClick={async(ev)=>{
                        if(item2.Available=="True"){
                          item2.Available="False"
                          ev.target.style.color="blue";
                        }else{
                          item2.Available="True"
                          ev.target.style.color="red";
                        }
                        try{
                          await update(foodRoute,item2,item2.FoodId)
                        }catch(er){
                          alert(er);
                        }
                      }}> <button
                        className="buttonAddFriend"
                        onClick={async() => {
                          await deleteSmth(foodRoute,item2.FoodId);
                          let newFoods=this.state.foods.filter(el=>el.FoodId!=item2.FoodId);
                          this.setState({
                            foods:newFoods
                          })

                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>{item2.FoodName}</li>;
                    }
                  })}
                </ul>
              </Collapsible>
            );
          })}

          {/* <Collapsible
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
            <ul id="pork">
              {this.state.foods.map((item) => {
                if (item.FoodType == "Carne de Porc")
                  return <li>{item.FoodName + `(${item.FoodQuantity})`}</li>;
              })}
            </ul>
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
          </Collapsible> */}
          </div>
        </div>
        <button id="addFood" onClick={this.regFood}>
          🍕 Add Your Food 🍕
        </button>

        <div className="Groups">
          <h3 style={{textAlign:"center"}}><i>Your Groups</i></h3>
          {this.state.groups.map((item) => {
            return (
              <div>
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
                    if (usName !== "") return <p>{usName + " " + usSurName}</p>;
                    else return;
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
            if (this.state.sidebarOpen == "none") {
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

                      await post(groupUsersRoute, groupUser);
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
          {this.state.friendFoods.map((item)=>{
           return (
            <div className="modalGroups">
              <div>
                <button
                  onClick={()=>{
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
      </div>
    );
  }
}
