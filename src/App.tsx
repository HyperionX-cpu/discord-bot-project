import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import IndexPage from './pages';
import TicketsPage from './pages/tickets';
import SettingsPage from './pages/settings';
import UserSettingsPage from './pages/user-settings';
import Usage from './pages/usage';
import TranscriptPage from './pages/tickets/TranscriptPage';
import EmbedBuilderPage from './pages/embed-builder';
import SuggestionsPage from './pages/suggestions';
import SignInPage from './pages/auth/signin';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/auth/signin" element={<SignInPage />} />
                <Route
                    path="*"
                    element={
                        <Layout>
                            <Routes>
                                <Route path="/" element={<IndexPage />} />
                                <Route path="/tickets" element={<TicketsPage />} />
                                <Route path="/tickets/:id/transcript" element={<TranscriptPage />} />
                                <Route path="/user-settings" element={<UserSettingsPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                                <Route path="/usage" element={<Usage />} />
                                <Route path="/embed-builder" element={<EmbedBuilderPage />} />
                                <Route path="/suggestions" element={<SuggestionsPage />} />
                            </Routes>
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
}