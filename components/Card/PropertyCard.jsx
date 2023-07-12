import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FiMapPin } from 'react-icons/fi';
import { BiRightArrowAlt } from 'react-icons/bi';
import { BiPhoneCall } from 'react-icons/bi';
import { BiCar } from 'react-icons/bi';
import 'react-tabs/style/react-tabs.css';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import moment from 'moment';
import { numConvertion } from '../../utils/numberConvertion';
import Link from 'next/link';
import EnquireNowModal from '../modals/EnquireNowModal';
import CustomCalendlyButton from '../custom-button/CustomCalendlyButton';
import { calPriceRangeSingleProperty } from '../../utils/calculatePriceRange';
import { MdVerified } from 'react-icons/md';
const PropertyCard = ({ property }) => {
	const [currentProp, setCurrentProp] = useState([]);

	const uniqueBhks = useMemo(() => [...new Set(property.configurations.map((c) => c.unitType.slice(0, 2)[0]))], []);

	const numDifferentiation = useCallback(numConvertion, []);

	const startingPrice = useMemo(() => {
		let denomination = 'Lakh';

		let prices = property.configurations.filter((c) => c.denominatior === 'Lakh').map((c) => c.price);

		if (prices.length === 0) {
			prices = property.configurations.map((c) => c.price);
			denomination = 'Cr';
		}

		return `${Math.min(...prices)} ${denomination}`;
	}, []);

	const projectPossession = useMemo(() => {
		let resp = 'Started';

		const posDate = moment(property.projectPossession);
		if (posDate.isAfter(new Date())) {
			resp = posDate.format('MMM YY');
		}

		return resp;
	}, []);

	useEffect(() => {
		handleFilter(0);
	}, []);

	const minMaxPrice = useCallback(calPriceRangeSingleProperty(property), [property]);

	const handleFilter = (value) => {
		if (value === 0) {
			mapConf(property.configurations);
		} else {
			mapConf(property.configurations.filter((c) => c.unitType === `${value} BHK`));
		}
	};

	const mapConf = (data) => {
		setCurrentProp(
			data.map((c) => ({
				unitType: c.unitType,
				price: `${c.price} ${c.denominatior === 'Lakh' ? `Lc` : `CR`}`,
				size: `${c.sizeinSqFt}`,
				emi: Math.trunc(Number(c.price) * 0.8 * (c.denominatior === 'Lakh' ? 769 : 76900)),
			}))
		);
	};

	return (
		//card-wrapper
		<div className="card-wrapper">
			{/* top container */}
			<div className="top-container">
				{/* img container */}
				<div className="img-wrapper">
					<img src={property.image} alt={property.propertyName.trim()} />
					{/* info container */}
					<div className="info-wrapper">
						<div className="info-container">
							<img src={property.builderLogo} alt={property.propertyName.trim()} />
							<div className="prop-content">
								<div className="propNameLocation">
									<Link href={`/pune-residential-property/${property.slug}`}>
										<h5>
											{property.propertyName.trim()} <MdVerified className="verified-icon" />
										</h5>
									</Link>
									<div className="prop-location">
										<FiMapPin className="text-white" />
										<p>{property.location}</p>
									</div>
								</div>
								<div className="propDeveloper">
									<Link href={`/developers/${property.developerSlug}`}>
										<span className="developerName">{property.developerName}</span>
									</Link>

									<span className="developerRera">RERA: {property.reraNumber}</span>
								</div>
							</div>
						</div>

						<div className="prop-details-container">
							{/* units */}
							<div className="detail">
								<h6>
									Units
									<span>{uniqueBhks.join(', ')} BHK</span>
								</h6>
							</div>
							{/* starting */}
							<div className="detail">
								<h6>
									Starting
									<span>₹ {startingPrice}</span>
								</h6>
							</div>
							{/* possession */}
							<div className="detail">
								<h6>
									Possession
									{projectPossession == 'Started' ? (
										<span className="possession">{projectPossession}</span>
									) : (
										<span className="possessionYet">{projectPossession}</span>
									)}
								</h6>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* bottom container */}

			<div className="bottom-container">
				<Tabs>
					<TabList style={{ marginBottom: 0 }}>
						<Tab onClick={() => handleFilter(0)}>
							<button className="fw-500">
								All
								<span>{property.configurations.length}</span>
							</button>
						</Tab>
						{uniqueBhks.map((u, i) => (
							<Tab key={i} onClick={() => handleFilter(u)}>
								<button className="fw-500">{u} BHK</button>
							</Tab>
						))}
					</TabList>
					<TabPanel
						style={{
							overflowY: 'scroll',
							maxHeight: '66.9px',
						}}
					>
						<ul>
							{currentProp.map((p, i) => (
								<li key={i} className="flat-info">
									<div>
										<span>{p.unitType}</span>
									</div>
									<div>
										<span>
											{Math.floor(p.size)} <sup>sq.ft</sup>
										</span>
									</div>
									<div>
										<span>
											₹ {numConvertion(p.emi)}
											<ReactTooltip
												anchorSelect=".smallEMI"
												place="top"
												className="--rt-color-success"
												content="EMI Calulated With 8.5% Intrest Rate For 30 Years"
												events={['click']}
											/>
											<small id="smallEMI" className="smallEMI">
												PM
											</small>
										</span>
									</div>
									<div>
										<span>
											<strong>₹ {p.price}</strong>
										</span>
									</div>
								</li>
							))}
						</ul>
					</TabPanel>
					{uniqueBhks.map((u, i) => (
						<TabPanel key={i}>
							<ul>
								{currentProp.map((p, i) => (
									<li key={i} className="flat-info">
										<div>
											<span>{p.unitType}</span>
										</div>
										<div>
											<span>
												{Math.floor(p.size)} <sup>sq.ft</sup>
											</span>
										</div>
										<div>
											<span>
												₹ {numDifferentiation(p.emi)}
												<ReactTooltip
													anchorSelect=".smallEMI"
													place="top"
													content="EMI Calulated With 8.5% Intrest Rate For 30 Years"
													events={['click']}
												/>
												<small id="smallEMI" className="smallEMI">
													PM
												</small>
											</span>
										</div>
										<div>
											<span>
												<strong>₹ {p.price}</strong>
											</span>
										</div>
									</li>
								))}
							</ul>
						</TabPanel>
					))}
				</Tabs>
				<div className="info-btn-container">
					<a href={`/pune-residential-property/${property.slug}`}>
						<BiRightArrowAlt className="buttonIcons" />
						More
					</a>
					<CustomCalendlyButton style="button" text={`Visit`} />
					<EnquireNowModal
						developerName={property.builderName || property.developerName}
						propertyName={property.propertyName.trim()}
						propertyId={property.id}
						locationId={property.locationId}
						developerLogo={property.builderLogo}
						uniqueBhks={uniqueBhks}
						minPrice={minMaxPrice.min}
						propertySlug={property.slug}
						maxPrice={minMaxPrice.max}
						text={'Enquire'}
					/>
				</div>
			</div>
		</div>
	);
};

export default PropertyCard;
