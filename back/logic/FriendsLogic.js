import User from '../Entities/User.js'
import Food from "../Entities/Food.js";
import Friends from "../Entities/Friends.js";
import Group from "../Entities/Group.js";


async function createFriends(friend, res) {
    try {
      let friendship = await getFriendship(
        friend.UserId,
        friend.UserFriendId,
        res
      );
      if (friendship.length < 1) {
        await Friends.create(friend);
        await Friends.create({
          UserId: friend.UserFriendId,
          UserFriendId: friend.UserId,
        });
        res.status(200).send({
          message: `S-a creat prietenia intre ${friend.UserFriendId} si ${friend.UserId}`,
          friendship,
        });
      } else {
        res.status(403).send({
          message: `Prietenia exista deja intre ${friend.UserFriendId} si ${friend.UserId}`,
          //friendship
        });
      }
    } catch (err) {
      res
        .status(500)
        .send({ message: "Inserare in Friend esuata, nu exista userii" });
    }
  }
  
  async function getAllFriends(res) {
    try {
      return await Friends.findAll();
    } catch (err) {
      res.status(500).send(err);
    }
  }
  
  async function getByIdFriend(id) {
    try {
      return await Friends.findByPk(id);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  
  async function deleteFriend(id) {
    let deleteEntity = await getByIdFriend(id);
  
    if (!deleteEntity) {
      console.log("There isn't a friend with this id");
      return;
    }
    return await deleteEntity.destroy();
  }
  
  async function getFriendship(idU, idF, res) {
    try {
      return await Friends.findAll({
        where: { UserId: idU, UserFriendId: idF },
      });
    } catch (err) {
      res.status(500).send({ message: `Prietenia nu exista intre` });
    }
  }
  
  async function getIdOfFriendship(idU, idF) {
    try {
      const friendship = await Friends.findOne({
        where: { UserId: idU, UserFriendId: idF },
      });
      const idFriendship = friendship.FriendsId;
      return idFriendship;
    } catch (err) {
      res.status(500).send({ message: `Prietenia nu exista intre` });
    }
  }

  export{getAllFriends,getByIdFriend,getIdOfFriendship,getFriendship,createFriends,deleteFriend}
  