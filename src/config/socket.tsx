"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

// Define the context type
type SocketContextType = {
	socket: Socket | null;
	isConnected: boolean;
};

// Create context with undefined as default
const SocketContext = createContext<SocketContextType | null>(null);

// Hook to use the socket context
export const useSocket = () => {
	const context = useContext(SocketContext);
	if (context === null) {
		throw new Error("useSocket must be used within a SocketProvider");
	}
	return context;
};

// Provider component props
interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		// Create socket connection
		const socketInstance = io("http://localhost:8000", {
			transports: ["websocket", "polling"], // Fallback transports
		});

		// Connection event handlers
		socketInstance.on("connect", () => {
			console.log("Socket connected:", socketInstance.id);
			setIsConnected(true);
		});

		socketInstance.on("disconnect", () => {
			console.log("Socket disconnected");
			setIsConnected(false);
		});

		socketInstance.on("connect_error", (error) => {
			console.error("Socket connection error:", error);
			setIsConnected(false);
		});

		setSocket(socketInstance);

		// Cleanup function
		return () => {
			socketInstance.disconnect();
		};
	}, []);

	const value = {
		socket,
		isConnected,
	};

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};
