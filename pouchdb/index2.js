console.log('it starts here');
const db = new PouchDB('todos');
const remoteDb = new PouchDB('https://2b7598e3-17b6-49f3-bda0-312de422f952-bluemix.cloudant.com/todos');

//selectors
const button = document.getElementById('submit');
const input = document.getElementById('input');


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

db.info(function(err, info) {
  db.changes({
    since: info.update_seq,
    live: true
  }).on('change', (change) => {
    console.log(change)
  });
});

const sync = () => {
  db.sync(remoteDb,{
    live:true,
    retry:false
  })
  .on('change', change => {
    console.log(change)
  })
  .on('error', error => console.log(error))
}

button.addEventListener('click', async e => {
  e.preventDefault();
  try{
    const res =   await db.put({
      _id:uuidv4(),
      todo:input.value,
      isCompleted:false,
      time:Date.now()
    })
    input.value = ''
    console.log(res)
    const result = await db.allDocs({
      include_docs: true,
      attachments: true
    })
    if(remoteDb){
      sync();
    }
    console.log(result.rows)
  }
  catch(err){
    console.log(err)
  }
})
