import React, { useEffect, useState, useContext } from 'react';
import { ChatsHeader } from './ChatsHeader';
import { SocketContext } from '../../context/socketContext';
import { useHttp } from '../../hooks/http.hook';

const ChatsList = ({ setCurrentChat }) => {
    const socket = useContext(SocketContext);
    const [users, setUsers] = useState([]);
    const { request } = useHttp();

    useEffect(() => {
        // const getUsers = async () => {
        //     const data = await request('http://localhost:7000/auth/users/', 'GET');

        //     console.log(data);
        // };

        // getUsers();

        socket.on('users', (data) => {
            data.forEach((user) => {
                user.self = user.userID === socket.id;
            });
            setUsers(data);
        });
    }, [request, socket]);

    const handleChosenUser = (username, userID) => {
        setCurrentChat({ username: username, userID: userID });
    };


    return (
        <ul className="chats-list">
            {users.map((user, i) => (
                <button key={i} onClick={() => handleChosenUser(user.username, user.userID)}>
                    <span>
                        <img src="http://dummyimage.com/36" alt="" />
                    </span>
                    <h4>{user.username}</h4>
                </button>
            ))}
        </ul>
    );
};

export const Chats = ({ setCurrentChat }) => {
    return (
        <div className="chats-container">
            <ChatsHeader />
            <ChatsList setCurrentChat={setCurrentChat} />
        </div>
    );
};
