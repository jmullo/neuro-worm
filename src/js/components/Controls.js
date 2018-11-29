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

    handleOptionsChange = () => {
        this.props.onChange(this.state);
    }

    handlePlayClick = () => {
        this.props.onPlay();
    }

    handleRunAiClick = () => {
        this.props.onRunAi();
    }

    handleEvolveClick = () => {
        this.props.onEvolve();
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
                    onClick={this.handlePlayClick}>Play</Button>
                <Button
                    className='button'
                    variant='outlined'
                    mini
                    onClick={this.handleRunAiClick}>Run AI</Button>
                <Button
                    className='button'
                    variant='outlined'
                    mini
                    onClick={this.handleEvolveClick}>Evolve</Button>
            </div>
        );
    }
}
