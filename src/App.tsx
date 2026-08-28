import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthGuard } from './components/auth/AuthGuard';
import { PermissionGuard } from './components/auth/PermissionGuard';
import Layout from './components/layout/Layout';
import IndexPage from './pages';
import TicketsPage from './pages/tickets';
import SettingsPage from './pages/settings';
import UserSettingsPage from './pages/user-settings';
import Usage from './pages/usage';
import LoginPage from './pages/auth/login';
import SignInPage from './pages/auth/signin';
import CallbackPage from './pages/auth/callback';
import AccessDeniedPage from './pages/auth/access-denied';
import TranscriptPage from './pages/tickets/TranscriptPage';
import EmbedBuilderPage from './pages/embed-builder';
import SuggestionsPage from './pages/suggestions';
import { auth } from './lib/auth/auth';
import axios from 'axios';

interface DashboardConfig {
    clientId: string;
    redirectUri: string;
    permissions: {
        Dashboard: {
            Login: string[];
            Usage: string[];
            Settings: string[];
            Embed: string[];
            Suggestions: string[];
        }
    };
}

const defaultDashboardConfig: DashboardConfig = {
    clientId: '',
    redirectUri: '',
    permissions: {
        Dashboard: {
            Login: [],
            Usage: [],
            Settings: [],
            Embed: [],
            Suggestions: []
        }
    }
};

function AppRoutes() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [config, setConfig] = useState<DashboardConfig>(defaultDashboardConfig);

    useEffect(() => {
        async function init() {
            try {
                const response = await axios.get('/api/auth/config', { timeout: 3000 });
                if (response.data) {
                    setConfig(response.data);
                }
            } catch (error) {
                console.warn('[App] Backend not connected yet, using fallback config.');
            } finally {
                setIsReady(true);
            }
        }
        init();
    }, []);

    useEffect(() => {
        async function checkAuth() {
            try {
                const isAuth = await auth.isAuthenticated();
                const isPublicRoute = location.pathname.includes('/auth/') || location.pathname === '/login';

                if (!isAuth && !isPublicRoute) {
                    const returnUrl = location.pathname + location.search;
                    navigate('/auth/signin', {
                        replace: true,
                        state: { returnUrl }
                    });
                }
            } catch (e) {
                if (!location.pathname.includes('/auth/')) {
                    navigate('/auth/signin', { replace: true });
                }
            }
        }
        checkAuth();
    }, [navigate, location]);

    if (!isReady) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="text-gray-400 animate-pulse">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/signin" element={<SignInPage />} />
            <Route path="/auth/callback" element={<CallbackPage />} />
            <Route path="/auth/access-denied" element={<AccessDeniedPage />} />
            <Route
                path="*"
                element={
                    <AuthGuard>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<IndexPage />} />
                                <Route path="/tickets" element={<TicketsPage />} />
                                <Route path="/tickets/:id/transcript" element={<TranscriptPage />} />
                                <Route path="/user-settings" element={<UserSettingsPage />} />
                                <Route 
                                    path="/settings" 
                                    element={
                                        <PermissionGuard requiredRoles={config.permissions.Dashboard.Settings}>
                                            <SettingsPage />
                                        </PermissionGuard>
                                    } 
                                />
                                <Route 
                                    path="/usage" 
                                    element={
                                        <PermissionGuard requiredRoles={config.permissions.Dashboard.Usage}>
                                            <Usage />
                                        </PermissionGuard>
                                    } 
                                />
                                <Route 
                                    path="/embed-builder" 
                                    element={
                                        <PermissionGuard requiredRoles={config.permissions.Dashboard.Embed || config.permissions.Dashboard.Settings}>
                                            <EmbedBuilderPage />
                                        </PermissionGuard>
                                    } 
                                />
                                <Route 
                                    path="/suggestions" 
                                    element={
                                        <PermissionGuard requiredRoles={config.permissions.Dashboard.Suggestions}>
                                            <SuggestionsPage />
                                        </PermissionGuard>
                                    } 
                                />
                            </Routes>
                        </Layout>
                    </AuthGuard>
                }
            />
        </Routes>
    );
}

export default function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}