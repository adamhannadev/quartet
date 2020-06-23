
var express = require('express');
const path = require('path');
var router = express.Router();


router.get('/:user/:filename', function (req, res) {
    res.sendFile(path.join(__dirname, `../public/recordings/mixed/${req.params.user}/${req.params.filename}.mp3`), (err) => {
        if (err) {
            console.log(err);
            return
        } else {
            console.log('Sucess')
        }
    })
});

module.exports = router;