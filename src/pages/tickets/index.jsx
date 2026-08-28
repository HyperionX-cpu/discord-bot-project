import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faCheck, faTrash, faPlus, faUser, faClock, faComments } from '@fortawesome/free-solid-svg-icons';

interface TicketItem {
    id: string;
    channelName: string;
    opener: string;
    openerId: string;
    category: string;
    createdAt: string;
    status: 'open' | 'closed';
    details: string;
}

export default function TicketsPage() {
    const [tickets, setTickets] = useState<TicketItem[]>([
        {
            id: '1',
            channelName: 'getkey-hyperion',
            opener: 'Hyperion',
            openerId: '1240169071287205950',
            category: '🔑 Get Key',
            createdAt: '2 mins ago',
            status: 'open',
            details: 'Product: Fercurity | Duration: 7 Days | Method: Crypto'
        },
        {
            id: '2',
            channelName: 'support-alex',
            opener: 'AlexGamer',
            openerId: '1189498526124757034',
            category: '💬 Support',
            createdAt: '15 mins ago',
            status: 'open',
            details: 'Need assistance setting up injection for MW19.'
        },
        {
            id: '3',
            channelName: 'service-vortex',
            opener: 'Vortex',
            openerId: '966168051462578178',
            category: '🛠️ Services',
            createdAt: '1 hour ago',
            status: 'open',
            details: 'HWID Reset requested for Noah Internal key.'
        },
        {
            id: '4',
            channelName: 'mm-trade-safe',
            opener: 'KobraTrader',
            openerId: '1527850448696905818',
            category: '🤝 Middleman',
            createdAt: '3 hours ago',
            status: 'closed',
            details: 'Middleman transaction complete. Value: $50.00'
        }
    ]);

    const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('open');

    const handleCloseTicket = (id: string) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, status: 'closed' } : t));
    };

    const filteredTickets = tickets.filter(t => filter === 'all' || t.status === filter);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-white flex items-center gap-3">
                        <FontAwesomeIcon icon={faTicket} className="text-blue-500" />
                        Live Ticket Management
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Active ticket channels created via Discord modals (<code>/ticket_panel</code>).
                    </p>
                </div>

                {/* Filter Pills */}
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

            {/* Ticket Cards Grid */}
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
        </div>
    );
}