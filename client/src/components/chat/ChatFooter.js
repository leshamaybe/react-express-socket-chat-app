import React, { useState, useContext } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { SocketContext } from '../../context/socketContext';
import { useHttp } from '../../hooks/http.hook';

export const ChatFooter = ({ currentChat }) => {
    const [openEmoji, setOpenEmoji] = useState(false);
    const [input, setInput] = useState({ value: '' });
    const { request } = useHttp();

    const socket = useContext(SocketContext);

    const showEmoji = () => {
        setOpenEmoji(openEmoji ? false : true);
    };

    const inputChange = (event) => {
        setInput({ value: event.target.value });
    };

    const onEmojiClick = (event, emojiData) => {
        setInput((prev) => {
            return { ...prev, value: prev.value + emojiData.emoji };
        });
        setOpenEmoji(false);
    };

    const sendData = async (e) => {
        e.preventDefault();
        try {
            if (input.value) {
                await request('http://localhost:7000/auth/addMessage/', 'POST', {
                    textOrPathToFile: input.value,
                    userId: currentChat.username,
                    senderName: localStorage.getItem('username'),
                });

                socket.emit('send message', {
                    text: input.value,
                    from: localStorage.getItem('username'),
                    user: currentChat.username,
                    to: currentChat.userID,
                });
                setInput({ value: '' });
            } else {
                alert('Введите сообщение');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <footer className="chat-footer">
            <div className="chat-footer-top">
                <button onClick={showEmoji} className="emoji-btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-mood-smile"
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
                        <line x1="9" y1="10" x2="9.01" y2="10"></line>
                        <line x1="15" y1="10" x2="15.01" y2="10"></line>
                        <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
                    </svg>
                </button>
                <form onSubmit={sendData}>
                    <input
                        onChange={inputChange}
                        type="text"
                        className="chat-input"
                        name="chat-input"
                        placeholder="Write a message"
                        value={input.value}
                        autoComplete="off"
                    />
                    <button className="chat-submit-btn" type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-send"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                            <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"></path>
                        </svg>
                    </button>
                </form>
            </div>

            {openEmoji && (
                <div className="emoji-box">
                    <EmojiPicker emojiStyle="facebook" height={350} onEmojiClick={onEmojiClick} />
                </div>
            )}
        </footer>
    );
};
