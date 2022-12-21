import React from 'react';

export const ChatsHeader = () => {
    return (
        <>
            <header className="chats-header">
                <span>Chats</span>
                <ul className="action-list">
                    <li className="action-list-item">
                        <a href="/#" className="link">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-circle-plus"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <circle cx="12" cy="12" r="9"></circle>
                                <line x1="9" y1="12" x2="15" y2="12"></line>
                                <line x1="12" y1="9" x2="12" y2="15"></line>
                            </svg>
                        </a>
                    </li>
                </ul>
            </header>
            <form className="chats-form">
                <input type="text" name='chats-input' className="chats-input" placeholder='Найти чат'/>
            </form>
        </>
    );
};
