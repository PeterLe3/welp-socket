import express, {Request, Response} from "express"
import {Server} from "http"
import socketio from "socket.io"
import bodyParser from "body-parser"

const app = express();
const server = new Server(app);
const io = new socketio.Server(server);
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("TS App is Running");
})

server.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
})

io.on('connect',(socket:socketio.Socket) => {
    console.log('User established a connection.');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

})