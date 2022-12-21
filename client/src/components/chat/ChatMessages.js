import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../../context/socketContext';
import { useHttp } from '../../hooks/http.hook';

export const ChatMessages = ({ currentChat }) => {
    const { request } = useHttp();
    const socket = useContext(SocketContext);
    const [newMessage, setNewMessage] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            const data = await request('http://localhost:7000/auth/getMessages', 'GET');
            let res = data.filter((el) => {
                return el.senderName === localStorage.getItem('username');
            });
        };

        getMessages();

        socket.on('response msg', (data) => {
            setNewMessage((state) => [
                ...state,
                {
                    text: data.text,
                    from: data.from,
                },
            ]);
        });
    }, [socket, request]);

    const message = newMessage.map((msg, i) => {
        const fromSelf = msg.from === localStorage.getItem('username');
        return (
            <div className={fromSelf ? 'message-item' : 'received-message-item'} key={i}>
                <div className={fromSelf ? 'message-sender' : 'received-message'}>{msg.text}</div>
            </div>
        );
    });

    return (
        <div className="chat-body">
            <div className="messages">{message}</div>
        </div>
    );
};
