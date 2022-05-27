declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PLAYLIST_SERVICE_ORIGIN: string;
        SOCKET_SERVICE_ORIGIN: string;
      }
    }
  }
export {};