import _ from 'lodash';
import React from 'react';
import { FlexibleXYPlot, XAxis, YAxis, LineSeries } from 'react-vis';

export default class Graph extends React.Component {
    render() {
        const bestScoreSeries = this.props.stats.map((point) => ({
            x: point.generation,
            y: point.bestScore
        }));

        return (
            <FlexibleXYPlot margin={{left: 30, right: 10, top: 4, bottom: 24}}>
                <XAxis />
                <YAxis />
                <LineSeries
                    data={bestScoreSeries}
                    style={{
                        strokeWidth: 0.5
                    }} />
            </FlexibleXYPlot>
        );
    }
}
