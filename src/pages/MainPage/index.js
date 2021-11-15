
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import YouTube from "react-youtube";

import { useState } from "react";

import Typography from '@mui/material/Typography';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';

import socketIOClient from "socket.io-client";
import "./style.css";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid, IconButton, ImageListItem, List, ListItem, ListItemButton, ListItemText, Slider, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const ENDPOINT = "http://localhost:3333";
const socket = socketIOClient(ENDPOINT);

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function MainPage() {
  const [doJump, setDoJump] = useState(false);
  const [progressBar, setProgressBar] = useState({
    max: 0,
    value: 0,
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

  function getPlaylist() {
    return [{
      "id": "1",
      "title": "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
      "author_name": "DisneyMusicVEVO",
      "author_url": "https://www.youtube.com/user/DisneyMusicVEVO",
      "provider_url": "https://www.youtube.com/",
      "thumbnail_url": "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
      "video_code": " 79DijItQXMM"
    }, {
      "id": "2",
      "title": "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
      "author_name": "DisneyMusicVEVO",
      "author_url": "https://www.youtube.com/user/DisneyMusicVEVO",
      "provider_url": "https://www.youtube.com/",
      "thumbnail_url": "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
      "video_code": " 79DijItQXMM"
    }, {
      "id": "3",
      "title": "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
      "author_name": "DisneyMusicVEVO",
      "author_url": "https://www.youtube.com/user/DisneyMusicVEVO",
      "provider_url": "https://www.youtube.com/",
      "thumbnail_url": "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
      "video_code": " 79DijItQXMM"
    }, {
      "id": "4",
      "title": "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
      "author_name": "DisneyMusicVEVO",
      "author_url": "https://www.youtube.com/user/DisneyMusicVEVO",
      "provider_url": "https://www.youtube.com/",
      "thumbnail_url": "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
      "video_code": " 79DijItQXMM"
    }, {
      "id": "5",
      "title": "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
      "author_name": "DisneyMusicVEVO",
      "author_url": "https://www.youtube.com/user/DisneyMusicVEVO",
      "provider_url": "https://www.youtube.com/",
      "thumbnail_url": "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
      "video_code": " 79DijItQXMM"
    }, {
      "id": "6",
      "title": "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
      "author_name": "DisneyMusicVEVO",
      "author_url": "https://www.youtube.com/user/DisneyMusicVEVO",
      "provider_url": "https://www.youtube.com/",
      "thumbnail_url": "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
      "video_code": " 79DijItQXMM"
    }, {
      "id": "7",
      "title": "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
      "author_name": "DisneyMusicVEVO",
      "author_url": "https://www.youtube.com/user/DisneyMusicVEVO",
      "provider_url": "https://www.youtube.com/",
      "thumbnail_url": "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
      "video_code": " 79DijItQXMM"
    }, {
      "id": "8",
      "title": "Dwayne Johnson - You're Welcome (from Moana/Official Video)",
      "author_name": "DisneyMusicVEVO",
      "author_url": "https://www.youtube.com/user/DisneyMusicVEVO",
      "provider_url": "https://www.youtube.com/",
      "thumbnail_url": "https://i.ytimg.com/vi/79DijItQXMM/hqdefault.jpg",
      "video_code": " 79DijItQXMM"
    }]
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
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  return (
    <>
      <Box id="main-page">
        <Grid container spacing={0.5} className="full-height">
          <Grid item xs={4} className="full-height">
            <nav>
              <List 
              sx={{
                height: '100%',
                bgcolor: 'background.paper',
                overflowY: 'auto',
                '& ul': { padding: 0 }
              }} className="playlist-queue">
                {getPlaylist().map(video => {
                  return (
                    <ListItemButton
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        overflow: 'hidden',
                        fontWeight: 'bold',
                      }}>
                      <Box
                        component="img"
                        sx={{
                          height: 233,
                          width: 350,
                          maxHeight: { xs: 200, md: 120 },
                          maxWidth: { xs: 300, md: 180 },
                        }}
                        alt="The house from the offer."
                        src={video.thumbnail_url}
                      />

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: { xs: 'center', md: 'flex-start' },
                          m: 3,
                          minWidth: { md: 350 },
                        }}
                      >
                        <ListItemText primary={video.title} sx={{
                          textOverflow: 'ellipsis'
                        }} />

                        <Link to={video.author_url}>
                          <ListItemText primary={video.author_name} />
                        </Link>
                      </Box>

                    </ListItemButton>
                  )
                })}
              </List>
            </nav>
          </Grid>

          <Grid item xs={8}>
            <Box>
              <Box  sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                <YouTube
                  containerClassName="video-container"
                  videoId="79DijItQXMM"
                  opts={{
                    // width: (window.innerWidth * 65.5) / 100,
                    // height: (window.innerHeight * 65.5) / 100,
                    playerVars: { controls: 0 },
                  }}
                />
              </Box>


              <Slider
                aria-label="time-indicator"
                size="small"
                value={position}
                min={0}
                step={1}
                max={duration}
                onChange={(_, value) => setPosition(value)}
                sx={{
                  color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                  height: 4,
                  '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    '&:before': {
                      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                        ? 'rgb(255 255 255 / 16%)'
                        : 'rgb(0 0 0 / 16%)'
                        }`,
                    },
                    '&.Mui-active': {
                      width: 20,
                      height: 20,
                    },
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.28,
                  },
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: -2,
                }}
              >
                <TinyText>{formatDuration(position)}</TinyText>
                <TinyText>-{formatDuration(duration - position)}</TinyText>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: -1,
                }}
              >
                <IconButton aria-label="previous song">
                  <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                </IconButton>
                <IconButton
                  aria-label={paused ? 'play' : 'pause'}
                  onClick={() => setPaused(!paused)}
                >
                  {paused ? (
                    <PlayArrowRounded
                      sx={{ fontSize: '3rem' }}
                      htmlColor={mainIconColor}
                    />
                  ) : (
                    <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                  )}
                </IconButton>
                <IconButton aria-label="next song">
                  <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MainPage;
