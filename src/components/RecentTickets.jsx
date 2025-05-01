import React from 'react';
import { MoreIcon } from './Icons'; // Supondo que MoreIcon está em Icons.jsx

const RecentTicketItem = ({ date, title, description, status }) => {
    const statusClasses = { Overdue: 'bg-red-100 text-red-700', Open: 'bg-blue-100 text-blue-700', Completed: 'bg-green-100 text-green-700', Pending: 'bg-yellow-100 text-yellow-700' };
    const currentStatusClass = statusClasses[status] || 'bg-gray-100 text-gray-700';
    const statusText = { Overdue: 'Atrasado', Open: 'Aberto', Completed: 'Concluído', Pending: 'Pendente' }[status] || status;

    return (
        <li className="flex items-start justify-between pb-2 border-b border-gray-100 last:border-b-0 gap-2">
            <div className="flex items-start space-x-3 min-w-0">
                <div className="text-center w-12 flex-shrink-0 pt-1"> <p className="text-xs text-gray-500">{date}</p> </div>
                <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate" title={title}>{title}</p>
                    <p className="text-xs text-gray-500 truncate" title={description}>{description}</p>
                </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${currentStatusClass}`}>{statusText}</span>
                <button className="text-gray-400 hover:text-gray-600 hidden sm:block" title="Mais opções"> <MoreIcon /> </button>
            </div>
        </li>
    );
};

const RecentTickets = () => {
    const tickets = [
        { id: 1, date: '08 Fev', title: 'O Trabalho Mais Importante...', description: "Reddit, qual a pequena coisa que...", status: 'Overdue' },
        { id: 2, date: '11 Fev', title: "Reddit! Qual a pequena coisa que...", description: 'Algum entusiasta de teclado mecânico...', status: 'Open' },
        { id: 3, date: '05 Fev', title: 'Entendendo teoria das cores: a cor...', description: 'Entendendo teoria das cores: a c...', status: 'Completed' },
        { id: 4, date: '05 Fev', title: 'Algum entusiasta de teclado mecânico...', description: 'Como projetar um produto que pode...', status: 'Pending' },
    ];
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Chamados recentes</h3>
                <button className="text-sm text-blue-600 hover:underline flex-shrink-0">Ver todos</button>
            </div>
            <ul className="space-y-4">
                {tickets.map(ticket => ( <RecentTicketItem key={ticket.id} {...ticket} /> ))}
            </ul>
        </div>
    );
};
export default RecentTickets;