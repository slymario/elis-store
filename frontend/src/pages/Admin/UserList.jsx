import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation} from "../../redux/api/usersApiSlice";
import {toast} from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import AdminMenu from "./AdminMenu";

const UserList = () => {
    const {data: users, refetch, isLoading, error} = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [editableUserId, setEditableUserId] = useState();
    const [editableUsername, setEditableUsername] = useState();
    const [editableUserEmail, setEditableUserEmail] = useState();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            try {
                await deleteUser(id);
                toast.success('User deleted successfully');
                refetch();
            } catch (error) {
                toast.error(error.data.message || error.error);
            }
        }
    };


    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUsername(username);
        setEditableUserEmail(email);
    };


    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUsername,
                email: editableUserEmail
            })
            setEditableUserId(null);
            refetch();
        } catch (error) {
            toast.error(error.data.message || error.error);
        }
    }




    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4 underline text-center justify-center">USERS</h1>
            {isLoading ? (
                <Loader />
                ) : error ? (
                    <Message variant='danger'>
                        {error?.data.message || error.message}
                        </Message>
                    ) : (
                        <div className="flex flex-col md:flex-row">
                            <AdminMenu />
                            <table className="w-full md:w-4/5 mx-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-center text-teal-400">ID</th>
                                        <th className="px-4 py-2 text-left text-teal-400">NAME</th>
                                        <th className="px-4 py-2 text-left text-teal-400">EMAIL</th>
                                        <th className="px-4 py-2 text-left text-teal-400">ADMIN</th>
                                        <th className="px-4 py-2 text-left"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td className="px-4 py-2">{user._id}</td>
                                            <td className="px-4 py-2">
                                                {editableUserId === user._id ? (
                                                    <div className="flex items-center">
                                                        <input type="text" value={editableUsername} onChange={e => setEditableUsername(e.target.value)} className="w-full rounded-lg p-2 border"  />
                                                        <button onClick={() => updateHandler(user._id)} className="ml-2 bg-teal-500 text-white py-2 px-4 rounded-lg">
                                                            <FaCheck />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        {user.username} {" "}
                                                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                            <FaEdit className="ml-[1rem]" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-4 py-2">
                                                {editableUserId === user._id ? (
                                                    <div className="flex items-center">
                                                        <input type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)} className="w-full rounded-lg p-2 border"  />
                                                        <button onClick={() => updateHandler(user._id)} className="ml-2 bg-teal-500 text-white py-2 px-4 rounded-lg">
                                                            <FaCheck />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        {user.email} {" "}
                                                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                            <FaEdit className="ml-[1rem]" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-4 py-2">
                                                {user.isAdmin ? (
                                                    <FaCheck style={{color: 'green'}} />
                                                ) : (
                                                    <FaTimes style={{color: 'red'}} />
                                                )}
                                            </td>

                                            <td className="px-4 py-2">
                                                {!user.isAdmin && (
                                                    <div className="flex">
                                                        <button onClick={() => deleteHandler(user._id)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-bold">
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
            )}
        </div>
    )
}

export default UserList