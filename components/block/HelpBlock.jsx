import Image from 'next/image';

const HelpBlock = ({
	configuration,
	possesion,
	projectArea,
	projectBuildings,
	projectUnits,
	reraNumber,
	startingPrice,
}) => {
	const helpBlockContent = [
		{
			id: 1,
			icon: '/img/pages/help/icons/1.svg',
			title: `${configuration} BHK`,
			text: `Configuration`,
		},
		{
			id: 2,
			icon: '/img/pages/help/icons/2.svg',
			title: possesion,
			text: `Possession Starts`,
		},
		{
			id: 3,
			icon: '/img/pages/help/icons/3.svg',
			title: projectArea,
			text: `Project Area`,
		},
		{
			id: 4,
			icon: '/img/pages/help/icons/4.svg',
			title: `${projectBuildings} Buildings - ${projectUnits} units`,
			text: `Project Size`,
		},
		{
			id: 5,
			icon: '/img/pages/help/icons/5.svg',
			title: reraNumber,
			text: `RERA ID`,
		},
		{
			id: 6,
			icon: '/img/pages/help/icons/6.svg',
			title: `₹ ${startingPrice}`,
			text: `Starting Price`,
		},
	];
	return (
		<>
			{helpBlockContent.map((item) => (
				<div className="col-lg-4 col-md-6 propblocken" key={item.id}>
					<div className="bg-blue-1-05 rounded-4 px-20 py-20">
						<div className="size-70 bg-white rounded-full flex-center">
							<Image width={30} height={30} src={item.icon} alt="icon" />
						</div>
						<div className="mt-10">
							<div className="text-16 fw-700">{item.title}</div>
							<div className="text-14 fw-400">{item.text}</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default HelpBlock;
