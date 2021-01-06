import User from '../Entities/User.js'
import Food from "../Entities/Food.js";
import Friends from "../Entities/Friends.js";
import Group from "../Entities/Group.js";

async function getFood() {
    return await Food.findAll();
  }
  
  async function createFood(food, res) {
    try {
      if (
        food.FoodName === "" ||
        food.FoodExpirationDate === "" ||
        food.FoodType === "" ||
        food.Quantity === "" ||
        food.Availible === ""
      ) {
        res
          .status(403)
          .send({ message: "Unul sau mai multe campuri sunt goale" });
      } else if (new Date() > new Date(food.FoodExpirationDate)) {
        res.status(403).send({ message: "Mancarea este expirata deja" });
      } else {
        return await Food.create(food);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
  
  async function createFoodForUser(food, id) {
    food.UserId = id;
    return await Food.create(food);
  }
  
  async function getByIdFood(id) {
    return await Food.findByPk(id);
  }
  
  async function updateFood(id, food) {
    if (parseInt(id) !== food.FoodId) {
      console.log("Different id");
      return;
    }
  
    let updateEntity = await getByIdFood(id);
  
    if (!updateEntity) {
      console.log("Food doesn't exist!");
      return;
    }
  
    return await updateEntity.update(food);
  }
  
  async function deleteFood(id) {
    let deleteEntity = await getByIdFood(id);
  
    if (!deleteEntity) {
      console.log("There isn't a food with this id");
      return;
    }
    return await deleteEntity.destroy();
  }
  
  async function getFoodByUserId(id) {
    return await Food.findAll({
      where: {
        UserId: id,
      },
    });
  }
  
  async function getFoodByCategory(category) {
    return await Food.findAll({
      where: {
        FoodType: category,
      },
    });
  }

  export {getFood,getFoodByUserId,getFoodByCategory,getByIdFood,createFood,createFoodForUser,deleteFood,updateFood}
  