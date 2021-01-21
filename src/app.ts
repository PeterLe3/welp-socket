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

  socket.on('create', (gameID: string) => {
    const player = new Player(socket.id, socket, 'player1');
    const room = new Room(io, socket, gameID);
    rooms[gameID] = room; //put inside the hash map
    room.init(player);
  });

  socket.on('join', (gameID) => {
    const player = new Player(socket.id, socket, 'player2');
    socket.join(gameID);
    rooms[gameID].addPlayer(player);
    let players: Player[] = rooms[gameID].getPlayers();
    io.to(gameID).emit('player-joined', {
      msg: `${player.id} has joined room ${gameID}`,
    });
    players.forEach((player) => {
      console.log(player.username);
    });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} has disconnected`);
  });
});
