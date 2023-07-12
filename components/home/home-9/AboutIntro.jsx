const AboutIntro = () => {
	return (
		<section className="section-bg layout-pt-lg layout-pb-lg">
			<div className="section-bg__item -right -w-1165 bg-light-2" />
			<div className="section-bg__item -video-left">
				<div className="row y-gap-30">
					<div className="col-sm-6">
						<img src="/img/video/1.png" alt="image" />
					</div>
					{/* End .col */}

					<div className="col-sm-6">
						<img src="/img/video/2.png" alt="image" />
					</div>
				</div>
				{/* End .row */}
			</div>
			{/* End .section-bg__item */}

			<div className="container lg:mt-30">
				<div className="row">
					<div className="offset-xl-6 col-xl-5 col-lg-6">
						<h2 className="text-30 fw-600">Find a home that suits your lifestyle.</h2>
						<p className="text-dark-1 mt-40 lg:mt-20 sm:mt-15">
							Nervous about your property adventure? Don&apos;t be. Whether you&apos;re getting ready to
							buy or sell, in the middle of it, or just looking for some answers, our top-notch skills
							ensure you get the best experience possible.
						</p>
						<div className="d-inline-block mt-40 lg:mt-30 sm:mt-20 w-100">
							<a href="#" className="button -md -blue-1 bg-yellow-1 text-dark-1 w-100">
								Learn More <div className="icon-arrow-top-right ml-15" />
							</a>
						</div>
					</div>
				</div>
				{/* End .row */}
			</div>
			{/* End .col */}
		</section>
	);
};

export default AboutIntro;
