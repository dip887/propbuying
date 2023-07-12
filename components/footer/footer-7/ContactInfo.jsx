const ContactInfo = () => {
	const contactContent = [
		{
			id: 1,
			title: 'Need help? Call us',
			action: 'tel:+(91) 9422594226',
			text: '+91 94225 94226',
		},
		{
			id: 2,
			title: 'Need live support?',
			action: 'mailto:support@abc.com',
			text: 'support@propbuying.com',
		},
	];
	return (
		<>
			{contactContent.map((item) => (
				<div className="mb-20" key={item.id}>
					<div className={'text-14'}>{item.title}</div>
					<a href={item.action} className="text-18 fw-500 text-dark-1 mt-5 footer-contact-links">
						{item.text}
					</a>
				</div>
			))}
		</>
	);
};

export default ContactInfo;
