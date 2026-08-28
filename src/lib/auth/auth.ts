import axios from 'axios';

const API_URL = window.DASHBOARD_CONFIG?.API_URL || '';

export interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    global_name: string | null;
    accent_color?: number | null;
    banner?: string | null;
    banner_color?: string | null;
    email?: string;
    flags?: number;
    mfa_enabled?: boolean;
    verified?: boolean;
    premium_type?: number;
    public_flags?: number;
    locale?: string;
    roles?: string[];
}

export interface Session {
    user: User | null;
    accessToken: string | null;
}

// Fixed credentials for Hyperion admin access (Hashed with SHA-256)
// Username: Hyperion
// Password: Clowncheats2026!!
const VALID_USER_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"; // SHA-256 for "Hyperion" (case-insensitive)
const VALID_PASS_HASH = "f9a4a755d4ee711100346f04739eb38c92a95c9a70058b76c8c4a477387ddf3b"; // SHA-256 for "Clowncheats2026!!"

async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

class AuthService {
    private session: Session = {
        user: null,
        accessToken: null
    };

    constructor() {
        const stored = localStorage.getItem('hyperion_auth_user');
        if (stored) {
            try {
                this.session.user = JSON.parse(stored);
                this.session.accessToken = 'admin-token';
            } catch {
                localStorage.removeItem('hyperion_auth_user');
            }
        }
    }

    async isAuthenticated(): Promise<boolean> {
        return !!this.session.user;
    }

    async getUser(): Promise<User | null> {
        return this.session.user;
    }

    async loginWithCredentials(username: string, pass: string): Promise<boolean> {
        const userH = await sha256(username.trim());
        const passH = await sha256(pass.trim());

        // Also check direct match in case subtle crypto isn't available
        const isUserValid = (username.trim().toLowerCase() === "hyperion") || (userH === VALID_USER_HASH);
        const isPassValid = (pass.trim() === "Clowncheats2026!!") || (passH === VALID_PASS_HASH);

        if (isUserValid && isPassValid) {
            const adminUser: User = {
                id: "1240169071287205950",
                username: "Hyperion",
                discriminator: "0",
                avatar: "https://i.postimg.cc/xJjS1vYm/nuke.gif",
                global_name: "Hyperion Admin",
                roles: ["Admin", "Owner", "Staff"]
            };
            this.session = { user: adminUser, accessToken: "hyperion-admin-token" };
            localStorage.setItem('hyperion_auth_user', JSON.stringify(adminUser));
            return true;
        }
        return false;
    }

    logout() {
        this.session = { user: null, accessToken: null };
        localStorage.removeItem('hyperion_auth_user');
        window.location.href = '/auth/signin';
    }
}

export const auth = new AuthService();