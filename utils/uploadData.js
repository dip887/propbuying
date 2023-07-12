import { algoliaClient } from "../clients/algoliaClient";
import { sanityClient } from "../clients/sanityClient";

export const index = algoliaClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX
);

index.setSettings({
  removeWordsIfNoResults: "firstWords",
  removeStopWords: ["en"],
});

export const updloadData = async () => {
  const data = await sanityClient.fetch(`
  *[_type == "property"]{ 
		"objectID": _id,
  	_type,
  	_rev,
		propertyName, 
		shortDescription,
		"image": elevationImage.asset->url,
  	"builder": developer->developerName,
		"location":locality->localityName
	}
  `);

  await index.saveObjects(data);
};
