import { useCallback, useEffect, useMemo, useState } from 'react';
import PossessionFilter from '../hotel-list/sidebar/PossessionFilter';
import UnitsFilter from '../hotel-list/sidebar/UnitsFilter';
import DeveloperFilter from '../hotel-list/sidebar/DeveloperFilter';
import PriceSlider from '../hotel-list/sidebar/PriceSlider';
import { filterProperties } from '../../utils/filterProperties';
import { calculatePriceRange } from '../../utils/calculatePriceRange';
import { getUniqueDevelopers } from '../../utils/getUniqueDevelopers';
import { getConstructionStage } from '../../utils/getConstructionStage';
import { getUniqueUnitSizes } from '../../utils/getUniqueUnitSizes';

const LocationSidebar = ({ filteredProperties, setFilteredProperties, properties }) => {
	const [unitsToBeFiltered, setUnitsToBeFiltered] = useState([]);
	const [constructionStageToBeFiltered, setConstructionStageToBeFiltered] = useState([]);
	const [price, setPrice] = useState({
		value: {
			max: 0,
			min: 0,
		},
	});
	const [developerToBeFiltered, setDeveloperToBeFiltered] = useState([]);
	const [shouldShowClearBtn, setShouldShowClearBtn] = useState(false);

	//clear button visibility:
	useEffect(() => {
		if (
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
	}, [unitsToBeFiltered, constructionStageToBeFiltered, price.value.max, price.value.max, developerToBeFiltered]);

	//for filtering
	useEffect(() => {
		const filteredData = filterProperties(
			properties,
			[],
			unitsToBeFiltered,
			constructionStageToBeFiltered,
			price,
			developerToBeFiltered
		);
		setFilteredProperties(filteredData);
	}, [unitsToBeFiltered, constructionStageToBeFiltered, price, setFilteredProperties, properties]);

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
		setUnitsToBeFiltered([]);
	};

	return (
		<>
			{/* End Popular Locations filter */}

			<div className="sidebar__item -no-border">
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

export default LocationSidebar;
