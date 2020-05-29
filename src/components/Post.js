import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { fetchCommentsForPostId, fetchLikes, postLikes } from "../services/serviceWorker";
import CreateComment from "./CreateComment";
import "../styles/Post.css"

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: this.props.post,
            showComments: false,
            comments: [],
            likes: 0,
            dislikes: 0
        }
        this.toggleComments = this.toggleComments.bind(this)
        this.fetchComments = this.fetchComments.bind(this)
        this.fetchLikes = this.fetchLikes.bind(this)
        this.performLikeOrDislike = this.performLikeOrDislike.bind(this)
        this.like = this.like.bind(this)
        this.dislike = this.dislike.bind(this)
    }

    async componentDidMount() {
        this.fetchLikes()
    }

    async fetchLikes() {
        try {
            this.setState({
                likes: 0,
                dislikes: 0
            })

            const data = {
                postId: this.state.post.postId
            }
            const response = await fetchLikes(data)
            response.forEach(p => {
                if (p.type === "LIKE") {
                    this.setState({
                        likes: this.state.likes + 1
                    })
                } else {
                    this.setState({
                        dislikes: this.state.dislikes + 1
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async fetchComments() {
        this.setState({
            comments: []
        })
        try {
            const response = await fetchCommentsForPostId(this.state.post.postId)
            this.setState({
                comments: response
            })
        } catch (error) {
            console.log(error)
        }
    }

    async toggleComments() {
        this.setState({
            showComments: !this.state.showComments
        })

        if (!this.state.showComments) {
            this.fetchComments()
        }
    }

    async like() {
        this.performLikeOrDislike("LIKE")
    }

    async dislike() {
        this.performLikeOrDislike("DISLIKE")
    }

    async performLikeOrDislike(type) {
        let data = JSON.stringify({
            "userId": localStorage.userId,
            "postId": this.state.post.postId,
            "likeType": type
        });

        try {
            await postLikes(data)
            this.fetchLikes()
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { firstName, lastName, userId } = this.state.post.user
        const { image, description } = this.state.post

        const items = this.state.comments.map(item => {
            return (
                <div key={item.id}>
                    <Card>
                        <CardContent>
                            <Link to={`/user/${item.userId}`}>
                                <Typography>
                                    <Button fullWidth variant="outlined">
                                        {item.username}
                                    </Button>
                                </Typography>
                            </Link><br />
                            <Typography>
                                {item.text}
                            </Typography>
                        </CardContent>
                    </Card>
                    <hr />
                </div>
            )
        })
        return (
            <div>
                <Card>
                    <CardContent>
                        <Link to={`/user/${userId}`}>
                            <Typography>
                                <Button fullWidth variant="outlined">
                                    {firstName} {lastName}
                                </Button>
                            </Typography>
                        </Link><br />
                        {image ?
                            <img src={`data:image/jpeg;base64,${image}`} alt="Someting" width={300} />
                            : null
                        }
                        <Typography>
                            {description}
                        </Typography>
                        <Button 
                            className="like-btn" 
                            variant="outlined"
                            name="LIKE"
                            onClick={this.like}
                        >
                            {this.state.likes} Like
                        </Button>
                        <Button 
                            className="dislike-btn" 
                            variant="outlined"
                            name="DISLIKE"
                            onClick={this.dislike}
                        >
                            {this.state.dislikes} Dislike
                        </Button>
                        <Button variant="outlined" fullWidth onClick={this.toggleComments}>{!this.state.showComments ? "Show comments" : "Hide comments"}</Button>
                        {
                            this.state.showComments ?
                                <div>
                                    <CreateComment postId={this.state.post.postId} toggle={this.fetchComments} />
                                    {items.length ?
                                        <div>
                                            {items}
                                        </div>
                                        : null
                                    }
                                </div>
                                : null
                        }
                    </CardContent>
                    <hr />
                </Card>
            </div>
        )
    }
}

export default Post;