import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRoutes.js';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import secret from './config.js';
import * as dotenv from 'dotenv';
dotenv.config();

const host = 'localhost';
const port = process.env.PORT || 7000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/client/build'));

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', ['*']);
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Private-Network', 'true');
    next();
});

app.use('/auth', authRouter);

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    cookie: true,
});

io.on('connection', async (socket) => {
    socket.on('auth', (token) => {
        jwt.verify(token, secret.secret, (err, decode) => {
            if (err) {
                console.log(err);
            } else {
                console.log(connections);
            }
        });
    });

    const connections = [];

    const username = socket.handshake.auth.username;
    socket.username = username;

    for (let [id, socket] of io.of('/').sockets) {
        connections.push({
            userID: id,
            username: socket.username,
        });
    }

    io.emit('users', connections);

    console.log(connections);

    socket.on('send message', (data) => {
        io.to([data.to, socket.id]).emit('response msg', data);
        console.log(data);
    });

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket.id), 1);
        console.log(`disconnect id: ${socket.id}`);
    });
});

async function startApp() {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/`);
        server.listen(port, server, () => {
            console.log(`Server listens http://${host}:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startApp();
