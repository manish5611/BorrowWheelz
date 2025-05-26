// components/common_components/MainLayout.jsx
import React from "react";
import Header from "../header_components/Header";
import Footer from "../footer_components/Footer";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../auth_components/AuthManager";
import PageTitle from "./PageTitle";

// Pages
import Homepage from "../../pages/common_pages/Homepage";
import PageNotFound from "../../pages/common_pages/PageNotFound";
import AboutUs from "../../pages/common_pages/AboutUs";
import Register from "../../pages/user_pages/Register";
import Login from "../../pages/user_pages/Login";
import Dashboard from "../../pages/user_pages/Dashboard";
import Profile from "../../pages/user_pages/Profile";
import UpdateProfile from "../../pages/user_pages/UpdateProfile";
import ForgotPassword from "../../pages/user_pages/ForgotPassword";
import ResetPassword from "../../pages/user_pages/ResetPassword";

// blog pages.
import AllBlogs from "../../pages/blog_pages/AllBlogs";
import SingleBlog from "../../pages/blog_pages/SingleBlog";

// contact pages.
import ContactUs from "../../pages/contact_pages/ContactUs";
import Reviews from "../../pages/common_pages/Reviews";

// subscription page.
import Subscriptions from "../../pages/subscription_pages/Subscriptions";
import SearchProducts from "../../pages/product_pages/SearchProducts";

// shop page.
import Shop from "../../pages/shop_pages/Shop";
import SingleProduct from "../../pages/shop_pages/SingleProduct";

// cart pages.
import CartPage from "../../pages/cart_pages/CartPage";
import CheckoutPage from "../../pages/cart_pages/CheckoutPage";
import MyOrders from "../../pages/orders_page/MyOrders";
import ThankYou from "../../pages/orders_page/ThankYou";

// wishlist page..
import Wishlist from "../../pages/wishlist_pages/Wishlist";
import Book from "../../pages/rent_pages/Book"

// rent page.
import RentPage from "../../pages/rent_pages/RentPage";
import SingleRentPage from "../../pages/rent_pages/SingleRentPage";

// superadmin pages.
import SuperAdminDashboard from "../../pages/superadmin_pages/SuperAdminDashboard";
import AllUsers from "../../pages/superadmin_pages/AllUsers";
import SingleUser from "../../pages/superadmin_pages/SingleUser";

const MainLayout = () => {
  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <main className="flex-grow py-6">
        <Routes>
          <Route
            path="/"
            element={
              <PageTitle title="Home">
                <Homepage />
              </PageTitle>
            }
          />
          <Route
            path="/home"
            element={
              <PageTitle title="Home">
                <Homepage />
              </PageTitle>
            }
          />
          <Route
            path="/homepage"
            element={
              <PageTitle title="Home">
                <Homepage />
              </PageTitle>
            }
          />
          <Route
            path="/contact-us"
            element={
              <PageTitle title="Contact Us">
                <ContactUs />
              </PageTitle>
            }
          />
          <Route
            path="/reviews"
            element={
              <PageTitle title="Reviews & News">
                <Reviews />
              </PageTitle>
            }
          />
          <Route
            path="/about-us"
            element={
              <PageTitle title="About Us">
                <AboutUs />
              </PageTitle>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <PageTitle title="Login">
                  <Login />
                </PageTitle>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <PageTitle title="Register">
                  <Register />
                </PageTitle>
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <PageTitle title="User Dashboard">
                  <Dashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/shop" element={<Shop />} />

          <Route path="/single-product/:id" element={<SingleProduct />} />

          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <PageTitle title="Profile">
                  <Profile />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/update-profile/:id"
            element={
              <PrivateRoute>
                <PageTitle title="Update Profile">
                  <UpdateProfile />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/all-blogs"
            element={
              <PageTitle title="All Blogs">
                <AllBlogs />
              </PageTitle>
            }
          />

          <Route
            path="/single-blog/:id"
            element={
              <PageTitle title="Single Blog">
                <SingleBlog />
              </PageTitle>
            }
          />

          {/* product pages  */}
          <Route
            path="/search-products"
            element={
              <PageTitle title="Search Products">
                <SearchProducts />
              </PageTitle>
            }
          />

          {/* cart pages  */}
          <Route
            path="/cart"
            element={
              <PageTitle title="Cart">
                <CartPage />
              </PageTitle>
            }
          />

          <Route
            path="/checkout"
            element={
              <PageTitle title="Checkout">
                <CheckoutPage />
              </PageTitle>
            }
          />

          <Route
            path="/book"
            element={
              <PageTitle title="Booking">
                <Book />
              </PageTitle>
            }
          />

          <Route
            path="/my-orders"
            element={
              <PageTitle title="Myorders">
                <MyOrders />
              </PageTitle>
            }
          />

          <Route
            path="/thank-you"
            element={
              <PageTitle title="ThankYou">
                <ThankYou />
              </PageTitle>
            }
          />

          <Route
            path="/wishlist"
            element={
              <PageTitle title="Wishlist">
                <Wishlist />
              </PageTitle>
            }
          />

          <Route
            path="/rent"
            element={
              <PageTitle title="Rent a Car">
                <RentPage />
              </PageTitle>
            }
          />

          <Route
            path="/singlerent/:slug"
            element={
              <PageTitle title="Car Details">
                <SingleRentPage />
              </PageTitle>
            }
          />

          {/* Superadmin routes */}
          <Route
            path="/superadmin-dashboard"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="SuperAdmin Dashboard">
                  <SuperAdminDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-users"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Users">
                  <AllUsers />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-user/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single User">
                  <SingleUser />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/page-not-found"
            element={
              <PageTitle title="404 Not Found">
                <PageNotFound />
              </PageTitle>
            }
          />
          <Route
            path="/*"
            element={
              <PageTitle title="404 Not Found">
                <PageNotFound />
              </PageTitle>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
