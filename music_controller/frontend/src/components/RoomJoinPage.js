import React, { Component } from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";


export default class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode:"", // stores rooom code
            error:"", // stores error and displays it
        };
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.roomButtonPressed = this.roomButtonPressed(this);

    }
    render() {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join A Room
                    </Typography>
                </Grid>
                <Grid items xs={12} align="center">
                    <TextField 
                    error={this.state.error}
                    label="Code" // code will appear in box before cliking on it
                    placeholder="Enter A Room Code" // Enter a room code will appear as placeholder when user clicks on box to type
                    value={this.state.roomCode}
                    helperText={this.state.error}
                    variant="outlined"
                    onChange={this.handleTextFieldChange}
                    />
                </Grid>
                <Grid items xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={this.roomButtonPressed}>
                        Enter Room
                    </Button>
                </Grid>
                <Grid items xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
    handleTextFieldChange(e) {
        this.setState({
            roomCode: e.target.value,
        });
    }
    
    roomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "applications/json"},
            body: JSON.stringify({ // data that is being sent
                code: this.state.roomCode
            })
        };
        fetch('/api/join-room', requestOptions).then((response) => {
            if(response.ok) { // if you succesfully join room
                this.props.history.push(`/room/${this.state.roomCode}`); // then redirect user to room with that same code
            } else {
                this.setState({error: "Room not found."}); // if its not okay then print error Room not found
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}