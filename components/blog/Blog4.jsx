import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sanityClient } from "../../clients/sanityClient";
import moment from "moment";

const GET_BLOGS = `
   *[_type=="blogPost"]{
    "id": _id,
    "img": mainImage.asset-> url,
    "date": publishedAt,
    title,
    "slug": slug.current,
}  
`;

const Blog4 = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async function () {
      const data = await sanityClient.fetch(GET_BLOGS);
      setBlogs(data);
    })();
  }, []);

  return (
    <>
      {blogs.length > 0 &&
        blogs.map((item, index) => (
          <div
            className="col-lg-3 col-sm-6"
            key={item.id}
            data-aos="fade"
            data-aos-delay={index * 120}
          >
            <Link
              href={`/blog/blog-details/${item.slug}`}
              className="blogCard -type-1 d-block "
            >
              <div className="blogCard__image">
                <div className="ratio ratio-1:1 rounded-4 rounded-8">
                  <Image
                    width={400}
                    height={400}
                    className="img-ratio js-lazy"
                    src={item.img}
                    alt="image"
                  />
                </div>
              </div>
              <div className="mt-20">
                <h4 className="text-dark-1 text-18 fw-500">{item.title}</h4>
                <div className="text-light-1 text-15 lh-14 mt-5">
                  {moment(item.date).format("MMM DD, YYYY")}
                </div>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
};

export default Blog4;
