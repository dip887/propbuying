import React from 'react';
import startsWith from 'lodash.startswith';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { MdVerified } from 'react-icons/md';
const EnquiryNowForm = ({
	developerLogo,
	developerName,
	propertyName,
	handleSubmit,
	setName,
	name,
	email,
	setEmail,
	phoneNumber,
	setPhoneNumber,
}) => {
	return (
		<>
			<div className="enq-logo-msg">
				<div className="enq-logo">
					<img src={developerLogo} className="rounded-4 enq-logo" alt={developerName} />
				</div>
				<div className="enq-msg">
					<h6 className="mt-5">Interested to buy property in</h6>
					<h5 className="mt-5 developer-name mb-10">
						{developerName} {propertyName} <MdVerified className="verified-icon" />
					</h5>
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="col-12">
					<div className="form-input">
						<input
							type="text"
							name="name"
							required
							className="pt-20"
							onChange={(e) => setName(e.target.value)}
							value={name}
							autocomplete="given-name"
						/>
						<label className="lh-1 text-14 text-light-1">Name</label>
					</div>
				</div>
				{/* end email */}
				<div className="col-12 my-2">
					<div className="form-input">
						<input
							type="email"
							name="email"
							required
							className="pt-20"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							autocomplete="email"
						/>
						<label className="lh-1 text-14 text-light-1">Email</label>
					</div>
				</div>
				{/* end email */}
				<div className="col-12 mb-3">
					<div className="form-input">
						<PhoneInput
							isValid={(inputNumber, country, countries) => {
								return countries.some((country) => {
									return (
										startsWith(inputNumber, country.dialCode) ||
										startsWith(country.dialCode, inputNumber)
									);
								});
							}}
							required
							country={'in'}
							value={phoneNumber}
							inputStyle={{
								width: '100%',
								outline: 'none',
							}}
							name="phone"
							autocomplete="phone"
							onChange={(phone) => setPhoneNumber(phone)}
						/>
					</div>
				</div>
				{/* end number */}
				<button
					disabled={!phoneNumber || !email || !name}
					style={{
						opacity: !phoneNumber ? 0.5 : 1,
						cursor: !phoneNumber ? 'not-allowed' : 'pointer',
					}}
					className="button enqFormButton"
					type="submit"
				>
					Submit
				</button>
				<p className="text-12 mt-5 text-center">
					By clicking submit, you agree to our Terms and Conditions & Privacy Policy
				</p>
			</form>
		</>
	);
};

export default EnquiryNowForm;
