import React from 'react';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:7000/', {
    auth: {
        username: localStorage.getItem('username'),
    },
});
export const SocketContext = React.createContext();
