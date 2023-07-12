const AppButton = () => {
	const appContent = [
		{
			id: 1,
			icon: 'icon-apple',
			link: '#',
			text: 'Launching Soon',
			market: 'Apple Store',
			colClass: '',
		},
		{
			id: 2,
			icon: 'icon-play-market',
			link: '#',
			text: 'Get in on',
			market: 'Launching Soon',
			colClass: 'mt-20',
		},
	];

	return (
		<>
			{appContent.map((item) => (
				<div
					className={`d-flex items-center px-20 py-10 rounded-4 border-light  ${item.colClass}`}
					key={item.id}
				>
					<i className={`${item.icon} text-24`} />
					<a href={item.link} className="ml-20 d-block disabled">
						<div className="text-14 text-white">{item.text}</div>
						<div className="text-15 lh-1 fw-500">{item.market}</div>
					</a>
				</div>
			))}
		</>
	);
};

export default AppButton;
