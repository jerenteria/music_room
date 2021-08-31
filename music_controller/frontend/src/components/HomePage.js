import React, { Component } from 'react';
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };

    }

    async componentDidMount() { {/* componentDidMount() = first time something loaded on screen  async allows code to be exectued without having to wait for events */}
        fetch('/api/user-in-room').then((response) => response.json()) // call api user in room, return whether we are in room, get json from response, which will return data such as room code
        .then((data) => {});
            this.setState({
                roomCode: data.code
            });
    }

    renderHomePage() {
        return(
            <Grid container spacing={3}> {/* Grid allows everything to be aligned */}
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary"> {/*disable elevatio means it gets rid of button shadow */}
                        <Button color="primary" to='/join' component={ Link }> 
                            Join A Room
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup disableElevation variant="contained" color="secondary"> {/*disable elevation means it gets rid of button shadow */}
                        <Button color="secondary" to='/create' component={ Link }> 
                            Create A Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={() => {
                        return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`}/>) : this.renderHomePage()
                    }}/>
                    <Route path='/join' component={RoomJoinPage}/>
                    <Route path='/create' component={CreateRoomPage}/>
                    <Route path="/room/:roomCode" component={Room}/>
                </Switch>

            </Router>
        );
        
    }
}