import { numConvertion } from './numberConvertion';

export const getPropertiesData = (data) => {
	const myPropertyData = [];
	data.forEach((p) => {
		p.configurations.forEach((c) => {
			const obj = {
				unit: c.unitType,
				price: `${c.price} ${c.denominatior}`,
				sqft: Number(c.sizeinSqFt),
				emi: numConvertion(Math.trunc(Number(c.price) * 0.8 * (c.denominatior === 'Lakh' ? 769 : 76900))),
				location: p.location,
				projectName: p.propertyName,
				slug: p.slug,
				reraNumber: p.reraNumber,
			};

			myPropertyData.push(obj);
		});
	});

	return myPropertyData;
};
