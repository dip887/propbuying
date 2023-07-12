const TestimonialRating = () => {
	return (
		<>
			<h2 className="text-30 text-white">What our customers are saying?</h2>
			<h5 className="testimonialh5">
				PropBuying.com is a top-notch real estate agency based in Pune that offers exceptional services to
				clients looking for their dream properties. With their professional approach and extensive knowledge of
				the real estate market, PropBuying.com is dedicated to helping individuals and families find their ideal
				homes or investment properties. Their commitment to providing personalized, trustworthy, and reliable
				services has earned them a reputation as one of the leading real estate agencies in Pune. As a satisfied
				client, I am delighted to share my experience working with PropBuying.com and highly recommend their
				services to anyone in search of a reliable and trustworthy real estate agency in Pune.
			</h5>

			<div className="row y-gap-30 text-white pt-60 lg:pt-40">
				<div className="col-4">
					<div className="text-30 lh-15 fw-600">2300+</div>
					<div className="lh-15">Happy Customers</div>
				</div>
				{/* End .col */}
				<div className="col-4">
					<div className="text-30 lh-15 fw-600">2300+</div>
					<div className="lh-15">Happy Customers</div>
				</div>
				<div className="col-4">
					<div className="text-30 lh-15 fw-600">2300+</div>
					<div className="lh-15">Happy Customers</div>
				</div>

				{/* End .col */}
			</div>
		</>
	);
};

export default TestimonialRating;
