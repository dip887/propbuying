import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';

export default function ScrollToTop() {
	const dispatch = useDispatch();

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('currentUser'));
		if (storedUser) {
			dispatch(setUser(storedUser));
		}
	}, []);
	const [isVisible, setIsVisible] = useState(false);

	// Top: 0 takes us all the way back to the top of the page
	// Behavior: smooth keeps it smooth!
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		// Button is displayed after scrolling for 500 pixels
		const toggleVisibility = () => {
			if (window.pageYOffset > 500) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);

		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	return <>{isVisible && !window.location.pathname.includes('hotel/hotel-single-v1') && <></>}</>;
}
