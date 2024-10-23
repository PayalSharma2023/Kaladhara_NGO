import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePopupState, useDebouce, usePagination } from "../hooks";
import {
  Button,
  BackButton,
  SearchInput,
  UsersTable,
  Pagination,
  FormUser,
} from "../components";
import { toast } from "react-toastify";
// import { useVolunteerContext } from '../hooks/useVolunteerContext';
// import { VolunteerDetails } from '../components/VolunteerDetails';

const DEFAULT_VALUE = {
  Volunteername: "",
  gender: true,
  email: "",
  phone: "",
  isApproved: false,
};

const Members = () => {
  // const {volunteers, dispatch} = useVolunteerContext();

  const [users, setUsers] = useState([]);
  const [originalUser, setOriginalUser] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [userID, setUserID] = useState("");
  const { currentPage, setCurrentPage, displayedProducts, totalPages } =
    usePagination(users);

  const {
    value: newUser,
    show: popupAddNew,
    setShow: setPopupAddNew,
    handleClose: closePopup,
    handleChange: handleInputChange,
  } = usePopupState(DEFAULT_VALUE);

  const {
    value: updateData,
    setValue: setUpdateData,
    show: updatePopup,
    setShow: setUpdatePopup,
    handleClose: closeUpdatePopup,
    handleChange: handleInputChangeUpdate,
  } = usePopupState(DEFAULT_VALUE);

  const fetchData = async () => {
    try {
      const res = await axios.get("/admin/volunteers");
      // Check if the response is as expected
      console.log("Response data:", res.data);

      setUsers(res.data);
      setOriginalUser(res.data);
    } catch (error) {
      console.error("Error fetching Data: ", error.response.data);
    }
  };
  
  useEffect(() => {
    document.title = "Volunteer Page";
  }, []);

  useEffect(() => {
    // const fetchVolunteers = async () => {
    //   const res = await fetch('/admin/volunteers/')
    //   const json = await res.json();
    //   console.log(json)
    //   if(res.ok){
    //     dispatch({type: 'SET_VOLUNTEERS', payload: json})
    //   }
    // };

    // fetchVolunteers();
    fetchData();
  }, [updateUI]);

  //search filter
  const [searchUser, setSearchUser] = useState("");
  const searchDebouce = useDebouce(searchUser, 500);

  const handleAddNew = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/user/signup-volunteer",
        JSON.stringify(newUser),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("Added new user successfully!");
      }
      setUpdateUI((prevState) => !prevState);
      toast.success("Added new user successfully");
      closePopup();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/admin/volunteers/${id}/reject`);
      setUpdateUI((prevState) => !prevState);
      toast.success("Deleted user!");
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const approveUser = async (id) => {
    try {
      await axios.put(`/admin/volunteers/${id}/approve`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUpdateUI((prevState) => !prevState);
      toast.success("user Approved!");
      closeUpdatePopup();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleFetchUser = async (id) => {
    setUpdatePopup(true);
    setUserID(id); //user._id
    try {
      const res = await axios.get(`/admin/volunteers/${id}`);
      setUpdateData(res.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/admin/volunteers/${userID}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUpdateUI((prevState) => !prevState);
      toast.info("UPdated user information");
      closeUpdatePopup();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    const dataFilter = originalUser.filter((user) =>
      user.email.toLowerCase().includes(searchDebouce.toLowerCase())
    );
    setUsers(dataFilter);
  }, [searchDebouce, originalUser]);

  return (
    <div className="p-7 container relative">
      <BackButton />
      <div className="flex items-center justify-between pb-4">
        <SearchInput
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Search for user by name"
        ></SearchInput>
        <Button onClick={() => setPopupAddNew(true)}>Add new</Button>
      </div>
      <UsersTable
        usersData={displayedProducts}
        handleRemoveUser={deleteUser}
        handleFetchUser={handleFetchUser}
        handleApproveUser={approveUser}
      ></UsersTable>
      {popupAddNew && (
        <FormUser
          data={newUser}
          title="Add new user"
          handleClose={closePopup}
          handleChange={handleInputChange}
          handleSubmit={handleAddNew}
          typeButton="Add new"
        ></FormUser>
      )}
      {updatePopup && (
        <FormUser
          data={updateData}
          title="Update user"
          handleChange={handleInputChangeUpdate}
          handleClose={closeUpdatePopup}
          handleSubmit={handleUpdateSubmit}
          typeButton="Update"
        ></FormUser>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setCurrentPage}
        ></Pagination>
      )}
    </div>
    // <div className="p-4 bg-white shadow-lg rounded-md">
    //   <h2 className="font-bold text-xl mb-4">Volunteers</h2>
    //   <table className="table-auto w-full">
    //     <thead>
    //       <tr className="bg-gray-200">
    //         <th className="px-4 py-2">Name</th>
    //         <th className="px-4 py-2">Email</th>
    //         <th className="px-4 py-2">Role</th>
    //         <th className="px-4 py-2">Status</th>
    //         <th className="px-4 py-2">Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {users && users.length > 0 ? (
    //         users.map((volunteer) => (
    //           <VolunteerDetails key={volunteer._id} volunteer={volunteer} />
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan="5" className="text-center py-4">
    //             No volunteers available.
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default Members;
