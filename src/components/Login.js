import React, { Component } from "react";
import { connect } from 'react-redux';
import { Paper, Grid, FormControl, InputLabel, Input, Button } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { loginUserFetch, hideError } from "../actions"

const eye = <FontAwesomeIcon icon={faEye} />;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            passwordShown: false,
        }

        this.onChange = this.onChange.bind(this)
        this.togglePassword = this.togglePassword.bind(this)
        this.login = this.login.bind(this)
    }

    async login() {
        const data = JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        })

        this.props.loginUserFetch(data)
    }

    onChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleClose = () => {
        this.props.hideError()
        this.props.toggle()
    }

    togglePassword() {
        this.setState({
            passwordShown: !this.state.passwordShown
        })
    }

    render() {
        const { passwordShown } = this.state

        return (
            <Paper className="paper">
                <Grid
                    container
                    direction="column"
                    alignContent="center"
                >
                    <div>
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input
                                id="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                type={passwordShown ? "text" : "password"}
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            <i onClick={this.togglePassword}>{eye}</i>
                        </FormControl>
                    </div>
                    {this.props.error ?
                        <Alert severity="error">{this.props.error}</Alert>
                        : null}
                    <div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.login}
                        >
                            Login
                        </Button>
                    </div>
                    <div>
                        <Button fullWidth variant="contained" color="secondary" onClick={this.handleClose}>Close</Button>
                    </div>
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = state => ({
    error: state.loginError
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loginUserFetch: data => dispatch(loginUserFetch(data)),
        hideError: () => dispatch(hideError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);