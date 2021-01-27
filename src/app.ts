import express, { Request, Response } from 'express';
import { Server } from 'http';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import Player from './player';
import Room from './room';

const app = express();
const server = new Server(app);
const io = new socketio.Server(server);
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

interface Map {
  [gameID: string]: Room;
}
let rooms: Map = {};

io.on('connect', (socket: socketio.Socket) => {
  console.log(`${socket.id} established a connection`);

  socket.emit('connected', { id: socket.id });

  socket.on('create', (id: string) => {
    const player = new Player(socket.id, socket, 'temp name');
    const room = new Room(io, socket, id);
    rooms[id] = room; //put inside the hash map
    room.init(player);

    // io.to(socket.id).emit('created', {
    //   msg: `${player.id} has created room ${socket.id}`,
    //   //players: this.io.sockets.adapter.rooms,
    // });
    console.log('inside create listener');
  });

  socket.on('join', (gameID) => {
    const player = new Player(socket.id, socket, 'temp name');
    socket.join(gameID);
    if (!rooms[gameID]) {
      console.log('game not found');
    } else {
      console.log('joining game');
      rooms[gameID].addPlayer(player);

      io.to(gameID).emit('player-joined', {
        gameID: gameID,
      });
      console.log(io.sockets.adapter.rooms);
    }
    // let players: Player[] = rooms[gameID].getPlayers();
    // players.forEach((player) => {
    //   console.log(player.username);
    // });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} has disconnected`);
  });
});
