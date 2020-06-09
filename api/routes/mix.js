var express = require('express');
var router = express.Router();
const { exec } = require("child_process");

router.post('/', function (req, res, next) {

    let recordings = req.body.recordings;
    let songID = req.body.songID;
    let user = req.body.mixer;
    console.log(user);
    let paths = [];
    let currentTime = Date.now();
    let mixedFile = `${songID}-${currentTime}-${user}.mp3`;
    // Get the routes to the source files
    for (let i = 0; i < recordings.length; i++) {
        let rec = recordings[i];
        paths.push(`public/recordings/${songID}/${rec.partID}/${rec.uid}-${songID}-${rec.partID}.mp3`);
    };
    let p = paths.join(" ").replace(/,/g, ' ');
    // Ensure that we are in the api directory
    exec(`
    cd $(npm root) && cd .. &&
    echo "Move into api directory." && pwd &&
    mkdir -pv public/recordings/tmp &&
    echo "Make the the tmp directory." &&

    echo ${p}
    for n in ${p}
do
cp $n public/recordings/tmp
done
    cd public/recordings/tmp &&
    sox -m *.mp3 ${songID}-${currentTime}-${user}.mp3 &&
    echo "Mixing files into one mixed file." &&
    mkdir -pv ../mixed/${user} && mv ${mixedFile} ../mixed/${user} &&
    echo "Moving mixed file into ../mixed/${user}." &&
    rm * && cd $(npm root) && cd .. && pwd &&
    echo "Deleting temporary source files and moving into api directory."
    `, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    res.json({ "url": `/recordings/mixed/${user}/${mixedFile}`, "uid": `${user}` });
});

module.exports = router;

// api/public/midi /midi-files