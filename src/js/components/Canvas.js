import React from 'react';

export default class Canvas extends React.PureComponent {
	state = {};

	canvasContainer = React.createRef();
	canvas = React.createRef();

	componentDidMount() {
		const pixelRatio = window.devicePixelRatio || 1;
		const width = this.canvasContainer.current.clientWidth;
		const height = this.canvasContainer.current.clientHeight;

		this.setState({
			pixelRatio,
            width,
            height
        });
	}

	componentDidUpdate() {
		if (this.props.onReady) {
			const { pixelRatio, width, height } = this.state;

			const context = this.canvas.current.getContext('2d');

			context.scale(pixelRatio, pixelRatio);

			context.width = width;
			context.height = height;

			this.props.onReady(context);
		}
	}

	render() {
		const { pixelRatio, width, height } = this.state;

		let canvas = null;

		if (width && height) {
			canvas = (
				<canvas
					id='canvas'
					ref={this.canvas}
					width={width * pixelRatio}
					height={height * pixelRatio}
					style={{
						width: `${width}px`,
						height: `${height}px`
					}}/>
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
