import React, { useEffect, useState } from 'react';
import DropDown from '../../../pages/vendor-dashboard/booking/components/filter-box/DropdownFilter';
import moment from 'moment';
import { useRouter } from 'next/router';

const options = [
	'⬇️ Price High to Low',
	'⬆️ Price Low to High',
	'⌛ Possession Sooner',
	'⏳ Possession Later',
	'⭐ Newest Property',
];

const TopBar = ({ filteredProperties, properties, setFilteredProperties }) => {
	const router = useRouter();
	const [originalFilteredProperties, setOriginalFilteredProperties] = useState(filteredProperties);
	const [selectedItem, setSelectedItem] = useState(router.query?.sort || '⭐ Newest Property');

	const handleSortClear = () => {
		setSelectedItem('⭐ Newest Property');
		setFilteredProperties(originalFilteredProperties);
	};

	const sortPropertiesByPrice = (properties, sortOrder) => {
		let sortedProperties = [...properties];

		sortedProperties.sort((a, b) => {
			let aPrices = getPricesInLakhs(a);
			let bPrices = getPricesInLakhs(b);

			if (sortOrder === '⬇️ Price High to Low') {
				return Math.max(...bPrices) - Math.max(...aPrices);
			}
			if (sortOrder === '⬆️ Price Low to High') {
				return Math.min(...aPrices) - Math.min(...bPrices);
			}
		});
		setFilteredProperties(sortedProperties);
	};

	const getPricesInLakhs = (property) => {
		let prices = property.configurations
			.filter((c) => c.denominatior === 'Lakh')
			.map((c) => Number(c.price) * 100000);

		if (prices.length === 0) {
			prices = property.configurations.map((c) => Number(c.price) * 10000000);
		}

		return prices;
	};

	useEffect(() => {
		if (selectedItem.includes('Newest')) {
			if (selectedItem === 'Newest Property') {
				const sortedLatestProperties = [...filteredProperties].sort((a, b) => {
					const aPostedDate = moment(a.postedAt);
					const bPostedDate = moment(b.postedAt);

					if (aPostedDate.isValid() && bPostedDate.isValid()) {
						if (aPostedDate.isBefore(bPostedDate)) {
							return 1; // Swap the return values to reverse the order
						} else {
							return -1;
						}
					} else if (aPostedDate.isValid()) {
						// If only b's date is invalid, consider it to be later than a
						return -1;
					} else if (bPostedDate.isValid()) {
						// If only a's date is invalid, consider it to be later than b
						return 1;
					}

					// If both dates are invalid or null, don't change the order
					return 0;
				});

				setFilteredProperties(sortedLatestProperties);
			}
		}
	}, [selectedItem]);

	useEffect(() => {
		if (selectedItem.includes('Price')) {
			sortPropertiesByPrice(filteredProperties, selectedItem);
		}
	}, [selectedItem]);

	useEffect(() => {
		if (selectedItem.includes('Possession')) {
			const sortedProperties = [...filteredProperties].sort((a, b) => {
				const aPosDate = moment(a.projectPossession);
				const bPosDate = moment(b.projectPossession);

				if (aPosDate.isValid() && bPosDate.isValid()) {
					if (selectedItem === '⌛ Possession Sooner') {
						if (aPosDate.isAfter(bPosDate)) {
							return -1;
						} else {
							return 1;
						}
					} else if (selectedItem === '⏳ Possession Later') {
						if (aPosDate.isBefore(bPosDate)) {
							return -1;
						} else {
							return 1;
						}
					}
				} else {
					// Handle null dates as future dates
					if (selectedItem === 'Possession Sooner') {
						if (aPosDate.isValid()) {
							return -1;
						} else {
							return 1;
						}
					} else if (selectedItem === 'Possession Started') {
						if (aPosDate.isValid()) {
							return -1;
						} else {
							return 1;
						}
					}
				}
				return 0;
			});

			setFilteredProperties(sortedProperties);
		}
	}, [selectedItem]);

	return (
		<>
			<DropDown options={options} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />

			{selectedItem !== 'Newest Property' ? (
				<button
					onClick={handleSortClear}
					className="button xl:ml-0 ml-20 clear-btn xl:w-1/1 -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
				>
					Clear
				</button>
			) : null}

			{/* End Possession sorter */}
		</>
	);
};

export default TopBar;
