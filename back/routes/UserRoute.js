import express from 'express'
import {getUserByEmail,createUser, getByIdUser,getAllUsers,updateUsers,deleteUser,resetUsers,getUserFullByEmail} from '../logic/UserLogic.js'

const router= express.Router();

router.route("/user").post(async (req, res) => {
    res.json(await createUser(req.body, res));
  });
  
  router.route("/user").get(async (req, res) => {
    res.json(await getAllUsers(res));
  });
  
  router.route("/user/:id").get(async (req, res) => {
    res.json(await getByIdUser(req.params.id,res));
  });
  
  router.route("/user/:id").put(async (req, res) => {
    res.json(await updateUsers(req.params.id, req.body));
  });
  
  router.route("/user/:id").delete(async (req, res) => {
    res.json(await deleteUser(req.params.id));
  });
  
  router.route("/user/reset").delete(async (req, res) => {
    res.json(await resetUsers());
  });

  router.route("/user/email/:mail").get(async(req,res)=>{
    res.json(await getUserByEmail(req.params.mail,res));
  })

  router.route("/user/emailFull/:mail").get(async(req,res)=>{
    res.json(await getUserFullByEmail(req.params.mail,res));
  })

export default router;