import axios from "axios";

export const getAllSongs = () => {
  return axios({
    url: "/midi-files",
    method: "get",
  });
};

export const getPartRecordings = (song, part) => {
  return axios({
    url: `/get-recording/${song}/${part}`,
    method: "get",
  });
};

export const triggerMix = (songID, mixer, recordings) => {
  return axios({
    url: `/mix/`,
    method: "post",
    data: {
      songID,
      mixer,
      recordings,
    },
  });
};
