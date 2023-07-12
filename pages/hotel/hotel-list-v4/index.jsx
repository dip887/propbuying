import { useState } from 'react';
import CallToActions from '../../../components/common/CallToActions';
import Seo from '../../../components/common/Seo';
import Header2 from '../../../components/header/header-2';
import Footer7 from '../../../components/footer/footer-7';
import TopHeaderFilter from '../../../components/hotel-list/hotel-list-v4/TopHeaderFilter';
import Sidebar from '../../../components/hotel-list/hotel-list-v4/Sidebar';
import HotelProperties from '../../../components/hotel-list/hotel-list-v4/HotelProperties';
import { sanityClient } from '../../../clients/sanityClient';
import TopBar from '../../../components/hotel-list/topbar';
import { useRouter } from 'next/router';

const QUERY = `
  *[_type=="property"]{
    "id": _id,
    propertyName,
    "postedAt": _updatedAt,
    projectStatus,
    projectPossession,
    reraNumber,
    "developerName": developer->developerName,
    "developerSlug":developer->slug.current,
    "location": locality->localityName,
    "builderLogo": developer->logo.asset->url,
    configurations,
    "image": elevationImage.asset->url,
    shortDescription,
    "slug": slug.current
}
`;

const Index = ({ data }) => {
	const router = useRouter();
	const [query, setQuery] = useState('');
	const [properties, setProperties] = useState(data);
	const [filteredProperties, setFilteredProperties] = useState(data);
	const [locationsToBeFiltered, setLocationsToBeFiltered] = useState([]);

	return (
		<div onClick={() => setQuery('')}>
			<Seo pageTitle="Hotel List v5" />
			{/* End Page Title */}

			<div className="header-margin"></div>
			{/* header top margin */}

			<Header2 query={query} setQuery={setQuery} />
			{/* End Header 1 */}

			<section className="pt-40 pb-40 bg-blue-2">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="text-center">
								<h1 className="text-30 fw-600">
									{filteredProperties.length}{' '}
									{filteredProperties.length > 1 ? 'Propeties' : 'Property'} in{' '}
									{!locationsToBeFiltered.length ? 'Pune' : locationsToBeFiltered.join(',')}
								</h1>
							</div>
							{/* End text-center */}
						</div>
						{/* End col-12 */}
					</div>
				</div>
			</section>
			{/* Top SearchBanner */}

			<section className="layout-pt-md layout-pb-lg">
				<div className="container">
					<div className="row y-gap-30">
						<div className="col-xl-3">
							<aside className="sidebar y-gap-40 xl:d-none">
								<Sidebar
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
										<Sidebar
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

							<div className="offcanvas offcanvas-start" tabIndex="-1" id="listingTopbar">
								<div className="offcanvas-header">
									<h5 className="offcanvas-title" id="offcanvasLabel">
										Sorting Sidebar
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
									<aside className="sidebar y-gap-40 xl:d-block">
										<TopBar
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
							<TopHeaderFilter
								showTopbar={true}
								properties={properties}
								filteredProperties={filteredProperties}
								setFilteredProperties={setFilteredProperties}
							/>
							<div className="mt-20 mb-30"></div>
							{/* End mt--30 */}
							<div className="propertyContainer">
								<HotelProperties properties={filteredProperties} />
							</div>
							{/* End .row */}
						</div>
						{/* End .col for right content */}
					</div>
					{/* End .row */}
				</div>
				{/* End .container */}
			</section>
			{/* End layout for listing sidebar and content */}

			<CallToActions />
			{/* End Call To Actions Section */}

			<Footer7 />
		</div>
	);
};

export default Index;

export async function getServerSideProps() {
	const data = await sanityClient.fetch(QUERY);
	return {
		props: {
			data,
		},
	};
}
