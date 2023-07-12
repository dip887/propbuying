import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import LocationFilter from '../sidebar/LocationFilter';
import PossessionFilter from '../sidebar/PossessionFilter';
import UnitsFilter from '../sidebar/UnitsFilter';
import DeveloperFilter from '../sidebar/DeveloperFilter';
import PriceSlider from '../sidebar/PriceSlider';
import { filterProperties } from '../../../utils/filterProperties';
import { calculatePriceRange } from '../../../utils/calculatePriceRange';
import { getUniqueDevelopers } from '../../../utils/getUniqueDevelopers';
import { getConstructionStage } from '../../../utils/getConstructionStage';
import { getUniqueLocations } from '../../../utils/getUniqueLocations';
import { getUniqueUnitSizes } from '../../../utils/getUniqueUnitSizes';

const Sidebar = ({
	filteredProperties,
	setFilteredProperties,
	properties,
	locationsToBeFiltered,
	setLocationsToBeFiltered,
}) => {
	const [unitsToBeFiltered, setUnitsToBeFiltered] = useState([]);
	const [locations, setLocations] = useState([]);
	const [constructionStageToBeFiltered, setConstructionStageToBeFiltered] = useState([]);
	const [price, setPrice] = useState({
		value: {
			max: 0,
			min: 0,
		},
	});
	const [developerToBeFiltered, setDeveloperToBeFiltered] = useState([]);
	const [shouldShowClearBtn, setShouldShowClearBtn] = useState(false);

	const router = useRouter();

	//update query params:
	useEffect(() => {
		if (locations.length > 0) {
			router.push(
				{
					pathname: router.pathname,
					query: {
						locations: locationsToBeFiltered,
						sizes: unitsToBeFiltered,
						constructionStage: constructionStageToBeFiltered,
						priceMaxValue: price.value.max,
						priceMinValue: price.value.min,
						developers: developerToBeFiltered,
					},
				},
				undefined,
				{ shallow: true }
			);
		}
	}, [
		locationsToBeFiltered,
		unitsToBeFiltered,
		constructionStageToBeFiltered,
		price.value.max,
		price.value.max,
		developerToBeFiltered,
	]);

	useEffect(() => {
		if (router.query?.locations) {
			setLocationsToBeFiltered(router.query.locations);
			setLocations(router.query.locations.split(','));
		}
		if (router.query?.sizes) {
			setUnitsToBeFiltered(router.query.sizes || []);
		}
	}, []);

	//clear button visibility:
	useEffect(() => {
		if (
			locations.length ||
			unitsToBeFiltered.length ||
			constructionStageToBeFiltered.length ||
			price.value.min != calculatePriceRange(properties).min ||
			price.value.max != calculatePriceRange(properties).max ||
			developerToBeFiltered.length
		) {
			setShouldShowClearBtn(true);
		} else {
			setShouldShowClearBtn(false);
		}
	}, [
		locations,
		unitsToBeFiltered,
		constructionStageToBeFiltered,
		price.value.max,
		price.value.max,
		developerToBeFiltered,
	]);

	//for filtering
	useEffect(() => {
		const filteredData = filterProperties(
			properties,
			locations,
			unitsToBeFiltered,
			constructionStageToBeFiltered,
			price,
			developerToBeFiltered
		);
		setFilteredProperties(filteredData);
	}, [locations, unitsToBeFiltered, constructionStageToBeFiltered, price, setFilteredProperties, properties]);

	//unqiue locations
	const uniqueLocations = useCallback(getUniqueLocations(properties), [properties]);

	//unique unit sizes
	const uniqueUnits = useCallback(getUniqueUnitSizes(properties), [properties]);

	//construction stage
	const constructionStage = useCallback(getConstructionStage(properties), [properties]);

	//price range:
	const priceRange = useMemo(() => {
		setPrice({ value: calculatePriceRange(properties) });
		return { value: calculatePriceRange(properties) };
	}, [properties]);

	//unqiue developers:
	const developerData = useCallback(getUniqueDevelopers(filteredProperties), [filteredProperties]);

	//reset filters:
	const handleFilterReset = () => {
		setConstructionStageToBeFiltered([]);
		setDeveloperToBeFiltered([]);
		setPrice({ value: calculatePriceRange(properties) });
		setLocations([]);
		setLocationsToBeFiltered('');
		setUnitsToBeFiltered([]);

		router.push(
			{
				pathname: router.pathname,
				query: {},
			},
			undefined,
			{ shallow: true }
		);
	};

	return (
		<>
			<div className="sidebar__item">
				<h5 className="text-18 fw-500 mb-10">Location</h5>
				<div className="sidebar-checkbox">
					<LocationFilter
						uniqueLocations={uniqueLocations}
						setLocations={setLocations}
						locations={locations}
						setLocationsToBeFiltered={setLocationsToBeFiltered}
					/>
				</div>
				{/* End Sidebar-checkbox */}
			</div>
			{/* End Popular Locations filter */}

			<div className="sidebar__item">
				<h5 className="text-18 fw-500 mb-10">Units</h5>
				<div className="row x-gap-10 y-gap-10 pt-10">
					<UnitsFilter
						unitsToBeFiltered={unitsToBeFiltered}
						setUnitsToBeFiltered={setUnitsToBeFiltered}
						uniqueUnits={uniqueUnits}
					/>
				</div>
			</div>
			{/* End Units filter */}

			<div className="sidebar__item">
				<h5 className="text-18 fw-500 mb-10">Construction Stage</h5>
				<div className="sidebar-checkbox">
					<PossessionFilter
						setConstructionStageToBeFiltered={setConstructionStageToBeFiltered}
						constructionStageToBeFiltered={constructionStageToBeFiltered}
						constructionData={constructionStage}
					/>
				</div>
				{/* End Sidebar-checkbox */}
			</div>
			{/* End Possession filter */}

			<div className="sidebar__item pb-30">
				<h5 className="text-18 fw-500 mb-10">Price Range</h5>
				<div className="row x-gap-10 y-gap-30">
					<div className="col-12">
						<PriceSlider price={price} setPrice={setPrice} priceRange={priceRange} />
					</div>
				</div>
			</div>
			{/* End Price-Range slider */}

			<div className="sidebar__item">
				<h5 className="text-18 fw-500 mb-10">Developer</h5>
				<div className="sidebar-checkbox">
					<DeveloperFilter
						developerToBeFiltered={developerToBeFiltered}
						setDeveloperToBeFiltered={setDeveloperToBeFiltered}
						developerData={developerData}
					/>
				</div>
			</div>

			{shouldShowClearBtn && (
				<button
					onClick={handleFilterReset}
					className="button clear-btn xl:w-1/1 -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
					style={{ marginBottom: '20px' }}
				>
					Clear Filters
				</button>
			)}
			{/* End Developer filter */}
		</>
	);
};

export default Sidebar;
