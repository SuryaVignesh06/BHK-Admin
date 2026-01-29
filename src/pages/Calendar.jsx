import { useState } from 'react';
import { Lock, Unlock, Info } from 'lucide-react';
import CalendarView from '../components/CalendarView';

// Sample bookings data
const sampleBookings = [
    { id: 'BK001', guestName: 'Rajesh Kumar', apartment: 'Room 101', checkIn: '2026-01-29', checkOut: '2026-02-01', status: 'confirmed' },
    { id: 'BK002', guestName: 'Priya Sharma', apartment: 'Room 102', checkIn: '2026-01-30', checkOut: '2026-02-02', status: 'confirmed' },
    { id: 'BK003', guestName: 'Anil Reddy', apartment: 'Room 104', checkIn: '2026-01-31', checkOut: '2026-02-03', status: 'confirmed' },
    { id: 'BK004', guestName: 'Lakshmi Devi', apartment: 'Room 103', checkIn: '2026-02-05', checkOut: '2026-02-08', status: 'confirmed' },
    { id: 'BK005', guestName: 'Venkat Rao', apartment: 'Room 101', checkIn: '2026-02-10', checkOut: '2026-02-14', status: 'confirmed' },
    { id: 'BK006', guestName: 'Srinivas M', apartment: 'Room 102', checkIn: '2026-02-08', checkOut: '2026-02-11', status: 'confirmed' },
];

export default function Calendar() {
    const [blockedDates, setBlockedDates] = useState(['2026-02-15', '2026-02-16']);

    const handleBlockDate = (date) => {
        if (blockedDates.includes(date)) {
            setBlockedDates(prev => prev.filter(d => d !== date));
        } else {
            setBlockedDates(prev => [...prev, date]);
        }
    };

    return (
        <div className="page-container" style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>Calendar</h1>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>View bookings and manage availability</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
                        <Lock size={14} />
                        <span>{blockedDates.length} dates blocked</span>
                    </div>
                    {blockedDates.length > 0 && (
                        <button
                            onClick={() => setBlockedDates([])}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                background: 'transparent',
                                border: '1px solid #fed7aa',
                                borderRadius: '6px',
                                color: '#ea580c',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer'
                            }}
                        >
                            <Unlock size={14} />
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Calendar */}
            <CalendarView
                bookings={sampleBookings}
                blockedDates={blockedDates}
                onBlockDate={handleBlockDate}
            />

            {/* Instructions - Sharp Edges */}
            <div style={{
                background: '#ffffff',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                padding: '20px',
                marginTop: '24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Info size={16} color="#6b7280" />
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>How to Use</h3>
                </div>
                <ul style={{ fontSize: '14px', color: '#4b5563', paddingLeft: '20px', lineHeight: '1.8', margin: 0 }}>
                    <li>Click on any date cell to <strong>block/unblock</strong> it for maintenance or owner use</li>
                    <li>Color-coded bars show bookings for each room</li>
                    <li>Click on a booking bar to see <strong>guest details and receipt</strong></li>
                    <li>Past dates are grayed out and cannot be modified</li>
                </ul>
            </div>
        </div>
    );
}
