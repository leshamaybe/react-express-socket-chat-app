import React from 'react';

export const ChatHeader = ({ currentChat }) => {
    return (
        <div className="chat-header">
            <div className="chat-header-user">
                <img className="chat-header-user-avatar" src="http://dummyimage.com/36" alt="" />
                <div className="chat-header-user-name">{currentChat.username}</div>
            </div>

            <div className="chats-header-action">
                <ul className="action-list">
                    <li className="action-list-item">
                        <a href="/#" className="link">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-dots"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <circle cx="5" cy="12" r="1"></circle>
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="19" cy="12" r="1"></circle>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
