import { convertToTitleCase } from "../../utils/caseConversion";
const Surroundings = ({ specifications }) => {
  return (
    <>
      {specifications.slice(0, 2).map((item, i) => (
        <div className="col-lg-6 col-md-6" key={i}>
          <div className="mb-40 md:mb-30">
            <div className="d-flex items-center mb-20">
              <i className="icon-nearby text-20 mr-10"></i>
              <div className="text-16 fw-500">{item.name}</div>
            </div>
            {item?.list?.map((single, i) => (
              <div className="row y-gap-20 x-gap-0 pt-10" key={i}>
                <div className="col-12 border-top-light">
                  <div className="row items-center justify-between">
                    <div className="col-auto">
                      <div className="text-15">{single.name}</div>
                    </div>

                    <div className="col-auto">
                      <div className="text-15 text-right">
                        {convertToTitleCase(single.value)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {specifications.slice(2)[0].list.map((item, i) => (
        <div className="col-lg-4 col-md-6" key={i}>
          <div className="mb-40 md:mb-30">
            <div className="d-flex items-center mb-20">
              <i className="icon-nearby text-20 mr-10"></i>
              <div className="text-16 fw-500">{item.name}</div>
            </div>
            {item?.list?.map((single, i) => (
              <div className="col-auto border-top-light pt-10 mb-20" key={i}>
                <div className="text-15">{convertToTitleCase(single)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Surroundings;
