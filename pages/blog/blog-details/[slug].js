import React, { useCallback, useMemo, useState } from "react";
import Seo from "../../../components/common/Seo";
import Footer7 from "../../../components/footer/footer-7";
import RelatedBlog from "../../../components/blog/blog-details/RelatedBlog";
import DetailsContent from "../../../components/blog/blog-details/DetailsContent";
import TopComment from "../../../components/blog/blog-details/TopComment";
import BlogNavigator from "../../../components/blog/blog-details/BlogNavigator";
import Header2 from "../../../components/header/header-2";
import { sanityClient } from "../../../clients/sanityClient";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import EnquireNowModal from "../../../components/modals/EnquireNowModal";
import { calPriceRangeSingleProperty } from "../../../utils/calculatePriceRange";

const BlogSingleDynamic = ({ blogData }) => {
  const [blog, setBlog] = useState(blogData[0]);
  const [query, setQuery] = useState("");

  const uniqueBhks = useMemo(
    () => [
      ...new Set(
        blog.includedProperty[0].configurations.map(
          (c) => c.unitType.slice(0, 2)[0]
        )
      ),
    ],
    []
  );

  const minMaxPrice = useCallback(
    calPriceRangeSingleProperty(blog.includedProperty[0]),
    [blogData]
  );

  return (
    <div onClick={() => setQuery("")}>
      <Seo pageTitle="Blog Single" />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header2 query={query} setQuery={setQuery} />
      {/* End location top bar section */}

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-40 justify-center text-center">
            <div className="col-auto">
              <div className="text-15 fw-500 text-blue-1 mb-8 text-capitalize">
                {blog.tags.map((t) => t.title).join(",")}
              </div>
              <h1 className="text-30 fw-600">{blog.title}</h1>
              <div className="text-15 text-light-1 mt-10">
                {moment(blog.date).format("MMM DD, YYYY")}
              </div>
            </div>
            <div className="col-12">
              <img
                src={blog.img}
                alt={blog.title}
                className="col-12 rounded-8 w-100 img_large_details"
              />
            </div>
          </div>
          {/* End .row top bar image and title */}

          <div className="row justify-center">
            <div className="col-md-12 layout-pt-md">
              <DetailsContent
                tags={blog.tags.map((t) => t.title)}
                title={blog.title}
                content={blog.content}
                slug={blog.slug}
              />
              {/* Details content */}
              <div className="border-top-light py-30 mt-30">
                <h5>In This Article</h5>
                <div className="row y-gap-30">
                  <div className="col-md-4">
                    <div className="pt-30 blogIncludedProps">
                      <div className="blogsIncludeDetails">
                        <div className="blogBuilderLogo">
                          <Image
                            height={60}
                            width={60}
                            src={blog.includedProperty[0].img}
                            alt={blog.includedProperty[0].propertyName}
                            className="h-50 object-contain rounded-1"
                          />
                        </div>
                        <div className="blogBuilderInfo">
                          <h6>{blog.includedProperty[0].propertyName}</h6>
                          <p className="text-light-1">
                            {blog.includedProperty[0].location}
                          </p>
                          <p>{blog.includedProperty[0].description}</p>
                        </div>
                      </div>
                      <EnquireNowModal
                        developerLogo={blog.includedDeveloper[0].logo}
                        developerName={blog.includedDeveloper[0].name}
                        propertyName={blog.includedProperty[0].propertyName}
                        propertyId={blog.includedProperty[0].id}
                        locationId={blog.includedProperty[0].locationId}
                        uniqueBhks={uniqueBhks}
                        maxPrice={minMaxPrice.max}
                        minPrice={minMaxPrice.min}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="pt-30 blogIncludedProps">
                      <div className="blogsIncludeDetails">
                        <div className="blogBuilderLogo">
                          <Image
                            height={60}
                            width={60}
                            src={blog.includedDeveloper[0].logo}
                            alt={blog.includedDeveloper[0].name}
                            className=" object-contain rounded-1"
                          />
                        </div>
                        <div className="blogBuilderInfo">
                          <h6>{blog.includedDeveloper[0].name}</h6>
                          <p className="text-light-1">
                            Estd: {blog.includedDeveloper[0].yearEstablished}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/developers/${blog.includedDeveloper[0].slug}`}
                      >
                        Show Properties
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="pt-15 blogIncludedProps blogIncLocation">
                      <div className="blogsIncludeDetails">
                        <div className="blogBuilderInfo">
                          <h6>{blog.includedLocation[0].localityName}</h6>

                          <p>{blog.includedLocation[0].description}</p>
                        </div>
                      </div>
                      <Link
                        href={`/property-in-${blog.includedLocation[0].slug}-pune`}
                      >
                        Show Properties
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-top-light border-bottom-light py-30 mt-30">
                <TopComment author={blog.author} />
              </div>
              {/* End  topcommnet  */}
              <div className="border-bottom-light py-30">
                <BlogNavigator />
              </div>
              {/* End BlogNavigator */}

              {/* End comments components */}
            </div>
            <div className="col-md-12 layout-pt-md"></div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* Details Blog Details Content */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Related content</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-30 pt-40">
            <RelatedBlog />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Related Content */}

      <Footer7 />
      {/* End Call To Actions Section */}
    </div>
  );
};

export default BlogSingleDynamic;

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const data = await sanityClient.fetch(`
    *[_type=="blogPost" && slug.current=="${slug}"]{
    "id": _id,
    "includedDeveloper": includedDevelopersBlog[].shortlistedDeveloper->{
      "slug": slug.current,
      "name": developerName,
      "logo": logo.asset->url,
      yearEstablished
    },
    "includedLocation": includedLoctionsBlog[].shortlistedLocal->{
      localityName,
      "description": localityPropertyDescription,
      "slug": slug.current,
    },
    "includedProperty": includedPropertiesBlog[].shortlistedProp->{
      propertyName,
      "id": _id,
      configurations,

      "locationId": locality->_id,
      "description": shortDescription,
      "slug": slug.current,
      "location": locality->localityName,
      "img": elevationImage.asset->url
    },
    "img": mainImage.asset-> url,
    "date": publishedAt,
    title,
    "slug": slug.current,
    "content": body,
    "tags": categories[]->{
      title,
      description
    },
    "author": author->{
    "img": image.asset->url,
    "name": name,
    "bio": bio,
    designation
  }
} 
`);

  return {
    props: {
      blogData: data,
    },
  };
}
