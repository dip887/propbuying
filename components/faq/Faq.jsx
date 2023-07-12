import { convertToTitleCase } from "../../utils/caseConversion";
const Faq = ({
  developerName,
  propertyName,
  amenities,
  constructionStage,
  minPrice,
  uniqueBhks,
}) => {
  const faqContent = [
    {
      id: 1,
      collapseTarget: `One`,
      title: `What are the Good amenities of ${developerName} ${propertyName}?`,
      content: "",
      list: [...amenities],
    },
    {
      id: 2,
      collapseTarget: "Two",
      title:
        "Okay, I want to buy a home here. What are the documents I need to provide to complete the sale?",
      content: `The list of documents required to confirm your booking is below`,
      list: [
        "Residence / Address proof (Aadhar Card Copy)",
        "Identity proof",
        "PAN card copy",
        "Passport size photographs",
        "Bank Attested Signature",
        "Copy of Passport for NRI customers",
        "Further details are available in the Application Form",
      ],
    },
    {
      id: 3,
      collapseTarget: "Three",
      title: `How can i get a brochure of ${developerName} ${propertyName}?`,
      content: `Sorry no brochure available for now, but you can call our Toll free No. 8411912000 (7 days in a week 10:00 am to 6:30 pm). Our folks would be happy to help you.`,
    },
    {
      id: 4,
      collapseTarget: "Four",
      title: `How far has the construction of ${developerName} ${propertyName} reached?`,
      content: `Current construction stage of Stargaze is ${convertToTitleCase(
        constructionStage
      )}`,
    },
    {
      id: 5,
      collapseTarget: "Five",
      title: `What is starting price of ${developerName} ${propertyName}?`,
      content: `Kolte patil stargaze offers ${uniqueBhks.join(
        ","
      )} BHK apartments starting from ${minPrice}`,
    },
  ];
  return (
    <>
      {faqContent.map((item) => (
        <div className="col-12" key={item.id}>
          <div className="accordion__item px-20 py-20 border-light rounded-4">
            <div
              className="accordion__button d-flex items-center"
              data-bs-toggle="collapse"
              data-bs-target={`#${item.collapseTarget}`}
            >
              <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-20">
                <i className="icon-plus" />
                <i className="icon-minus" />
              </div>
              <div className="button text-dark-1 text-start">{item.title}</div>
            </div>
            {/* End accordion button */}

            <div
              className="accordion-collapse collapse"
              id={item.collapseTarget}
              data-bs-parent="#Faq1"
            >
              {item.content && (
                <div className="pt-15 pl-60">
                  <p className="text-15">{item.content}</p>
                </div>
              )}
              {item.list?.length > 0 &&
                item.list?.map((l, i) => (
                  <ul key={i} className="pt-15 pl-60">
                    <li className="text-15">• {convertToTitleCase(l)}</li>
                  </ul>
                ))}
            </div>
            {/* End accordion conent */}
          </div>
        </div>
      ))}
    </>
  );
};

export default Faq;
