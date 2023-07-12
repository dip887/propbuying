import { useState, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { BiCar } from 'react-icons/bi';

const DynamicPopupModal = dynamic(() => import('react-calendly').then((mod) => mod.PopupModal), {
	ssr: false,
});

const CustomCalendlyButton = ({ text, style }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [dialCode, setDialCode] = useState('');

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('enquiryData'));
		if (storedData) {
			setEmail(storedData.email || '');
			setPhoneNumber(storedData.phoneNumber || '');
			setFirstName(storedData.name.split(' ')[0] || '');
			setLastName(storedData.name.split(' ')[1] || '');
			setDialCode(storedData.dialCode || '');
		}
	}, []);

	return (
		<>
			<button className={style || ''} onClick={() => setIsOpen(true)}>
				<BiCar className="buttonIcons" /> {text}
			</button>
			{isOpen && (
				<Suspense fallback={<div>Loading...</div>}>
					<DynamicPopupModal
						url={`${process.env.NEXT_PUBLIC_CALENDLY_URL}?location=${dialCode}${phoneNumber}&hide_event_type_details=1&primary_color=0d77b3`}
						styles={{
							height: '550px',
						}}
						prefill={{
							email,
							firstName,
							lastName,
							customAnswers: {
								1: 'In-Person Visit',
							},
						}}
						onModalClose={() => setIsOpen(false)}
						open={isOpen}
						rootElement={document.getElementById('__next')}
					/>
				</Suspense>
			)}
		</>
	);
};

export default CustomCalendlyButton;
