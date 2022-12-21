import React, { useEffect, useState, useContext } from 'react';
import { ChatsHeader } from './ChatsHeader';
import { SocketContext } from '../../context/socketContext';

const ChatsList = ({ setCurrentChat }) => {
    const socket = useContext(SocketContext);
    const [usersFromServer, setUsersFromServer] = useState([]);

    useEffect(() => {
        socket.on('users', (data) => {
            data.forEach((user) => {
                user.self = user.userID === socket.id;
            });
            setUsersFromServer(data);
        });
    }, [socket]);

    const handleChosenUser = (username, userID) => {
        setCurrentChat({ username: username, userID: userID });
    };

    return (
        <ul className="chats-list">
            {usersFromServer.map((user, i) => (
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
