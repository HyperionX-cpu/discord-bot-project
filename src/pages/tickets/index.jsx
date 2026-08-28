import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faCheck, faTrash, faPlus, faUser, faClock, faComments } from '@fortawesome/free-solid-svg-icons';

export default function TicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [filter, setFilter] = useState('open');

    useEffect(() => {
        const stored = localStorage.getItem('bot_live_tickets');
        if (stored) {
            try {
                setTickets(JSON.parse(stored));
            } catch {}
        }
    }, []);

    const handleCloseTicket = (id) => {
        const updated = tickets.map(t => t.id === id ? { ...t, status: 'closed' } : t);
        setTickets(updated);
        localStorage.setItem('bot_live_tickets', JSON.stringify(updated));
    };

    const filteredTickets = tickets.filter(t => filter === 'all' || t.status === filter);

    return (
        <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-white flex items-center gap-3">
                        <FontAwesomeIcon icon={faTicket} className="text-blue-500" />
                        Live Ticket Management
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Active ticket channels created via Discord modals (/ticket_panel).
                    </p>
                </div>

                <div className="flex bg-gray-800/80 p-1.5 rounded-xl border border-gray-700">
                    <button
                        onClick={() => setFilter('open')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${filter === 'open' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                    >
                        Active ({tickets.filter(t => t.status === 'open').length})
                    </button>
                    <button
                        onClick={() => setFilter('closed')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${filter === 'closed' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                    >
                        Closed ({tickets.filter(t => t.status === 'closed').length})
                    </button>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${filter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                    >
                        All ({tickets.length})
                    </button>
                </div>
            </div>

            {filteredTickets.length === 0 ? (
                <div className="bg-gray-900/60 border border-gray-800/80 rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600/10 text-blue-500 mx-auto flex items-center justify-center mb-4 text-2xl">
                        🎫
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">No Active Tickets</h3>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto">
                        When users open a ticket on your Discord server using <code>/ticket_panel</code>, it will appear here in real-time.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTickets.map((ticket) => (
                        <motion.div
                            key={ticket.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-gray-700 transition"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl text-xs font-bold">
                                        {ticket.category}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold uppercase ${
                                        ticket.status === 'open' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-700 text-gray-400'
                                    }`}>
                                        {ticket.status}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-white mb-1">
                                    #{ticket.channelName}
                                </h3>
                                <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                                    {ticket.details}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                                    <span className="text-gray-300 font-medium">{ticket.opener}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1 text-gray-500">
                                        <FontAwesomeIcon icon={faClock} /> {ticket.createdAt}
                                    </span>

                                    {ticket.status === 'open' && (
                                        <button
                                            onClick={() => handleCloseTicket(ticket.id)}
                                            className="px-3 py-1 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition font-semibold"
                                        >
                                            Close
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}