import {Composition} from 'remotion';
import {Gradient} from './Gradient';
import {Scene3} from './Scene3';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Gradient"
				component={Gradient}
				width={720}
				height={1280}
				durationInFrames={30 * 4}
				fps={30}
			/>
			<Composition
				id="Scene3"
				component={Scene3}
				width={720}
				height={1280}
				durationInFrames={30 * 5}
				fps={30}
				defaultProps={{
					topSongName: 'All I Talk Is Money',
					topSongArtistName: 'Albusta',
				}}
			/>
		</>
	);
};
