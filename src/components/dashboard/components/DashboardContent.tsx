import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTicket, 
    faStar, 
    faShieldHalved, 
    faBolt, 
    faClock, 
    faCheck, 
    faArrowUpRightFromSquare,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function DashboardContent() {
    const [stats, setStats] = useState({
        openTickets: 0,
        totalVouches: 24,
        avgRating: 5.0,
        bannedWordsCount: 0
    });

    const [recentVouches, setRecentVouches] = useState([
        { id: 1, user: 'ApexPro', product: 'Fercurity', stars: '⭐⭐⭐⭐⭐', duration: '30 Days', price: '$40.00', time: '10m ago' },
        { id: 2, user: 'KobraUser', product: 'Noah Internal', stars: '⭐⭐⭐⭐⭐', duration: '7 Days', price: '$30.00', time: '1h ago' },
        { id: 3, user: 'ClownFan', product: 'Grey', stars: '⭐⭐⭐⭐⭐', duration: 'Lifetime', price: '$165.00', time: '3h ago' }
    ]);

    useEffect(() => {
        const storedWords = localStorage.getItem('bot_banned_words');
        const words = storedWords ? JSON.parse(storedWords) : [];
        
        const storedTickets = localStorage.getItem('bot_live_tickets');
        const tickets = storedTickets ? JSON.parse(storedTickets) : [];
        const open = tickets.filter(t => t.status === 'open').length;

        setStats(prev => ({
            ...prev,
            openTickets: open,
            bannedWordsCount: words.length
        }));
    }, []);

    return (
        <div className="space-y-6">
            {/* Banner */}
            <div className="bg-gradient-to-r from-blue-900/50 via-gray-900 to-indigo-950/50 border border-blue-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                        Clown Cheats • Management Control Center
                    </div>
                    <h1 className="text-3xl font-black text-white">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Hyperion</span>
                    </h1>
                    <p className="text-sm text-gray-300 mt-2 max-w-xl">
                        Monitor live discord tickets, customer reviews, auto-moderation filters, and performance metrics in real-time.
                    </p>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center justify-between text-gray-400 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">Active Tickets</span>
                        <FontAwesomeIcon icon={faTicket} className="text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-white">{stats.openTickets}</div>
                    <p className="text-[11px] text-gray-500 mt-1">Live Discord channels</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center justify-between text-gray-400 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">Customer Vouches</span>
                        <FontAwesomeIcon icon={faStar} className="text-amber-400" />
                    </div>
                    <div className="text-3xl font-black text-amber-400">{stats.totalVouches}</div>
                    <p className="text-[11px] text-gray-500 mt-1">Verified purchases</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center justify-between text-gray-400 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">Customer Rating</span>
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    </div>
                    <div className="text-3xl font-black text-white">5.0 / 5.0</div>
                    <p className="text-[11px] text-green-400 mt-1">100% 5-Star Satisfaction</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center justify-between text-gray-400 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">Banned Words Active</span>
                        <FontAwesomeIcon icon={faShieldHalved} className="text-red-400" />
                    </div>
                    <div className="text-3xl font-black text-white">{stats.bannedWordsCount}</div>
                    <p className="text-[11px] text-gray-500 mt-1">Auto-deleted filters</p>
                </div>
            </div>

            {/* Live Vouches & Reviews Activity */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <FontAwesomeIcon icon={faStar} className="text-amber-400" />
                            Recent Customer Vouches
                        </h2>
                        <p className="text-xs text-gray-400">Live reviews received via <code>/vouch</code> command in Discord</p>
                    </div>
                    <Link
                        to="/tickets"
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
                    >
                        View Tickets <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-800/60 text-gray-400 uppercase tracking-wider font-semibold border-b border-gray-800">
                            <tr>
                                <th className="py-3 px-4 rounded-l-xl">User</th>
                                <th className="py-3 px-4">Product</th>
                                <th className="py-3 px-4">Duration</th>
                                <th className="py-3 px-4">Rating</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4 rounded-r-xl">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {recentVouches.map((v) => (
                                <tr key={v.id} className="hover:bg-gray-800/30 transition">
                                    <td className="py-3 px-4 font-bold text-white">{v.user}</td>
                                    <td className="py-3 px-4 text-blue-400 font-semibold">{v.product}</td>
                                    <td className="py-3 px-4 text-gray-300">{v.duration}</td>
                                    <td className="py-3 px-4 text-yellow-400 tracking-wider">{v.stars}</td>
                                    <td className="py-3 px-4 font-mono text-green-400 font-bold">{v.price}</td>
                                    <td className="py-3 px-4 text-gray-500">{v.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}