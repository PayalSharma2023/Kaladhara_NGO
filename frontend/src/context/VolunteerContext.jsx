import { createContext, useReducer } from "react";

export const VolunteerContext = createContext();

export const volunteerReducer = (state, action) => {
  switch (action.type) {
    case "SET_VOLUNTEERS":
      return {
        volunteers: action.payload,
      };
    case "CREATE_VOLUNTEER":
      return {
        volunteers: [action.payload, ...state.volunteers],
      };
    case "DELETE":
      return {
        volunteers: state.volunteers.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    case 'UPDATE_VOLUNTEER':
        return {
            ...state,
            volunteers: state.volunteers.map((v) => 
                v._id === action.payload._id ? action.payload : v
            ),
        };
    default:
      return state;
  }
};

export const VolunteerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(volunteerReducer, {
    volunteers: [],
  });

  return (
    <VolunteerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </VolunteerContext.Provider>
  );
};
