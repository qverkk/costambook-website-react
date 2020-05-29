import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../services/serviceWorker"
import { Button } from "@material-ui/core";
import Post from "./Post";
import "../styles/DisplayPosts.css"

class DisplayPosts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }

        this.fetchPosts = this.fetchPosts.bind(this)
    }

    async fetchPosts() {
        try {
            const response = await fetchPosts()
            this.setState({
                posts: response
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const items = this.state.posts.map(item => {
            return (
                <div key={item.postId}>
                    <Post post={item} />
                </div>
            )
        })

        return (
            <div className="posts-section">
                <div className="posts">
                    <Button onClick={this.fetchPosts} fullWidth variant="contained">Fetch posts</Button>
                    {items.length ?
                        <div>
                            {items}
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default connect(null, null)(DisplayPosts)