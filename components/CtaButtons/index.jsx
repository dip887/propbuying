import { useEffect, useState } from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { BiCar } from 'react-icons/bi';
import { AiOutlineWhatsApp } from 'react-icons/ai';
const CtaButtons = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Button is displayed after scrolling for 500 pixels
		const toggleVisibility = () => {
			if (window.pageYOffset > 100) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);

		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	return (
		<>
			{isVisible && (
				<div className="cta-container">
					<button className="button px-30 footer-call">
						<BiPhoneCall className="footer-icon" />
						Call
					</button>
					<button className="button px-30 footer-enq">
						<BiCar className="footer-icon" />
						Enquire
					</button>
					<button className="button px-30 footer-whatsapp">
						<AiOutlineWhatsApp className="footer-icon" />
						Whatsapp
					</button>
				</div>
			)}
		</>
	);
};

export default CtaButtons;
