import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tickets: [],
}

export const appSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action) => {
            state.tickets = [...action.payload.tickets];
        },
        setTicket: (state, action) => {
            const updatedTickets = state.tickets.map((ticket) => {
                if(ticket.id === action.payload.ticket.id) {
                    return action.payload.ticket;
                }
                return ticket;
            })
            state.tickets = updatedTickets;
        },
        addTicket: (state, action) => {
            state.tickets = [...state.tickets, action.payload.ticket];
        }
    }
})

export const { setTickets, setTicket, addTicket } = appSlice.actions;
export default appSlice.reducer;
