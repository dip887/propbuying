import Social from '../../common/social/Social';

const Copyright = () => {
	return (
		<div className="row justify-between items-center y-gap-10">
			<div className="col-auto">
				<div className="row x-gap-30 y-gap-10">
					<div className="col-auto">
						<div className="d-flex items-center">
							© {new Date().getFullYear()}
							<a href="#" className="mx-2 footerSiteName" target="_blank" rel="noopener noreferrer">
								PropBuying Realtors PVT LTD
							</a>
							All rights reserved.
						</div>
					</div>
					{/* End .col */}

					<div className="col-auto mt-5">
						<div className="d-flex x-gap-15">
							<a href="#">Privacy</a>
							<a href="#">Terms</a>
							<a href="#">Site Map</a>
						</div>
					</div>
					{/* End .col */}
				</div>
				{/* End .row */}
			</div>
			{/* End .col */}

			<div className="col-auto">
				<div className="row y-gap-10 items-center">
					{/* End .col */}

					<div className="col-auto">
						<div className="d-flex x-gap-20 items-center">
							<Social />
						</div>
					</div>
					{/* End .col */}
				</div>
			</div>
			{/* End .col */}
		</div>
	);
};

export default Copyright;
