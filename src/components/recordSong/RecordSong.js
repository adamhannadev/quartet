import React from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
const audioType = 'audio/wav';

// const useStyles = makeStyles(theme => ({
//     paper: {
//         marginTop: theme.spacing(8),
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center"
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 200
//     },
//     selectEmpty: {
//         marginTop: theme.spacing(2)
//     }
// }));

class RecordSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            audios: []
        };
    }

    async componentDidMount() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // show it to user
        this.audio.srcObject = stream;
        // this.audio.play();
        // init recording
        this.mediaRecorder = new MediaRecorder(stream);
        // init data storage for video chunks
        this.chunks = [];
        this.bgAudio = new Audio('http://localhost:8000/midi/suas_leis.mp3');
        // listen for data from media recorder
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };
    }

    startRecording(e) {
        e.preventDefault();
        this.bgAudio.play();
        // wipe old data chunks
        this.chunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({ recording: true });
    }

    stopRecording(e) {
        e.preventDefault();
        this.bgAudio.pause();
        // stop the recorder
        this.mediaRecorder.stop();
        // say that we're not recording
        this.setState({ recording: false });
        // save the video to memory
        this.saveAudio();
    }

    saveAudio() {
        // convert saved chunks to blob
        const blob = new Blob(this.chunks, { type: audioType });
        // generate video url from blob
        const audioURL = window.URL.createObjectURL(blob);
        // append videoURL to list of saved videos for rendering
        const audios = this.state.audios.concat([{ url: audioURL, blob: blob }]);
        this.setState({ audios });
        console.log(audios);
    }
    uploadAudio(audio) {
        console.log(`Blob is: - ${audio}`);
        var formData = new FormData();
        formData.append("recording", audio);
        formData.append("songID", "morag");
        formData.append("uid", "adam");
        formData.append("partID", "alto");
        axios.post('http://localhost:8000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

    return (
      <Container>
        <CssBaseline />

        <Grid container justify="center">
          <Grid item sm={6}>
            <Typography variant="h3">Choose Role</Typography>
            <FormControl>
              <Select>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="">Birlinn</MenuItem>
                <MenuItem value="">Morag</MenuItem>
                <MenuItem value="">Uibhist</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <Typography variant="h3">Recording component</Typography>
            <div className="camera">
                <audio
                    style={{ width: 400 }}
                    ref={a => {
                        this.audio = a;
                    }}>
                    <p>Audio stream not available. </p>
                </audio>
                <div>
                    {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
                    {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
                </div>
                <div>
                    <h3>Recorded audios:</h3>
                    {audios.map((audio, i) => (
                        <div key={`audio_${i}`}>
                            <audio controls style={{ width: 200 }} src={audio.url} />
                            <div>
                                <button onClick={() => this.deleteAudio(audio)}>Delete</button>
                            </div>
                            <div>
                                <button onClick={() => this.uploadAudio(audio.blob)}>Upload</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default RecordSong;
