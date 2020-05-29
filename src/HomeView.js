import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocialWall from './components/SocialWall';

class HomeView extends Component {

    render() {
        return (
            <div>
                <SocialWall />
            </div>
        )
    }
}

export default connect(null, null)(HomeView);
