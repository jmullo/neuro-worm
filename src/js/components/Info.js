import _ from 'lodash';
import React from 'react';
import Paper from '@material-ui/core/Paper';

export default class Info extends React.Component {
    renderStats = () => {
        let gen;
        let avgAge;
        let avgScore;
        let maxScore;

        return (
            _.takeRight(this.props.stats, 31).map(row => {
                gen = row.generation.toString().padStart(5);
                avgAge = row.avgAge.toString().padStart(5);
                avgScore = row.avgScore.toString().padStart(5);
                maxScore = row.maxScore.toString().padStart(5);

                return (
                    <div key={row.generation}>
                        gen: {gen}, avgAge: {avgAge}, avgScr: {avgScore}, maxScr: {maxScore} 
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
