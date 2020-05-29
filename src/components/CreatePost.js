import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography, Card, Button, TextField } from "@material-ui/core";
import "../styles/CreatePost.css"
import { uploadPost } from "../actions"

class CreatePost extends Component {

    constructor(props) {
        super(props)

        this.state = {
            file: null,
            fileName: null,
            description: ""
        }

        this.onFileCHange = this.onFileCHange.bind(this)
        this.onInputChanged = this.onInputChanged.bind(this)
        this.uploadPost = this.uploadPost.bind(this)
    }

    onFileCHange(event) {
        this.setState({
            file: event.target.files[0],
            fileName: event.target.files[0].name
        })
    }

    onInputChanged(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    uploadPost() {
        this.props.uploadPost(this.state)
    }

    render() {
        return (
            <div className="create-post-body">
            <Card variant="outlined" className="post-menu">
                <Typography>
                    Create a new post
                </Typography>
                <Button
                    variant="contained"
                    fullWidth
                    component="label"
                >
                    {this.state.fileName ? this.state.fileName : "Select a file"}
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        name="file"
                        onChange={this.onFileCHange}
                    />
                </Button>
                <TextField
                    label="Description"
                    multiline
                    fullWidth
                    rows={4}
                    variant="outlined"
                    value={this.state.description}
                    name="description"
                    onChange={this.onInputChanged}
                />
                <Button fullWidth variant="outlined" onClick={this.uploadPost}>Create</Button>
                <div>
                    {this.props.postUploadResponse}
                </div>
            </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    postUploadResponse: state.postUploadResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        uploadPost: data => dispatch(uploadPost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)