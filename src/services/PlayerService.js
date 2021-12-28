import { PlayerEvents } from "../utils/YouTubeEventsEnum";
import { jumpVideo } from "./ControlsService";
import { setTune } from "../controllers/SocketController";


export function onReadyEvent(event, serviceParams) {
  const { progressBar, doJump, paused, socket } = serviceParams;

  player =  event.target
  
  progressBar.setDuration(player.getDuration());
  
  // resizeVideoByScreen(playerInstance.getIframe());
  jumpVideo(event, progressBar.value, progressBar.update, socket)
  setTune(player, paused, socket);
}

export function onPlayerStateChange(event, serviceParams) {
    const { socket, doJump } = serviceParams;

    console.log("entrou state change");
    if (doJump.value) doJump.update(false);
    
    socket.emit("PlayerAction", {
        eventStatus: doJump.value ? PlayerEvents.JUMPED : event.data,
        time: event.target.getCurrentTime(),
    });
}

// export function addToQueue(id) {
    //     console.log(playerInstance);
    
    //     playerInstance.loadVideoById(id);
    // }
    
    export function lazyPlayerInstance(playerInstance) {
        return function () {
            return playerInstance;
        };
    }
    
    function resizeVideoByScreen(iframe) {
        window.addEventListener("resize", () => {
            const player = document.querySelector("#player");
            iframe.width = player.offsetWidth;
            iframe.height = (window.innerHeight * 75) / 100;
        });
    }
    
    export let player;