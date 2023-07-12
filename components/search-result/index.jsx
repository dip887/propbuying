import Link from "next/link";
import { Highlight } from "react-instantsearch-dom";
import { FiMapPin, FiAward } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";

const SearchResult = ({ hit }) => {
  const [type, setType] = useState(hit._type);
  return type === "property" ? (
    <Link href={`/pune-residential-property/${hit.slug}`} className="w-1/1">
      <div className="w-1/1 flex items-center">
        <Image
          height={60}
          width={60}
          src={hit.image}
          alt={hit.propertyName}
          className="h-60 object-contain rounded-1"
        />
        <div className="flex flex-column items-start justify-between w-1/1 ml-20">
          <h6 className="text-md fw-700">
            <Highlight attribute="propertyName" hit={hit} tagName="mark" />
          </h6>
          <div className="w-1/1">
            <p>
              <Highlight
                attribute="shortDescription"
                hit={hit}
                tagName="mark"
              />
            </p>

            <div className="flex items-center justify-between w-1/1">
              <div className="flex items-center">
                <FiMapPin />
                <p className="fw-500 text-white-1">
                  <Highlight
                    attribute="location"
                    hit={hit}
                    tagName="mark"
                    className="locationSearch"
                  />
                </p>
              </div>
              <div className="text-sm rounded-sm font-medium">
                <FiAward />
                <small className="font-xs builderSearch">
                  <Highlight attribute="builder" hit={hit} tagName="mark" />{" "}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ) : type == "locality" ? (
    <Link href={`/projects-in-${hit.slug}-pune`}>
      <div className="w-1/1 d-flex items-center">
        <Image
          height={60}
          width={60}
          src={hit.image}
          alt={hit.localityName}
          className="h-60 object-contain rounded-1"
        />
        <div className="flex flex-column items-start justify-between w-1/1 ml-20">
          <h6 className="text-md fw-700">
            <Highlight attribute="localityName" hit={hit} tagName="mark" />
          </h6>
          <p>
            <Highlight attribute="description" hit={hit} tagName="mark" />
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <Link href={`/developers/${hit.slug}`}>
      <div className="w-1/1 d-flex items-center">
        <Image
          height={60}
          width={60}
          src={hit.image}
          alt={hit.developerName}
          className="h-60 object-contain rounded-1"
        />
        <div className="flex flex-column items-start justify-between w-1/1 ml-20">
          <h6 className="text-md fw-700">
            <Highlight attribute="developerName" hit={hit} tagName="mark" />
          </h6>
          <p>
            Established in{" "}
            <Highlight attribute="yearEstablished" hit={hit} tagName="mark" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;
