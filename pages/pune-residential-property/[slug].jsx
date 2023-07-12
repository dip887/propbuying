import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import ModalVideo from 'react-modal-video';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { hotelsData } from '../../data/hotels';
import Seo from '../../components/common/Seo';
import Header2 from '../../components/header/header-2';
import Overview from '../../components/hotel-single/Overview';
import PopularFacilities from '../../components/hotel-single/PopularFacilities';
import RatingTag from '../../components/hotel-single/RatingTag';
import SidebarRight from '../../components/hotel-single/SidebarRight';
import Image from 'next/image';
import Surroundings from '../../components/hotel-single/Surroundings';
import Faq from '../../components/faq/Faq';
import Footer7 from '../../components/footer/footer-7';
import Link from 'next/link';
import HelpBlock from '../../components/block/HelpBlock';
import Slights from '../../components/block/Slights';
import { sanityClient } from '../../clients/sanityClient';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MdVerified } from 'react-icons/md';
import { numConvertion } from '../../utils/numberConvertion';
import { calPriceRangeSingleProperty } from '../../utils/calculatePriceRange';
import { lowestEmiCalculator } from '../../utils/lowestEmiCalculator';
import moment from 'moment';
import CtaButtons from '../../components/CtaButtons';
import MapComponent from '../../components/Map';
import SimilarProperties from '../../components/cruise/SimilarProperties';
import StickyHeader from '../../components/hotel-single/StickyHeader';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import CustomCalendlyButton from '../../components/custom-button/CustomCalendlyButton';
import EnquireNowModal from '../../components/modals/EnquireNowModal';

const CalendlyStepper = dynamic(() => import('../../components/stepper'), {
	ssr: false,
});

