export const PROPERTY_PROJECTION = `{ 
		"objectID": _id,
  	_type,
  	_rev,
		propertyName, 
		shortDescription,
		"image": elevationImage.asset->url,
  	"builder": developer->developerName,
		"location":locality->localityName,
		"slug": slug.current
}
`;

export const DEVELOPER_PROJECTION = `{ 
		"objectID": _id,
   	_type,
  	_rev,
  	"developerName": developerName,
  	"image": logo.asset->url,
  	yearEstablished,
  	"slug": slug.current
}
`;
export const LOCATION_PROJECTION = `{
		"objectID": _id,
    "localityName": localityName,
    _type,
    _rev,
    "description": localityPropertyDescription,
    "image": referenceImage.asset->url,
    "slug": slug.current
}
`;
