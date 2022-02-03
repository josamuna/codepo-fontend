// import config from './config';

// class WebSocketService {
//   static instance = null;

//   callbacks = {};

//   static getInstance() {
//     if (!WebSocketService.instance) {
//       WebSocketService.instance = new WebSocketService();
//     }
//     return WebSocketService.instance;
//   }

//   constructor() {
//     this.socketRef = null;
//     this.connect();
//   }

//   connect() {
//     const path = config.API_PATH;
//     this.socketRef = new WebSocket(path);
//     this.socketRef.onopen = () => {
//       console.log('WebSocket open');
//     };

//     this.socketRef.onmessage = (e) => {
//       this.socketNewMessage(e.data);
//     };

//     this.socketRef.onerror = (e) => {
//       console.log(e.message);
//     };
//     this.socketRef.onclose = () => {
//       console.log('WebSocket closed let\'s reopen');
//       this.connect();
//     };
//   }

//   socketNewMessage(data) {
//     const parsedData = JSON.parse(data);
//     console.log(parsedData);
//     const { command } = parsedData.command;
//     if (Object.keys(this.callbacks).length === 0) {
//       return;
//     }
//     if (command === 'messages') {
//       this.callbacks[command](parsedData.messages);
//     }
//   }

//   initMqttListen(username) {
//     this.sendMessage({ command: 'init_mqtt_listen', username });
//   }

//   fetchMessages(username) {
//     this.sendMessage({ command: 'fetch_messages', username });
//   }

//   addCallbacks(messagesCallback, newMessageCallback) {
//     this.callbacks.messages = messagesCallback;
//     this.callbacks.new_message = newMessageCallback;
//   }

//   sendMessage(data) {
//     try {
//       this.socketRef.send(JSON.stringify({ ...data }));
//     } catch (err) {
//       console.log(err.message);
//     }
//   }

//   state() {
//     return this.socketRef.readyState;
//   }

//   waitForSocketConnection(callback) {
//     const socket = this.socketRef;
//     const recursion = this.waitForSocketConnection;
//     setTimeout(() => {
//       if (socket.readyState === WebSocket.OPEN) {
//         console.log('Connection is made');
//         if (callback != null) {
//           callback();
//         }
//       } else {
//         console.log('wait for connection...');
//         recursion(callback);
//       }
//     }, 1); // wait 5 milisecond for the connection...
//   }
// }

// const WebSocketInstance = WebSocketService.getInstance();

// export default WebSocketInstance;
