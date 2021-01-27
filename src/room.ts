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

    const playerList = this.players.map((player) => player.username);
    this.io.to(this.gameID).emit('game-created', {
      gameID: this.gameID,
      players: playerList,
    });
    console.log(this.io.sockets.adapter.rooms);
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getID(): string {
    return this.gameID;
  }
}
