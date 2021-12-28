import { BrowserRouter, Switch, Route } from 'react-router-dom';
import InitialPage from './pages/InitialPage';
import MainPage from './pages/MainPage';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={InitialPage} />
                <Route path="/room/:roomId" exact component={MainPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;