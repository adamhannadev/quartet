const path = require('path');
const fs = require('fs');
var express = require('express');
var router = express.Router();


router.get('/:song/:part', function (req, res) {
    let song = req.params.song;
    let part = req.params.part;
    let recordings = [];
    const directoryPath = path.join(__dirname, `../public/recordings/${song}/${part}`);
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            recordings.push(`/recordings/${song}/${part}/${file}`);
        });
        res.json({ recordings });
    });
})

module.exports = router;
