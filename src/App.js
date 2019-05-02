// NPM MODULES
import React, {Component,} from 'react';
import {Route,} from 'react-router-dom';

// CONTAINERS
import Home from './containers/home';
import LogIn from './containers/login';
import SignUp from './containers/signup';

// COMPONENTS
import NavBar from './components/navbar';

// LOCAL MODULES
import firebase from './services/firebase';
import AuthContext from './contexts/auth';

class App extends Component {
  state = {
    user: null,
    token: null,
  }

  componentDidMount = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.auth().currentUser.getIdToken(false).then((token) => {
          this.setState({
            user,
            token,
          });
        }).catch((err) => {
          console.log(err)
        });
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }

  render() {
    return(
      <>
        <AuthContext.Provider value={this.state}>
          <Route path='/' component={NavBar} />
          <Route path='/' exact component={Home}></Route>
          <Route path='/login' exact component={LogIn}></Route>
          <Route path='/signup' exact component={SignUp}></Route>
        </AuthContext.Provider>
      </>
    )
  }
}

export default App;
