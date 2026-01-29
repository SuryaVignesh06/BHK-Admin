import { NavLink, useNavigate } from 'react-router-dom';
// Removed framer-motion
import {
    LayoutDashboard,
    CalendarDays,
    Building2,
    CreditCard,
    Settings,
    LogOut,
    BookOpen,
    X
} from 'lucide-react';
import logo from '../assets/logo.png';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/bookings', label: 'Bookings', icon: BookOpen },
    { path: '/calendar', label: 'Calendar', icon: CalendarDays },
    { path: '/apartments', label: 'Apartments', icon: Building2 },
    { path: '/payments', label: 'Payments', icon: CreditCard },
    { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    // Simplified styles without dynamic props issues
    const desktopStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '280px',
        background: '#ffffff',
        color: '#1f2937',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        borderRight: '1px solid #e5e7eb',
        boxShadow: 'none'
    };

    const mobileStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '280px',
        background: '#ffffff',
        color: '#1f2937',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        borderRight: '1px solid #e5e7eb',
        boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    const linkBaseStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px', // Slightly tighter
        borderRadius: '6px', // Sharper (was 12px)
        fontSize: '14px',
        textDecoration: 'none',
        margin: '2px 8px', // Added horizontal margin
        transition: 'all 0.1s ease-in-out', // Faster transition
        border: '1px solid transparent'
    };

    return (
        <>
            {/* Mobile overlay - simplified */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 40
                    }}
                    className="lg:hidden"
                />
            )}

            {/* Desktop sidebar */}
            <aside style={desktopStyle} className="hidden lg:flex">
                <SidebarContent
                    navItems={navItems}
                    linkBaseStyle={linkBaseStyle}
                    onClose={onClose}
                    handleLogout={handleLogout}
                />
            </aside>

            {/* Mobile sidebar */}
            <aside style={mobileStyle} className="lg:hidden">
                <SidebarContent
                    navItems={navItems}
                    linkBaseStyle={linkBaseStyle}
                    onClose={onClose}
                    handleLogout={handleLogout}
                    showClose
                />
            </aside>
        </>
    );
}

function SidebarContent({ navItems, linkBaseStyle, onClose, handleLogout, showClose }) {
    return (
        <>
            <div style={{
                height: '80px',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #f3f4f6'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                        src={logo}
                        alt="Voho Logo"
                        style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
                    />
                </div>
                {showClose && (
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px',
                            background: '#f3f4f6',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            color: '#374151'
                        }}
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <nav style={{ flex: 1, padding: '20px 16px', overflowY: 'auto' }}>
                <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#9ca3af',
                    marginBottom: '12px',
                    paddingLeft: '20px'
                }}>
                    Main Menu
                </div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        style={({ isActive }) => ({
                            ...linkBaseStyle,
                            fontWeight: isActive ? 600 : 500,
                            background: isActive ? '#f0fdf4' : 'transparent',
                            color: isActive ? '#166534' : '#6b7280',
                            borderColor: isActive ? '#dcfce7' : 'transparent'
                        })}
                    >
                        <item.icon size={20} style={{ opacity: 1 }} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div style={{ padding: '20px', borderTop: '1px solid #f3f4f6' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 20px',
                        width: '100%',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: 500,
                        background: 'transparent',
                        border: '1px solid #e5e7eb',
                        color: '#4b5563',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );
}
