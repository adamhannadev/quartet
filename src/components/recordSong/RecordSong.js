import React from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
const audioType = 'audio/mp3';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

class RecordSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            audios: [],
        };
    }

    async componentDidMount() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // show it to user
        this.audio.srcObject = stream;
        this.audio.play();
        // init recording
        this.mediaRecorder = new MediaRecorder(stream);
        // init data storage for video chunks
        this.chunks = [];
        // listen for data from media recorder
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };
    }

    startRecording(e) {
        e.preventDefault();
        // wipe old data chunks
        this.chunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({ recording: true });
    }

    stopRecording(e) {
        e.preventDefault();
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
        const audios = this.state.audios.concat([audioURL]);
        this.setState({ audios });
    }
    uploadAudio(audioURL) {

        axios.post(`http://localhost:8000/upload`, { files: { recording: audioURL }, songID: "morag", uid: "adam", partID: "alto" })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

    }
    deleteAudio(audioURL) {
        // filter out current videoURL from the list of saved videos
        const audios = this.state.audios.filter(a => a !== audioURL);
        this.setState({ audios });
    }

    render() {
        const { recording, audios } = this.state;

        return (
          <Container>
            <CssBaseline />
            
            <Grid container justify="center">
            
              <Grid item sm={6}>
              <Typography variant="h3">Choose Role</Typography>
              <FormControl>
                <Select label="" value="" onChange="">
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
                      }}
                    >
                      <p>Audio stream not available. </p>
                    </audio>
                    <div>
                        {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
                        {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
                    </div>
                    <Button style={{marginTop: "2rem"}} variant="contained" color="primary">Save</Button>
                    <div>
                        <h3>Recorded audios:</h3>
                        {audios.map((audioURL, i) => (
                            <div key={`audio_${i}`}>
                                <audio controls style={{ width: 200 }} src={audioURL} />
                                <div>
                                    <button onClick={() => this.deleteAudio(audioURL)}>Delete</button>
                                </div>
                                <div>
                                    <button onClick={() => this.uploadAudio(audioURL)}>Upload</button>
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
export default RecordSong