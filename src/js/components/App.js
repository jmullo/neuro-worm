import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Controls from 'components/Controls';
import Game from 'components/Game';

export default class App extends React.Component {
    game = React.createRef();

    handleOptionsChange = (options) => {
        this.game.current.updateOptions(options);
    }

    handleStartGame = () => {
        this.game.current.startGame();
    }

    handleSimulate = () => {
        this.game.current.simulate();
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
                                    onStartGame={this.handleStartGame}
                                    onSimulate={this.handleSimulate} />
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
