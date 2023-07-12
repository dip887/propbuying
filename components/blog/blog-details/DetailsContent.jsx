import Social2 from "../../common/social/Social2";
import Link from "next/link";

const DetailsContent = ({ content, title, tags, slug }) => {
  return (
    <>
      <h2 className="fw-700">{title}</h2>

      {content.map((item, i) => {
        return (
          <>
            {item.listItem === "number" && (
              <h5 key={i} className="mt-20">
                {item.children[0].text}
              </h5>
            )}

            {item.style == "normal" && !item.listItem && (
              <p key={i}>{item.children[0].text}</p>
            )}
          </>
        );
      })}

      <div className="row y-gap-20 justify-between pt-30">
        <div className="col-auto">
          <div className="d-flex items-center">
            <div className="fw-500 mr-10">Share</div>
            <div className="d-flex items-center">
              <Social2 />
            </div>
          </div>
        </div>
        {/* End social share */}

        <div className="col-auto">
          <div className="row x-gap-10 y-gap-10">
            {tags.map((t, i) => (
              <div key={i} className="col-auto">
                <Link
                  href={`/blog/blog-details/${slug}`}
                  className="button -blue-1 py-5 px-20 bg-blue-1-05 rounded-100 text-15 fw-500 text-blue-1 text-capitalize"
                >
                  {t}
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* End tags */}
      </div>
    </>
  );
};

export default DetailsContent;
