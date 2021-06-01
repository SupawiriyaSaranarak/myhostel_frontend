import { Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContextProvider";
import RegisterSuccessPage from "./pages/RegisterSuccessPage";
import AllBookingPage from "./pages/booking/AllBookingPage";
import BookingByIdPage from "./pages/booking/BookingByIdPage";
import CreateBookingPage from "./pages/booking/CreateBookingPage";
import CreateBachBookingPage from "./pages/booking/CreateBachBookingPage";
import UpdateBookingPage from "./pages/booking/UpdateBookingPage";
import LoginPage from "./pages/LoginPage";
// import "./App.css";

const superAdminRoutes = [
  {
    path: "/booking/all",
    component: AllBookingPage,
  },
  {
    path: "/booking/get-booking-by-id/:id",
    component: BookingByIdPage,
  },
  {
    path: "/booking/create",
    component: CreateBookingPage,
  },
  {
    path: "/booking/update",
    component: UpdateBookingPage,
  },
  {
    path: "/booking/createbach",
    component: CreateBachBookingPage,
  },
  {
    path: "/booking/update-booking-by-id/:id",
    component: UpdateBookingPage,
  },
];
const adminRoutes = [
  {
    path: "/booking/all",
    component: AllBookingPage,
  },
  {
    path: "/booking/get-booking-by-id/:id",
    component: BookingByIdPage,
  },
  {
    path: "/booking/create",
    component: CreateBookingPage,
  },
  {
    path: "/booking/update",
    component: UpdateBookingPage,
  },
  {
    path: "/booking/createbach",
    component: CreateBachBookingPage,
  },
  {
    path: "/booking/update-booking-by-id/:id",
    component: UpdateBookingPage,
  },
];
const publicRoutes = [
  {
    path: "/login",
    component: LoginPage,
  },
];

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Switch>
      {/* <Route exact path={"/"} component={Home} />; */}
      {user &&
        user.userStatus === "SUPERADMIN" &&
        superAdminRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}
      {user &&
        user.userStatus === "ADMIN" &&
        adminRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}
      {!user &&
        publicRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}
      {user && user.userStatus === "USER" && (
        <Route exact path="/register-success" component={RegisterSuccessPage} />
      )}

      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
