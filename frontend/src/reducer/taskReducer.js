function taskReducer(tasks, action) {
    console.log("taskreducer");
    switch (action.type) {
        // eslint-disable-next-line no-lone-blocks
        case "ADD_TASK": {
            return [
                ...tasks,
                {
                    title: action.title,
                    description: action.description,
                    priority: action.priority,
                    completed: false
                }
            ]
        }
        case "SET_TASK": {
            return action.payload
        }
        case "REMOVE_TASK": {
            return tasks.filter((task) => task._id !== action.taskId)
        }
        case "MARK_DONE": {
            return tasks.map((task) => {
                if (task._id === action.taskId) {
                    return {
                        ...task,
                        completed: true
                    }
                }
                return task
            })
        }
        case "UPDATE_TASK": {
            console.log("updating task")
            console.log("action: ", action);
            return tasks.map((task) => {
                if (task._id === action.taskId) {
                    return {
                        ...task,
                        title: action.title,
                        description: action.description,
                        priority: action.priority,
                    };
                }
                return task;
            });
        }
        default: {
            throw Error("Unknown Action" + action.type)
        }
    }
}

export default taskReducer;