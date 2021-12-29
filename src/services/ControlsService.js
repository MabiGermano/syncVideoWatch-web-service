import { player } from "./PlayerService";
import { PlayerEvents } from "../utils/YouTubeEventsEnum";

export function playPauseActions(paused, setPaused) {
  paused ? player.playVideo() : player.pauseVideo();
  setPaused(!paused.value);
}

export function jumpVideo(_, value, setPosition, socket) {
  let intervalID;
  console.log(player.getPlayerState());
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
    eventStatus: PlayerEvents.JUMPED,
    time: value,
  });
}

// export function nextVideo() {
//     getPlayerInstance().nextVideo();
// }

// export function previousVideo() {
//     getPlayerInstance().previousVideo();
// }

// export function playVideoAt(index) {
//     getPlayerInstance().playVideoAt(index);
// }
