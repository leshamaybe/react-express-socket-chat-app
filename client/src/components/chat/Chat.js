import React from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatFooter } from './ChatFooter';
import { ChatMessages } from './ChatMessages';

export const Chat = ({ currentChat }) => {
    return (
        <div className="chat-box">
            <ChatHeader currentChat={currentChat} />
            <ChatMessages currentChat={currentChat} />
            <ChatFooter currentChat={currentChat} />
        </div>
    );
};
