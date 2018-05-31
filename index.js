const express = require('express');
const bodyParser = require('body-parser');
const NodeCouchDb = require('node-couchdb');
const db = require('pouchdb')
const path = require('path');
const {user,password} = require('./config/secret');




const couch = new NodeCouchDb({
  auth:{
    user:'tjdalsvndn9',
    password:"cj7600tu"
  }
});

const dbname = 'what';
const viewURL = '_design/view3/_view/fields'


couch.listDatabases()
.then(dbs => console.log(dbs))
.catch(err => console.log(err));


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',async (req,res) => {
    try{
      const {data, headers, status} = await couch.get(dbname,viewURL)
      console.log(headers,status)
      console.log(data.rows)
      res.render('index')
    }
    catch(err){
      res.status(404).send({message:err})
    }
})

app.post('/what/add', (req,res) => {
  couch.uniqid().then(ids => {
    const id = ids[0];
    couch.insert(dbname,{
      _id:id,
      name:req.body.name,
      email:req.body.email
    })
    .then(({data,status}) => {
      res.send(data)
    })
    .catch(err => res.status(404).send(err))
  });
})



app.listen(5000,() => console.log('listening'))
