import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import AllBookingPage from "./pages/booking/AllBookingPage";
import BookingByIdPage from "./pages/booking/BookingByIdPage";
// import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path={"/"} component={Home} />;
      <Route exact path={"/booking/all"} component={AllBookingPage} />;
      <Route
        exact
        path={"/booking/get-booking-by-id/:id"}
        component={BookingByIdPage}
      />
    </Switch>
  );
}

export default App;
