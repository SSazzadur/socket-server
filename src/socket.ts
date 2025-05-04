import type { Socket } from "socket.io";

interface ProjectEvent {
	projectId: string;
	type: string;
	payload: any;
}

export function registerSocketHandlers(socket: Socket) {
	// Join a project room
	socket.on("join_project", ({ projectId }: { projectId: string }) => {
		socket.join(projectId);
		console.log(`🔗 ${socket.id} joined project ${projectId}`);
	});

	// Receive and broadcast a generic event
	socket.on("event", ({ projectId, type, payload }: ProjectEvent) => {
		console.log(`📨 Event received for ${projectId}:`, type);
		socket.to(projectId).emit("event", { type, payload });
	});

	// Optional: log disconnects
	socket.on("disconnect", () => {
		console.log(`🔴 Client disconnected: ${socket.id}`);
	});
}
