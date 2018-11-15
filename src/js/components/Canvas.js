import React from 'react';

export default class Canvas extends React.PureComponent {
	canvasContainer = React.createRef();
	canvas = React.createRef();

	componentDidMount() {
		const pixelRatio = window.devicePixelRatio || 1;
		const width = (this.canvasContainer.current.clientWidth * pixelRatio) | 0;
		const height = (this.canvasContainer.current.clientHeight * pixelRatio) | 0;

		this.setState({
			pixelRatio,
            width,
            height
        });
	}

	componentDidUpdate() {
		if (this.props.onReady) {
			const context = this.canvas.current.getContext('2d');

			context.scale(this.state.pixelRatio, this.state.pixelRatio);

			context.width = this.state.width;
			context.height = this.state.height;
			context.pixelRatio = this.state.pixelRatio;

			this.props.onReady(context);
		}
	}

	render() {
		let canvas = null;

		if (this.state && this.state.width && this.state.height) {
			canvas = (
				<canvas
					id='canvas'
					ref={this.canvas}
					width={this.state.width}
					height={this.state.height} />
			);
		}

		return (
			<div
				id='canvasContainer'
			    ref={this.canvasContainer} >

				{canvas}
			</div>
		);
	}
}
