import { useContext } from "react";
import { VolunteerContext } from "../context/VolunteerContext";

export const useVolunteerContext = () => {
  const context = useContext(VolunteerContext);

  if (!context) {
    throw Error(
      "useVolunteerContext must be used inside a VolunteerContextProvider"
    );
  }

  return context;
};
