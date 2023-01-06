import React, {useEffect, useState} from "react";
import Ticket from "../../components/ticket";
import Header from "../../components/Header";
import CreateTicketModal from "../../components/CreateTicketModal";
import {fetchTickets} from "../../api/api";
import { setTickets } from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Home = (props) => {

    const [ newTicketModal, setNewTicketModal ] = useState(false)
    const dispatch = useDispatch();
    const { tickets } = useSelector((state => state.tickets))

    useEffect(() => {
        // Fetch only if the app is loaded first time
        if(!tickets.length) {
            fetchTickets()
                .then((resp) => {
                    const tickets = resp.data.tickets
                    dispatch(setTickets({tickets}))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const toggleNewTicketModal = () => {
        setNewTicketModal(!newTicketModal)
    }

    const handleSuccess = () => {

        toggleNewTicketModal()
    }
    return (
        <div className="h-screen">
            <header className="text-gray-600 body-font sticky top-0 left-0 right-0 bg-gray-50 shadow-xl">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="ml-3 text-xl">Ticket Todo</span>
                    </a>

                    <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={() => setNewTicketModal(true)}>
                        Create Ticket
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14"></path>
                        </svg>
                    </button>
                </div>
            </header>

            <div className="">
                <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 h-100'>
                    <div className=''>
                        <Header>
                            <h1 className='text-center'>Incomplete</h1>
                        </Header>
                        {
                            tickets.length && tickets.map((ticket) => {
                                if(ticket.todos.some((todo) => todo.status != "COMPLETED"))
                                return (
                                    <Link to={`/ticket/${ticket.id}`} >
                                        <Ticket key={ticket.id} id={ticket.id} title={ticket.title} todos={ticket.todos} description={ticket.description} />
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div>
                        <Header>
                            <h1 className='text-center'>Completed</h1>
                        </Header>
                        {
                            tickets.length && tickets.map((ticket) => {
                                if(ticket.todos.every((todo) => todo.status == "COMPLETED"))
                                    return (
                                        <Link to={`/ticket/${ticket.id}`} >
                                            <Ticket key={ticket.id} id={ticket.id} title={ticket.title} todos={ticket.todos} description={ticket.description} />
                                        </Link>
                                    )
                            })
                        }
                    </div>
                </div>

            </div>
            {/*<Modal open={newTicketModal} toggle={toggleNewTicketModal} onConfirm={handleSuccess} />*/}
            <CreateTicketModal open={newTicketModal} toggle={toggleNewTicketModal} />
        </div>
    )
}

export default Home;
