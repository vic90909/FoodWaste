import User from '../Entities/User.js'
import Food from "../Entities/Food.js";
import Friends from "../Entities/Friends.js";
import Group from "../Entities/Group.js";
import GroupsUsers from '../Entities/GroupUsers.js'

// GroupsUsers.hasMany(User,{as:"Members",foreignKey:"UserId"})
// User.belongsTo(GroupsUsers,{foreignKey:"UserId"});

async function getAllGroupsUsers(res) {
    return await GroupsUsers.findAll();
  }
  
  async function createGroupUser(groupUser, res) {
    return await GroupsUsers.create(groupUser);
  }

  async function getGroupUsersByGroup(res,id) {
    return await GroupsUsers.findAll();
  }

  async function deleteGroupUser(id,res){
    await GroupsUsers.findOne({
      where:{GroupsUsersId:id}
    }).then( async user=>{
      return await user.destroy()
    }).catch(err=>{
      console.log(err)
    })
  }

export {createGroupUser, getAllGroupsUsers,deleteGroupUser};