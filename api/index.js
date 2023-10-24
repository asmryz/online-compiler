const router = require('express').Router();
const db = require('../models');

router.get('/codes', async(req, res)=>{
    const codes = await db.Code.find();
    res.status(200).json(codes);
});

module.exports = router;