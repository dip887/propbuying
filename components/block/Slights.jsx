import Link from "next/link";
import { numConvertion } from "../../utils/numberConvertion";
import EnquireNowModal from "../modals/EnquireNowModal";

const Slights = ({ item, index, data, uniqueBhks, minMaxPrice }) => {
  return (
    <>
      <div
        className="col-lg-12 mt-10"
        key={index}
        data-aos="fade"
        data-aos-delay={index * 100}
      >
        <div className="rounded-4 border-light">
          <div className="d-flex flex-wrap y-gap-30 slight-container">
            <div className="col-auto img-wrapper">
              <div className="slight-img-container">
                <img src={item.img} alt="image" className="img" />
              </div>
            </div>
            <div className="col-auto text-wrapper">
              <div className="d-flex flex-column justify-center h-full px-30 py-20">
                <h3 className="text-18 fw-700">{item.unitType}</h3>
                <div className=" middle-container mt-10">
                  <div className="col-md-4 text-left">
                    <h5 className="text-16 fw-400">{item.size} sqft</h5>
                  </div>
                  <div className="col-md-4 text-center">
                    <h5 className="text-16 fw-400">
                      EMI: ₹ {numConvertion(item.emi)}
                    </h5>
                  </div>
                  <div className="col-md-4 text-right">
                    <h5 className="text-16 fw-700">₹ {item.price}</h5>
                  </div>
                </div>

                <EnquireNowModal
                  style="button -md -blue-1 border-blue-1 -outline-blue-1 w-100 bg-white text-dark-1 mt-30 md:mt-20"
                  developerName={data[0].builderName || data[0].developerName}
                  propertyName={data[0].title.trim()}
                  propertyId={data[0].id}
                  locationId={data[0].locationId}
                  developerLogo={data[0].builderLogo}
                  uniqueBhks={uniqueBhks}
                  minPrice={minMaxPrice.min}
                  maxPrice={minMaxPrice.max}
                  text={"Show Interest"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slights;
