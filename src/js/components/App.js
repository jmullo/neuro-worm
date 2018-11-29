import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Controls from 'components/Controls';
import Game from 'components/Game';

import { evolve } from 'ai/network';

export default class App extends React.Component {
    game = React.createRef();

    handleOptionsChange = (options) => {
        this.game.current.updateOptions(options);
    }

    handlePlay = () => {
        this.game.current.startGame();
    }

    handleRunAi = () => {
        this.game.current.startGame(true);
    }

    handleEvolve = () => {
        evolve(this.game.current.simulate, this.handleEvolutionComplete);
    }

    handleEvolutionComplete = (bestGenome) => {
        this.game.current.setAi(bestGenome);
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <div id='flex'>
                    <Grid id='content' container spacing={8}>
                        <Grid item>
                            <Paper id='controls'>
                                <Controls
                                    onChange={this.handleOptionsChange}
                                    onPlay={this.handlePlay}
                                    onRunAi={this.handleRunAi}
                                    onEvolve={this.handleEvolve} />
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Game ref={this.game} />
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}
