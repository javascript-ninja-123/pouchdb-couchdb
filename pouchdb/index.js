console.log('will work on pouchDB')


const db = new PouchDB('practice');

console.log('saved succesfully')

db.info()
.then(result => console.log(result))
.catch(err => console.log(err))

// db.destroy()
// .then(response => console.log(response))
// .catch(err => console.log(err))


// db.put({
//   _id:"1",
//   name:"Sungmin Yi",
//   age:23
// })
// .then(res => console.log(res))
// .catch(err => console.log(err))
//
// db.get('1')
// .then(doc => console.log(doc))
//
// db.get('1')
// .then(doc => (
//   db.put({
//     _id:'1',
//     _rev:doc._rev,
//     age:22
//   })
// ))
// .then(res => console.log(res))


// db.get('1')
// .then(doc => db.remove(doc))
// .then(res => console.log(res))
//
// db.get('1')
// .then(doc => console.log(doc))



// db.bulkDocs([
//   {title : 'Lisa Says', _id: '1'},
//   {title : 'Space Oddity', _id: '2'}
// ]).then(res => console.log(res))


db.allDocs({
  include_docs: true,
  attachments: true
}).then(res => console.log(res.rows))


// var attachment = new Blob(['Is there life on Mars?'], {type: 'text/plain'});
// db.putAttachment('3', 'att.txt', attachment, 'text/plain')
// .then(function (result) {
//   console.log(result)
// }).catch(function (err) {
//   console.log(err);
// });


db.getAttachment('3', 'att.txt').then(function (blobOrBuffer) {
  // handle result
  console.log(blobOrBuffer)
}).catch(function (err) {
  console.log(err);
});


const remotedb = 'http://127.0.0.1:5984/what';
db.replicate.to(remotedb)
.then(result => console.log(result))
