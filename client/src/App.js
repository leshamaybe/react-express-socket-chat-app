import { MainApp } from './pages/MainApp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { Registration } from './pages/auth/Registration';
import { SocketContext, socket } from './context/socketContext.js';

function App() {
    return (
        <>
            <SocketContext.Provider value={socket}>
                <Router>
                    <div className="app">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/reg" element={<Registration />} />
                            <Route path="/main" element={<MainApp />} />
                        </Routes>
                    </div>
                </Router>
            </SocketContext.Provider>
        </>
    );
}

export default App;
