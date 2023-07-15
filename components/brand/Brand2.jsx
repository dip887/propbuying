// const Brand2 = () => {
// 	const brandImages = ['1', '1', '1', '1', '1', '1'];
// 	return (
// 		<>
// 			{brandImages.map((item, i) => (
// 				<div className="col-md-auto col-md-2 col-sm-2" key={i}>
// 					<div className="d-flex justify-center">
// 						<img src={`/img/clients/${item}.png`} className="developerLogoHome" alt="image" />
// 					</div>
// 				</div>
// 			))}
// 		</>
// 	);
// };

// export default Brand2;
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { sanityClient } from "../../clients/sanityClient";

const PROPERTIES_QUERY = `
  *[_type=="property"]{
  "id": _id,
  propertyName,
  projectStatus,
  projectPossession,
   "developerName": developer->developerName,
	"developerSlug":developer->slug.current,
  "location": locality->localityName,
  "locationId": locality->_id,
  "builderLogo": developer->logo.asset->url,
  configurations,
  "image": elevationImage.asset->url,
  shortDescription,
  "slug": slug.current,
  "builderName": developer->developerName,
 reraNumber,
}
`;

const Brand2 = () => {
  const [properties, setProperties] = useState([]);

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

  useEffect(() => {
    (async function () {
      const data = await sanityClient.fetch(PROPERTIES_QUERY);
      setProperties(data);
    })();
  }, []);

  return (
    <>
      <Slider {...settings} slidesToShow={properties.length}>
        {properties.map((item) => (
          <div className="col-md-auto col-md-2 col-sm-2" key={item.id}>
            <div className="d-flex mr-5 justify-center">
              <img
                src={item.builderLogo}
                alt={item.propertyName.trim()}
                className="developerLogoHome"
              />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Brand2;

// {item === "1" ? (
// 	<img
// 	  src={`/img/clients/${item}.png`}
// 	  className="developerLogoHome"
// 	  alt="image"
// 	/>
//   ) : (
// 	<img
// 	  src={`/img/clients/${item}.svg`}
// 	  className="developerLogoHome"
// 	  alt="image"
// 	/>
//   )}
