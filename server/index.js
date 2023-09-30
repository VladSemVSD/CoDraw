const express = require("express");
const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();

const PORT = process.env.PORT || "5000";

app.ws("/", (ws, req) => {
  ws.send("you have connected");
  ws.on("message", (msg) => {
    const msgObject = JSON.parse(msg);
    switch (msgObject.method) {
      case "connection":
        connectionHandler(ws, msgObject);
      case "draw":
        broadcastConnection(ws, msg);
        break;
    }
  });
});

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));

const connectionHandler = (ws, message) => {
  console.log(message);
  ws.id = message.id;
  broadcastConnection(ws, message);
};

const broadcastConnection = (ws, message) => {
  aWss.clients.forEach((client) => {
    if (client.id === message.id) {
      client.send(message);
    }
  });
};
