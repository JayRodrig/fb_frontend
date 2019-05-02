/*
    TODO: implement drag and drop for user img.
*/

// NPM MODULES
import React, {Component,} from 'react';
import {Redirect,} from 'react-router-dom';
import axios from 'axios';

// COMPONENTS


// LOCAL MODULES
import firebase from '../services/firebase';
import AuthContext from '../contexts/auth';

export default class SignUp extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        income: '',
        avatar_url: '',
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let firebase_token = '';
        const file = e.target.form[5].files[0];
        const {first_name, last_name, email, password, income,} = this.state;        
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(response => {
            firebase_token = response.user.ra;
            const root = firebase.storage().ref(`/images/${email}`);
            const newImage = root.child(file.name)
            return newImage.put(file);
          })
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then(avatar_url => {
            return axios.post('http://localhost:11235/user/', {
                first_name, 
                last_name,
                email,
                firebase_token,
                avatar_url,
                income,
            });                  
          })
          .then(_ => {
              this.props.history.push('/');
          })
          .catch(err => {
            const {message,} = err;
            this.setState({
                'msg': message,
            });
          });
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
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                        <label htmlFor="First Name">First Name:</label>
                                                        <input type="text" name='first_name' className="form-control" 
                                                        id="first_name" placeholder="First Name..." onChange={this.handleInputChange}/>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                        <label htmlFor="Last Name">Last Name:</label>
                                                        <input type="text" name='last_name' className="form-control" 
                                                        id="last_name" placeholder="Last Name..." onChange={this.handleInputChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                        <label htmlFor="Email">Email</label>
                                                        <input type="email" name='email' className="form-control" 
                                                        id="inputEmail4" placeholder="Email" onChange={this.handleInputChange}/>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                        <label htmlFor="Password">Password</label>
                                                        <input type="password" name='password' className="form-control" 
                                                        id="inputPassword4" placeholder="Password" onChange={this.handleInputChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="income">Income</label>
                                                        <input type="text" name='income' className="form-control" 
                                                        id="income" placeholder="Income..." onChange={this.handleInputChange}/>
                                                    </div>
                                                    <div className="form-group my-3">
                                                            <label htmlFor="avatar" style={{display: 'block'}} className=''>Choose a profile picture:</label>
                                                            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg" />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Sign in</button>
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