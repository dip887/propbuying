import PhoneInput from 'react-phone-input-2';
const Subscribe = () => {
	return (
		<div className="row justify-between items-center">
			<div className="col-auto">
				<div className="d-flex flex-wrap items-center">
					<img src="https://img.icons8.com/?size=512&id=AEj6GBunmH1w&format=png" width={'70px'} alt="" />
					<div className="ml-30">
						<h4 className="text-26 text-dark fw-600">AssistedBuying - </h4>
						<div className="text-dark-1">
							Assisted buying services are designed to help buyers navigate the complex and often
							confusing world of real estate
						</div>
					</div>
				</div>
			</div>
			{/* End .col */}

			<div className="col-auto">
				<form className="single-field -w-410 d-flex x-gap-10 y-gap-20">
					{/* End input */}

					<div>
						<button type="submit" className="button -md h-60 bg-yellow-1 text-dark-1">
							Schedule Appointment
						</button>
					</div>
				</form>
			</div>
			{/* End .col */}
		</div>
	);
};

export default Subscribe;
