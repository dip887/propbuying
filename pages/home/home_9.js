import Seo from '../../components/common/Seo';
import Footer7 from '../../components/footer/footer-7';
import Header2 from '../../components/header/header-2';
import Hero9 from '../../components/hero/hero-9';
import Blog4 from '../../components/blog/Blog4';
import Testimonial from '../../components/home/home-2/Testimonial';
import TestimonialRating from '../../components/home/home-2/TestimonialRating';
import Brand2 from '../../components/brand/Brand2';
import PopularDestinations from '../../components/home/home-9/PoularDestinations';
import Link from 'next/link';
import AboutIntro from '../../components/home/home-9/AboutIntro';
import WhyChoose from '../../components/home/home-9/WhyChoose';
import Cruise3 from '../../components/cruise/Cruise3';
import SearchBoxContent from '../../components/hero/hero-9/SearchBoxContent';
import { useState } from 'react';
import Image from 'next/image';

const Home_9 = () => {
	const [query, setQuery] = useState('');
	return (
		<div onClick={() => setQuery('')}>
			<Seo pageTitle="Home-9" />
			{/* End Page Title */}

			<div
				className="offcanvas offcanvas-top vh-100"
				tabIndex={-1}
				id="offcanvasTop2"
				aria-labelledby="offcanvasTopLabel"
				style={{ zIndex: 1200 }}
			>
				<div className="offcanvas-header position-absolute top-0 end-0">
					<button
						type="button"
						className="btn-close text-reset "
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					/>
				</div>
				{/* End header */}
				<SearchBoxContent />
			</div>
			{/* End searchBar Offcanvas Popup */}

			<Header2 query={query} setQuery={setQuery} />
			{/* End Header 9 */}

			<Hero9 />
			{/* End Hero 9 */}

			<section className="layout-pt-lg layout-pb-md relative" id="secondSection">
				<div className="container">
					<div className="row y-gap-20">
						<div className="col-auto">
							<div className="sectionTitle -md">
								<h2 className="sectionTitle__title">💖 Trending Locations</h2>
								<p className=" sectionTitle__text mt-5 sm:mt-0">Hot locations in Pune</p>
							</div>
						</div>
					</div>
					{/* End .row */}

					<div className="row x-gap-10 y-gap-10 pt-40 sm:pt-20 item_gap-x10">
						<PopularDestinations />
					</div>
					{/* End .row */}
				</div>
				{/* End .container */}
			</section>
			{/* End Hero 9 */}

			<section className="layout-pt-md layout-pb-lg">
				<div className="container">
					<div className="row y-gap-20 justify-between items-end">
						<div className="col-auto">
							<div className="sectionTitle -md">
								<h2 className="sectionTitle__title">🔥Hot Properties</h2>
								<p className=" sectionTitle__text mt-5 sm:mt-0">Hot properties in Pune</p>
							</div>
						</div>
						{/* End .col */}

						<div className="col-auto">
							<Link
								href="/properties/properties-in-pune"
								className="button -md -blue-1 bg-blue-1-05 text-blue-1 w-100"
							>
								More <div className="icon-arrow-top-right ml-15" />
							</Link>
						</div>
						{/* End .col */}
					</div>
					{/* End .row */}

					<div className="row y-gap-30 pt-40 sm:pt-20">
						<Cruise3 />
					</div>
					{/* End .row */}
				</div>
				{/* End .container */}
			</section>
			{/* Features Cruise Deals Sections */}

			<AboutIntro />
			{/* About Intro Cruise  Sections */}

			<section className="layout-pt-lg layout-pb-md mt-50">
				<div className="container">
					<div className="row y-gap-30">
						<div className="col-xl-4 col-lg-5">
							<h2 className="text-30 fw-600">Why Choose Us</h2>
							<p className="mt-5">These popular destinations have a lot to offer</p>
							<p className="text-dark-1 mt-40 sm:mt-20">
								Our business has been offering and delivering highly professional real estate services
								in Pune & Mumbai for over 13 years. By employing the best people and pursuing the
								highest standards of excellence; PropBuying has positioned itself as a leader. We
								believe in good relationships, we’re here for the whole journey, tailoring our approach
								individually to suit each and every one of our clients. We’re proud of our rich history,
								helping people realise their property goals, it’s in our blood, it’s what we stand for.
								We will provide you with the best results. Whether it is buying, selling, management or
								investment we look forward to you becoming one of our valued clients.
							</p>
							<div className="d-inline-block mt-40 sm:mt-20 w-100">
								<a href="#" className="button -md -blue-1 bg-yellow-1 text-dark-1">
									Learn More <div className="icon-arrow-top-right ml-15" />
								</a>
							</div>
						</div>
						{/* End .col */}

						<div className="col-xl-6 offset-xl-1 col-lg-7">
							<div className="row y-gap-60">
								<WhyChoose />
							</div>
						</div>
						{/* End .col */}
					</div>
					{/* End .row */}
				</div>
				{/* End .container */}
			</section>
			{/* Why Choose  Sections */}

			{/* End Cruise Sections */}
			<section className="section-bg mt-50">
				<div className="section-bg__item col-12">
					<Image width={1920} height={1080} src="/img/pages/about/1.png" alt="image" priority />
				</div>
				<div className="container">
					<div className="row y-gap-60 pb-50 pt-50">
						<div className="col-xl-6">
							<TestimonialRating />
						</div>
						{/* End .col */}

						<div className="col-xl-6">
							<Testimonial />
						</div>
						{/* End .col */}
					</div>
				</div>
				{/* End .row */}
				{/* End .row */}
			</section>
			{/* End testimonial section */}
			<section className="mt-30">
				<div className="container">
					<div className="px-20 md:px-0">
						<div className="row y-gap-10 justify-between items-center pt-30 lg:pt-40">
							<Brand2 />
						</div>
					</div>
				</div>
			</section>

			<section className="layout-pt-lg layout-pb-lg">
				<div className="container">
					<div className="row justify-center text-center">
						<div className="col-auto">
							<div className="sectionTitle -md">
								<h2 className="sectionTitle__title">PropBuying Blogs</h2>
								<p className=" sectionTitle__text mt-5 sm:mt-0">
									Property blog to keep yourself updated
								</p>
							</div>
						</div>
					</div>
					{/* End .row  */}
					<div className="row y-gap-30 pt-40">
						<Blog4 />
					</div>
					{/* End .row */}
				</div>
				{/* End .container */}
			</section>
			{/* End blog Section */}

			<Footer7 />
		</div>
	);
};

export default Home_9;
