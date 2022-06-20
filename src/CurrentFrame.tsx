import {useCurrentFrame} from 'remotion';
export const CurrentFrame: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<div
			style={{
				fontSize: '50px',
				color: '#FFF',
				position: 'absolute',
				bottom: '5px',
				width: '100%',
				textAlign: 'center',
			}}
		>
			Current Frame: {frame}
		</div>
	);
};
