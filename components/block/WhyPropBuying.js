import Image from 'next/image';

const WhyPropBuying = ({ developerName, propertyName, propertySlug }) => {
	const helpBlockContent = [
		{
			id: 1,
			icon: '/img/pages/help/icons/7.svg',
			title: `Lowest Price Guaranteed`,
			text: `Higly unlikely, but if you find a better price for `,
			property: `${developerName} ${propertyName} ,`,
			textCont: `we'll match it.`,
			slug: `${propertySlug}`,
		},
		{
			id: 2,
			icon: '/img/pages/help/icons/8.svg',
			title: `Full Service Support`,
			text: `Our team will guide you through the entire process of buying a home in `,
			property: `${developerName} ${propertyName},`,
			textCont: ` including site visits, home loans, paperwork, etc`,
			slug: `${propertySlug}`,
		},
		{
			id: 3,
			icon: '/img/pages/help/icons/9.svg',
			title: `Zero Brokerage`,
			text: `100% Service 0% brokerage. We don't charge any brokerage for `,
			property: `${developerName} ${propertyName}`,
			slug: `${propertySlug}`,
		},
	];
	return (
		<>
			{helpBlockContent.map((item) => (
				<div className="propblockenqUpp" key={item.id}>
					<div className="px-10 py-10 propblockenq">
						<div className="size-70 bg-white rounded-full flex-center icon-propblockenq">
							<Image width={50} height={50} src={item.icon} alt="icon" />
						</div>
						<div className="mt-10">
							<h3 className="text-16 fw-700">{item.title}</h3>
							<p className="text-14 fw-400">
								{item.text}
								<a href={`/pune-residential-property/${item.slug}`}>
									<strong>{item.property}</strong>
								</a>

								{item.textCont}
							</p>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default WhyPropBuying;
