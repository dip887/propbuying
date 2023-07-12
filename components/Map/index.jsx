import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import haversine from 'haversine';
import MapList from './MapList';

const icons = [
	{
		id: 1,
		icon: '/img/icons/map-icons/hospital.svg',
		label: 'Healthcares',
		value: ['hospital'],
	},
	{
		id: 2,
		icon: '/img/icons/map-icons/school.svg',
		label: 'Institutes',
		value: ['school'],
	},
	{
		id: 3,
		icon: '/img/icons/map-icons/mall.svg',
		label: 'Shopping malls',
		value: ['shopping_mall'],
	},
	{
		id: 4,
		icon: '/img/icons/map-icons/bus.svg',
		label: 'Commutes',
		value: ['bus_station'],
	},
	{
		id: 5,
		icon: '/img/icons/map-icons/atm.svg',
		label: 'Banks',
		value: ['atm'],
	},
	{
		id: 6,
		icon: '/img/icons/map-icons/cafe.svg',
		label: 'Food and Drinks',
		value: ['restaurant'],
	},
	{
		id: 7,
		icon: '/img/icons/map-icons/cinema.svg',
		label: 'Cinemas',
		value: ['movie_theater'],
	},
	{
		id: 8,
		icon: '/img/icons/map-icons/park.svg',
		label: 'Parks',
		value: ['park'],
	},
	{
		id: 9,
		icon: '/img/icons/map-icons/grocery.svg',
		label: 'Groceries',
		value: ['department_store'],
	},
	{
		id: 10,
		icon: '/img/icons/map-icons/hotel.svg',
		label: 'Hotels',
		value: ['lodging'],
	},
];

const libraries = ['places'];

const Map = ({ lat, lng }) => {
	const mapRef = useRef(null);
	const [latitude, setLatitude] = useState(lat);
	const [longitude, setLongitude] = useState(lng);
	const [center, setCenter] = useState({
		lat: lat,
		lng: lng,
	});
	const [places, setPlaces] = useState([]);
	const [searchString, setSearchString] = useState(null);
	const [mapLoaded, setMapLoaded] = useState(false);
	const [zoomLvl, setZoomLvl] = useState(18);
	const [distance, setDistance] = useState('');
	const [selectedPlace, setSelectedPlace] = useState('');

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
		libraries,
	});

	const onMapLoad = (map) => {
		const service = new google.maps.places.PlacesService(map);
		const request = {
			location: { lat, lng },
			radius: 5000,
			type: searchString,
		};

		service.nearbySearch(request, (results, status) => {
			if (status === 'OK') {
				setPlaces(results.slice(0, 5));
			}
		});

		setZoomLvl(14);
	};

	const handleMarkerClick = (mylat, mylng) => {
		const origin = { latitude, longitude };
		const destination = { latitude: mylat, longitude: mylng };

		const placeDistance = haversine(origin, destination).toFixed(2) + ' km';

		const service = new google.maps.places.PlacesService(mapRef.current.state.map);

		service.getDetails(
			{
				placeId: places.find(
					(place) => place.geometry.location.lat() === mylat && place.geometry.location.lng() === mylng
				).place_id,
			},
			function (place, status) {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					const placeName = place.name;
					setDistance(placeDistance);
					setSelectedPlace(placeName);
				}
			}
		);

		setCenter({
			lat: mylat,
			lng: mylng,
		});
	};

	const handleSearchString = (str) => {
		setSelectedPlace('');
		setDistance('');

		setSearchString(str);
		setCenter({
			lat,
			lng,
		});
	};

	useEffect(() => {
		if (mapRef.current && searchString) onMapLoad(mapRef.current.state.map);
	}, [searchString, mapLoaded]);

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading Maps';

	return (
		<div className="map-wrapper">
			<div></div>
			<GoogleMap ref={mapRef} mapContainerClassName="map-container" zoom={zoomLvl} center={center}>
				<Marker
					position={{
						lat: latitude,
						lng: longitude,
					}}
				/>

				{places.length ? (
					<MapList
						places={places}
						icons={icons}
						searchString={searchString}
						origin={{ latitude, longitude }}
						setCenter={setCenter}
						setSelectedPlace={setSelectedPlace}
						mapRef={mapRef}
						setDistance={setDistance}
					/>
				) : null}

				{places.map((place, i) => (
					<Marker
						animation={google.maps.Animation.DROP}
						onClick={() => handleMarkerClick(place.geometry.location.lat(), place.geometry.location.lng())}
						icon={{
							url: place.types.includes(searchString[0])
								? icons.filter((i) => i.value.includes(searchString[0]))[0].icon
								: '',
							scaledSize: new window.google.maps.Size(40, 40),
						}}
						key={i}
						position={{
							lat: place.geometry.location.lat(),
							lng: place.geometry.location.lng(),
						}}
					/>
				))}
			</GoogleMap>
			<div className="slider-wrapper">
				{selectedPlace && distance ? (
					<div className="border-bottom">
						<div className="px-20 py-10">
							<h6>{selectedPlace}</h6>
							<p>{distance}</p>
						</div>
					</div>
				) : null}
				<div className="slider">
					{icons.map((i) => (
						<div
							onClick={() => handleSearchString(i.value)}
							className={`slider-container ${
								searchString?.length > 0 && searchString[0] === i.value[0] ? 'active' : ''
							}`}
							key={i.id}
						>
							<div className="img-wapper">
								<img src={i.icon} alt={i.label} />
							</div>
							<p>{i.label}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Map;
