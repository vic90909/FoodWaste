import express from 'express'
import{getAllFriends,getByIdFriend,getIdOfFriendship,getFriendship,createFriends,deleteFriend,getFriendsUser,deleteBothFriends} from '../logic/FriendsLogic.js'
const router= express.Router();


router.route("/friends").post(async (req, res) => {
    res.json(await createFriends(req.body, res));
  });
  
  router.route("/friends").get(async (req, res) => {
    res.json(await getAllFriends(res));
  });
  
  router.route("/friends/:id").get(async (req, res) => {
    res.json(await getByIdFriend(req.params.id));
  });
  
  router.route("/friends/:id").delete(async (req, res) => {
    res.json(await deleteFriend(req.params.id));
  });
  
  router.route("/friends/:idU/:idF").get(async (req, res) => {
    res.json(await getFriendship(req.params.idU, req.params.idF, res));
  });

  router.route("/friendsUser/:id").get(async(req,res)=>{
    res.json(await getFriendsUser(req.params.id, res));
  })

  router.route("/friendsDelete/:id1/:id2").delete(async(req,res)=>{
    res.json(await deleteBothFriends(req.params.id1,req.params.id2, res));
  })


export default router;