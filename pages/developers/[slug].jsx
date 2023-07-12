import CallToActions from '../../components/common/CallToActions';
import Seo from '../../components/common/Seo';
import Header2 from '../../components/header/header-2';
import Footer7 from '../../components/footer/footer-7';
import { sanityClient } from '../../clients/sanityClient';
import { useState } from 'react';
import HotelProperties from '../../components/hotel-list/hotel-list-v4/HotelProperties';
import DeveloperSidebar from '../../components/developerSidebar';

const Developers = ({ developerData, propertiesData }) => {
	const [query, setQuery] = useState('');
	const [properties, setProperties] = useState(propertiesData);
	const [filteredProperties, setFilteredProperties] = useState(propertiesData);
	const [locationsToBeFiltered, setLocationsToBeFiltered] = useState('');

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
						<div className="col-12">
							<div>
								<img
									src={developerData[0].logoImg}
									alt="image"
									className="rounded-4"
									style={{ objectFit: 'cover', aspectRatio: 'auto' }}
								/>
								<div className="pb-20 md:py-20 md:px-30">
									<h1 className="text-50 fw-600 lg:text-40 md:text-30">{developerData[0].name}</h1>
									<p>
										<span className="fw-500">Established</span>: {developerData[0].yearEstablished}
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* End .row */}

					<div className="row x-gap-20 y-gap-20 items-start pt-20 item_gap-x10">
						<div className="col-xl-3">
							<aside className="sidebar y-gap-40 xl:d-none search-filter-sidebar">
								<DeveloperSidebar
									locationsToBeFiltered={locationsToBeFiltered}
									setLocationsToBeFiltered={setLocationsToBeFiltered}
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
										<DeveloperSidebar
											locationsToBeFiltered={locationsToBeFiltered}
											setLocationsToBeFiltered={setLocationsToBeFiltered}
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
						{developerData[0].overview.map((item, i) => {
							if (item.style == 'normal' && item.listItem === 'bullet')
								return <li key={i}>• {item.children[0].text}</li>;
							if (item.style == 'h2') return <h2 key={i}>{item.children[0].text}</h2>;
							if (item.style == 'h3') return <h3 key={i}>{item.children[0].text}</h3>;
							if (item.style == 'normal') return <p key={i}>{item.children[0].text}</p>;
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

export default Developers;

export async function getServerSideProps(context) {
	const { slug } = context.query;

	const developerData = await sanityClient.fetch(`
  *[_type=="developer" && slug.current=="${slug}"]{
  "overview": aboutDeveloper,
  "name": developerName,
  "logoImg": logo.asset->url,
  yearEstablished
}
`);

	const propertiesData = await sanityClient.fetch(`
  *[_type=="property" && developer->slug.current=="${slug}"]{
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
 reraNumber,
}
`);

	return {
		props: {
			developerData,
			propertiesData,
		},
	};
}
