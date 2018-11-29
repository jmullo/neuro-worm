import _ from 'lodash';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Canvas from 'components/Canvas';

import { initGame, restartGame, startSimulation, setGameOptions, setGameAi } from 'game/engine';

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

    startGame = (runAi) => {
        restartGame(runAi);
    }

    setAi = (ai) => {
        setGameAi(ai);
    }

    simulate = (simulationFunction, simulationCallback) => {
        startSimulation(simulationFunction, simulationCallback);
    }

    handleCanvasReady = (context) => {
        initGame(context, this.handleStatusUpdated);
    }

    handleStatusUpdated = (status) => {
        this.setState({ status });
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
