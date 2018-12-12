import _ from 'lodash';
import React from 'react';
import Paper from '@material-ui/core/Paper';

export default class Info extends React.Component {
    renderStats = () => {
        let gen;
        let avgAge;
        let bestScore;

        return (
            _.takeRight(this.props.stats, 31).map(row => {
                gen = row.generation.toString().padEnd(7);
                avgAge = row.avgAge.toString().padEnd(8);
                bestScore = row.bestScore.toString().padEnd(6);

                return (
                    <div key={row.generation}>
                        generation: {gen} mean age: {avgAge} best score: {bestScore} 
                    </div>
                );
            })
        );
    }

    render() {
        const className = this.props.visible ? '' : 'hidden';

        return (
            <Paper
                id='info'
                className={className}>

                {this.renderStats()}                
            </Paper>
        );
    }
}
