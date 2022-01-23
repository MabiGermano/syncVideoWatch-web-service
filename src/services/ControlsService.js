import { player } from "./PlayerService";
import { PlayerEvents } from "../utils/YouTubeEventsEnum";

export function playPauseActions(paused, setPaused) {
  paused ? player.playVideo() : player.pauseVideo();
  setPaused(!paused.value);
}

export function jumpVideo(player, value, setPosition, socket, roomId) {
  let intervalID;
  console.log(player);
  if (
    player.getPlayerState() === PlayerEvents.PLAYING ||
    player.getPlayerState() === PlayerEvents.CUED
  )
    setInterval(() => {
      intervalID = setPosition(player.getCurrentTime());
    }, 1000);
  else clearInterval(intervalID);

  player.seekTo(value);
  socket.emit("PlayerAction", {
    roomId,
    action: {
      eventStatus: PlayerEvents.JUMPED,
      time: value,
    },
  });
}

export function nextVideo(socket, roomId) {
  // Set next on this client
  socket.emit("NextVideo", { roomId });
}

export function previousVideo(socket, roomId) {
  // Set previous on this client
  socket.emit("PreviousVideo", { roomId });
}

export function playSpecificVideo(socket, roomId, playlist) {
  // Set previous on this client
  socket.emit("PlaySpecificVideo", { roomId, action: {playlist} });
}