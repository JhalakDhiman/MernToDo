import React, { useState } from 'react';
import axios from "../../Axios/axios.js"
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';

const EditModal = ({ modalData, onClose }) => {
    const [title, setTitle] = useState(modalData.title || "");
    const [priority,setPriority]=useState(modalData.priority||0);
    const [description, setDescription] = useState(modalData.description || "");
    const { dispatch } = useContext(TaskContext)
    const {userToken} = useContext(TokenContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskId = modalData._id;
        const res = await axios.post("/task/editTask", {title,priority, description,taskId},{
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            })
        dispatch({
            type: "UPDATE_TASK",
            title,
            description,
            priority,
            taskId
        })
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="flex flex-col gap-5 bg-slate-500 rounded-lg p-3 border-[1px] border-richblack-500 w-[400px]">
                <h2 className="text-2xl text-white font-semibold">Edit Task</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <label className="text-white text-lg font-semibold" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-2 rounded-md bg-richblack-800 text-slate-500 border border-richblack-500 focus:outline-none focus:border-blue-500"
                        required
                    />

                    <label className="text-white text-lg font-semibold" htmlFor="priority">Priority</label>
                    <input
                        type="number"
                        id="priority"
                        name="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-2 rounded-md bg-richblack-800 text-slate-500 border border-richblack-500 focus:outline-none focus:border-blue-500"
                        required
                    />

                    <label className="text-white text-lg font-semibold" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 rounded-md bg-richblack-800 text-slate-500 border border-richblack-500 focus:outline-none focus:border-blue-500"
                        required
                    ></textarea>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
