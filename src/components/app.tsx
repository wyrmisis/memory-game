import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import NotFoundPage from '../routes/notfound';
import Header from './header';

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Header />
            <Router>
                <Route path="/" component={Home} />
                <Route path="/:seed" component={Home} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
