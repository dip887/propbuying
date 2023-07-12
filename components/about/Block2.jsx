import Image from 'next/image';
import { useState } from 'react';
import ModalVideo from 'react-modal-video';

const Block2 = () => {
	const [isOpen, setOpen] = useState(false);

	const expertContent = [
		{
			id: 1,
			icon: '/img/featureIcons/1/1.svg',
			title: 'Best Price Guarantee',
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
		},
		{
			id: 2,
			icon: '/img/featureIcons/1/2.svg',
			title: 'Easy & Quick Booking',
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
		},
		{
			id: 3,
			icon: '/img/featureIcons/1/3.svg',
			title: 'Customer Care 24/7',
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
		},
	];

	return (
		<>
			<ModalVideo
				channel="youtube"
				autoplay
				isOpen={isOpen}
				videoId="rDYdeq3JW_E"
				onClose={() => setOpen(false)}
			/>

			<div className="section-bg__item -right -image col-5 md:mb-60 sm:mb-40 d-flex z-2">
				<Image width={450} height={350} src="/img/backgrounds/10.png" alt="image" />
				<div className="absolute col-12 h-full flex-center z-1">
					<div onClick={() => setOpen(true)} className="d-flex items-center js-gallery" role="button">
						<span className="button -outline-white text-white size-50 rounded-full flex-center">
							<i className="icon-play text-16" />
						</span>
						<span className="fw-500 text-white ml-15">Watch Video</span>
					</div>
				</div>
			</div>
			{/* End right video popup icon with image */}

			<div className="container">
				<div className="row">
					<div className="col-xl-4 col-md-7">
						<h2 className="text-30 fw-600">Why be a Local Expert</h2>
						<p className="mt-5">
							Assisted buying services are designed to help buyers navigate the complex and often
							confusing world of real estate. These services provide a range of benefits that can make the
							home buying process much easier and more enjoyable.
						</p>
					</div>
				</div>
			</div>

			{/* End left local expert content */}
		</>
	);
};

export default Block2;
