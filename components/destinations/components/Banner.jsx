const Banner = ({ bannerImg, description, locationName }) => {
	return (
		<div className="col-12">
			<div className="relative d-flex">
				<img
					src={bannerImg}
					alt="image"
					className="col-12 rounded-20"
					style={{ maxHeight: '270px', objectFit: 'cover' }}
				/>
				<div className="absolute px-50 py-60 md:py-20 md:px-30" style={{ zIndex: 900 }}>
					<h1 className="text-50 fw-600 text-white lg:text-40 md:text-30">Properties in {locationName}</h1>
					<div className="text-white">{description}</div>
				</div>
				<div className="overlay-location"></div>
			</div>
		</div>
	);
};

export default Banner;
