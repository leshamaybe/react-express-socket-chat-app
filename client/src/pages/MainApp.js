import { Navigation } from '../components/navigation/Navigation';
import { Chats } from '../components/chats/Chats';
import { Chat } from '../components/chat/Chat';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MainApp = () => {
    const navigate = useNavigate();
    const [currentChat, setCurrentChat] = useState({ username: '', userID: '', toSocket: '' });

    useEffect(() => {
        if (!localStorage.getItem('username')) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navigation />
            <Chats setCurrentChat={setCurrentChat} />
            <Chat currentChat={currentChat} />
        </>
    );
};
