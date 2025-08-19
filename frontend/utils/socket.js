import { io } from "socket.io-client";

const BASE_URL = "https://dashdevs.agency"; // prod
//const BASE_URL = "http://localhost:3000"; // dev

export const createSocketConnection = () => {
  return io(BASE_URL, {
    withCredentials: true,
  });
};
