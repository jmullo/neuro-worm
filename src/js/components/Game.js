import _ from 'lodash';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Canvas from 'components/Canvas';
import { initGame, restartGame, startSimulation, setGameOptions } from 'game/engine';
import { getGrid } from 'game/extract';

let round = 0;

export default class Game extends React.Component {
    state = {
        status: {
            age: 0,
            length: 0
        }
    }

    updateOptions = (options) => {
        setGameOptions(options);
    }

    startGame = () => {
        restartGame();
    }

    simulate = () => {
        startSimulation();
        round++;
    }

    simulateFunction = () => {
        return ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
    }

    handleCanvasReady = (context) => {
        initGame(context, this.handleStatusUpdated, this.simulateFunction, this.handleSimulationStatus);
    }

    handleStatusUpdated = (status) => {
        if (!_.isEqual(this.state.status, status)) {
            this.setState({ status });
        }
    }

    handleSimulationStatus = (status) => {
        if (status.length > 3) {
            console.log(status);
        }

        if (round < 1000) {
            _.defer(this.simulate);
        } else {
            round = 0;
            //console.log(getGrid());
            console.log('finished');
        }
    }
    
    render() {
        const {status} = this.state;

        return (
            <Grid container spacing={8}>
                <Grid item>
                    <Paper id='status'>
                        <Typography>Length: {status.length}, Age: {status.age}</Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <Canvas onReady={this.handleCanvasReady} />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
