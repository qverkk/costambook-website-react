import React, { Component } from "react";
import "../styles/Register.css"
import { FormControl, Input, InputLabel, Button, Grid, Paper, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { registerNewUser } from "../services/serviceWorker";
const eye = <FontAwesomeIcon icon={faEye} />;

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            repeatPassword: "",
            firstName: "",
            lastName: "",
            passwordShown: false,
            repeatPasswordShown: false,
            registrationResponse: null,
            rules: {
                required: v => !!v || "Required",
                passwordMin: v => v.length >= 8 || "Min 8 characters",
                repearPasswordMatches: v =>
                    v === this.password || "Passwords don't match"
            }
        }

        this.togglePassword = this.togglePassword.bind(this)
        this.toggleRepeatPassword = this.toggleRepeatPassword.bind(this)
        this.onChange = this.onChange.bind(this)
        this.register = this.register.bind(this)
    }

    onChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    togglePassword() {
        this.setState({
            passwordShown: !this.state.passwordShown
        })
    }

    toggleRepeatPassword() {
        this.setState({
            repeatPasswordShown: !this.state.repeatPasswordShown
        })
    }

    async register() {
        this.setState({
            registrationResponse: null
        })

        if (this.state.password !== this.state.repeatPassword) {
            console.log("Passwords dont match")
            return
        }

        const data = JSON.stringify({
            "username": this.state.username,
            "password": this.state.password,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
        })

        const response = await registerNewUser(data)
        if (response.status === 201) {
            this.setState({
                registrationResponse: "Registered successfully"
            })
        } else {
            this.setState({
                registrationResponse: "Registration failure"
            })
        }
        setTimeout(() => {
            this.setState({
                registrationResponse: null
            })
        }, 5000);
    }

    handleClose = () => {
        this.props.toggle()
    }

    render() {
        const { passwordShown, repeatPasswordShown } = this.state

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
                    <div>
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="repeatpassword">Repeat password</InputLabel>
                            <Input
                                id="repeatpassword"
                                name="repeatPassword"
                                type={repeatPasswordShown ? "text" : "password"}
                                value={this.state.repeatPassword}
                                onChange={this.onChange}
                            />
                            <i onClick={this.toggleRepeatPassword}>{eye}</i>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="firstname">Firstname</InputLabel>
                            <Input
                                id="firstname"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.onChange}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="lastname">Lastname</InputLabel>
                            <Input
                                id="lastname"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.onChange}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.register}
                        >
                            Register
                        </Button>
                    </div>
                    <div>
                        <Button fullWidth variant="contained" color="secondary" onClick={this.handleClose}>Close</Button>
                    </div>
                    <div>
                        <Typography>
                            {this.state.registrationResponse}
                        </Typography>
                    </div>
                </Grid>
            </Paper>
        )
    }
}

export default Register