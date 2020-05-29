import React, { Component } from "react";
import { connect } from "react-redux";
import CreatePost from "./CreatePost";
import DisplayPosts from "./DisplayPosts";

class SocialWall extends Component {

    render() {
        return (
            <div>
                {!this.props.user ? "Not logged in" : 
                    <div>
                        <CreatePost />
                        <DisplayPosts />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(SocialWall)