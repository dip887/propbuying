import Head from "next/head";

const Seo = ({ shortDescription, locality, developerName, projectName }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script
        async
        key="amp-story"
        custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
      />
      <script
        async
        custom-element="amp-video"
        src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
      />

      <title>{`Looking for a apartment in ${locality}? Explore ${developerName} ${projectName}, ${shortDescription}. Get ready to invest in your dream home!`}</title>
      <meta
        name="title"
        content={`Looking for a apartment in ${locality}? Explore ${developerName} ${projectName}, ${shortDescription}. Get ready to invest in your dream home!`}
      ></meta>
      <meta
        name="description"
        content={`Looking for a apartment in ${locality}? Explore ${developerName} ${projectName}, ${shortDescription}. Get ready to invest in your dream home!`}
      ></meta>

      <meta property="og:type" content="website"></meta>
      <meta property="og:url" content="{url}"></meta>
      <meta
        property="og:title"
        content={`Looking for a apartment in ${locality}? Explore ${developerName} ${projectName}, ${shortDescription}. Get ready to invest in your dream home!`}
      ></meta>
      <meta
        property="og:description"
        content={`Looking for a apartment in ${locality}? Explore ${developerName} ${projectName}, ${shortDescription}. Get ready to invest in your dream home!`}
      ></meta>
      <meta property="og:image" content="{elevation-image}"></meta>

      <meta property="twitter:card" content="summary_large_image"></meta>
      <meta property="twitter:url" content="{url}"></meta>
      <meta
        property="twitter:title"
        content={`Looking for a apartment in ${locality}? Explore ${developerName} ${projectName}, ${shortDescription}. Get ready to invest in your dream home!`}
      ></meta>
      <meta
        property="twitter:description"
        content={`Looking for a apartment in ${locality}? Explore ${developerName} ${projectName}, ${shortDescription}. Get ready to invest in your dream home!`}
      ></meta>
      <meta property="twitter:image" content="{elevation-image}"></meta>
    </Head>
  </>
);

export default Seo;
