import User from '../Entities/User.js'
import Food from "../Entities/Food.js";
import Friends from "../Entities/Friends.js";
import Group from "../Entities/Group.js";
import GroupsUsers from '../Entities/GroupUsers.js'

Group.hasMany(GroupsUsers, { as: "GroupsUsers", foreignKey: "GroupsUsersId" });
GroupsUsers.belongsTo(Group, { foreignKey: "GroupsUsersId" });

async function createGroup(group, res) {
    try {
      if (group.GroupDescription === "") {
        res.status(403).send({ message: "Grupul nu are descriere" });
      } else {
        return await Group.create(group, {
          include: [{ model: GroupsUsers, as: "GroupsUsers" }],
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
  
  async function getAllGroups(res) {
    try {
      return await Group.findAll({
        include: [{ model: GroupsUsers, as: "GroupsUsers" }],
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
  
  async function getByIdGroup(id, res) {
    try {
      return await Group.findByPk(id, {
        include: [{ model: GroupsUsers, as: "GroupsUsers" }],
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
  
  async function updateGroup(id, group, res) {
    if (parseInt(id) !== group.GroupId) {
      console.log("Different id");
      return;
    }
  
    let updateEntity = await getByIdGroup(id);
  
    if (!updateEntity) {
      console.log("Group doesn't exist!");
      return;
    }
  
    return await updateEntity.update(group);
  }
  
  async function deleteGroup(id) {
    let deleteEntity = await getByIdGroup(id);
  
    if (!deleteEntity) {
      console.log("There isn't a group with this id");
      return;
    }
    return await deleteEntity.destroy();
  }

  export {deleteGroup,getByIdGroup,getAllGroups,updateGroup,createGroup};