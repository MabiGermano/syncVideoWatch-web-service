import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitialPage from './pages/InitialPage';
import MainPage from './pages/MainPage';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<InitialPage />} />
                <Route path="/room/:roomId" exact element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;