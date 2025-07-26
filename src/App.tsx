import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import NavbarLayout from "./Components/NavbarLayout";
import PrivateRoute from "./PrivateRoute";
import { MediaProvider } from "./context/MediaProvider";
import { UserInfoProvider } from "./context/UserInfoContext";
// Pages
import ArtistPortfolio from "./Pages/ArtistPortfolio/ArtistPortfolioPage";
import UserPortfolioPage from "./Pages/ArtistPortfolio/UserPortfolioPage";
import BecomeCreator from "./Pages/BecomeCreator/BecomeCreator";
import DashboardOverview from "./Pages/DashboardOverview";
import EditProfilePage from "./Pages/EditProfile/EditProfile";
import Login from "./Pages/Login/Login";
import Payment from "./Pages/Payment/Payment";
import ShareWork from "./Pages/ShareWork/ShareWork";
import SignUp from "./Pages/SignUp/SignUp";
import SubscriptionTier from "./Pages/SubscriptionTier/SubscriptionTier";
import UploadImage from "./Pages/UploadImage/UploadImage";
import ForgotPassword from "./Pages/forgotPassword/ForgotPassword";
import ResetPassword from "./Pages/resetPassword/resetPassword";

// Components
import ArtistProtectedRoute from "ArtistProtectedRoute";
import EditPortfolioWrapper from "Components/EditPortfolioWrapper";
import ScrollToTop from "Components/ScrollToTop";
import ExplorePage from "Pages/Explore/ExplorePage";
import AboutPage from "Pages/ExtraPages/AboutPage";
import AcknowledgementPage from "Pages/ExtraPages/Acknowledgement";
import CodeOfConduct from "Pages/ExtraPages/CodeofConduct";
import NotFound from "Pages/ExtraPages/NotFound";
import PrivacyPolicy from "Pages/ExtraPages/PrivacyAndPolicy";
import TermsAndConditions from "Pages/ExtraPages/TermsAndConditions";
import FavoritePage from "Pages/Favorites/FavoritePage";
import HomePage from "Pages/HomePage/HomePage";
import Notifications from "Pages/Notifications/Notifications";
import PaymentSuccess from "Pages/PaymenSuccess";
import { SearchPage } from "Pages/Search/SearchPage";
import SinglePost from "Pages/SinglePost/SinglePost";
import InspirationPage from "Pages/inspiration/InspirationPage";
import { NotificationProvider } from "context/NotificatonProvider";
import Artists from "./Components/Artists";
import Contact from "./Components/Contact";

function App() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <HelmetProvider>
        <UserInfoProvider>
          <NotificationProvider>
            <NavbarLayout>
              <MediaProvider>
                <ScrollToTop />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/portfolio/:id" element={<ArtistPortfolio />} />
                  <Route path="/post/:id" element={<SinglePost />} />
                  <Route path="/favorites" element={<FavoritePage />} />

                  <Route path="/about-us" element={<AboutPage />} />
                  <Route
                    path="/acknowledgement"
                    element={<AcknowledgementPage />}
                  />
                  <Route path="/cod" element={<CodeOfConduct />} />
                  <Route
                    path="/termsconditions"
                    element={<TermsAndConditions />}
                  />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />

                  {/* Private Routes */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route
                      path="/dashboard/overview"
                      element={<DashboardOverview />}
                    />
                    <Route path="/explore" element={<ExplorePage />} />

                    <Route path="/become-creator" element={<BecomeCreator />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/inspiration" element={<InspirationPage />} />

                    {/* prevent Audience Access to Artist Routes */}
                    <Route element={<ArtistProtectedRoute />}>
                    <Route path="/edit/profile" element={<EditProfilePage />} />
                      <Route
                        path="/portfolio"
                        element={<UserPortfolioPage />}
                      />

                      <Route path="/share-work" element={<ShareWork />} />
                      <Route path="/upload-image" element={<UploadImage />} />
                      <Route
                        path="/edit-portfolio/:portfolioId"
                        element={<EditPortfolioWrapper />}
                      />
                    </Route>
                    <Route
                      path="/subscription-tier"
                      element={<SubscriptionTier />}
                    />
                    <Route path="/payment" element={<Payment />} />
                    <Route
                      path="/payment-success"
                      element={<PaymentSuccess />}
                    />

                 
                    <Route path="/*" element={<NotFound />} />
                  </Route>
                </Routes>
              </MediaProvider>
            </NavbarLayout>
          </NotificationProvider>
        </UserInfoProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
