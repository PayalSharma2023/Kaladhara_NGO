import React from "react";
import { useVolunteerContext } from "../hooks/useVolunteerContext";
import { useAuthContext } from "../hooks/useAuthContext";

export function VolunteerDetails({ volunteer }) {
  const { dispatch } = useVolunteerContext();
  const { user } = useAuthContext();

  // Logging to check if volunteers and user are being passed correctly
  console.log("Volunteer:", volunteer);
  console.log("User:", user);

  // Approve a volunteer
  const handleApprove = async () => {
    if (!user) return;

    console.log("Approving volunteer:", volunteer._id);

    const response = await fetch(`/admin/volunteers/${volunteer._id}/approve`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
       console.log("Dispatching UPDATE_VOLUNTEER");
      dispatch({ type: "UPDATE_VOLUNTEER", payload: json });
    }
  };

  // Reject a volunteer
  const handleReject = async () => {
    if (!user) return;

    const response = await fetch(`/admin/volunteers/${volunteer._id}/reject`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_VOLUNTEER", payload: json });
    }
  };

  return (
    <tr className="bg-white border-b">
      <td className="px-4 py-2">{volunteer.Volunteername}</td>
      <td className="px-4 py-2">{volunteer.email}</td>
      <td className="px-4 py-2">{volunteer.role}</td>
      <td className="px-4 py-2">
        {volunteer.isApproved ? (
          <span className="text-green-500 font-semibold">Approved</span>
        ) : (
          <span className="text-yellow-500 font-semibold">Pending</span>
        )}
      </td>
      <td className="px-4 py-2 flex space-x-2">
        {!volunteer.isApproved && (
          <>
            <button
              className="bg-green-500 text-white px-4 py-1 rounded"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded"
              onClick={handleReject}
            >
              Reject
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
