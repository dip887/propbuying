import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { sanityClient } from "../../../clients/sanityClient";
import { FiMapPin } from "react-icons/fi";

const FEATURED_LOCATIONS = `
  *[_type == "locality" && featuredLocation == true]{
  "id": _id,
  localityName,
  "shortDescription": localityPropertyDescription,
  "slug": slug.current
}   
`;

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },

    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const PoularDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    (async function () {
      const data = await sanityClient.fetch(FEATURED_LOCATIONS);
      setDestinations(data);
    })();
  }, []);

  return (
    <Slider {...settings} slidesToShow={destinations.length}>
      {destinations.map((item, index) => (
        <div
          className="col-xl col-lg-3 col-6"
          key={item.id}
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <Link
            href={`/projects-in-${item.slug}-pune`}
            className="citiesCard -type-5 d-flex items-center sm:flex-column sm:items-start px-20 py-20 sm:px-15 sm:py-20 bg-light-2 rounded-4 "
          >
            <FiMapPin className="text-24" />
            {/* <div className="card" style="width: 18rem;">
              <div className="card-body">
                <h5 className="card-title">{item.localityName}</h5>
                <p className="card-text">{item.shortDescription}</p>
              </div>
            </div> */}
            <div className="ml-10 sm:ml-0 sm:mt-10">
              <h4 className="text-16 fw-500">{item.localityName}</h4>
              <p className="text-14">{item.shortDescription}</p>
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default PoularDestinations;
