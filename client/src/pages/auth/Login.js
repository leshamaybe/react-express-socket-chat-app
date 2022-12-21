import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { SocketContext } from '../../context/socketContext';

export const Login = () => {
    const navigate = useNavigate();
    const [usernamePassword, setUsernamePassword] = useState({
        username: '',
        password: '',
    });

    const socket = useContext(SocketContext);

    const { request } = useHttp();

    const inputChange = (e) => {
        setUsernamePassword((prev) => {
            return {
                ...prev,
                username: e.target.form.username.value,
                password: e.target.form.password.value,
            };
        });
    };

    const sendAuthData = async (e) => {
        e.preventDefault();
        try {
            const data = await request('http://localhost:7000/auth/login', 'POST', {
                ...usernamePassword,
            });

            if (data.token !== undefined) {
                localStorage.setItem('username', usernamePassword.username);
                document.cookie = `username=${usernamePassword.username}`;
                socket.emit('auth', data.token);
                navigate('/main');
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };
    return (
        <div className="auth-log-in">
            <div className="auth-container">
                <h1>Log in</h1>
                <form onSubmit={sendAuthData} method="post" className="auth-form">
                    <section>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            placeholder="Username"
                            autoFocus
                            value={usernamePassword.username}
                            onChange={inputChange}
                        />
                    </section>
                    <section>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Password"
                            value={usernamePassword.password}
                            onChange={inputChange}
                        />
                    </section>
                    {/* <Link to="/main"> */}
                    <button type="submit">
                        Log in
                        <div className="arrow-wrapper">
                            <div className="arrow"></div>
                        </div>
                    </button>
                    {/* </Link> */}
                </form>

                <h2>
                    Don't have an account? <Link to="/reg">Click to register</Link>
                </h2>
            </div>
        </div>
    );
};
