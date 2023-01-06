import React, {useState} from "react";
import Modal from "./Modal";
import {createNewTicket} from "../api/api";
import {useDispatch} from "react-redux";
import { addTicket } from "../store";

const CreateTicketModal = (props) => {
    const {open, toggle} = props

    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");
    const [tasks, setTasks] = useState([""]);

    const dispatch = useDispatch();

    const onConfirm = () => {
        const data = {}
        if(ticketTitle.trim() != "") {
            data.title = ticketTitle
            if(ticketDescription.trim() != "") {
                data.description = ticketDescription
            }
            if (tasks.length >= 1 && tasks[0].trim() !== "") {
                data.tasks= tasks
            }

            addNewTicket();

            createNewTicket(data)
                .then((resp) => {
                    dispatch( addTicket({ticket: resp.ticket}))
                    toggle();
                    console.log('SUCCESS')
                })
                .catch((error) => {
                    console.log('ERROR')
                })
        }
        else {
            console.log('DATA INCOMPLETE')
        }


    }

    const addNewTicket = () => {

    }

    const resetForm = () => {
        setTicketTitle("")
        setTicketDescription("")
        setTasks([""])
        toggle();
    }

    const handleTitleChange = (event) => {
        setTicketTitle(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setTicketDescription(event.target.value)
    }

    const handleTaskChange = (event, index) => {
        const tasksCopy = [...tasks]
        tasksCopy[index] = event.target.value

        setTasks(tasksCopy);
    }

    const addTaskField = () => {
        const tasksCopy = [...tasks]
        tasksCopy.push("");

        setTasks(tasksCopy);
    }

    const prepareData = () => {

    }

    return (
        <Modal open={open} toggle={resetForm} onConfirm={onConfirm} title="Create New Ticket">
            <div className="w-full">
                <label htmlFor="title" className="block mt-3 text-sm font-medium">Title</label>
                <input type="text" id="title" value={ticketTitle}  className="border border-gray-300 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"  placeholder="Drink Coffee" onChange={handleTitleChange} required />
            </div>

            <div className="mb-6">
                <label htmlFor="title" className="block mt-3 text-sm font-medium">Description (optional)</label>
                <input type="text" id="description" value={ticketDescription} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500" onChange={handleDescriptionChange} />
            </div>

            <hr className='mb-3'/>
            <label className=""> Tasks (optional)</label>

            {
                tasks.map((task, index) => {
                    return (
                        <div className="w-full flex align-middle justify-center mt-2">
                            <input type="text" id={`task-${index}`} value={tasks[index]}  className="border border-gray-300 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" onChange={(e) => handleTaskChange(e, index)}  placeholder={`Task ${index}`} />
                            {
                                (index == tasks.length-1)
                                &&
                                <button
                                    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ml-2"
                                    onClick={tasks[index].trim().length > 0 ? addTaskField : ''}>
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                     stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                    <path d="M12 5v14M5 12h14"></path>
                                </svg>
                            </button>}
                        </div>
                    )
                })
            }

        </Modal>
    )
}

export default CreateTicketModal;
