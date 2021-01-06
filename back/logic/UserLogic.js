import User from '../Entities/User.js'
import Food from "../Entities/Food.js";
import Friends from "../Entities/Friends.js";
import Group from "../Entities/Group.js";

User.hasMany(Food, { as: "Foods", foreignKey: "UserId" });
Food.belongsTo(User, { foreignKey: "UserId" });

User.hasMany(Friends, { as: "Friends", foreignKey: "UserId" });
Friends.belongsTo(User, { foreignKey: "UserId" });

User.hasMany(Group, { as: "Groups", foreignKey: "CreatorId" });
Group.belongsTo(User, { foreignKey: "CreatorId" });

async function getUserByEmail(email,res){
  try{
    await User.findOne({
      where:{UserEmail:email}
  }).then(user=>{
    res.status(200).send(user.UserPass)
  }).catch(err=>{
    res.status(403).send(err)
  })
  }catch(err){
    res.status(404).send(err);
  }
}

async function createUser(user, res) {
    try {
      if (
        user.UserSurname === "" ||
        user.UserName === "" ||
        user.UserEmail === "" ||
        user.UserPhone === "" ||
        user.UserAdress === "" ||
        user.UserPass === ""
      ) {
        res.status(403).send({ message: "Unul dintre campuri este necompletat" });
      } else if (
        user.UserEmail.includes("@") === false ||
        user.UserEmail.includes(".") == false
      ) {
        res.status(403).send({ message: "Format email invalid" });
      } else if (user.UserPhone.length != 10) {
        res.status(403).send({ message: "Format telefon invalid" });
      } else if (user.UserAge < 18) {
        res.status(403).send({ message: "Utilizatorul trebuie sa fie major" });
      } else {
        return await User.create(user, {
          include: [
            { model: Food, as: "Foods" },
            { model: Friends, as: "Friends" },
            { model: Group, as: "Groups" },
          ],
        });
      }
    } catch (err) {
      res.status(500).send({ message: "Email-ul a fost utilizat deja" });
    }
  }
  
  async function getAllUsers(res) {
    try {
      return await User.findAll({
        include: [
          { model: Food, as: "Foods" },
          { model: Friends, as: "Friends" },
          { model: Group, as: "Groups" },
        ],
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
  
  async function getByIdUser(id,res) {
    try{
      return await User.findByPk(id, {
        include: [
          { model: Food, as: "Foods" },
          { model: Friends, as: "Friends" },
          { model: Group, as: "Groups" },
        ],
      });
    }catch(err){
      res.status(404).send({message:"Nu s-a gasit utilizatorul dupa id"});
    }

  }
  
  async function updateUsers(id, user) {
    if (parseInt(id) !== user.UserId) {
      console.log("Different id");
      return;
    }
  
    let updateEntity = await getByIdUser(id);
  
    if (!updateEntity) {
      console.log("Use doesn't exist!");
      return;
    }
  
    return await updateEntity.update(user, {
      include: [{ model: Food, as: "Foods" }],
    });
  }
  
  async function deleteUser(id) {
    let deleteEntity = await getByIdUser(id);
  
    if (!deleteEntity) {
      console.log("There isn't a user with this id");
      return;
    }
  
    return await deleteEntity.destroy();
  }
  
  async function resetUsers() {
    return await User.destroy({
      where: {},
      truncate: true,
    });
  }

  async function getUserFullByEmail(email,res){
    try{
      await User.findOne({
        where:{UserEmail:email}
    }).then(user=>{
      res.status(200).send(user)
    }).catch(err=>{
      res.status(403).send(err)
    })
    }catch(err){
      res.status(404).send(err);
    }
  }
  

export {getUserByEmail,createUser, getByIdUser,getAllUsers,updateUsers,deleteUser,resetUsers,getUserFullByEmail}