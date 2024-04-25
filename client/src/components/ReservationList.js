import React, { useState, useEffect } from "react";
import "./ReservationList.css";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import Reservation from "./Reservation";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    // decalare the data fectching function
    const fetchData = async () => {
      const endpoint =
        process.env.REACT_APP_ENDPOINT || "http://localhost:5001";
      const response = await fetch(`${endpoint}/reservations`);

      const data = await response.json();
      setReservations(data);
    };

    // call the function
    fetchData();
  }, []);
  return (
    <>
      <h1>Upcoming reservations</h1>
      <br></br>
      <ul className="grid">
        {reservations.map((reservation) => (
          <li className="reservation-single" key={reservation.id}>
            <h2>{reservation.restaurantName}</h2>
            <p>{formatDate(reservation.date)}</p>
            <Link to={`/reservations/${reservation.id}`}>
              View Details &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReservationList;
