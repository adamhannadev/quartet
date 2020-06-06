var express = require('express');
var router = express.Router();
const { exec } = require("child_process");

router.post('/', function (req, res, next) {

    let recordings = req.body.recordings;
    let songID = req.body.songID;
    let user = req.body.mixer;
    console.log(user);
    let paths = [];
    for (let i = 0; i < recordings.length; i++) {
        let rec = recordings[i];
        paths.push(`public/recordings/${songID}/${rec.partID}/${rec.uid}-${songID}-${rec.partID}.mp3`);
    }
    console.log(paths);
    // Send a request to /mix/{the song title from the record song page}
    // Change directories into the uploaded song files folder
    // Use the Sound Exchange library to mix all 4 parts into one part
    for (let i = 0; i < paths.length; i++) {
        let mvCmd = exec(`cp ${paths[i]} public/recordings/tmp`
            , (error, stdout, stderr) => {
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
        mvCmd.on('exit', function (code) {
            console.log('Child process exited with exit code ' + code);
        });
    }


    let currentTime = Date.now();
    let mixedFile = `${songID}-${currentTime}-${user}.mp3`;
    const mixCmd = exec(`
    set - e &&
    cd $(npm root) && cd .. && pwd &&
    cd ./public/recordings/tmp/ &&
    sox -m *.mp3 ${songID}-${currentTime}-${user}.mp3 &&
    DIR="../mixed/${user}"
    if [ -d "$DIR" ]; then
     mv  ${mixedFile} ../mixed/${user}
    else
     mkdir ../mixed/${user} && mv ${mixedFile} ../mixed/${user}
    fi
    
    rm * && cd $(npm root) && cd .. && pwd &&
    echo ${songID} - mixed.mp3 has been created.
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
    mixCmd.on('exit', function (code) {
        console.log('Child process exited with exit code ' + code);
    });
    res.json({ "url": `/recordings/mixed/${user}/${mixedFile}` });
});

module.exports = router;

// api/public/midi /midi-files