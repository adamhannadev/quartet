import axios from "axios";

export const getAllSongs = () => {
  return axios({
    url: "http://localhost:8000/midi-files",
    method: "get",
  });
};

export const getPartRecordings = (song, part) => {
  return axios({
    url: `http://localhost:8000/get-recording/${song}/${part}`,
    method: "get",
  });
};

export const triggerMix = (songID, mixer, recordings) => {
  return axios({
    url: `http://localhost:8000/mix/`,
    method: "post",
    data: {
      songID,
      mixer,
      recordings,
    },
  });
};
