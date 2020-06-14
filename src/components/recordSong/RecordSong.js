import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const audioType = "audio/wav";

class RecSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: [],
      part: "",
      displayName: props.uid.replace(" ", "_"),
    };
    this.updatePart = this.updatePart.bind(this);
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // show it to user

    console.log(this.state.displayName);

    this.audio.srcObject = stream;
    // this.audio.play();
    // init recording
    this.mediaRecorder = new MediaRecorder(stream);
    // init data storage for video chunks
    this.chunks = [];
    console.log(this.props.location.state.song);
    this.bgAudio = new Audio(`/midi/${this.props.location.state.song.id}.mp3`);
    this.bgAudio.load();
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = (e) => {
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
    this.bgAudio.currentTime = 0;
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
  uploadAudio = (audio, song, displayName) => {
    console.log(`Blob is: - ${audio}`);
    var formData = new FormData();
    formData.append("recording", audio);
    formData.append("songID", song.id);

    formData.append("uid", displayName);

    formData.append("partID", this.state.part);
    axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    this.props.history.push("/clip-saved", {
      // Link to /details and pass in detailsObject as a prop, which contains item
    });
    var removing = browser.permissions.remove(
      { permissions: [microphone] }
    )
  };
  deleteAudio(audioURL) {
    // filter out current videoURL from the list of saved videos
    const audios = this.state.audios.filter((a) => a !== audioURL);
    this.setState({ audios });
  }
  updatePart(event) {
    this.setState({ part: event.target.value });
  }

  render() {
    const { match, location, history } = this.props;
    const { recording, audios, part } = this.state;
    const { song } = this.props.location.state;
    return (
      <Container>
        <CssBaseline />

        <Grid container justify="center">
          <Grid item sm={6}>
            <Typography variant="h3">Choose Role</Typography>
            <FormControl>
              <Select value={part} onChange={this.updatePart}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="soprano">Soprano</MenuItem>
                <MenuItem value="alto">Alto</MenuItem>
                <MenuItem value="tenor">Tenor</MenuItem>
                <MenuItem value="bass">Bass</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <Typography variant="h3">
              Record {part.charAt(0).toUpperCase() + part.slice(1)} Part
            </Typography>
            <Typography variant="h4">{song.title}</Typography>
            <div>
              <audio
                style={{ width: 400 }}
                ref={(a) => {
                  this.audio = a;
                }}
              >
                <p>Audio stream not available. </p>
              </audio>
              <div>
                {!recording && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => this.startRecording(e)}
                  >
                    Record
                  </Button>
                )}
                {recording && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => this.stopRecording(e)}
                  >
                    Stop
                  </Button>
                )}
              </div>
              {/* <Link to="/clip-saved">
                <Button
                  style={{ marginTop: "2rem" }}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Link> */}
              <div>
                <h3>Draft Recordings</h3>
                {audios.map((audio, i) => (
                  <div key={`audio_${i}`}>
                    <audio controls style={{ width: 200 }} src={audio.url} />
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.deleteAudio(audio)}
                      >
                        Delete
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "2rem" }}
                        onClick={() =>
                          this.uploadAudio(
                            audio.blob,
                            song,
                            this.state.displayName
                          )
                        }
                      >
                        Upload
                      </Button>
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
const RecordSong = withRouter(RecSong);
export default RecordSong;
