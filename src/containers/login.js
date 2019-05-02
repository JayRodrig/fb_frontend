// NPM MODULES
import React, {Component,} from 'react';
import {Redirect,} from 'react-router-dom';

// COMPONENTS


// LOCAL MODULES
import firebase from '../services/firebase';
import AuthContext from '../contexts/auth';

export default class LogIn extends Component {
    state = {
        email: '',
        password: '',
        err: '',
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const {email, password,} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((response) => {
            console.log('Returns: ', response);
          })
          .catch(err => {
            const { message } = err;
            this.setState({ error: message });
          })
    }

    render() {
        return(
            <>
                <AuthContext.Consumer>
                    {
                        user => {
                            if (user.user) {
                                return(
                                    <>
                                        <Redirect to='/'></Redirect>
                                    </>
                                )
                            } else {
                                return(
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col-12 my-5'>
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Email Address:</label>
                                                        <input type="email" name='email' className="form-control" id="exampleInputEmail1" 
                                                            aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleInputChange} />
                                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">Password:</label>
                                                        <input type="password" name='password' className="form-control" id="exampleInputPassword1" 
                                                            placeholder="Password" onChange={this.handleInputChange} />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary" 
                                                        onClick={this.handleSubmit}>Log In</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }    
                        }
                    }
                </AuthContext.Consumer>
            </>
        )
    }
}   