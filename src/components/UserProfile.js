import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { getUserData, fetchPostsForUserId } from "../services/serviceWorker";
import Post from "./Post";
import "../styles/DisplayPosts.css"

class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userId: this.props.match.params.id,
            user: "",
            posts: []
        }

        this.fetchUserDetails = this.fetchUserDetails.bind(this)
        this.fetchPosts = this.fetchPosts.bind(this)
    }

    async fetchPosts() {
        try {
            const data = {
                userId: this.state.userId
            }
            const response = await fetchPostsForUserId(data)
            this.setState({
                posts: response
            })
        } catch (err) {
            console.log(err)
        }
    }

    async fetchUserDetails() {
        try {
            const data = {
                userId: this.state.userId
            }
            const response = await getUserData(data)
            console.log(response)
            this.setState({
                user: response
            })
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        this.fetchUserDetails()
    }

    render() {
        const { firstName, lastName } = this.state.user


        const items = this.state.posts.map(item => {
            console.log(item)
            return (
                <div key={item.postId}>
                    <Post post={item} />
                </div>
            )
        })

        return (
            <div>
                <div>
                    <Typography variant="h3">
                        {firstName} {lastName} profile
                    </Typography>
                    <Typography variant="h6">
                        Posts:
                    </Typography>
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
                </div>
            </div>
        )
    }
}

export default UserProfile