import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

// Constants
const VALID_CHARS = `abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;
const STREAM_MUTATION_ODDS = 0.02;

const MIN_STREAM_SIZE = 15;
const MAX_STREAM_SIZE = 50;

const MIN_INTERVAL_DELAY = 50;
const MAX_INTERVAL_DELAY = 100;

const MIN_DELAY_BETWEEN_STREAMS = 0;
const MAX_DELAY_BETWEEN_STREAMS = 8000;

const getRandInRange = (min, max) =>
	Math.floor(Math.random() * (max - min)) + min;

const getRandChar = () =>
	VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const getRandStream = () =>
	new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE))
		.fill()
		.map(_ => getRandChar());

const getMutatedStream = stream => {
	const newStream = [];
	for (let i = 1; i < stream.length; i++) {
		if (Math.random() < STREAM_MUTATION_ODDS) {
			newStream.push(getRandChar());
		} else {
			newStream.push(stream[i]);
		}
	}
	newStream.push(getRandChar());
	return newStream;
};

const RainStream = props => {
	const [stream, setStream] = useState(getRandStream());
	const [topPadding, setTopPadding] = useState(stream.length * -50);
	const [intervalDelay, setIntervalDelay] = useState(null);

	// Initialize intervalDelay
	useEffect(() => {
		setTimeout(() => {
			setIntervalDelay(getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY));
		}, getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS));
	}, []);

	useInterval(() => {
		if (!props.height) return;

		if (!intervalDelay) return;

		// If stream is off the screen, reset it after timeout
		if (topPadding > props.height) {
			setStream([]);
			const newStream = getRandStream();
			setStream(newStream);
			setTopPadding(newStream.length * -44);
			setIntervalDelay(null);
			setTimeout(
				() =>
					setIntervalDelay(
						getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY),
					),
				getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS),
			);
		} else {
			setTopPadding(topPadding + 44);
		}
		// setStream(stream => [...stream.slice(1, stream.length), getRandChar()]);
		setStream(getMutatedStream);
	}, intervalDelay);

	return (
		<View style={[styles.streamContainer, { marginTop: topPadding }]}>
			{stream.map((char, index) => (
				<Text
					style={[
						{
							marginTop: -12,
							opacity: index < 6 ? 0.1 + index * 0.15 : 1,
							color: index === stream.length - 1 ? '#fff' : '#00ff00',
						},
					]}
					key={index}>
					{char}
				</Text>
			))}
		</View>
	);
};

const MatrixRain = props => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(null); 

  useEffect(() => {
      const boundingClientRect = containerRef.current.getBoundingClientRect();
      setContainerSize({
          width: boundingClientRect.width,
          height: boundingClientRect.height,
      });
  }, []);

  const streamCount = containerSize ? Math.floor(containerSize.width / 10) : 0; // Ajuste este número para controlar a densidade da "chuva"

  return (
		<View
			style={styles.container}
			onLayout={(event) => {
				const { width, height } = event.nativeEvent.layout;
				setContainerSize({ width, height });
			}}
			ref={containerRef}>
			{new Array(streamCount).fill().map((_, i) => (
				<RainStream key={i} height={containerSize?.height} />
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	streamContainer: {
		fontFamily: 'matrixFont', // Você precisaria importar e usar sua fonte aqui
		color: '#00ff00',
		textShadowRadius: 8,
		textShadowOffset: { width: 0, height: 0 },
		textShadowColor: 'rgba(32, 255, 32, 0.8)',
		fontSize: 20,
	},
	container: {
		backgroundColor: 'black',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		flexDirection: 'row',
	},
});

export default MatrixRain;