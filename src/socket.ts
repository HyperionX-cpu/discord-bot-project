import { io } from 'socket.io-client';

const API_URL = window.DASHBOARD_CONFIG?.CLIENT_URL || window.DASHBOARD_CONFIG?.API_URL || '';

export const socket = io(API_URL || (typeof window !== 'undefined' ? window.location.origin : ''), {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 2000,
    withCredentials: true,
    transports: ['websocket', 'polling'],
    path: '/socket.io/'
});

let currentRoom: string | null = null;

socket.on('connect', () => {
    if (currentRoom) {
        socket.emit('join_ticket', currentRoom);
    }
});

socket.on('disconnect', (reason) => {
    if (reason === 'io server disconnect') {
        socket.connect();
    }
});

socket.on('connect_error', () => {
    // Gracefully handle disconnect
});

export const joinTicketRoom = (ticketId: string) => {
    currentRoom = ticketId;
    if (socket.connected) {
        socket.emit('join_ticket', ticketId);
    } else {
        socket.connect();
    }
};

export const leaveTicketRoom = (ticketId: string) => {
    if (currentRoom === ticketId) {
        currentRoom = null;
    }
    if (socket.connected) {
        socket.emit('leave_ticket', ticketId);
    }
};

export default socket;