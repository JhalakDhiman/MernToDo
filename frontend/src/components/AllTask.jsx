import React, { useEffect, useState } from 'react';
import Task from './Task/Task';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import TokenContext from '../context/TokenContext';
import axios from "../Axios/axios.js"
function AllTask() {
    const {userToken} = useContext(TokenContext)
    const {tasks} = useContext(TaskContext);
    const { dispatch } = useContext(TaskContext);

    const fetchAllTasks = async () => {
        try {
            const res = await axios.get("/task/getTask", {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            console.log("all tasks are : ",res.data);
            const sortedTasks = res.data;
            dispatch({
                type: "SET_TASK",
                payload:sortedTasks
            });
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {  
        fetchAllTasks();
    }, []);
    return (
        <div>
            {
                (tasks?.length !==0) ? (
                    tasks?.map((task, index) => {
                        return (
                            <Task
                                key={index}
                                task={task}
                            />
                        )
                    })  
                ) : (
                    <h1>No Task Found</h1>
                )
            }
        </div>
    );
}

export default AllTask;