const HotelSingleV1Dynamic = ({ data, similarPropertiesData }) => {
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [name, setName] = useState('');
	const [numberError, setNumberError] = useState('');
	const [query, setQuery] = useState('');
	const [currentProp, setCurrentProp] = useState([]);
	const [similarProperties, setSimilarProperties] = useState(similarPropertiesData || []);

	const [isOpen, setOpen] = useState(false);
	const router = useRouter();
	const [hotel, setHotel] = useState({});
	const id = router.query.id;

	const currentUser = useSelector(selectUser);

	const uniqueBhks = useMemo(() => [...new Set(data[0].configurations.map((c) => c.unitType.slice(0, 2)[0]))], []);

	const handleFilter = (value) => {
		if (value === 0) {
			mapConf(data[0].configurations);
		} else {
			mapConf(data[0].configurations.filter((c) => c.unitType === `${value} BHK`));
		}
	};

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('enquiryData'));
		if (storedData) {
			setEmail(storedData.email || '');
			setName(storedData.name || '');
			setPhoneNumber(storedData.phoneNumber || '');
		} else if (currentUser && currentUser.providerData[0]) {
			const data = {
				email: currentUser.providerData[0].email || '',
				name: currentUser.providerData[0].displayName || '',
				phoneNumber: currentUser.providerData[0].phoneNumber || '',
			};
			localStorage.setItem('enquiryData', JSON.stringify(data));
			setEmail(data.email || '');
			setName(data.name || '');
			setPhoneNumber(data.phoneNumber || '');
		} else {
			setEmail('');
			setName('');
			setPhoneNumber('');
		}
	}, [currentUser]);

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
			leadPhone: phoneNumber,
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
		setEmail('');
		setPhoneNumber('');
		setName('');
	};

	const handlePhoneNumberChange = (status, value, countryData, number, id) => {
		if (!value) {
			setNumberError('Invalid phone number');
		} else {
			setNumberError('');
			setPhoneNumber(value);
		}
	};

	const mapConf = (d) => {
		const obj = d.map((c) => ({
			unitType: c.unitType,
			price: `${c.price} ${c.denominatior}`,
			size: `${c.size}`,
			emi: Math.trunc(Number(c.price) * 0.8 * (c.denominatior === 'Lakh' ? 769 : 76900)),
			img: c.image,
			title: data[0].title,
		}));

		setCurrentProp(obj);
	};

	const minMaxPrice = useCallback(calPriceRangeSingleProperty(data[0]), [data[0]]);

	useEffect(() => {
		if (!id) <h1>Loading...</h1>;
		else setHotel(hotelsData.find((item) => item.id == id));

		return () => {};
	}, [id]);

	useEffect(() => {
		handleFilter(0);
	}, []);

	const projectPossession = useMemo(() => {
		let resp = 'Started';

		const posDate = moment(data[0].projectPossession);
		if (posDate.isAfter(new Date())) {
			resp = posDate.format('MMMM YYYY');
		}

		return resp;
	}, []);

	//useEffect(() => {
	//  if (!localStorage.getItem("visitedProperties")) {
	//    localStorage.setItem("visitedProperties", JSON.stringify([]));
	//  }

	//  const visProps = JSON.parse(localStorage.getItem("visitedProperties"));
	//  const visitorId =
	//    visProps.length > 0
	//      ? visProps.find((p) => p.user.split("#")[0] === "visitor").user
	//      : "";

	//  const user = currentUser
	//    ? currentUser.uid
	//    : visitorId
	//    ? visitorId
	//    : `visitor#${uuidv4()}`;

	//  const propertiesVisitedByUser = visProps.find((p) => p.user === user);

	//  if (
	//    !propertiesVisitedByUser ||
	//    !propertiesVisitedByUser.properties.includes(data[0].id)
	//  ) {
	//    const updatedVisitedProperties = propertiesVisitedByUser
	//      ? {
	//          ...propertiesVisitedByUser,
	//          properties: [
	//            ...new Set([...propertiesVisitedByUser.properties, data[0].id]),
	//          ],
	//        }
	//      : {
	//          user,
	//          properties: [data[0].id],
	//        };

	//    localStorage.setItem(
	//      "visitedProperties",
	//      JSON.stringify([
	//        ...visProps.filter((p) => p.user !== user),
	//        updatedVisitedProperties,
	//      ])
	//    );
	//  }

	//  return async () => {
	//    const visitedProps = JSON.parse(
	//      localStorage.getItem("visitedProperties")
	//    );

	//    const visitedPropsOfCurrentUser = visitedProps.filter(
	//      (p) => p.user === user
	//    )[0];

	//    const data = {
	//      _id: currentUser ? currentUser.uid : user.split("#")[1],
	//      _type: "user",
	//      userEmail: currentUser ? currentUser.providerData[0].email || "" : "",
	//      userName: currentUser
	//        ? currentUser.providerData[0].displayName || ""
	//        : "Visitor",
	//      userPhone: currentUser
	//        ? currentUser.providerData[0].phoneNumber || ""
	//        : "",
	//      favdProperty: visitedPropsOfCurrentUser.properties.map((p) => ({
	//        _type: "shortlistedProperties",
	//        _key: uuidv4(),
	//        shortlistedProp: {
	//          _type: "reference",
	//          _ref: p,
	//        },
	//      })),
	//    };

	//    const res = await sanityClient.createOrReplace(data);
	//    console.log(res);
	//  };
	//}, [currentUser, router.query.slug]);

	return (
		<div onClick={() => setQuery('')}>
			<ModalVideo
				channel="youtube"
				autoplay
				isOpen={isOpen}
				videoId="oqNZOOWF8qM"
				onClose={() => setOpen(false)}
			/>

			<Seo
				developerName={data[0].developerName}
				locality={data[0].location}
				projectName={data[0].title}
				shortDescription={data[0].shortDescription}
			/>
			{/* End Page Title */}

			<div className="header-margin"></div>
			{/* header top margin */}

			{/* remember to give query and set query to make search bar go reset */}
			<Header2 query={query} setQuery={setQuery} />
			{/* End Header 1 */}

			<StickyHeader
				propertyName={data[0].title}
				builderLogo={data[0].builderLogo}
				dataDescription={data[0].shortDescription}
				developerName={data[0].developerName}
			/>

			{/* sticky single header for hotel single */}

			<section className="section-bg">
				<div className="section-bg__item w-100">
					<Image
						width={1920}
						height={400}
						src={data[0].image}
						alt="image"
						priority
						style={{ objectFit: 'cover' }}
					/>
				</div>
				{/* End section-bg__item */}

				<div className="container hero-property">
					<div className="row justify-center hero-property-inner-in">
						<div className="col-xl-2 col-lg-2">
							<img src={data[0].builderLogo} alt="image" className="rounded-4 builder-logo" />
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6">
							<h1 className="text-28 md:text-25 fw-600 text-white">
								{data[0].developerName}
								{data[0].title} <MdVerified className="verified-icon" />
							</h1>

							<h5 className="text-16 text-white fw-300 ">
								{data[0].location} <span>Show On Map</span>
							</h5>
							<h4 className="text-white mt-10 heroSmallH">
								{data[0].shortDescription} |{' '}
								<span className="fw-500">
									EMI Starts at ₹ {lowestEmiCalculator(calPriceRangeSingleProperty(data[0]).min)}
								</span>
							</h4>
						</div>

						<div className="col-xl-4 col-lg-4 col-md-4">
							<CustomCalendlyButton
								style="button enqFormButtonTwo md:mt-10 w-100"
								text={'Schedule a visit'}
							/>
							<EnquireNowModal
								style="button callNowBtn mt-10 w-100"
								developerName={data[0].builderName || data[0].developerName}
								propertyName={data[0].title.trim()}
								propertyId={data[0].id}
								locationId={data[0].locationId}
								developerLogo={data[0].builderLogo}
								uniqueBhks={uniqueBhks}
								minPrice={minMaxPrice.min}
								maxPrice={minMaxPrice.max}
								text={'Arrange a callback'}
							/>
						</div>
					</div>
				</div>
				{/* End .container */}
			</section>
			{/* End gallery grid wrapper */}

			<section className="pt-30">
				<div className="container">
					<div className="row y-gap-30">
						<div className="col-xl-8">
							<div className="row y-gap-40">
								<h3 className="text-22 fw-500">
									{data[0].developerName} {data[0].title}: Overview
								</h3>
								<div className="row y-gap-10  x-gap-10 pt-10 lg:pt-40">
									<HelpBlock
										configuration={uniqueBhks.join(',')}
										possesion={projectPossession}
										projectArea={data[0].projectArea}
										projectBuildings={data[0].projectBuildings}
										projectUnits={data[0].projectUnits}
										reraNumber={data[0].reraNumber}
										startingPrice={numConvertion(calPriceRangeSingleProperty(data[0]).min)}
									/>
								</div>
								{/* End .col-12 Property highlights */}
								<div id="gallery" className="col-12">
									<h3 className="text-22 fw-500 pt-40 border-top-light">
										{data[0].developerName} {data[0].title} Gallery
									</h3>
									<Gallery>
										<div className="galleryGrid -type-1 pt-30">
											<div className="galleryGrid__item relative d-flex">
												<Item
													original={data[0].galleryImages[0]}
													thumbnail={data[0].galleryImages[0]}
													width={660}
													height={660}
												>
													{({ ref, open }) => (
														<img
															src={data[0].galleryImages[0]}
															ref={ref}
															onClick={open}
															alt="image"
															role="button"
															className="rounded-4"
														/>
													)}
												</Item>
												<div className="absolute px-20 py-20 col-12 d-flex justify-end">
													<button className="button -blue-1 size-40 rounded-full flex-center bg-white text-dark-1">
														<i className="icon-heart text-16" />
													</button>
												</div>
											</div>
											{/* End .galleryGrid__item */}

											<div className="galleryGrid__item">
												<Item
													original={data[0].galleryImages[1]}
													thumbnail={data[0].galleryImages[1]}
													width={450}
													height={375}
												>
													{({ ref, open }) => (
														<img
															ref={ref}
															onClick={open}
															src={data[0].galleryImages[1]}
															alt="image"
															className="rounded-4"
															role="button"
														/>
													)}
												</Item>
											</div>
											{/* End .galleryGrid__item */}

											<div className="galleryGrid__item relative d-flex">
												<img
													src={data[0].galleryImages[2]}
													alt="image"
													className="rounded-4"
													role="button"
												/>
												<div className="absolute h-full col-12 flex-center">
													<div
														className="button -blue-1 size-40 rounded-full flex-center bg-white text-dark-1 js-gallery"
														role="button"
														onClick={() => setOpen(true)}
													>
														<i className="icon-play text-16" />
													</div>
												</div>
											</div>
											{/* End .galleryGrid__item */}

											<div className="galleryGrid__item">
												<Item
													original={data[0].galleryImages[3]}
													thumbnail={data[0].galleryImages[3]}
													width={450}
													height={375}
												>
													{({ ref, open }) => (
														<img
															ref={ref}
															onClick={open}
															src={data[0].galleryImages[3]}
															alt="image"
															className="rounded-4"
															role="button"
														/>
													)}
												</Item>
											</div>
											{/* End .galleryGrid__item */}

											<div className="galleryGrid__item relative d-flex">
												<img src={data[0].galleryImages[4]} alt="image" className="rounded-4" />
												<div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
													<Item
														original={data[0].galleryImages[4]}
														thumbnail={data[0].galleryImages[4]}
														width={450}
														height={375}
													>
														{({ ref, open }) => (
															<div
																className="button -blue-1 px-24 py-15 bg-white text-dark-1 js-gallery"
																ref={ref}
																onClick={open}
																role="button"
															>
																See All Photos
															</div>
														)}
													</Item>
												</div>
											</div>
											{/* End .galleryGrid__item */}
										</div>
									</Gallery>
								</div>
								<div id="config" className="col-12">
									<h3 className="text-22 fw-500 pt-40 border-top-light">
										{data[0].developerName} {data[0].title} Availabel Units
									</h3>
									<Tabs>
										<TabList style={{ marginBottom: 0 }}>
											<Tab onClick={() => handleFilter(0)}>
												<button className="fw-500">
													All
													<span>{data[0].configurations.length}</span>
												</button>
											</Tab>
											{uniqueBhks.map((u, i) => (
												<Tab key={i} onClick={() => handleFilter(u)}>
													<button className="fw-500">{u} BHK</button>
												</Tab>
											))}
										</TabList>
										<TabPanel>
											<ul>
												{currentProp.map((p, i) => (
													<Slights
														data={data}
														uniqueBhks={uniqueBhks}
														minMaxPrice={minMaxPrice}
														index={i}
														item={p}
														key={i}
													/>
												))}
											</ul>
										</TabPanel>
										{uniqueBhks.map((u, i) => (
											<TabPanel key={i}>
												<ul>
													{currentProp.map((p, i) => (
														<Slights
															data={data}
															uniqueBhks={uniqueBhks}
															minMaxPrice={minMaxPrice}
															index={i}
															item={p}
															key={i}
														/>
													))}
												</ul>
											</TabPanel>
										))}
									</Tabs>
								</div>
								<div id="overview" className="col-12">
									<h3 className="text-22 fw-500 pt-40 border-top-light">
										{data[0].developerName} {data[0].title} Overview
									</h3>
									<Overview overview={data[0].overview} />
								</div>

								{/* End .col-12  Overview */}

								<div className="col-12">
									<h3 className="text-22 fw-500 pt-40 border-top-light">
										{data[0].developerName} {data[0].title} Amenities
									</h3>
									<div className="row y-gap-10 pt-20">
										<PopularFacilities amenities={data[0].amenities} />
									</div>
								</div>

								{/* End .col-12 Most Popular Facilities */}
								<div className="row">
									<div className="col-12">
										<h3 className="text-22 fw-500 pt-40 border-top-light">
											{data[0].developerName} {data[0].title} Specifications
										</h3>
									</div>
								</div>
								{/* End .row */}

								<div className="row x-gap-50 y-gap-30 pt-20">
									<Surroundings specifications={data[0].specifications} />
								</div>
								<div id="map">
									<h3 class="text-22 fw-500 pt-40 border-top-light mb-30">
										{data[0].developerName} {data[0].title} Neighbourhood - Map View
									</h3>

									<MapComponent lat={data[0].geolocation.lat} lng={data[0].geolocation.lng} />
								</div>
								{data[0].offers.map((o, i) => (
									<div className="col-12" key={i}>
										<h3 class="text-22 fw-500 pt-40 border-top-light mb-30">
											{data[0].developerName} {data[0].title} Current Offer
										</h3>
										<RatingTag offer={o} />
									</div>
								))}
								{/* End .col-12 This property is in high demand! */}
								<section className="mb-40 col-12">
									<div className="row y-gap-30">
										<h3 class="text-22 fw-500 pt-40 border-top-light">
											{data[0].developerName} {data[0].title} FAQs
										</h3>
										<div className="accordion -simple  y-gap-20 js-accordion">
											<Faq
												developerName={data[0].developerName}
												propertyName={data[0].title}
												amenities={data[0].amenities.slice(0, 5)}
												constructionStage={data[0].constructionStage}
												minPrice={numConvertion(minMaxPrice.min)}
												uniqueBhks={uniqueBhks}
											/>
										</div>
									</div>
								</section>
							</div>
							{/* End .row */}
						</div>

						{/* End .col-xl-8 */}

						<SidebarRight
							developerLogo={data[0].builderLogo}
							developerName={data[0].developerName}
							email={email}
							name={name}
							setEmail={setEmail}
							setName={setName}
							handlePhoneNumberChange={handlePhoneNumberChange}
							handleSubmit={handleSubmit}
							numberError={numberError}
							phoneNumber={phoneNumber}
							setPhoneNumber={setPhoneNumber}
							propertyName={data[0].title}
						/>
						{/* End .col-xl-4 */}
					</div>
					{/* End .row */}
				</div>
				{/* End container */}
			</section>

			{/* End Faq about sections */}

			{similarProperties.length > 0 && (
				<section className="layout-pt-md layout-pb-lg">
					<div className="container">
						<div className="row justify-center text-center">
							<div className="col-auto">
								<div className="sectionTitle -md">
									<h2 className="sectionTitle__title">
										Popular properties similar to {data[0].title}
									</h2>
									<p className=" sectionTitle__text mt-5 sm:mt-0">
										Interdum et malesuada fames ac ante ipsum
									</p>
								</div>
								{/* End sectionTitle */}
							</div>
							{/* End .col */}
						</div>
						{/* End .row */}

						<div className="pt-40 sm:pt-20 item_gap-x30">
							<SimilarProperties similarProperties={similarProperties} />
						</div>
						{/* End slide hotel */}
					</div>
					{/* End .container */}
				</section>
			)}
			{/* End similar hotel */}

			<CtaButtons />
			{/* End Call To Actions Section */}

			<Footer7 />
		</div>
	);
};

