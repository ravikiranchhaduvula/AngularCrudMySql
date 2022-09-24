const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

//Create instance of Express
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
  }));

//Database connection
const db = mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'root',
 database:'sampledb',
 port:3306}
);
//Check Database connection
db.connect((err)=>{
    if(err) {
        console.log(err);
    }
    console.log('Database Connected...');
})
//Get All data
app.get('/user',(req,res) =>{
    console.log('Get Users...');
    let qr ='select * from user';
    db.query(qr,(err,result)=>{
     if(err) {
        console.log('Error ',err);
     } if(result.length>0) {
        res.send({
            message:'All User Data',
            data:result
        })
     }
    }); 
});
//Get Single data
app.get('/user/:id',(req,res)=>{
  let gid = req.params.id;
  let qr = `select * from user where id= ${gid}`;
  db.query(qr,(err,result)=>{
    if(err) {
        console.log('Error ',err);
    } if(result.length>0) {
        res.send({
            message:'Single User Data',
            data:result
        })
    } else {
        res.send({
            message:'Data Not Found'
        })
    }
  });
});

//Create Data
app.post('/user',(req,res)=>{
  console.log('Posted Data',req.body);
  let id = req.body.id;
  let fullname = req.body.fullname;
  let email = req.body.email;
  let mobile = req.body.mobile;
  
  let qr = `insert into user(fullname,email,mobile)
            values ('${fullname}','${email}','${mobile}')`;
  db.query(qr,(err,result)=>{
    if(err) {
        console.log(err);
    }
        res.send({
            message:'Data Inserted'
        })
  });
});

//Update Data
app.put('/user/:id',(req,res)=>{
    console.log('Update Data',req.body);
    let id = req.params.id;
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let qr = `update user set fullname='${fullname}',email='${email}',mobile='${mobile}'
              where id=${id}`;
    db.query(qr,(err,result)=>{
        if(err) {
            console.log(err);
        }
        res.send({
            message:'Data Updated'
        })
    })
})
//Delete A record
app.delete('/user/:id',(req,res)=>{
 let qID = req.params.id;
 let qr = `delete from user where id='${qID}'`;
 db.query(qr,(err,result) => {
    if(err) {
     console.log(err);
    }
    res.send({
        message:'Data Deleted'
    });
 })
});
app.listen(3000,()=>{
    console.log("Server Running ...");
})