import React from 'react';
import { RWebShare } from 'react-web-share';

import './index.css';

const Index = ({ title, text, url }) => {
	return (
		<RWebShare
			data={{
				text: text,
				url: url,
				title: title,
			}}
		>
			<button className="share-button"> Share 🔗</button>
		</RWebShare>
	);
};

export default Index;
