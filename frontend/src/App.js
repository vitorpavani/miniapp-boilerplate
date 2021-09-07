import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
// import Signup from './pages/Signup';
// import { isAuthenticated } from './actions/auth';
import Dashboard from './pages/Dashboard/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        {/* <Route exact path='/signup' component={Signup} /> */}

        {/* <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/dashboard/*' component={Dashboard} /> */}
      </Switch>
    </Router>
  );
}

export default App;
