import { useState } from 'react';
import BookingTable from '../components/BookingTable';

// Sample booking data
const initialBookings = [
    {
        id: 'BK001',
        guestName: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        email: 'rajesh@email.com',
        apartment: 'The Royal Suite',
        checkIn: '2026-01-29',
        checkOut: '2026-02-01',
        nights: 3,
        amount: 10500,
        paymentStatus: 'paid',
        status: 'confirmed'
    },
    {
        id: 'BK002',
        guestName: 'Priya Sharma',
        phone: '+91 87654 32109',
        email: 'priya@email.com',
        apartment: 'Modern Comfort Flat',
        checkIn: '2026-01-30',
        checkOut: '2026-02-02',
        nights: 3,
        amount: 9600,
        paymentStatus: 'pending',
        status: 'pending'
    },
    {
        id: 'BK003',
        guestName: 'Anil Reddy',
        phone: '+91 76543 21098',
        email: 'anil@email.com',
        apartment: 'Executive Stay',
        checkIn: '2026-01-31',
        checkOut: '2026-02-03',
        nights: 3,
        amount: 12000,
        paymentStatus: 'paid',
        status: 'confirmed'
    },
    {
        id: 'BK004',
        guestName: 'Lakshmi Devi',
        phone: '+91 65432 10987',
        email: 'lakshmi@email.com',
        apartment: 'Cozy Family Haven',
        checkIn: '2026-01-25',
        checkOut: '2026-01-28',
        nights: 3,
        amount: 9000,
        paymentStatus: 'paid',
        status: 'checked-in'
    },
    {
        id: 'BK005',
        guestName: 'Venkat Rao',
        phone: '+91 54321 09876',
        email: 'venkat@email.com',
        apartment: 'The Royal Suite',
        checkIn: '2026-01-20',
        checkOut: '2026-01-23',
        nights: 3,
        amount: 10500,
        paymentStatus: 'paid',
        status: 'completed'
    },
    {
        id: 'BK006',
        guestName: 'Srinivas Murthy',
        phone: '+91 43210 98765',
        email: 'srinivas@email.com',
        apartment: 'Modern Comfort Flat',
        checkIn: '2026-02-05',
        checkOut: '2026-02-08',
        nights: 3,
        amount: 9600,
        paymentStatus: 'paid',
        status: 'confirmed'
    },
];

export default function Bookings() {
    const [bookings, setBookings] = useState(initialBookings);

    const handleStatusChange = (bookingId, newStatus) => {
        setBookings(prev =>
            prev.map(booking =>
                booking.id === bookingId
                    ? { ...booking, status: newStatus }
                    : booking
            )
        );
    };

    const activeCount = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').length;
    const pendingCount = bookings.filter(b => b.status === 'pending').length;

    return (
        <div className="page-container" style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '24px',
                flexWrap: 'wrap'
            }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>Bookings</h1>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Manage all apartment bookings</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '14px' }}>
                        <span style={{ color: '#6b7280' }}>Active:</span>
                        <span style={{ marginLeft: '4px', fontWeight: 600, color: '#111827' }}>{activeCount}</span>
                    </div>
                    <div style={{ fontSize: '14px' }}>
                        <span style={{ color: '#6b7280' }}>Pending:</span>
                        <span style={{ marginLeft: '4px', fontWeight: 600, color: '#ea580c' }}>{pendingCount}</span>
                    </div>
                </div>
            </div>

            {/* Booking Table */}
            <BookingTable
                bookings={bookings}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}
