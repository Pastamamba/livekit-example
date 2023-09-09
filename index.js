// Initialize environment variables
require("dotenv").config(process.env.CONFIG ? { path: process.env.CONFIG } : {});

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { AccessToken } = require('livekit-server-sdk');
const cors = require("cors");


const { RoomServiceClient } = require('livekit-server-sdk');
const livekitHost = process.env.LIVEKIT_SERVER;

// Environment variable: PORT where the node server is listening
const SERVER_PORT = process.env.SERVER_PORT;
// Environment variable: api key shared with our LiveKit deployment
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
// Environment variable: api secret shared with our LiveKit deployment
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;

const svc = new RoomServiceClient(livekitHost, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);

// Initialize Express app
const app = express();

// Enable CORS support
app.use(
  cors({
    origin: "*",
  })
);

let server = http.createServer(app);

// Allow application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Allow application/json
app.use(bodyParser.json());

// Serve static resources if available
app.use(express.static(__dirname + '/public'));

// Serve application
server.listen(SERVER_PORT, () => {
  console.log("Application started on port: ", SERVER_PORT);
});

app.post('/token', (req, res) => {
  const roomName = req.body.roomName;
  const participantName = req.body.participantName;
  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, { identity: participantName });
  try {
    at.addGrant({ roomJoin: true, room: roomName });
  } catch (error) {
    console.error("Error adding grant:", error);
  }
  const token = at.toJwt();
  res.send(token);
});

app.get('/listRooms', (req, res) => {
  svc.listRooms()
      .then((rooms) => {
        const simplifiedRooms = rooms.map(room => ({
          roomName: room.name,
          numParticipants: room.numParticipants
        }));
        res.json(simplifiedRooms);
      })
      .catch((error) => {
        console.error("Error listing rooms:", error);
        res.status(500).send("Error listing rooms");
      });
});


process.on('uncaughtException', err => console.error(err));
