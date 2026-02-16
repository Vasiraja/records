// import {io} from 'socket.io-client';

// import socketio from '@feathersjs/socketio-client';
// import { createClient } from './client';



// const socket = io('http://localhost:3030');

// const connection= socketio(socket);


// const app = createClient(connection);



// async function run() {
//   try {
//     console.log("----AUTHENTICATE----");

//     const logReq = await app.authenticate({
//       strategy: "local",
//       email: "vasiraja14122000@gmail.com",
//       password: "11112"
//     });
//     console.log("Login response:", logReq);

//     console.log("----REAUTHENTICATE----");

//     const reauthReq = await app.reAuthenticate();
//     console.log("Reauth response:", reauthReq);

//     console.log("----LOGOUT----");
//     await app.logout();
//     console.log("Logged out successfully");
//   } catch (err) {
//     console.error("Error during authentication flow:", err);
//   }
// }
// run();