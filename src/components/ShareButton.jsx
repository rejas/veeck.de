import React from 'react';
import { RWebShare } from 'react-web-share';

const ShareButton = ({ title, text, url }) => {
	return (
		<RWebShare
			data={{
				text: text || 'Like humans, flamingos make friends for life',
				url: url || 'https://on.natgeo.com/2zHaNup',
				title: title || 'Flamingos',
			}}
			onClick={() => console.log('shared successfully!')}
		>
			<button>Share 🔗</button>
		</RWebShare>
	);
};

export default ShareButton;
