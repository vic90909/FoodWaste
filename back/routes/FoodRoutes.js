import express from 'express'
import {getFood,getFoodByUserId,getFoodByCategory,getByIdFood,createFood,createFoodForUser,deleteFood,updateFood} from '../logic/FoodLogic.js'


const router= express.Router();

router.route("/food").get(async (req, res) => {
    res.json(await getFood(res));
  });
  
  router.route("/food").post(async (req, res) => {
    res.json(await createFood(req.body, res));
  });
  
  router.route("/food/:id").post(async (req, res) => {
    res.json(await createFoodForUser(req.body, req.params.id));
  });
  
  router.route("/food/:id").get(async (req, res) => {
    res.json(await getByIdFood(req.params.id));
  });
  
  router.route("/food/:id").put(async (req, res) => {
    res.json(await updateFood(req.params.id, req.body));
  });
  
  router.route("/food/:id").delete(async (req, res) => {
    res.json(await deleteFood(req.params.id));
  });
  
  router.route("/food/user/:id").get(async (req, res) => {
    res.json(await getFoodByUserId(req.params.id));
  });
  
  router.route("/food/category/:cat").get(async (req, res) => {
    res.json(await getFoodByCategory(req.params.cat));
  });
export default router;