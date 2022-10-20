import { PlayerEvents } from "../utils/YouTubeEventsEnum";
import { jumpVideo } from "./ControlsService";
import {
  setTune,
  updatePlaylist,
  updatePlayerVideo,
} from "../controllers/SocketController";

export let player;

export function onReadyEvent(event, serviceParams) {
  const { progressBar, socket, roomId } = serviceParams;
  player = event.target;
  progressBar.setDuration(player.getDuration());
  jumpVideo(player, progressBar.value, socket, roomId);
  setTune(player, serviceParams);
  updatePlaylist(serviceParams);
  updatePlayerVideo(serviceParams);
}

export function onPlayerStateChange(event, serviceParams) {
  const { socket, doJump, roomId, paused } = serviceParams;

  console.log("entrou state change");
  if (doJump.value) doJump.update(false);

  if(event.data === PlayerEvents.PAUSED || paused)
  socket.emit("PlayerAction", {
    roomId,
    action: {
      eventStatus: doJump.value ? PlayerEvents.JUMPED : event.data,
      time: event.target.getCurrentTime(),
    },
  });
}
export function lazyPlayerInstance(playerInstance) {
  return function () {
    return playerInstance;
  };
}