export default HotelSingleV1Dynamic;

export async function getServerSideProps(context) {
	const { slug } = context.query;

	const data = await sanityClient.fetch(`
    *[_type=="property" && slug.current=="${slug}"]{
    "id": _id,
    "image": elevationImage.asset->url,
    "galleryImages": projectGallery[].asset->url,
    "configurations": configurations[]{
    "image": floorplan.asset->url,
    price,
    denominatior,
    "size": sizeinSqFt,
    unitType
  },
    "title": propertyName,
    "slug": slug.current,
    amenities,
    "location": locality->localityName,
    "locationId": locality->_id,
    "overview": aboutProperty,
    "developerName": developer->developerName,
    "builderLogo": developer->logo.asset->url,
    "shortDescription": shortDescription,
    projectArea,
    projectBuildings,
    "constructionStage": projectStatus,
    projectPossession,
    projectUnits,
    reraNumber,
    "geolocation": {
    "lat": propertyType.lat,
    "lng": propertyType.lng
  },
  "specifications": [
  {
    "name": "Flooring",
    "list": [
      {
        "name": "Bathroom Flooring",
        "value": bathroomFlooring
      },
      {
        "name": "Master Bathroom Flooring",
        "value": masterBedroomFlooring
      },
        {
        "name": "Living Area Flooring",
        "value": livingAreaFlooring
      },
      {
        "name": "Other Bedroom Flooring",
        "value": otherBedroomFlooring
      },
    ]

  },
      {
        "name": "Walls",
        "list": [
          {
            "name": "Master Bedroom Walls",
            "value": masterBedroomWalls
          },
          {
            "name": "Project Walls",
            "value": projectWalls
          },
        ]
      },
      {
        "name": "Fittings",
        "list": [
          {
        "name": "Bathroom Fittings",
        "list": bathroomFittings,
      },
      {
        "name": "Kitchen Fittings",
        "list": kitchenFittings,
      },
      {
        "name": "Apartment Fittings",
        "list": apartmentFittings,
      },
        ]
      }
],
"offers": offer[] {
    "name": offerName,
    "validTill": validTill,
    "image": offerImage.asset->url
  }
}
  `);

	const similarPropertiesData = await sanityClient.fetch(`
  *[_type=="property" && locality->localityName == "${data[0]?.location}" && _id != "${data[0].id}"]{
  "id": _id,
  propertyName,
  projectStatus,
  projectPossession,
  "location": locality->localityName,
  "builderLogo": developer->logo.asset->url,
  configurations,
  "image": elevationImage.asset->url,
  shortDescription,
  "slug": slug.current,
  "overview": aboutProperty
}
`);

	return {
		props: { data, similarPropertiesData },
	};
}
