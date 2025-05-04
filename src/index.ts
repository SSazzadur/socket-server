import express from "express";
import http from "http";
import { Server } from "socket.io";
import { registerSocketHandlers } from "./socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*", // ⚠️ For dev only — configure properly in prod
	},
});

io.on("connection", socket => {
	console.log(`🟢 Client connected: ${socket.id}`);
	registerSocketHandlers(socket);
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`🚀 Socket server running on http://localhost:${PORT}`);
});
