const RatingTag = ({ offer }) => {
  return (
    <>
      <div className="px-24 py-20 rounded-4 bg-green-1">
        <div className="row x-gap-20 y-gap-20 items-center">
          <div className="col-auto">
            <div className="flex-center size-60 rounded-full bg-white">
              <img
                src={offer.image}
                alt={offer.name}
                className="size-60 rounded-full object-cover"
              />
            </div>
          </div>

          <div className="col-auto">
            <h4 className="text-18 lh-15 fw-500">{offer.name}</h4>
            <div className="text-15 lh-15">
              <span className="fw-500">Valid till:</span> {offer.validTill}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingTag;
