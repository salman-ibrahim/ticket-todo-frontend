import React, {useEffect, useState} from "react";
import axios from "axios";

import Header from "../../components/Header";
import CreateTicketModal from "../../components/CreateTicketModal";
import {createTask, fetchTickets, updateTask} from "../../api/api";
import { setTicket } from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

const Ticket = (props) => {

    const [ ticket, setLocalTicket ] = useState({})
    const [newTask, setNewTask] = useState("")
    const dispatch = useDispatch();
    const { tickets } = useSelector((state => state.tickets))
    const { id } = useParams();

    useEffect(() => {
        // Find the ticket
        const ticket = tickets.find((ticket) => ticket.id == id)
        setLocalTicket(ticket)
    }, [id])

    const markCompleted = (id) => {
        // Copy ticket and find todos id that match and update it
        const ticketCopy = JSON.parse(JSON.stringify(ticket))

        const todos = ticketCopy.todos
        const todosUpdated = todos.map((todo) => {
            if(todo.id == id) {
                todo.status = "COMPLETED"
            }
            return todo
        })
        console.log(todosUpdated);
        ticketCopy.todos = todosUpdated

        setLocalTicket(ticketCopy)

        dispatch(setTicket({ticket: ticketCopy}))
        updateTask({id})
            .then((resp) => {

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const addTask = () => {
        if(newTask.trim() != "") {
            createTask({ticketId: id, task: newTask})
                .then((response) => {

                    const generatedTask = {
                        task: newTask,
                        status: 'PENDING',
                        id: response.data.task_id
                    }
                    const ticketCopy = JSON.parse(JSON.stringify(ticket))
                    ticketCopy.todos.push(generatedTask)
                    setLocalTicket(ticketCopy)
                    dispatch(setTicket({ticket: ticketCopy}))
                    setNewTask("");
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const getPercentage = () => {
        if (!ticket?.todos) {
            return '0'
        }
        else {
            if (ticket.todos.length === 0) {
                return '100'
            }
            else {
                let completed = ticket.todos.filter(todo => todo.status === "COMPLETED")
                return Math.round((completed.length / ticket.todos.length) * 100)
            }
        }
    }

    return (
        <div className="h-screen">
            <header className="text-gray-600 body-font sticky top-0 left-0 right-0 bg-gray-50 shadow-xl">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="ml-3 text-xl">Ticket Todo</span>
                    </a>

                </div>
            </header>

            <div>
                <div className="w-2/3 mt-2 rounded-2xl mx-auto">
                    <div className="flex items-center justify-center my-2 font-bold">
                        <div className="bg-white rounded-3xl border shadow-xl p-8 w-3/4 flex justify-between items-center">
                            <div>
                                <h1 className="title-font text-2xl">{ticket?.title}</h1>
                                <p>{ticket?.description}</p>
                            </div>
                            <div className="text-green-500 text-5xl">
                                {getPercentage()}%
                            </div>
                        </div>
                    </div>

                    {
                       ticket?.todos && ticket.todos.map((todo) => {
                            return (
                                <div className="flex items-center justify-center my-2 font-bold">
                                    <div className="bg-white rounded-3xl border shadow-xl p-8 w-3/4 flex justify-between">
                                        <h1 className="title-font font-medium">{todo.task}</h1>
                                        {
                                            todo.status == "COMPLETED" ?
                                                <button
                                                    className="inline-flex items-center bg-green-300 border-0 py-1 px-3 focus:outline-none hover:bg-green-400 rounded text-base mt-4 md:mt-0">
                                                    Completed
                                                </button>
                                                :
                                                <button
                                                    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                                                    onClick={() => markCompleted(todo.id)}>
                                                    Mark Completed
                                                </button>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="flex items-center justify-center my-2 font-bold">
                        <div className="bg-white rounded-3xl border shadow-xl p-8 w-3/4 flex justify-between">
                            <input type="text" id="title" value={newTask}  className="border border-gray-300 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"  placeholder="Create New Task" onChange={(e) => setNewTask(e.target.value)} required />
                                <button
                                    className={`inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 ml-2 md:mt-0`}
                                    onClick={() => addTask()}
                                >
                                    Create
                                </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Ticket;
