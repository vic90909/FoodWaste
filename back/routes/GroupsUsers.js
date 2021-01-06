import express from 'express'
import {createGroupUser, getAllGroupsUsers} from '../logic/GroupsUsersLogic.js'

const router= express.Router();

router.route("/groupUser").get(async (req, res) => {
    res.json(await getAllGroupsUsers(res));
  });
  
  router.route("/groupUser").post(async (req, res) => {
    res.json(await createGroupUser(req.body, res));
  });
  

export default router;