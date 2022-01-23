import { styled, useTheme } from "@mui/material/styles";
import YouTube from "react-youtube";

import { useState } from "react";
import { Redirect, useParams } from "react-router-dom";

import api from "../../services/api";
import socketIOClient from "socket.io-client";
import "./style.css";

import {
  Button,
  Grid,
  Box,
  Divider,
  List,
  ListItem,
  Slider,
  IconButton,
  Typography,
  ListItemButton,
  TextField,
} from "@mui/material";

import "./style.css";
import {
  Add,
  FastForwardRounded,
  FastRewindRounded,
  LinkRounded,
  PauseRounded,
  PlayArrowRounded,
} from "@material-ui/icons";
import {
  onReadyEvent,
  onPlayerStateChange,
  player,
} from "../../services/PlayerService";
import { playPauseActions, jumpVideo, nextVideo, previousVideo } from "../../services/ControlsService";
import { useEffect } from "react";

const ENDPOINT = "http://127.0.0.1:3333";

function MainPage() {
  const { roomId } = useParams();
  const [doJump, setDoJump] = useState(false);

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(true);
  const [users, setUsers] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [currentPlaying, setCurrentPlaying] = useState(0);
  const [socket, setSocket] = useState({});

  

  
  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT, { query: { id: roomId } }));
    
    api.get(`room/${roomId}`).then((response) => {
      const room = response.data;
      console.log("Room: ", room);
      setUsers(room.users);
      setPlaylist(room.playlist);
      setCurrentPlaying(room.playlist.currentPlaying)
      console.log("playlist", playlist);

      console.log("room: ", response.data);
    });
    // eslint-disable-next-line
  }, []);

  function buildServiceParams() {
    return {
      roomId: roomId,
      socket: socket,
      progressBar: {
        value: position,
        update: setPosition,
        setDuration: setDuration,
      },
      paused: { value: paused, update: setPaused, current: getPaused },
      doJump: { value: doJump, update: setDoJump },
      setPlaylist,
      setCurrentPlaying
    };
  }

  function getPaused () {
    console.log("get paused", paused);
    return paused;
  }

  const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

  const theme = useTheme();
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = parseInt(value - minute * 60);
    return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  async function handleNewVideo(event) {
    console.log("fron video url:", videoUrl);
    event.preventDefault();
    const response = await api.post(`video/${roomId}`, { videoUrl });
    console.log(response.data);
  }

  if (!localStorage.getItem("uuid"))
    return <Redirect to={{ pathname: "/", state: { roomId } }} />;
  
  return (
      <Box id="main-content">
        <Grid container spacing={0.5}>
          <Grid item xs={2}>
            <Box id="publishing-area"></Box>
          </Grid>
          <Grid item xs={10}>
            <Grid component="main" justifyContent="space-around" container>
              <Grid item xs={3.6} container direction="column">
                <Grid item xs={1.5}>
                  <Button id="invite-button" variant="contained" sx={{ mt: 1 }}>
                    Invite
                    <LinkRounded />
                  </Button>
                </Grid>

                <Grid item xs={10.3} id="users-panel" className="panel">
                  <h1>Users</h1>
                  <Divider variant="middle" />
                  <List>
                    {users.length &&
                      users.map((item) => {
                        return <ListItem className={item.identifier === localStorage.getItem("uuid") ? "focus-item" : "default-item"} >{item.nickname}</ListItem>;
                      })}
                  </List>
                </Grid>
              </Grid>

              <Grid
                item
                xs={8}
                container
                direction="column"
                justifyContent="space-around"
              >
                <Grid
                  item
                  xs={5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 1,
                  }}
                  id="stage-video"
                >
                  <YouTube
                    containerClassName="video-container"
                    // videoId={currentPlaying != '' ? currentPlaying : "sOkKSnqJPYY"}
                    videoId={currentPlaying}
                    opts={{
                      // width: (window.innerWidth * 65.5) / 100,
                      // height: (window.innerHeight * 65.5) / 100,
                      playerVars: { controls: 0 },
                    }}
                    onReady={(event) =>
                      onReadyEvent(event, buildServiceParams())
                    }
                    onStateChange={(event) =>
                      onPlayerStateChange(event, buildServiceParams())
                    }
                  />
                </Grid>

                <Grid item xs={1.3} id="player-control" className="panel">
                  <Slider
                    id="progress-bar"
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={(_, value) =>
                      jumpVideo(player, value, setPosition, socket, roomId)
                    }
                    sx={{
                      color: "#5E3480",
                      height: 4,
                      "& .MuiSlider-thumb": {
                        width: 8,
                        height: 8,
                        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&:before": {
                          boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                        },
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: `0px 0px 0px 8px rgb(94, 52, 128)`,
                        },
                        "&.Mui-active": {
                          width: 20,
                          height: 20,
                        },
                      },
                      "& .MuiSlider-rail": {
                        opacity: 0.28,
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: -2,
                    }}
                  >
                    <TinyText>{formatDuration(position)}</TinyText>
                    <TinyText>-{formatDuration(duration - position)}</TinyText>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: -1,
                    }}
                  >
                    <IconButton aria-label="previous song" onClick={(_) => previousVideo(socket, roomId)}>
                      <FastRewindRounded
                        fontSize="large"
                        htmlColor={mainIconColor}
                      />
                    </IconButton>
                    <IconButton
                      id="play-pause"
                      aria-label={paused ? "play" : "pause"}
                      onClick={(e) => playPauseActions(paused, setPaused)}
                    >
                      {paused ? (
                        <PlayArrowRounded
                          className="play-pause-icon"
                          htmlColor={mainIconColor}
                        />
                      ) : (
                        <PauseRounded
                          className="play-pause-icon"
                          htmlColor={mainIconColor}
                        />
                      )}
                    </IconButton>
                    <IconButton aria-label="next song" onClick={(_) => nextVideo(socket, roomId)}>
                      <FastForwardRounded
                        fontSize="large"
                        htmlColor={mainIconColor}
                      />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={5} className="panel" id="playlist">
                  <Box
                    component="form"
                    sx={{ display: "flex", mt: 1 }}
                    justifyContent="space-evenly"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleNewVideo}
                  >
                    <Grid item xs={10}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Insert a video url..."
                        color="primary"
                        onChange={(e) => setVideoUrl(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{ display: "flex", alignContent: "center" }}
                    >
                      <Button variant="contained" type="submit">
                        <Add />
                      </Button>
                    </Grid>
                  </Box>
                  <Box>
                    <List>
                      {playlist.videos
                        ? playlist.videos.map((video) => {
                            return (
                              <ListItemButton>{video.title}</ListItemButton>
                            );
                          })
                        : "Empty playlist"}
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
  );
}

export default MainPage;
