import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Controls from 'components/Controls';
import Game from 'components/Game';
import Info from 'components/Info';
import Graph from 'components/Graph';

import { evolve, getAi } from 'ai/network';

export default class App extends React.Component {
    state = {
        running: false,
        evolving: false,
        showInfo: false,
        stats: []
    }

    game = React.createRef();

    handleOptionsChange = (options) => {
        this.game.current.updateOptions(options);
    }

    handlePlay = () => {
        this.game.current.startGame();
        
        this.setState({
            running: true,
            showInfo: false
        });
    }

    handleGameEnd = () => {
        this.setState({ running: false });
    }

    handleRunAi = () => {
        this.game.current.startAiGame();

        this.setState({
            showInfo: false
        });
    }

    handleEvolve = () => {
        evolve(this.game.current.simulate, this.handleEvolutionUpdate);
        
        this.setState({ 
            evolving: true,
            showInfo: true
        });
    }

    handleEvolutionUpdate = (data) => {
        if (data.ready) {
            this.game.current.setAi(data.bestGenome);

            this.setState({ 
                evolving: false,
                stats: [...this.state.stats, data.stats]
            });

        } else {
            this.setState({ stats: [...this.state.stats, data.stats] });
        }
    }

    componentDidMount() {
        this.game.current.setAi(getAi());
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <div id='flex'>

                    <Grid 
                        id='content'
                        container
                        spacing={8}>

                        <Grid item>
                            <Paper id='controls'>
                                <Controls
                                    disabled={this.state.running || this.state.evolving}
                                    onChange={this.handleOptionsChange}
                                    onPlay={this.handlePlay}
                                    onRunAi={this.handleRunAi}
                                    onEvolve={this.handleEvolve} />
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Game
                                ref={this.game}
                                showCanvas={!this.state.showInfo}
                                showStatus={!this.state.evolving}
                                onEnd={this.handleGameEnd} />

                            <Info
                                stats={this.state.stats}
                                visible={this.state.showInfo}/>
                        </Grid>

                        <Grid item>
                            <Paper id='graph'>
                                <Graph stats={this.state.stats}/>
                            </Paper>
                        </Grid>

                    </Grid>

                </div>
            </React.Fragment>
        );
    }
}
