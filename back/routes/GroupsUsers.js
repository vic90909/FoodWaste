import express from 'express'
import {createGroupUser, getAllGroupsUsers,deleteGroupUser} from '../logic/GroupsUsersLogic.js'

const router= express.Router();

router.route("/groupUser").get(async (req, res) => {
    res.json(await getAllGroupsUsers(res));
  });
  
  router.route("/groupUser").post(async (req, res) => {
    try{
      res.json(await createGroupUser(req.body, res));

    }catch(e){
      console.log(e);
    }
  });

  router.route("/groupUser/:id").delete(async (req, res)=>{
    try{
      res.json(await deleteGroupUser(req.params.id, res))
    }catch(err){
      console.log(err);
    }
  })
  

export default router;