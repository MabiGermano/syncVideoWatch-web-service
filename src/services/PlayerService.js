import { PlayerEvents } from "../utils/YouTubeEventsEnum";
import { jumpVideo } from "./ControlsService";
import { setTune, updatePlaylist } from "../controllers/SocketController";

export let player;

export function onReadyEvent(event, serviceParams) {
  const { progressBar, paused, setPlaylist, socket, roomId } = serviceParams;

   player =  event.target
  
  progressBar.setDuration(player.getDuration());
  
  // resizeVideoByScreen(playerInstance.getIframe());
  jumpVideo(player, progressBar.value, progressBar.update, socket, roomId)
  setTune(player, paused, socket);
  updatePlaylist(setPlaylist, socket);
}

export function onPlayerStateChange(event, serviceParams) {
    const { socket, doJump, roomId } = serviceParams;

    console.log("entrou state change");
    if (doJump.value) doJump.update(false);
    
    socket.emit("PlayerAction", {
        roomId,
        action: {
        eventStatus: doJump.value ? PlayerEvents.JUMPED : event.data,
        time: event.target.getCurrentTime(),
    }});
}
    export function lazyPlayerInstance(playerInstance) {
        return function () {
            return playerInstance;
        };
    }
    
    // function resizeVideoByScreen(iframe) {
    //     window.addEventListener("resize", () => {
    //         const player = document.querySelector("#player");
    //         iframe.width = player.offsetWidth;
    //         iframe.height = (window.innerHeight * 75) / 100;
    //     });
    // }
