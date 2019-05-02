// NPM MODULES
import React from 'react';
import {Link,} from 'react-router-dom';

// LOCAL MODULES
import firebase from '../services/firebase';

export default props => {
    const handleLogOut = () => {
        firebase.auth().signOut();
        props.history.push('/');
    }
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="navbar-brand" to="/">Finance Buddy</Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Link</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <span onClick={handleLogOut}>Log Out</span>
                </form>
            </div>
        </nav>
    )
}