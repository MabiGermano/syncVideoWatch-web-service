import { player } from "./PlayerService";
import { PlayerEvents } from "../utils/YouTubeEventsEnum";

export function playPauseActions(paused, setPaused) {
  paused ? player.playVideo() : player.pauseVideo();
  setPaused(!paused.value);
}

export function syncTimePlaying(setIntervalID, setPosition) {
  setInterval(() => {
      setIntervalID(setPosition(player.getCurrentTime()));
    }, 1000);
}

export function syncTimePaused(intervalID) {
  clearInterval(intervalID);
}

export function jumpVideo(player, value, socket, roomId) {
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