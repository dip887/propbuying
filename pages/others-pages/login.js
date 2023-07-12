import dynamic from "next/dynamic";
import CallToActions from "../../components/common/CallToActions";
import Seo from "../../components/common/Seo";
import Footer7 from "../../components/footer/footer-7";
import { useEffect, useState } from "react";
import LoginWithSocial from "../../components/common/LoginWithSocial";
import LoginForm from "../../components/common/LoginForm";
import Header2 from "../../components/header/header-2";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const LogIn = () => {
  const [query, setQuery] = useState("");
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  if (user) {
    return null;
  }

  return (
    <div onClick={() => setQuery("")}>
      <Seo pageTitle="Login" />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header2 setQuery={setQuery} query={query} />
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
                <LoginForm />
                {/* End .Login */}

                <div className="row y-gap-20 pt-30">
                  <div className="col-12">
                    <div className="text-center">or sign in with</div>
                  </div>
                  <LoginWithSocial />
                  <div className="col-12">
                    <div className="text-center px-30">
                      By creating an account, you agree to our Terms of Service
                      and Privacy Statement.
                    </div>
                  </div>
                </div>
                {/* End .row */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End login section */}

      <Footer7 />
      {/* End Call To Actions Section */}
    </div>
  );
};

export default dynamic(() => Promise.resolve(LogIn), { ssr: false });
