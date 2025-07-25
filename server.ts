import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 8000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

app.prepare().then(() => {
	const httpServer = createServer(handler);

	const io = new Server(httpServer);

	io.on("connection", (socket) => {
		console.log("Socket connected", socket.id);

		socket.on("room:join", (data) => {
			const { email, room } = data;
			emailToSocketIdMap.set(email, socket.id);
			socketidToEmailMap.set(socket.id, email);
			io.to(room).emit("user:joined", { email, id: socket.id });
			socket.join(room);
			io.to(socket.id).emit("room:join", data);
		});
	});

	httpServer
		.once("error", (err) => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`> Ready on http://${hostname}:${port}`);
		});
});
