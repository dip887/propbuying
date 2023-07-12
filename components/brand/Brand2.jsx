const Brand2 = () => {
	const brandImages = ['1', '1', '1', '1', '1', '1'];
	return (
		<>
			{brandImages.map((item, i) => (
				<div className="col-md-auto col-md-2 col-sm-2" key={i}>
					<div className="d-flex justify-center">
						<img src={`/img/clients/${item}.png`} className="developerLogoHome" alt="image" />
					</div>
				</div>
			))}
		</>
	);
};

export default Brand2;
