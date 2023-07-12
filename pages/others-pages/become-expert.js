import dynamic from 'next/dynamic';
import Seo from '../../components/common/Seo';
import Header2 from '../../components/header/header-2';
import Footer7 from '../../components/footer/footer-7';
import Image from 'next/image';
import HowWorks from '../../components/block/HowWorks';
import Block2 from '../../components/about/Block2';
import Testimonial from '../../components/home/home-2/Testimonial';
import TestimonialRating from '../../components/home/home-2/TestimonialRating';
import Brand2 from '../../components/brand/Brand2';
import Link from 'next/link';
import CustomCalendlyButton from '../../components/custom-button/CustomCalendlyButton';
import { useState } from 'react';
const BecomeExpert = () => {
	const [query, setQuery] = useState('');

	return (
		<div onClick={() => setQuery('')}>
			<Seo pageTitle="Become Expert" />
			{/* End Page Title */}

			<div className="header-margin"></div>
			{/* header top margin */}

			<section className="section-bg mt-50">
				<div className="section-bg__item col-12">
					<Image width={1920} height={1080} src="/img/pages/about/1.png" alt="image" priority />
				</div>
				{/* End section-bg__item */}

				<div className="container mt-50 ">
					<div className="row about-contnet mt-50">
						<div className="col-md-8">
							<h1 className="md:text-25 fw-600 text-white abouth1 mt-50">
								Buying a home can be an overwhelming experience
							</h1>
							<div className="text-white mt-15">
								<h4 className="abouth4">
									Buying a home can be an overwhelming experience, especially if you’re a first-time
									homebuyer. The process involves a lot of research, negotiation, and paperwork, which
									can leave you feeling stressed and confused. However, with the help of an assisted
									buying service, you can alleviate some of the pressure and ensure that you get the
									best possible deal.
								</h4>
								<div className="d-inline-block w-100">
									<CustomCalendlyButton
										style="button enqFormButton mt-30"
										text={'Free Property consultation'}
									/>
								</div>
								<div className="row y-gap-60">
									{/* End .col */}

									<div className="col-xl-12 mt-50 mb-50">
										<Testimonial />
									</div>
									{/* End .col */}
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<Image width={1920} height={400} src="/img/pages/about/person.png" alt="image" priority />
						</div>
					</div>
				</div>
				{/* End .container */}
			</section>
			{/* End About Banner Section */}

			<section className="layout-pt-lg layout-pb-lg">
				<div className="container">
					<div className="row y-gap-20 justify-center text-center">
						<div className="col-auto">
							<div className="sectionTitle -md">
								<h2 className="sectionTitle__title">AssistedBuying Process</h2>
								<p className=" sectionTitle__text mt-5 sm:mt-0">
									Assisted buying services are designed to help buyers navigate the complex and often
									confusing world of real estate
								</p>
							</div>
						</div>
					</div>
					{/* End .row */}

					<div className="row y-gap-30 justify-between pt-40">
						<HowWorks />
					</div>
					{/* End .row */}
				</div>
				{/* End .container */}
			</section>
			{/* End how works Section */}

			{/* End about section block */}

			{/* End faq section block */}

			<Header2 query={query} setQuery={setQuery} />

			{/* End Header 2 */}

			<Footer7 />
			{/* End Call To Actions Section */}
		</div>
	);
};

export default dynamic(() => Promise.resolve(BecomeExpert), { ssr: false });
