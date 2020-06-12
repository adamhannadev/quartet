
var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    let filepath = `public/recordings/mixed/${req.user}/${req.filename}`;
    let filename = `${req.filename}`;
    console.log(filepath);
    res.download(filepath, (err) => {
        if (err) {
            console.log(err);
            return
        } else {
            console.log('Sucess')
        }
    })
});

module.exports = router;