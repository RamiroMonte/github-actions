import {Img} from 'remotion';
import styled from 'styled-components';

export const COVER_SIZE = 400;
const coverImage =
	'https://m.media-amazon.com/images/I/71Z0rLIvpuL._AC_SL1448_.jpg';

const Cover = styled.div`
	width: ${COVER_SIZE}px;
	height: ${COVER_SIZE}px;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
`;

export const AlbumComponent: React.FC = () => {
	return (
		<Cover>
			<Img src={coverImage} style={{height: COVER_SIZE, width: COVER_SIZE}} />
		</Cover>
	);
};
