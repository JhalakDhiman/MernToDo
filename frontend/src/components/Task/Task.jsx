import React, { useState } from 'react';
import moment from 'moment';
import "./task.css";
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaEdit } from "react-icons/fa";
import EditModal from '../modal/EditModal';
import axios from '../../Axios/axios.js';
import TokenContext from '../../context/TokenContext';
function Task({ task}) {
    const { dispatch } = useContext(TaskContext);
    const [modalData, setModalData] = useState(null);
    const {userToken} = useContext(TokenContext);
    const taskId = task._id;

    const handleRemove = (e) => {
        e.preventDefault();
        

        dispatch({
            type: "REMOVE_TASK",
            taskId
        })
    }

    const handleEdit = (e) => {
       setModalData(task);
    }

    const handleMarkDone = async(e) => {
        dispatch({
            type: "MARK_DONE",
            taskId
        })
        const res = await axios.post("/task/markTaskDone", { taskId: task._id }, {
            headers: {
                Authorization: `Bearer ${userToken}`        
            }
        }
        )
    }
    return (
        <div className='bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
            <div className="mark-done">
                <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
            </div>
            <div className="task-info text-slate-900 text-sm w-10/12">
                <h4 className="task-title text-lg capitalize">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <p className="task-description">Rate : {task.priority}</p>
                <div className=' italic opacity-60'>
                    {
                        task?.createdAt ? (
                            <p>{moment(task.createdAt).fromNow()}</p>
                        ) : (
                            <p>just now</p>
                        )
                    }
                </div>
            </div>
            <div className="text-[30px] text-white">
                <FaEdit
                    style={{ fontSize: 30, cursor: "pointer" }}
                    onClick={handleEdit}
                    className="bg-blue-700 text-[30px] rounded-full border-2 shadow-2xl border-white p-1" />
            </div>
            <div className="remove-task text-sm text-white">
                <DeleteIcon
                    style={{ fontSize: 30, cursor: "pointer" }}
                    size="large"
                    onClick={handleRemove}
                    className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1" />
            </div>

            <div>
                {modalData && (
                    <EditModal
                        modalData={modalData}
                        onClose={() => setModalData(null)}
                    />
                )}
            </div>
        </div>
    );
}

export default Task;