const Audio = ({ file, caption }) => {
	return (
		<div>
			<p>{caption}</p>
			<audio controls>
				<source src={file} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
		</div>
	);
};

export default Audio;
