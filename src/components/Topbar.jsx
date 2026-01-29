import { Bell, Menu, User } from 'lucide-react';

export default function Topbar({ onMenuClick }) {
    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header style={{
            height: '72px',
            background: '#ffffff',
            borderBottom: '1px solid #e8e8e8',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 30
        }}>
            {/* Left side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div>
                    <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500 }}>
                        {today}
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Notifications */}
                <button style={{
                    position: 'relative',
                    padding: '10px',
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex'
                }}>
                    <Bell size={20} color="#333" />
                    <span style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '8px',
                        height: '8px',
                        background: '#dc2626',
                        borderRadius: '50%'
                    }} />
                </button>

                {/* Divider */}
                <div style={{
                    width: '1px',
                    height: '32px',
                    background: '#e8e8e8',
                    margin: '0 8px'
                }} />

                {/* Admin profile */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #1F3D2A 0%, #2d5a3d 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <User size={20} color="#fff" />
                    </div>
                    <div className="hidden sm:block">
                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                            Admin
                        </p>
                        <p style={{ fontSize: '12px', color: '#888888' }}>
                            VOHO Manager
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
