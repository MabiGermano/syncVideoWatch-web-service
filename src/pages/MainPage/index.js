import { styled, useTheme } from "@mui/material/styles";
import YouTube from "react-youtube";

import { useState } from "react";

import socketIOClient from "socket.io-client";
import "./style.css";

import {
  Button,
  Grid,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Slider,
  IconButton,
  Typography,
  ListItemButton,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./style.css";
import {
  Add,
  FastForwardRounded,
  FastRewindRounded,
  LinkRounded,
  PauseRounded,
  PlayArrowRounded,
} from "@material-ui/icons";

const ENDPOINT = "http://localhost:3333";
const socket = socketIOClient(ENDPOINT);

function MainPage() {
  const [doJump, setDoJump] = useState(false);
  const [progressBar, setProgressBar] = useState({
    max: 0,
    value: 0,
  });

  const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

  const [videoUrl, setVideoUrl] = useState("");

  function buildServiceParams() {
    return {
      socket: socket,
      progressBar: progressBar,
      setProgressBar: setProgressBar,
      doJump: doJump,
      setDoJump: setDoJump,
    };
  }

  const users = [
    { name: "Mabi" },
    { name: "User 1" },
    { name: "User 2" },
    { name: "User 3" },
    { name: "User 4" },
  ];

  function getPlaylist() {
    return [
      {
        id: "1",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "2",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "3",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "4",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "5",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "6",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "7",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "8",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "8",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "8",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "8",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
      {
        id: "8",
        title: "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
        author_name: "DisneyMusicVEVO",
        author_url: "https://www.youtube.com/user/DisneyMusicVEVO",
        provider_url: "https://www.youtube.com/",
        thumbnail_url: "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
        video_code: " 79DijItQXMM",
      },
    ];
  }

  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = useState(32);
  const [paused, setPaused] = useState(false);
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  return (
    <>
      <Box id="main-page">
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
                    {users.map((item) => {
                      return <ListItem>{item.name}</ListItem>;
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
                    videoId="79DijItQXMM"
                    opts={{
                      // width: (window.innerWidth * 65.5) / 100,
                      // height: (window.innerHeight * 65.5) / 100,
                      playerVars: { controls: 0 },
                    }}
                  />
                </Grid>

                <Grid item xs={1.3} id="player-control" className="panel">
                  <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={(_, value) => setPosition(value)}
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
                    <IconButton aria-label="previous song">
                      <FastRewindRounded
                        fontSize="large"
                        htmlColor={mainIconColor}
                      />
                    </IconButton>
                    <IconButton
                      aria-label={paused ? "play" : "pause"}
                      onClick={() => setPaused(!paused)}
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
                    <IconButton aria-label="next song">
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
                  >
                    <Grid item xs={10}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Insert a video url..."
                        color="primary"
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
                      {getPlaylist().map((video) => {
                        return <ListItemButton>{video.title}</ListItemButton>;
                      })}
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MainPage;
