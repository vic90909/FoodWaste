import User from "../Entities/User.js";
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

async function getFriendsUser(id, res) {
  await Friends.findAll({
    where: { UserId: id },
  })
    .then((friends) => {
      // var array=[{"UserId": 0,
      // "UserName": "",
      // "UserSurname": "",
      // "UserAge": 0,
      // "UserEmail": "",
      // "UserPhone": "",
      // "UserAdress": "",
      // "UserPass": ""}];
      // friends.map(async(item)=>{
      //   var found=await User.findOne({
      //     where:{UserId: item.UserFriendId}
      //   })

      //   array.push(found);
      // //   .then(user=>{
      // //     console.log(user);
      // //     array.push(user);

      // //   }).catch(er=>{
      // //     res.status(500).send(er);
      // //   })
      //  })

      //  res.status(200).send(array);
      res.status(200).send(friends);
    })
    .catch((err) => {
      res.status(500).send({ message: "Userul nu are prieteni" });
    });
}

async function deleteBothFriends(id1, id2, res) {
  await Friends.findOne({
    where: { UserId: id1 , UserFriendId:id2}
  }).then(async (friend)=>{
      friend.destroy();
      await Friends.findOne({
        where: { UserId: id2 , UserFriendId:id1}
      }).then(friend2=>{
        friend2.destroy();
      }).catch(e=>{
        res.status(500).send(e);
      })
  }).catch(e=>{
    res.status(500).send(e);
  });
}



export {
  getAllFriends,
  getByIdFriend,
  getIdOfFriendship,
  getFriendship,
  createFriends,
  deleteFriend,
  getFriendsUser,
  deleteBothFriends
};
