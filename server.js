
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const {User} = require('./models/user');
const {Profile} = require('./models/profile');
const jwt = require('jsonwebtoken');
const {createUser, getAllUser, updateUser, deleteUser} = require('./services/user.services')

mongoose.connect('mongodb://127.0.0.1:27017/testGiuaKy').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error:', error);
})


//Em đọc không thấy bảo tạo link thêm profile nên em code chay nha :v

const createProfile = {
  userId : "65fb3e05034dddf2e062917d",
  skill : "Code rat gioi",
  hobbies : "Sleep ca ngay",
  target : "Dev"
}

app.get('/createProfileUser', async (req,res) => {
  await Profile.create(createProfile)
  res.json(createProfile)
})



//Chức năng đăng kí, em hiểu là z :v
app.post('/register', async (req,res) =>{
    const {email,name,dateOfBirth,address,nationality,pass} = req.body;
  
    const user = await User.create({
      email,
      name,
      dateOfBirth,
      address,
      nationality,
      pass
    })
  
    await user.save();
    res.json(user);
  
})



//Chức năng đăng nhập
app.post('/login', async (req,res) =>{
  const {username , password} = req.body;
  const findUser = await User.findOne({
    email : username,
    pass : password
  })

  const payload = {
    email : findUser.email,
    name : findUser.name,
    dateOfBirth : findUser.dateOfBirth,
    address : findUser.address,
    nationality : findUser.nationality,
    _id : findUser._id
  }

  if(findUser) {
    const token = jwt.sign(payload,'hphwng04',{expiresIn : '1d'})
    res.json({token})

  }else {
    res.json({message : "Loi roi"});
  }
})



//middleware kiểm tra phiên đăng nhập và tạo mã token
const tokenUse= (req,res,next) => {
  const tokenFromRequest = req.headers.authorization
  const token = tokenFromRequest.split(' ')[1];
  const payload = jwt.verify(token,'hphwng04');

  if(payload){
    req.payload = payload;
    next();
  }else {
    res.json({message : "Loi"})
  }
}











//---------------------------------------------CRUD CHO API-----------------

//get method
app.get("/", async (req, res) => {
  const users = await getAllUser();
  res.send(users);
});


//create user
app.post("/create-user", async (req, res) => {
  const newUser = await createUser(req.body);
  res.send(newUser);
});




//update user
app.put("/update-user",tokenUse, async (req, res) => {
 const payload = req.payload;
 if(payload){
  const update = await updateUser(payload._id,req.body);
console.log(req.body);
  res.send(update);
 }else {
  res.json({message : "Loi"})
 }
  
});


//delete user
app.delete("/delete-user",tokenUse, async (req, res) => {
  const payload = req.payload;
  if(payload) {
    const deleted = await deleteUser(id);
  res.send(deleted);
  }else {
    res.json({message : "Loi"})
  }
  
});






app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
