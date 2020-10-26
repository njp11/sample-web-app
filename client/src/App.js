import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';

import AuthState from './context/auth/AuthState';

const App = () => {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthState>
  );
};

export default App;
