const db = require('./models');

db.Code.find().then(res => console.log(JSON.stringify(res, null, 4)));