import Link from 'next/link';
import { useEffect, useState } from 'react';
import CustomCalendlyButton from '../custom-button/CustomCalendlyButton';
import { MdVerified } from 'react-icons/md';
const StickyHeader = ({ hotel, propertyName, builderLogo, developerName, dataDescription }) => {
	const [header, setHeader] = useState(false);

	const changeBackground = () => {
		if (window.scrollY >= 200) {
			setHeader(true);
		} else {
			setHeader(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', changeBackground);
	}, []);

	return (
		<div className={`singleMenu js-singleMenu ${header ? '-is-active' : ''}`}>
			<div className="singleMenu__content">
				<div className="container">
					<div className="row y-gap-20 justify-between items-center">
						<div className="sticky-header-property">
							<div className="flex justify-between items-center  x-gap-30 y-gap-10">
								<img
									src={builderLogo}
									alt="image"
									style={{
										width: '120px',
										objectFit: 'contain',
									}}
									className="rounded-4 builder-logo"
								/>
								<h5>
									{propertyName} By {developerName} <MdVerified className="verified-icon" />
									<span>{dataDescription}</span>
								</h5>
								<CustomCalendlyButton style="button enqFormButton" text={'Schedule Visit'} />
							</div>
						</div>
						{/* End .col */}

						{/* End .col */}
					</div>
					{/* End .row */}
				</div>
				{/* End .container */}
			</div>
			{/* End .singleMenu__content */}
		</div>
	);
};

export default StickyHeader;
