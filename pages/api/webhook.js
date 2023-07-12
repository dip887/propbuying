import indexer from "sanity-algolia";
import { sanityClient } from "../../clients/sanityClient";
import {
  PROPERTY_PROJECTION,
  DEVELOPER_PROJECTION,
  LOCATION_PROJECTION,
} from "../../constants/projections";
import { index } from "../../utils/uploadData";

export default function handler(req, res) {
  if (req.method === "POST") {
    const sanityAlgolia = indexer(
      {
        property: [
          {
            index,
            projection: PROPERTY_PROJECTION,
          },
          {
            index,
            projection: DEVELOPER_PROJECTION,
          },
          {
            index,
            projection: LOCATION_PROJECTION,
          },
        ],
      },
      (document) => document,
      (document) =>
        document._type === "property" || "developer" || "locality"
          ? true
          : false
    );

    return sanityAlgolia
      .webhookSync(sanityClient, req.body)
      .then(() => {
        res.status(200).json({
          message: "success!",
        });
      })
      .catch(() => {
        res.status(500).json({
          message: "something went wrong, oops!",
        });
      });
  }
}
