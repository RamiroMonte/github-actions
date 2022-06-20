import {AbsoluteFill, interpolate, spring} from 'remotion';
import {AlbumComponent, COVER_SIZE} from './AlbumComponent';
import {useCurrentFrame, useVideoConfig} from 'remotion';

import {CurrentFrame} from './CurrentFrame';
import {Gradient} from './Gradient';
import styled from 'styled-components';

const CIRCLE_SIZE = 500;

const Circle = styled.div`
	width: ${CIRCLE_SIZE}px;
	height: ${CIRCLE_SIZE}px;
	border-radius: ${CIRCLE_SIZE}px;
	background: #fff;
	overflow: hidden;
	position: absolute;
`;

const Title = styled.div`
	font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	color: #fff;
	font-size: 50px;
	font-weight: 600;
	text-align: center;
	position: absolute;
	width: 100%;
	top: 300px;
	text-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
	padding-left: 50px;
	padding-right: 50px;
`;

export const Scene3: React.FC<{
	topSongName: string;
	topSongArtistName: string;
}> = ({topSongName, topSongArtistName}) => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();
	const progress = spring({
		frame,
		fps,
		config: {
			damping: 200,
		},
	});
	const scale = interpolate(progress, [0, 1], [4, 1]);

	const coverOpacity = interpolate(progress, [0.7, 1], [0, 1]);
	const coverScale = interpolate(progress, [0.6, 1], [0.7, 1]);

	const UPSTART = 60;

	const upAnimation = spring({
		frame: frame - UPSTART,
		fps,
		config: {
			damping: 200,
		},
	});
	const contentTranslateY = interpolate(upAnimation, [0, 1], [0, -250]);

	const textOpacity = (() => {
		if (frame < UPSTART) {
			return interpolate(progress, [0.9, 1], [0, 1]);
		}
		return interpolate(upAnimation, [0, 1], [1, 0]);
	})();

	const bottomTextOpacity = spring({
		frame: frame - UPSTART - 15,
		fps,
		config: {
			mass: 0.45,
		},
	});
	const artistTextOpacity = spring({
		frame: frame - UPSTART - 40,
		fps,
		config: {
			mass: 0.45,
		},
	});

	return (
		<AbsoluteFill style={{backgroundColor: '#4e00f9'}}>
			<AbsoluteFill
				style={{
					transform: `translateY(${contentTranslateY}px)`,
				}}
			>
				<Title style={{opacity: textOpacity}}>
					One song helped you get <br />
					through it all
				</Title>
				<Title style={{opacity: artistTextOpacity, top: 1030, fontSize: 25}}>
					{topSongArtistName}
				</Title>
				<Title
					style={{
						top: 1100,
						fontSize: 40,
						opacity: bottomTextOpacity,
					}}
				>
					Your top song of the year is {topSongName}.
				</Title>
				<Circle
					style={{
						opacity: progress,
						transform: `scale(${scale})`,
						left: width / 2 - CIRCLE_SIZE / 2,
						top: height / 2 - CIRCLE_SIZE / 2 + 100,
					}}
				>
					<Gradient height={CIRCLE_SIZE} />
				</Circle>
				<div
					style={{
						opacity: coverOpacity,
						transform: `scale(${coverScale})`,
						left: width / 2 - COVER_SIZE / 2,
						top: height / 2 - COVER_SIZE / 2 + 100,
						position: 'absolute',
					}}
				>
					<AlbumComponent />
				</div>
			</AbsoluteFill>
			<CurrentFrame />
		</AbsoluteFill>
	);
};
