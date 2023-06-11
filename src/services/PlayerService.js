import { PlayerEvents } from "../utils/YouTubeEventsEnum";
import { jumpVideo } from "./ControlsService";
import {
  setTune,
  updatePlaylist,
  updatePlayerVideo,
} from "../controllers/SocketController";

let _player;

export function Player() {
  return _player
};


export function onReadyEvent(event, serviceParams) {
  const { progressBar, socket, roomId } = serviceParams;
  _player = event.target;
  progressBar.setDuration(_player.getDuration());
  jumpVideo(progressBar.value, socket, roomId);
  setTune(_player, serviceParams);
  updatePlaylist(serviceParams);
  updatePlayerVideo(serviceParams);
}

export function onPlayerStateChange(event, serviceParams) {
  const { socket, doJump, roomId, paused } = serviceParams;
  _player = event.target;

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
