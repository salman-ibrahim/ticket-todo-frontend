import React from 'react'

const Ticket = (props) => {

    const {title, todos, description } = props

    const completedTasks = () => {
        // Count all todos that have `completed` as true
        if (!todos) {
            return '0/0'
        }
        let completed = todos.filter(todo => todo.status === "COMPLETED")
        return `${completed.length}/${todos.length}`
    }

    const calculatePercentage = () => {
        // Calculate the percentage of completed todos
        if (!todos) {
            return '0'
        }
        else {
            if (todos.length === 0) {
                return '100'
            }
            else {
                let completed = todos.filter(todo => todo.status === "COMPLETED")
                return Math.round((completed.length / todos.length) * 100)
            }
        }

    }

    return (
        <div className="flex items-center justify-center my-2">
            <div className="bg-white rounded-3xl border shadow-xl p-8 w-3/4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="font-semibold text-xl text-gray-700">{title}</h1>
                    <div className="text-right">
                        <span className="font-medium text-xs text-gray-500 flex justify-end">Completed {completedTasks()}</span>
                        <span className="font-bold text-green-500">{calculatePercentage()}%</span><br />
                    </div>
                </div>
                <div>
                <h4 className="font-semibold text-sm text-gray-400">{description}</h4>
                </div>
            </div>
        </div>
    )
}

export default Ticket;
