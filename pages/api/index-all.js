import { sanityClient } from "../../clients/sanityClient";
import { algoliaClient } from "../../clients/algoliaClient";

//const QUERY = `
//	*[_type=="developer"]{
//  "objectID": _id,
//   _type,
//  _rev,
//  "developerName": developerName,
//  "image": logo.asset->url,
//  yearEstablished,
//  "slug": slug.current
//}
//`;
//const QUERY = `
//	*[_type=="property"]{
//		"objectID": _id,
//  	_type,
//  	_rev,
//		propertyName,
//		shortDescription,
//		"image": elevationImage.asset->url,
//  	"builder": developer->developerName,
//		"location":locality->localityName,
//		"slug": slug.current
//	}
//`;
//const QUERY = `
//	*[_type=="locality"]{
//		"objectID": _id,
//    "localityName": localityName,
//    _type,
//    _rev,
//    "description": localityPropertyDescription,
//    "image": referenceImage.asset->url,
//    "slug": slug.current
//	}
//`;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const properties = await sanityClient.fetch(QUERY);

      const index = algoliaClient.initIndex(
        process.env.NEXT_PUBLIC_ALGOLIA_INDEX
      );

      await index.saveObjects(properties);

      res.status(200).json({ message: `${properties.length} objects saved` });
    } catch (err) {
      res.status(200).json({ message: "error", error: err });
    }
  }
}
