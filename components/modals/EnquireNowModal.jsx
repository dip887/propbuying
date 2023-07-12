import { useEffect, useState } from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import WhyPropBuying from '../../components/block/WhyPropBuying';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'react-intl-tel-input/dist/main.css';
import { useSelector } from 'react-redux';
import { selectUser, setUser } from '../../features/auth/authSlice';
import { sanityClient } from '../../clients/sanityClient';
import { v4 as uuidv4 } from 'uuid';
import { numConvertion } from '../../utils/numberConvertion';
import EnquiryNowForm from './EnquiryNowForm';

const EnquireNowModal = ({
	developerLogo,
	developerName,
	propertyName,
	propertyId,
	uniqueBhks,
	locationId,
	minPrice,
	maxPrice,
	text,
	style,
	propertySlug,
}) => {
	const currentUser = useSelector(selectUser);
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [name, setName] = useState('');

	useEffect(() => {
		if (currentUser && currentUser.providerData[0]) {
			const enquiryData = JSON.parse(localStorage.getItem('enquiryData'));
			const data = {
				email: enquiryData?.email || currentUser.providerData[0].email || '',
				name: enquiryData?.name || currentUser.providerData[0].displayName || '',
				phoneNumber: enquiryData?.phoneNumber || currentUser.providerData[0].phoneNumber || '',
			};
			localStorage.setItem('enquiryData', JSON.stringify(data));
			setEmail(data.email || '');
			setName(data.name || '');
			setPhoneNumber(data.phoneNumber || '');
			return;
		}

		const storedData = JSON.parse(localStorage.getItem('enquiryData'));
		if (storedData) {
			setEmail(storedData.email || '');
			setName(storedData.name || '');
			setPhoneNumber(storedData.phoneNumber || '');
		}

		// Add check to set phoneNumber to an empty string if currentUser and open are falsy
		if (!currentUser && !open) {
			setPhoneNumber('');
		}

		return () => {
			const storedData = JSON.parse(localStorage.getItem('enquiryData'));
			if (storedData) {
				setEmail(storedData.email || '');
				setName(storedData.name || '');
				setPhoneNumber(storedData.phoneNumber || '');
			} else {
				setEmail('');
				setName('');
				setPhoneNumber('');
			}
		};
	}, [currentUser, open]);

	const handleOnClose = () => {
		setOpen(false);
		setEmail('');
		setPhoneNumber('');
		setName('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const enquiryData = {
			name,
			email,
			phoneNumber,
		};
		localStorage.setItem('enquiryData', JSON.stringify(enquiryData));
		const data = {
			_type: 'lead',
			leadEmail: email,
			leadName: name,
			leadPhone: `+${phoneNumber}`,
			shortlistedProperty: [
				{
					_type: 'shortlistedProperties',
					_key: uuidv4(),
					shortlistedProp: {
						_type: 'reference',
						_ref: propertyId,
					},
				},
			],
			requiredUnitSize: uniqueBhks.map((u) => `${u} BHK`),
			requrimentStage: [
				{
					_type: 'shortlistedLocations',
					_key: uuidv4(),
					shortlistedLocal: {
						_ref: locationId,
						_type: 'reference',
					},
				},
			],
			minPrice: Number(numConvertion(minPrice).split(' ')[0]),
			MaxPrice: Number(numConvertion(maxPrice).split(' ')[0]),
			maxDenominatior: numConvertion(maxPrice).split(' ')[1],
			minDenominatior: numConvertion(minPrice).split(' ')[1],
		};

		await sanityClient.create(data);
		setOpen(false);
		setEmail('');
		setPhoneNumber('');
		setName('');
	};

	return (
		<Popup
			open={open}
			onOpen={() => setOpen(true)}
			onClose={handleOnClose}
			modal
			closeOnDocumentClick={true}
			trigger={
				<button className={style || ''}>
					<BiPhoneCall className="buttonIcons" style={{ marginRight: '10px', fontSize: '23px' }} />
					{text}
				</button>
			}
			className="enquire-now-modal"
			position="right center"
		>
			<div className="col-12 form-container">
				<div className="col-6 enq-left">
					<h5 className="mb-10 text-yellow">How PropBuying Can Help ?</h5>
					<div className="row">
						<WhyPropBuying
							developerName={developerName}
							propertyName={propertyName}
							propertySlug={propertySlug}
						/>
					</div>
				</div>
				<div className="col-6 right px-20 py-10">
					<EnquiryNowForm
						developerLogo={developerLogo}
						developerName={developerName}
						propertyName={propertyName}
						email={email}
						setEmail={setEmail}
						setName={setName}
						name={name}
						handleSubmit={handleSubmit}
						phoneNumber={phoneNumber}
						setPhoneNumber={setPhoneNumber}
					/>
				</div>
			</div>
		</Popup>
	);
};

export default EnquireNowModal;
