import { useMutation, useQuery } from "@apollo/client";
import Admin from "./Admin";
import { FaTrash } from "react-icons/fa";
import { DELETE_USER, UPDATE_USER } from "../../mutations/userMutation";
import { useEffect, useState } from "react";
import { TfiExchangeVertical } from "react-icons/tfi";
import { GET_USERS } from "../../queries/userQueries";

const Users = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    // Get userData from localStorage
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      // Parse the JSON string and set it to the state
      const parsedUserData = JSON.parse(userDataFromLocalStorage);
      setUserData(parsedUserData);
    }
  }, []);

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { adminId: userData.id },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS, variables: { adminId: userData.id } }],
    onError: (error) => {
      console.error("Error deleting user:", error);
      // Handle the error, display a message to the user, or perform other actions
    },
  });
  const handleDeleteUser = (userId) => {
    deleteUser({ variables: { userId, adminId: userData.id } });
  };

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS, variables: { adminId: userData.id } }],
    onError: (error) => {
      console.error("Error registering user:", error);
      // Handle the error, display a message to the user, or perform other actions
    },
  });

  const updateUserHandler = (userid) => {
    updateUser({ variables: { adminId: userData.id, userId: userid } });
  };

  return (
    <Admin>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center">Something went wrong...</p>}
      {!loading && !error && data.users && (
        <div className="px-[10px] md:px-[20px] lg:px-[10%]">
          <div className="flex-1 lg:pl-5">
            <div className="container mx-auto overflow-x-auto scroll-m-1 text-xs md:text-base">
              <table className="min-w-full bg-white border border-none ">
                <thead className="border-b px-2">
                  <tr className="bg-gray-200">
                    <th className="py-2 mx-4 border-none text-start pl-5">
                      Name
                    </th>
                    <th className="py-2 mx-4 border-none text-start">Email</th>
                    <th className="py-2 mx-4 border-none text-start">Role</th>
                    <th className="py-2 mx-4 border-none text-start flex justify-end">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.map((d) => (
                    <tr key={d.id} className=" border-b">
                      <td className="py-2 mx-4 border-none whitespace-nowrap pl-5">
                        {d.name}
                      </td>
                      <td className="py-2 mx-4 border-none whitespace-nowrap">
                        {d.email}
                      </td>
                      <td className="py-2 mx-4 border-none whitespace-nowrap">
                        <button
                          onClick={() => updateUserHandler(d.id)}
                          className=" "
                        >
                          <TfiExchangeVertical className=" text-sm hover:text-green-500 " />
                        </button>{" "}
                        {d.admin ? "Admin" : "User"}{" "}
                      </td>
                      <td className="py-2 border-none whitespace-nowrap text-end flex justify-end pr-5">
                        <div
                          onClick={() => handleDeleteUser(d.id)}
                          className=" inline-block bg-red-500 p-2  cursor-pointer hover:bg-red-600"
                        >
                          <FaTrash className="text-white" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Admin>
  );
};

export default Users;
