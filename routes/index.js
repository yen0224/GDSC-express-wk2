const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/todo');


router.get('/', async (req, res, next)=>{
  try{
    const todos = await Todo.find();
    res.render('index', { todos: todos });
  }catch(err){
    res.status(500).json({message: err.message});
  }
});

router.post('/create', express.json(),async (req, res, next) =>{
  console.log(req.body)
  const todo = new Todo({
    //這邊填入需要傳入 mongoDB 的資料
    _id: new mongoose.Types.ObjectId(),
    //我們需要從 req.body 中取得 title, description, due_date
    /*
    title: ...,
    description: ...,
    due_date: ...,
     */
  });
  //因傳輸資料為非同步，所以要用 await，並用 try catch 包起來，若有錯誤就會跳到 catch
  try{
    const newTodo = await todo.save();
    res.redirect('/');
  }catch(err){
    res.status(400).json({message: err.message});
  }
});
router.post('/update/:id', express.json(),async (req, res, next) =>{
  const id = req.params.id;
  const todo = {
    //我們需要從 req.body 中取得 title, description, due_date
    /*
    title: ...,
    description: ...,
    due_date: ...,
     */
  };
  try{
    const newTodo = await Todo.updateOne({_id: id}, todo);
    res.redirect('/');
  }catch(err){
    res.status(400).json({message: err.message});
  }
})
router.get('/delete/:id', (req, res, next) =>{
  const id = req.params.id;
  Todo.deleteOne({_id: id})
  .exec()
  .then(result => {
    console.log(result);
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
})
module.exports = router;
