import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"; // ch 11
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"; //ch n11 get useLogout fountion

//匯入 WorkoutDetails 9

export const LeftNavbar = () => {
  return (
    <div className="Navigation left">
      <h1> Youtude vidio list </h1>

      {/* 分頁 */}
      <Link to="/streaming">
        <p>
          <i className="fa-brands fa-youtube"></i>streaming
        </p>
      </Link>

      <Link to="/upcomeing">
        <p>
          <i className="fa-brands fa-youtube"></i>upcoming
        </p>
      </Link>

      <Link to="/streamDatas">
        <p>
          <i className="fa-brands fa-youtube"></i>data
        </p>
      </Link>
    </div>
  );
};
