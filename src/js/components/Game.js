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

    startGame = () => {
        restartGame(false);
    }

    startAiGame = () => {
        restartGame(true);
    }

    setAi = (ai) => {
        setGameAi(ai);
        this.setState({ status: null });
    }

    simulate = (simulationFunction, simulationCallback) => {
        startSimulation(simulationFunction, simulationCallback);
    }

    handleCanvasReady = (context) => {
        initGame(context, this.handleStatusUpdated);
    }

    handleStatusUpdated = (status) => {
        this.setState({ status });

        if (!status.alive) {
            this.props.onEnd();
        }
    }

    renderStatus = () => {
        const { status } = this.state;

        if (this.props.showStatus && status) {
            return (
                <Typography>Length: {status.length}, Age: {status.age}</Typography>
            );
        }

        return null;
    }
    
    render() {
        const className = this.props.showCanvas ? '' : 'hidden';

        return (
            <Grid
                id='gameFlex' 
                container
                spacing={8}>

                <Grid item>
                    <Paper id='status'>
                        {this.renderStatus()}
                    </Paper>
                </Grid>

                <Grid item>
                    <Paper className={className}>
                        <Canvas onReady={this.handleCanvasReady} />
                    </Paper>
                </Grid>

            </Grid>
        );
    }
}
