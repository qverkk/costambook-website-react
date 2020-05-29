import React, { Component } from "react";
import "../styles/Navbar.css"
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import Register from "./Register";
import Login from "./Login";
import { connect } from "react-redux";
import { logoutUser } from "../actions"
import { Link } from "react-router-dom";

class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            displayRegister: false,
            displayLogin: false
        }

        this.toggleRegister = this.toggleRegister.bind(this)
        this.toggleLogin = this.toggleLogin.bind(this)
        this.logout = this.logout.bind(this)
    }

    toggleRegister() {
        this.setState({
            displayRegister: !this.state.displayRegister,
            displayLogin: false
        })
    }

    toggleLogin() {
        this.setState({
            displayLogin: !this.state.displayLogin,
            displayRegister: false
        })
    }

    logout() {
        this.props.logoutUser()
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className="app-name">
                            <Link to="/">
                                <Button>
                                    Example social media name
                                </Button>
                            </Link>
                        </Typography>
                        {!this.props.user ?
                            <div>
                                <Button variant="outlined" onClick={this.toggleRegister}>Register</Button>
                                <Button variant="outlined" onClick={this.toggleLogin}>Login</Button>
                            </div> :
                            <div>
                                <Link to="/">
                                    <Button variant="outlined" onClick={this.logout}>Logout</Button>
                                </Link>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
                {!this.props.user ?
                    <div>
                        {this.state.displayRegister ?
                            <div className="registration"><Register toggle={this.toggleRegister} /></div> : null}
                        {this.state.displayLogin ?
                            <div className="login"><Login toggle={this.toggleLogin} reloadState={this.props.reloadState} /></div> : null}
                    </div>
                    : null}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)