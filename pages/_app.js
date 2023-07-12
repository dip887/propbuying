import Aos from "aos";
import { useEffect } from "react";
import ScrollTop from "../components/common/ScrollTop";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "react-calendar/dist/Calendar.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/index.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Analytics } from "@vercel/analytics/react";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
  require("instantsearch.css/themes/reset.css");
  require("instantsearch.css/themes/satellite.css");
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <main>
      <Provider store={store}>
        <Component {...pageProps} />
        <ScrollTop />
        <Analytics />
      </Provider>
    </main>
  );
}
