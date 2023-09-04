const app = require("express")();
const {Server} =require("socket.io");
const PORT = process.env.PORT || 5000;
const io =new Server(PORT,{
	cors: true,
})

app.get('/', (req, res) => {
	res.send('Running');
});

io.on("connection", (socket) => {
	console.log("Socket connected",socket.id);
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

//app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));