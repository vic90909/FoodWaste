import express from 'express';
import bodyParser from 'body-parser';
import db from './dbConfig.js';
import User from './Entities/User.js'
import Food from './Entities/Food.js'
import { get } from 'http';


let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


User.hasMany(Food, {as: "Foods", foreignKey: "UserId"});
Food.belongsTo(User, {foreignKey: "UserId"});


async function createUser(user){
      await User.create(user,{
          include:[
              {model: Food, as: "Foods"}
          ]
      });
}

async function getAllUsers(){
      return await User.findAll({
          include:[
              {model:Food,
            as:"Foods"}
          ]
      });
  }

async function getByIdUser(id){
      return await User.findByPk(id,{
        include:[
        {model:Food,
          as:"Foods"}
        ]
    });
  }

async function updateUsers(id, user){
      if(parseInt(id)!==user.UserId){
          console.log("Different id");
          return;
      }

      let updateEntity=await getByIdUser(id);
      
      if(!updateEntity){
          console.log("Use doesn't exist!");
          return;
      }

      return await updateEntity.update(user,{
        include:[
            {model:Food,
          as:"Foods"}
        ]
    });
  }


async function deleteUser(id){
      let deleteEntity = await getByIdUser(id);

      if(!deleteEntity){
          console.log("There isn't a user with this id");
          return;
      }

      return await deleteEntity.destroy();
  }


async function getFood(){
    return await Food.findAll();
}

async function createFood(food){
    return await Food.create(food);
}

async function getByIdFood(id){
    return await Food.findByPk(id);
}

async function updateFood(id, food){
    if(parseInt(id)!==food.FoodId){
        console.log("Different id");
        return;
    }

    let updateEntity=await getByIdFood(id);
    
    if(!updateEntity){
        console.log("Food doesn't exist!");
        return;
    }
  
    return await updateEntity.update(food);
}



async function deleteFood(id){
    let deleteEntity = await getByIdFood(id);

      if(!deleteEntity){
          console.log("There isn't a food with this id");
          return;
      }
      return await deleteEntity.destroy();
}

async function getFoodByUserId(id){
    return await Food.findAll({
        where:{
            UserId:id
        }
    });
}


router.route('/user').post(async(req,res)=>{
    res.json(await createUser(req.body));
})

router.route('/user').get(async(req,res)=>{
    res.json(await getAllUsers());
})

router.route('/user/:id').get(async (req,res)=>{
    res.json(await getByIdUser(req.params.id));
})

router.route('/user/:id').put(async (req,res)=>{
    res.json(await updateUsers(req.params.id, req.body));
})

router.route('/user/:id').delete(async (req,res)=>{
    res.json(await deleteUser(req.params.id));
})



//------------------------------- FOOD --------------------------

router.route('/food').get(async(req,res)=>{
    res.json(await getFood());
})


router.route('/food').post(async(req,res)=>{
    res.json(await createFood(req.body));
})

router.route('/food/:id').get(async(req,res)=>{
    res.json(await getByIdFood(req.params.id))
})

router.route('/food/:id').put(async (req,res)=>{
    res.json(await updateFood(req.params.id,req.body));
})

router.route('/food/:id').delete(async(req,res)=>{
    res.json(await deleteFood(req.params.id));
})

router.route('/food/user/:id').get(async(req,res)=>{
    res.json(await getFoodByUserId(req.params.id));
})

 
let port = process.env.PORT || 8000;
app.listen(port);
console.log('API is runnning at ' + port);

