// NPM MODULES
import React, {Component,} from 'react';
import {Route,} from 'react-router-dom';

// CONTAINERS
import Home from './containers/home';
import LogIn from './containers/login';

// LOCAL MODULES
import AuthContext from './contexts/auth';

class App extends Component {
  state = {

  }

  render() {
    return(
      <>
        <AuthContext.Provider value={{user: 'J'}}>
          <Route path='/' exact component={Home}></Route>
          <Route path='/login' exact component={LogIn}></Route>
        </AuthContext.Provider>
      </>
    )
  }
}

export default App;
