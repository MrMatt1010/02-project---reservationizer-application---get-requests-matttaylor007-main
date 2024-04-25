import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Reservation from "./components/Reservation";
import ReservationList from "./components/ReservationList";

const App = () => {
  return (
    <>
      <Header />
      <div className="mainContainer">
        <Routes>
          <Route path="/reservations/:id" element={<Reservation />} />
          <Route exact path="/" element={<ReservationList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
