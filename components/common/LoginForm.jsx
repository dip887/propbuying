import { useState, useEffect } from 'react';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import { setError } from '../../features/auth/authSlice';
import { auth } from '../../config/firebase';
import { RecaptchaVerifier } from 'firebase/auth';
import Link from 'next/link';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const LoginForm = () => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [otp, setOtp] = useState('');
	const [recaptchaToken, setRecaptchaToken] = useState('');
	const [verificationId, setVerificationId] = useState('');
	const [appVerifier, setAppVerifier] = useState(null);
	const [numberError, setNumberError] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		if (window) {
			window.recaptchaVerifier = new RecaptchaVerifier(
				'recaptcha-container',
				{
					size: 'invisible',
				},
				auth
			);
			window.recaptchaVerifier.verify();
			setAppVerifier(window.recaptchaVerifier);
		}
	}, [window]);

	useEffect(() => {
		if (recaptchaToken) {
			const submitButton = document.querySelector('#submit-button');
			submitButton.click();
		}
	}, [recaptchaToken]);

	const onRecaptchaChange = (token) => {
		setRecaptchaToken(token);
	};

	const handlePhoneNumberSubmit = async (e) => {
		e.preventDefault();
		setNumberError('');
		try {
			const res = await fetch('/api/req-otp', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ phoneNumber: `+${phoneNumber}` }),
			});
			const data = await res.json();
			setVerificationId(data.requestId);
		} catch (err) {
			dispatch(setError(err.message));
		}
		setIsSubmitted(true);
	};

	const handleOtpSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/verify-otp', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ otp, requestId: verificationId }),
			});
			const data = await res.json();
			if (data.message === 'Account verified!') {
				const user = {
					providerData: [
						{
							phoneNumber,
						},
					],
				};
				dispatch(setUser(user));
				localStorage.setItem('currentUser', JSON.stringify(user));
			}
		} catch (err) {
			console.log('errorrr', err);
		}
	};

	return (
		<form
			className="row y-gap-20"
			onSubmit={(e) => (isSubmitted ? handleOtpSubmit(e) : handlePhoneNumberSubmit(e))}
		>
			<div className="col-12">
				<h1 className="text-22 fw-500">Welcome back</h1>
				<p className="mt-10">
					Don&apos;t have an account yet?{' '}
					<Link href="/others-pages/signup" className="text-blue-1">
						Sign up for free
					</Link>
				</p>
			</div>
			{/* End .col */}
			<div className="col-12">
				<div className="form-input">
					{!isSubmitted ? (
						<PhoneInput
							country={'in'}
							value={phoneNumber}
							inputStyle={{ width: '100%' }}
							onChange={(phone) => setPhoneNumber(phone)}
						/>
					) : (
						<OtpInput
							value={otp}
							onChange={setOtp}
							numInputs={4}
							renderSeparator={<span>-</span>}
							renderInput={(props) => (
								<input required {...props} style={{ width: '60px', textAlign: 'center' }} />
							)}
						/>
					)}
				</div>
			</div>

			<div id="recaptcha-container"></div>
			{/* End .col */}
			<div className="col-12 flex items-center justify-start">
				<button
					disabled={numberError || !phoneNumber}
					type="submit"
					href="#"
					className={`button py-20 -dark-1 bg-blue-1 text-white ${isSubmitted ? 'w-1/3' : 'w-100'}`}
					style={{ opacity: numberError ? 0.5 : 1 }}
					id={`submit-button`}
				>
					{!isSubmitted ? 'Continue using phone number' : 'Verify OTP'}
				</button>
				{isSubmitted && (
					<button
						className="button py-20 px-10 ml-10 -dark-1 bg-blue-2 text-black w-1/2"
						onClick={() => setIsSubmitted(false)}
					>
						Edit phone number
					</button>
				)}
			</div>

			{numberError && <p className="text-red-1 text-sm text-center">{numberError}</p>}

			{/* End .col */}
		</form>
	);
};

export default LoginForm;
