import ContactInfo from './ContactInfo';
import Copyright from './Copyright';
import FooterContent from './FooterContent';
import AppButton from './AppButton';
import Subscribe from './Subscribe';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Footer = () => {
	const router = useRouter();

	useEffect(() => {
		const isPropertyPage = router.pathname.includes('pune-residential-property');
		function loadWhatsAppScript() {
			const scriptUrl = 'https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?60224';
			const scriptElement = document.createElement('script');

			scriptElement.type = 'text/javascript';
			scriptElement.async = true;
			scriptElement.src = scriptUrl;

			const options = {
				enabled: true,
				chatButtonSetting: {
					backgroundColor: '#4dc247',
					ctaText: 'Whatsapp Us',
					borderRadius: '25',
					marginLeft: '0',
					marginBottom: '50',
					marginRight: '50',
					position: 'right',
				},
				brandSetting: {
					brandName: 'PropBuying.com',
					brandSubTitle: "Let's find a home that suits your lifestyle.",
					brandImg: 'https://mumbaimirror.indiatimes.com/photo/79521015.cms',
					welcomeText:
						"👋 Hey, Welcome to PropBuying.com\nAre you nervous about your property adventure? Don’t be. Whether you're getting ready to buy or sell, in the middle of it, or just looking for some answers, our top-notch skilled experts will ensure that you will get the best experience possible.",
					messageText: 'Get Started',
					backgroundColor: '#194b71',
					ctaText: 'Start Chat',
					borderRadius: '25',
					autoShow: false,
					phoneNumber: '919021040782',
				},
			};

			scriptElement.onload = handleScriptLoad;
			scriptElement.onerror = handleScriptError;

			document.body.appendChild(scriptElement);

			function handleScriptLoad() {
				CreateWhatsappChatWidget(options);
			}

			function handleScriptError() {
				console.error('Failed to load WhatsApp script');
			}

			localStorage.setItem('isLoadedBtn', JSON.stringify({ loaded: true }));
		}

		if (!isPropertyPage) {
			loadWhatsAppScript();
		}

		return () => {
			const scriptElement = document.querySelector(
				"script[src='https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?60224']"
			);
			if (scriptElement) {
				document.body.removeChild(scriptElement);
			}
		};
	}, [router.pathname]);

	return (
		<>
			<div className="footer-sub">
				<div className="container">
					<Subscribe />
				</div>
			</div>

			<footer className="footer -type-1 text-white bg-blue-dark footer-blue_custom">
				<div className="container">
					<div className="pt-60 pb-60">
						{/* End .row */}
						<div className="row y-gap-40 justify-between xl:justify-start layout-pt-sm">
							<div className="col-xl-3 col-lg-4 col-sm-6">
								<h5 className="text-16 fw-500 mb-30">Contact Us</h5>
								<ContactInfo />
								<AppButton />
							</div>
							{/* End col */}

							<FooterContent />
							{/* End footer menu content */}
						</div>
						{/* End .row */}
					</div>
					{/* End footer top */}

					<div className="py-20 border-top-white-15 mobhid">
						<Copyright />
					</div>
					{/* End footer-copyright */}
				</div>
				{/* End container */}
			</footer>
		</>
	);
};

export default Footer;
