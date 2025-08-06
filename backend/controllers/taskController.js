import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
const sendMail = (email, subject, title, description) => {
    var transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'alok.yadav6000@gmail.com',
        to: email,
        subject: subject,
        html:`<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const addTask = async (req, res) => {
    const { title, description,priority } = req.body;
    const userId = req.user.id;
    const user = await userModel.find({_id: userId});
    const newTask = new taskModel({ title, description,priority, completed: false, userId })
    newTask.save()
        .then(() => {
            sendMail(user[0].email, "Task Added", title, description)
            return (res.status(200).json({ message: "Task added successfully" }))
        })
        .catch((error) => {
            return (
                res.status(500).json({ message: error.message })
            )
        }
        )
}
const removeTask = (req, res) => {
    const { id } = req.body;
    console.log("id: ", id);
    taskModel.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: "Task deleted successfully" }))
        .catch((error) => res.status(501).json({ message: error.message }))
}

const getTask = async (req, res) => {
    try {
        console.log("Fetching tasks for user:", req.user.id);
        const tasks = await taskModel
            .find({ userId: req.user.id })
            .sort({ priority: 1 }); // ascending order

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(501).json({ message: error.message });
    }
};

export const markTaskDone = async (req, res) => {
    try{
        console.log("Marking task as done");
        const {taskId} = req.body;
        const task = await taskModel.findById(taskId);
        task.completed = true;
        console.log(task);
        await task.save();
        return res.status(201).json({
            success:true,
            message:"Task marked as done",
        })
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }   
}

export const editTask = async(req,res)=>{
    try{
        console.log("Editing task");
        const { taskId,title, description,priority } = req.body;
        const userId = req.user.id;
        const user = await userModel.findById(userId);
        const task = await taskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        task.title = title;
        task.description = description;
        task.priority = priority;
        await task.save();
        sendMail(user.email, "Task Updated", title, description);
        return res.status(200).json({ message: "Task updated successfully" });

    } catch(error){
        return res.status(500).json({ message: error.message });
    }
}
export { addTask, getTask,removeTask }
