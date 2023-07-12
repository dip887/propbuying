const Overview = ({ overview }) => {
	return (
		<>
			<p className="fw-400 text-black" style={{ marginTop: '15px' }}>
				{overview?.map((o, i) => (
					<span key={i}>
						{o.children[0].text}
						<br />
						<br />
					</span>
				))}
			</p>
		</>
	);
};

export default Overview;
