import React, { Component } from "react";
import { Card, TextField, Button } from "@material-ui/core";
import { createCommentForPost } from "../services/serviceWorker";

class CreateComment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            postId: this.props.postId,
            comment: ""
        }

        this.onValueChange = this.onValueChange.bind(this)
        this.postComment = this.postComment.bind(this)
    }

    async postComment() {
        if (!this.state.comment) {
            return
        }
        
        try {
            let data = {
                postId: this.state.postId,
                comment: this.state.comment
            }
            await createCommentForPost(data)
            this.props.toggle()
        } catch(error) {
            console.log(error)
        }
    }

    onValueChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Card>
                <TextField 
                    label="comment" 
                    value={this.state.comment} 
                    onChange={this.onValueChange} 
                    name="comment"
                    fullWidth
                    multiline
                    rows={2}
                />
                <Button fullWidth variant="contained" onClick={this.postComment}>Post</Button>
            </Card>
        )
    }
}

export default CreateComment