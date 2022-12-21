import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
    const navigate = useNavigate();

    const themeSwitcher = () => {
        const body = document.body;
        body.classList.toggle('light');
    };

    const handleLeaveChat = () => {
        localStorage.removeItem('username');
        navigate('/');
        window.location.reload();
    };

    const handleDropdown = (e) => {
        e.preventDefault();
        e.currentTarget.classList.toggle('is-active');
    };

    return (
        <nav className="nav-box">
            <div className="nav-group">
                <ul className="nav-list">
                    <li className="logo">
                        <a href="/#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-messages"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path>
                                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
                            </svg>
                        </a>
                    </li>
                    <li className="brackets">
                        <a href="/#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-message-circle-2"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <label className="theme-switcher">
                            <input onClick={themeSwitcher} type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </li>
                    <li className="profile-menu" onClick={handleDropdown}>
                        <a href="/#" className="user-menu">
                            <img src="http://dummyimage.com/36" alt="" />
                        </a>
                        <div className="dropdown-menu" role="menu">
                            <div className="dropdown-content">
                                <button className="dropdown-item">Dropdown item</button>
                                <button className="dropdown-item" onClick={handleLeaveChat}>
                                    Logout
                                    <img
                                        src="https://img.icons8.com/sf-regular/48/null/exit.png"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
