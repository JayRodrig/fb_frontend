import React, {Component,} from 'react';
import AuthContext from '../contexts/auth';

export default class Home extends Component {
    state = {

    }

    static contextType = AuthContext;

    componentDidMount = () => {
        console.log(this.context);
    }

    render() {
        return(
            <h1>This is the home page.</h1>
        )
    }
}