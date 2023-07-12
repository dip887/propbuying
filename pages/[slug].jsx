import Seo from '../components/common/Seo';
import Header2 from '../components/header/header-2';
import Footer7 from '../components/footer/footer-7';
import Banner from '../components/destinations/components/Banner';
import { sanityClient } from '../clients/sanityClient';
import { useState } from 'react';
import LocationSidebar from '../components/locationSidebar';
import HotelProperties from '../components/hotel-list/hotel-list-v4/HotelProperties';

const Destinations = ({ locationData, propertiesData }) => {
	const [query, setQuery] = useState('');
	const [properties, setProperties] = useState(propertiesData);
	const [filteredProperties, setFilteredProperties] = useState(propertiesData);

	return (
		<div onClick={() => setQuery('')}>
			<Seo pageTitle="Destinations" />
			{/* End Page Title */}

			<div className="header-margin"></div>
			{/* header top margin */}

			<Header2 query={query} setQuery={setQuery} />
			{/* End Header 1 */}

			<section className="layout-pb-md">
				<div className="container">
					<div className="row mt-120">
						<Banner
							locationName={locationData[0].name}
							description={locationData[0].description}
							bannerImg={locationData[0].bannerImg}
						/>
					</div>
					{/* End .row */}

					<div className="row x-gap-20 y-gap-20 items-start pt-20 item_gap-x10 mt-50">
						<div className="col-xl-3">
							<aside className="sidebar y-gap-40 xl:d-none search-filter-sidebar">
								<LocationSidebar
									properties={properties}
									filteredProperties={filteredProperties}
									setFilteredProperties={setFilteredProperties}
								/>
							</aside>
							{/* End sidebar for desktop */}

							<div className="offcanvas offcanvas-start" tabIndex="-1" id="listingSidebar">
								<div className="offcanvas-header">
									<h5 className="offcanvas-title" id="offcanvasLabel">
										Filter Sidebar
									</h5>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="offcanvas"
										aria-label="Close"
									></button>
								</div>
								{/* End offcanvas header */}

								<div className="offcanvas-body">
									<aside className="sidebar y-gap-40  xl:d-block">
										<LocationSidebar
											properties={properties}
											filteredProperties={filteredProperties}
											setFilteredProperties={setFilteredProperties}
										/>
									</aside>
								</div>
								{/* End offcanvas body */}
							</div>
							{/* End mobile menu sidebar */}
						</div>
						{/* End col */}
						<div className="col-xl-9">
							<div className="col-auto header-links-wrapper">
								<div className="row x-gap-20 y-gap-20 ">
									<div className="col-auto d-none xl:d-block">
										<button
											data-bs-toggle="offcanvas"
											data-bs-target="#listingSidebar"
											className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
										>
											<i className="icon-up-down text-14 mr-10" />
											Filter
										</button>
									</div>
									{/* End .col */}
								</div>
								{/* End .row */}
							</div>
							<div className="mt-20 mb-30"></div>
							{/* End mt--30 */}
							<div className="propertyContainer">
								<HotelProperties properties={filteredProperties} />
							</div>
							{/* End .row */}
						</div>
					</div>
					{/* End .row */}

					<div className="row y-gap-20 pt-40">
						{/* End .col-auto */}
						{locationData[0].overview.map((item, i) => {
							if (item.style == 'normal' && item.listItem === 'bullet')
								return <li>• {item.children[0].text}</li>;
							if (item.style == 'h2') return <h2>{item.children[0].text}</h2>;
							if (item.style == 'h3') return <h3>{item.children[0].text}</h3>;
							if (item.style == 'normal') return <p>{item.children[0].text}</p>;
						})}
					</div>
				</div>
				{/* End .container */}
			</section>
			{/* End Top Banner,Properties, Overview */}

			<Footer7 />

			{/* End Call To Actions Section */}
		</div>
	);
};

export default Destinations;

export async function getServerSideProps(context) {
	const { slug } = context.query;

	const mySlug = slug.split('-')[2];

	const locationData = await sanityClient.fetch(`
    *[_type=="locality" && slug.current=="${mySlug}"]{
    "overview": aboutLocality,
    "name": localityName,
    "locationId": locality->_id,
    "description": localityPropertyDescription,
    "geolocation": {
    "lat": location.lat,
    "lng": location.lng,
  },
    "bannerImg": referenceImage.asset->url
}
`);

	const propertiesData = await sanityClient.fetch(`
    *[_type=="property" && locality->slug.current=="${mySlug}"]{
"id": _id,
  propertyName,
  projectStatus,
  projectPossession,
   "developerName": developer->developerName,
	"developerSlug":developer->slug.current,
  "location": locality->localityName,
  "locationId": locality->_id,
  "builderLogo": developer->logo.asset->url,
  configurations,
  "image": elevationImage.asset->url,
  shortDescription,
  "slug": slug.current,
  "builderName": developer->developerName,
 reraNumber
}
`);

	return {
		props: {
			locationData,
			propertiesData,
		},
	};
}
