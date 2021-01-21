import Restaurant from './restaurant';
import Player from './player';
import socketio from 'socket.io';

export default class Room {
  io: socketio.Server;
  socket: socketio.Socket;
  players: Player[];
  gameID: string;
  //leader: Player;
  restaurants: Restaurant[];
  gameStarted: boolean;

  constructor(io: socketio.Server, socket: socketio.Socket, gameID: string) {
    this.io = io;
    this.socket = socket;
    this.players = [];
    this.gameID = gameID;
    this.restaurants = [];
    //this.leader = ;
    this.gameStarted = false;
  }

  init(player: Player): void {
    //if (this.players.length === 0) this.leader = player;
    this.socket.join(this.gameID); //using socket#id of the user who creates the room
    this.players.push(player);

    this.io.to(this.gameID).emit('created', {
      msg: `${player.id} has created room ${this.gameID}`,
      //players: this.io.sockets.adapter.rooms,
    });

    console.log(this.io.sockets.adapter.rooms);
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  getPlayers(): Player[] {
    return this.players;
  }
}
