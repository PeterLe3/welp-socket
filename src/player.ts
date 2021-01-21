import socketio from 'socket.io';

export default class Player {
  id: string;
  socket: socketio.Socket;
  username: string;
  constructor(id: string, socket: socketio.Socket, username: string) {
    this.id = id;
    this.socket = socket;
    this.username = username;
  }
  describe() {
    return { id: this.id, username: this.username };
  }
}
