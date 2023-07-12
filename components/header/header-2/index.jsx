import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "../MobileMenu";
import { auth } from "../../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setError,
  setUser,
} from "../../../features/auth/authSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import SearchBar from "./SearchBar";

const Header2 = ({ query, setQuery }) => {
  const [navbar, setNavbar] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter();

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      dispatch(setUser(null));
      localStorage.removeItem("enquiryData");
      localStorage.removeItem("currentUser");
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <>
      <header
        style={{ zIndex: 1000 }}
        className={`header ${
          navbar
            ? "bg-dark-1 is-sticky"
            : router.pathname.includes("signup") ||
              router.pathname.includes("login") ||
              router.query.slug?.includes("projects-in") ||
              router.pathname.includes("developers") ||
              router.pathname.includes("dashboard") ||
              router.pathname.includes("become-expert") ||
              router.pathname.includes("blog-details") ||
              router.pathname.includes("all-properties") ||
              router.query.slug?.includes("property-in") ||
              router.pathname.includes("pune-residential-property") ||
              router.pathname.includes("properties/properties-in-pune")
            ? "bg-dark-1 is-sticky"
            : ""
        }`}
      >
        <div className="header__container container">
          <div className="row justify-between items-center">
            <div className="col-sm mobile-col">
              <div className="d-flex items-center">
                <div className="mr-20 d-flex items-center">
                  <div className="mr-15 d-none md:d-flex">
                    {!user ? (
                      <Link
                        href="/others-pages/signup"
                        className="icon-user text-inherit text-22 text-white"
                      />
                    ) : (
                      <>
                        <button
                          onClick={signOut}
                          className="border px-2 py-1 text-white"
                        >
                          Logout
                        </button>
                        <Link href="/dashboard/db-dashboard">
                          <Image
                            width={50}
                            height={50}
                            src={user?.photoURL || "https://i.pravatar.cc/50"}
                            alt={user?.displayName || "user"}
                            className="rounded-100  ml-28"
                          />
                        </Link>
                      </>
                    )}
                  </div>
                  {/* End mobile menu icon */}

                  <button
                    className="d-flex items-center icon-menu text-white text-20"
                    data-bs-toggle="offcanvas"
                    aria-controls="mobile-sidebar_menu"
                    data-bs-target="#mobile-sidebar_menu"
                  ></button>
                  {/* Start mobile menu icon */}

                  <div
                    className="offcanvas offcanvas-start  mobile_menu-contnet"
                    tabIndex="-1"
                    id="mobile-sidebar_menu"
                    aria-labelledby="offcanvasMenuLabel"
                    data-bs-scroll="true"
                  >
                    <MobileMenu />
                    {/* End MobileMenu */}
                  </div>
                </div>
                {/* End mobile humberger menu */}

                <Link href="/" className="header-logo w-1/3 mr-20">
                  <img src="/img/general/logo.svg" alt="logo icon" />
                </Link>
                {/* End logo */}

                <div className="relative w-1/1 xl:d-none">
                  <SearchBar query={query} setQuery={setQuery} />
                </div>
                {/* End Search box */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="row x-gap-20 items-center xxl:d-none">
                  {/*<CurrenctyMegaMenu textClass="text-white" />*/}
                  {/* End Megamenu for Currencty */}

                  {/* Start vertical devider*/}
                  <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div>
                  {/* End vertical devider*/}

                  {/*<LanguageMegaMenu textClass="text-white" />*/}
                  {/* End Megamenu for Language */}
                </div>
                {/* End language and currency selector */}

                {/* Start btn-group */}
                <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                  <Link
                    href="/others-pages/become-expert"
                    className="button px-30 fw-400 text-14 -white bg-blue-1 h-50 text-white"
                  >
                    AssistedBuying
                  </Link>
                  {!user ? (
                    <Link
                      href="/others-pages/signup"
                      className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20"
                    >
                      Login / Signup
                    </Link>
                  ) : (
                    <button
                      onClick={signOut}
                      className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20"
                    >
                      Logout
                    </button>
                  )}
                  {user && (
                    <Link href="/dashboard/db-dashboard">
                      <Image
                        width={50}
                        height={50}
                        src={user?.photoURL || "https://i.pravatar.cc/50"}
                        alt={user?.displayName || "user"}
                        className="rounded-100  ml-28"
                      />
                    </Link>
                  )}
                </div>
                {/* End btn-group */}
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
    </>
  );
};

export default Header2;
