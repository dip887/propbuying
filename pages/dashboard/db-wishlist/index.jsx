import Seo from "../../../components/common/Seo";
import Sidebar from "../common/Sidebar";
import Header2 from "../../../components/header/header-2";
import Footer from "../common/Footer";
import WishlistTable from "./components/WishlistTable";
import { useEffect, useState } from "react";
import { selectUser } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const DbWishlist = () => {
  const [query, setQuery] = useState("");
  const currentUser = useSelector(selectUser);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/others-pages/login");
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <div onClick={() => setQuery("")}>
      <Seo pageTitle="Wishlist" />
      {/* End Page Title */}

      <div className="header-margin"></div>

      <Header2 query={query} setQuery={setQuery} />
      {/* End dashboard-header */}

      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <Sidebar />
          {/* End sidebar */}
        </div>
        {/* End dashboard__sidebar */}

        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600">Wishlist</h1>
                <div className="text-15 text-light-1">
                  Lorem ipsum dolor sit amet, consectetur.
                </div>
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <WishlistTable />
              {/* End tabs */}
            </div>

            <Footer />
          </div>
          {/* End .dashboard__content */}
        </div>
        {/* End dashbaord content */}
      </div>
      {/* End dashbaord content */}
    </div>
  );
};

export default DbWishlist;
