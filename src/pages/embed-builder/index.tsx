import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus, 
    faTrash, 
    faPaperPlane, 
    faEye, 
    faCode, 
    faPalette, 
    faHeading, 
    faAlignLeft,
    faLink,
    faImage,
    faCheck
} from '@fortawesome/free-solid-svg-icons';

export default function EmbedBuilderPage() {
    const [title, setTitle] = useState('🔥 Clown Cheats Announcement');
    const [description, setDescription] = useState('Welcome to **Clown Cheats**! Check out our latest cheats and updates.');
    const [color, setColor] = useState('#2563eb');
    const [authorName, setAuthorName] = useState('Clown Cheats Staff');
    const [authorIcon, setAuthorIcon] = useState('https://i.postimg.cc/xJjS1vYm/nuke.gif');
    const [footerText, setFooterText] = useState('© 2026 Clown Cheats • All Rights Reserved');
    const [footerIcon, setFooterIcon] = useState('https://i.postimg.cc/xJjS1vYm/nuke.gif');
    const [image, setImage] = useState('');
    const [thumbnail, setThumbnail] = useState('https://i.postimg.cc/xJjS1vYm/nuke.gif');
    const [fields, setFields] = useState([
        { name: '⚡ Status', value: '🟢 Undetected & Working', inline: true },
        { name: '🛡️ Support', value: '24/7 Live Ticket Support', inline: true }
    ]);
    const [targetChannel, setTargetChannel] = useState('announcements');
    const [sentNotice, setSentNotice] = useState(false);

    const addField = () => {
        setFields([...fields, { name: 'New Field', value: 'Field value here', inline: false }]);
    };

    const removeField = (index) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const updateField = (index, key, val) => {
        const updated = [...fields];
        updated[index][key] = val;
        setFields(updated);
    };

    const handleSend = () => {
        setSentNotice(true);
        setTimeout(() => setSentNotice(false), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-white flex items-center gap-3">
                        <FontAwesomeIcon icon={faCode} className="text-blue-500" />
                        Discord Embed Builder
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Build and preview rich embeds in real-time and broadcast them to your server.
                    </p>
                </div>

                {sentNotice && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-4 py-2 bg-green-500/20 border border-green-500/40 text-green-400 rounded-xl text-sm font-semibold flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faCheck} /> Embed Sent to #{targetChannel}!
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Embed Controls */}
                <div className="space-y-4 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faPalette} className="text-blue-400" />
                        Customize Embed
                    </h2>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Target Channel</label>
                        <select
                            value={targetChannel}
                            onChange={(e) => setTargetChannel(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="announcements">📢 #announcements</option>
                            <option value="general-chat">💬 #general-chat</option>
                            <option value="vouch-reviews">⭐ #vouch-reviews</option>
                            <option value="updates">🔔 #updates</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Embed Title"
                            className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Description (Markdown Supported)</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Embed description..."
                            className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Accent Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                                />
                                <span className="text-xs text-gray-400 font-mono">{color}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Thumbnail URL</label>
                            <input
                                type="text"
                                value={thumbnail}
                                onChange={(e) => setThumbnail(e.target.value)}
                                placeholder="https://..."
                                className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Author Name</label>
                            <input
                                type="text"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Footer Text</label>
                            <input
                                type="text"
                                value={footerText}
                                onChange={(e) => setFooterText(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Fields list */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-semibold text-gray-300 uppercase">Fields ({fields.length})</label>
                            <button
                                onClick={addField}
                                className="px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Add Field
                            </button>
                        </div>

                        <div className="space-y-2">
                            {fields.map((f, i) => (
                                <div key={i} className="flex gap-2 items-center bg-gray-800/50 p-2 rounded-xl border border-gray-700/50">
                                    <input
                                        type="text"
                                        value={f.name}
                                        onChange={(e) => updateField(i, 'name', e.target.value)}
                                        placeholder="Name"
                                        className="flex-1 px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs"
                                    />
                                    <input
                                        type="text"
                                        value={f.value}
                                        onChange={(e) => updateField(i, 'value', e.target.value)}
                                        placeholder="Value"
                                        className="flex-1 px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs"
                                    />
                                    <button
                                        onClick={() => removeField(i)}
                                        className="text-red-400 hover:text-red-300 p-1"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleSend}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 mt-4"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} /> Send Embed to Discord
                    </button>
                </div>

                {/* Right Column: Live Discord Preview */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col">
                    <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                        <FontAwesomeIcon icon={faEye} className="text-green-400" />
                        Discord Client Preview
                    </h2>

                    <div className="bg-[#313338] rounded-xl p-4 flex-1 flex flex-col border border-gray-700/50 shadow-inner">
                        {/* Bot Author Header */}
                        <div className="flex items-center gap-3 mb-3">
                            <img src="https://i.postimg.cc/xJjS1vYm/nuke.gif" alt="Bot" className="w-10 h-10 rounded-full" />
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-white text-sm">Clown Cheats</span>
                                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">BOT</span>
                                </div>
                                <span className="text-[10px] text-gray-400">Today at 12:00 PM</span>
                            </div>
                        </div>

                        {/* Discord Embed Box */}
                        <div 
                            className="bg-[#2b2d31] rounded-lg p-4 border-l-4 flex flex-col justify-between flex-1"
                            style={{ borderLeftColor: color }}
                        >
                            <div>
                                {authorName && (
                                    <div className="flex items-center gap-2 mb-2">
                                        {authorIcon && <img src={authorIcon} alt="" className="w-5 h-5 rounded-full" />}
                                        <span className="text-xs font-semibold text-white">{authorName}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        {title && <h3 className="font-bold text-white text-base mb-1 hover:underline cursor-pointer">{title}</h3>}
                                        {description && <p className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">{description}</p>}
                                    </div>
                                    {thumbnail && (
                                        <img src={thumbnail} alt="Thumbnail" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                                    )}
                                </div>

                                {fields.length > 0 && (
                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        {fields.map((f, idx) => (
                                            <div key={idx} className={f.inline ? "col-span-1" : "col-span-2"}>
                                                <h4 className="text-xs font-bold text-gray-300">{f.name}</h4>
                                                <p className="text-xs text-gray-400 mt-0.5">{f.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {footerText && (
                                <div className="flex items-center gap-2 mt-4 pt-2 border-t border-gray-700/30">
                                    {footerIcon && <img src={footerIcon} alt="" className="w-4 h-4 rounded-full" />}
                                    <span className="text-[10px] text-gray-400">{footerText}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}