import _ from 'lodash';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';

export default class Controls extends React.Component {
    state = {
        speed: 5
    }

    handleGameSpeedChange = (event, value) => {
        this.setState({ speed: value });

        this.handleOptionsChange();
    }

    handleStartGameClick = () => {
        this.props.onStartGame();
    }

    handleSimulateClick = () => {
        this.props.onSimulate();
    }

    handleOptionsChange = () => {
        this.props.onChange(this.state);
    }

    componentDidMount() {
        _.defer(this.handleOptionsChange);
    }

    render() {
        return (
            <div>
                
                <Typography>Game speed: {this.state.speed}</Typography>
                <Slider
                    className='slider'
                    value={this.state.speed}
                    min={1}
                    max={10}
                    step={1}
                    onChange={this.handleGameSpeedChange} />
                <Button
                    className='button'
                    variant='outlined'
                    mini
                    autoFocus
                    onClick={this.handleStartGameClick}>Start game</Button>
                <Button
                    className='button'
                    variant='outlined'
                    mini
                    onClick={this.handleSimulateClick}>Simulate</Button>
            </div>
        );
    }
}
