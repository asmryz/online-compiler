const db = require('./models');

db.Code.find({}, '-_id filename').then(res => console.log(JSON.stringify(res, null, 4)));