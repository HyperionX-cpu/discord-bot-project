import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPlus, faTrash, faShieldHalved, faCheck, faSave } from '@fortawesome/free-solid-svg-icons';

export default function SettingsPage() {
    const [bannedWords, setBannedWords] = useState<string[]>([
        "badword1", "badword2", "nigger", "faggot", "retard", "scam", "free nitro"
    ]);
    const [newWord, setNewWord] = useState('');
    const [scamDetection, setScamDetection] = useState(true);
    const [blockInvites, setBlockInvites] = useState(true);
    const [blockLinks, setBlockLinks] = useState(true);
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('bot_banned_words');
        if (stored) {
            try {
                setBannedWords(JSON.parse(stored));
            } catch {}
        }
    }, []);

    const handleAddWord = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = newWord.trim().toLowerCase();
        if (trimmed && !bannedWords.includes(trimmed)) {
            const updated = [...bannedWords, trimmed];
            setBannedWords(updated);
            localStorage.setItem('bot_banned_words', JSON.stringify(updated));
            setNewWord('');
            showSaved();
        }
    };

    const handleRemoveWord = (wordToRemove: string) => {
        const updated = bannedWords.filter(w => w !== wordToRemove);
        setBannedWords(updated);
        localStorage.setItem('bot_banned_words', JSON.stringify(updated));
        showSaved();
    };

    const showSaved = () => {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2500);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-white flex items-center gap-3">
                        <FontAwesomeIcon icon={faShieldHalved} className="text-blue-500" />
                        Auto-Moderation & Banned Words Sync
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Manage blacklisted words, link blockers, and scam detection synced with your Discord Bot.
                    </p>
                </div>

                {savedNotice && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-4 py-2 bg-green-500/20 border border-green-500/40 text-green-400 rounded-xl text-sm font-semibold flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faCheck} /> Changes Synced!
                    </motion.div>
                )}
            </div>

            {/* Quick Security Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-white text-sm">Block Discord Invites</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Silently deletes server invite links</p>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={blockInvites} 
                        onChange={(e) => { setBlockInvites(e.target.checked); showSaved(); }}
                        className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                </div>

                <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-white text-sm">Block External Websites</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Blocks http:// and https:// URLs</p>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={blockLinks} 
                        onChange={(e) => { setBlockLinks(e.target.checked); showSaved(); }}
                        className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                </div>

                <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-white text-sm">Anti-Scam Auto Timeout</h3>
                        <p className="text-xs text-gray-400 mt-0.5">1-min timeout on scam image uploads</p>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={scamDetection} 
                        onChange={(e) => { setScamDetection(e.target.checked); showSaved(); }}
                        className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                </div>
            </div>

            {/* Banned Words Management */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faBan} className="text-red-500" />
                    Banned Words List
                </h2>
                <p className="text-xs text-gray-400 mb-4">
                    Any message sent containing these words will be silently deleted in all guild channels.
                </p>

                {/* Add new word input */}
                <form onSubmit={handleAddWord} className="flex gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Add a new banned word (e.g. scamlink)..."
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add Word
                    </button>
                </form>

                {/* Bad words pills */}
                <div className="flex flex-wrap gap-2.5">
                    {bannedWords.map((word) => (
                        <span
                            key={word}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20"
                        >
                            <code>{word}</code>
                            <button
                                onClick={() => handleRemoveWord(word)}
                                className="hover:text-red-300 transition-colors p-0.5"
                                title="Remove word"
                            >
                                <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}