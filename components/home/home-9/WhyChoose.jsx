import Image from 'next/image';

const WhyChoose = () => {
	const whyChooseContent = [
		{
			id: 1,
			icon: '/img/featureIcons/3/1.svg',
			title: 'THE FASTEST WAY TO HOUSE-HUNTING',
			text: `Upon understanding your requirements, our algorithm will search the entire resale market for suitable units on sale, saving you time and effort in your own search.`,
			delayAnimaion: '100',
		},
		{
			id: 2,
			icon: '/img/featureIcons/3/2.svg',
			title: 'YOUR CONVENIENCE, OUR PRIORITY',
			text: `Choose to view in person or virtually. Upon short-listing your preferred properties, you can: Arrange for a physical on-site viewing
Schedule a video call with the agent who will walk you through the unit, answering all your questions`,
			delayAnimaion: '200',
		},
		{
			id: 3,
			icon: '/img/featureIcons/3/3.svg',
			title: 'LATEST PROPERTY INSIGHTS',
			text: `A customised property report on your chosen home will be provided to help you make an informed decision.`,
			delayAnimaion: '300',
		},
	];

	return (
		<>
			{whyChooseContent.map((item) => (
				<div className="col-sm-12" data-aos="fade-up" data-aos-delay={item.delayAnimaion} key={item.id}>
					<Image width={60} height="60" src={item.icon} alt="image" className="size-60" />
					<h5 className="text-18 fw-500 mt-10">{item.title}</h5>
					<p className="mt-10">{item.text}</p>
				</div>
			))}
		</>
	);
};

export default WhyChoose;
