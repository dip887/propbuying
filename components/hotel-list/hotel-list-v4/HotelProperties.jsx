import PropertyCard from "../../Card/PropertyCard";

const HotelProperties = ({ properties }) => {
  return (
    <>
      {properties.map((p, i) => (
        <div
          className="card-wrapper"
          key={p.id}
          data-aos="fade"
          data-aos-delay={(i + 1) * 100}
        >
          <PropertyCard property={p} />
        </div>
      ))}
    </>
  );
};

export default HotelProperties;
