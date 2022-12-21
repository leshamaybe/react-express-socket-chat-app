import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';

export const Registration = () => {
    const [usernamePassword, setUsernamePassword] = useState({
        username: '',
        password: '',
    });

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
            const data = await request('http://127.0.0.1:7000/auth/reg', 'POST', {
                ...usernamePassword,
            });
            console.log('Data', data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-sign-up">
            <div className="auth-container">
                <h1>Sign Up</h1>
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
                            autoComplete="password"
                            required
                            placeholder="Password"
                            value={usernamePassword.password}
                            onChange={inputChange}
                        />
                    </section>
                    <button type="submit">Register</button>
                </form>

                <h2>
                    Have an account? <Link to="/login">Click to login</Link>
                </h2>
            </div>
        </div>
    );
};
