import { useNavigate } from 'react-router-dom';
import { CalendarCheck, CalendarX, CreditCard, Users, Clock, Building2 } from 'lucide-react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';

// Dummy data
const todayCheckIns = [
    { id: 'BK001', guest: 'Rajesh Kumar', apartment: 'Royal Suite', time: '2:00 PM', phone: '+91 98765 43210' },
    { id: 'BK002', guest: 'Priya Sharma', apartment: 'Modern Comfort', time: '3:30 PM', phone: '+91 87654 32109' },
];

const todayCheckOuts = [
    { id: 'BK003', guest: 'Anil Reddy', apartment: 'Executive Stay', time: '11:00 AM', phone: '+91 76543 21098' },
];

// const revenueData = [
//    { name: 'Jan', value: 40000 },
//    { name: 'Feb', value: 30000 },
//    { name: 'Mar', value: 60000 },
//    { name: 'Apr', value: 90000 },
//    { name: 'May', value: 85000 },
//    { name: 'Jun', value: 110000 },
//    { name: 'Jul', value: 100000 },
//    { name: 'Aug', value: 142000 }, // Growing: Green
// ];

export default function Dashboard() {
    const navigate = useNavigate();

    // Determine graph color based on trend (Last vs First or similar logic)
    // const isGrowing = revenueData[revenueData.length - 1].value >= revenueData[0].value;
    // const graphColor = isGrowing ? '#16a34a' : '#dc2626'; // Green or Red

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '8px', // Sharper
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
    };

    const cardHeaderStyle = {
        padding: '16px 20px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#ffffff' // Cleaner white header
    };

    const activityItemStyle = {
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
        // Removed borderBottom to remove "three lines"
    };

    const getAvatarColor = (name) => {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const Avatar = ({ name }) => (
        <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px', // Sharp
            background: getAvatarColor(name) + '20', // 20% opacity
            color: getAvatarColor(name),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: '12px'
        }}>
            {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
    );

    return (
        <div className="page-container" style={{ padding: '16px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>
                    Dashboard
                </h1>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                    Welcome back! Here is your property overview.
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <StatCard
                    title="Active Bookings"
                    value="12"
                    icon={Users}
                    trend="8%"
                    trendUp={true}
                    linkTo="/bookings"
                />
                <StatCard
                    title="Check-ins Today"
                    value={todayCheckIns.length.toString()}
                    icon={CalendarCheck}
                    linkTo="/bookings"
                />
                <StatCard
                    title="Check-outs Today"
                    value={todayCheckOuts.length.toString()}
                    icon={CalendarX}
                    linkTo="/bookings"
                />
                <StatCard
                    title="Monthly Revenue"
                    value="₹1.42L"
                    icon={CreditCard}
                    trend="12%"
                    trendUp={true}
                    linkTo="/payments"
                />
            </div>

            {/* Today's Activity */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {/* Check-ins Today */}
                <div style={cardStyle}>
                    <div style={cardHeaderStyle}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
                            Today's Check-ins
                        </h3>
                        <span className="badge badge-success">{todayCheckIns.length}</span>
                    </div>
                    <div>
                        {todayCheckIns.map((item, idx) => (
                            <div
                                key={item.id}
                                style={{
                                    ...activityItemStyle
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Avatar name={item.guest} />
                                    <div>
                                        <p style={{ fontWeight: 600, color: '#111827', fontSize: '14px', marginBottom: '2px' }}>
                                            {item.guest}
                                        </p>
                                        <p style={{ fontSize: '12px', color: '#6b7280' }}>
                                            {item.apartment}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: '#374151',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Clock size={14} color="#9ca3af" />
                                        {item.time}
                                    </p>
                                    <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                                        {item.phone}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Check-outs Today */}
                <div style={cardStyle}>
                    <div style={cardHeaderStyle}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
                            Today's Check-outs
                        </h3>
                        <span className="badge badge-warning">{todayCheckOuts.length}</span>
                    </div>
                    <div>
                        {todayCheckOuts.map((item, idx) => (
                            <div
                                key={item.id}
                                style={{
                                    ...activityItemStyle
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Avatar name={item.guest} />
                                    <div>
                                        <p style={{ fontWeight: 600, color: '#111827', fontSize: '14px', marginBottom: '2px' }}>
                                            {item.guest}
                                        </p>
                                        <p style={{ fontSize: '12px', color: '#6b7280' }}>
                                            {item.apartment}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: '#374151',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Clock size={14} color="#9ca3af" />
                                        {item.time}
                                    </p>
                                    <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                                        {item.phone}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ ...cardStyle }}>
                <div style={cardHeaderStyle}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
                        Quick Actions
                    </h3>
                </div>
                <div style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <button
                        onClick={() => navigate('/bookings')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            background: '#111827',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <Users size={16} />
                        View Bookings
                    </button>
                    <button
                        onClick={() => navigate('/calendar')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            background: '#ffffff',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <CalendarCheck size={16} />
                        Check Calendar
                    </button>
                    <button
                        onClick={() => navigate('/apartments')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            background: '#ffffff',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <Building2 size={16} />
                        Manage Apartments
                    </button>
                    <button
                        onClick={() => navigate('/payments')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            background: '#ffffff',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <CreditCard size={16} />
                        View Payments
                    </button>
                </div>
            </div>
        </div>
    );
}
