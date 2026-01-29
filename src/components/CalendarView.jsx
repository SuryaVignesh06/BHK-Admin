import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Lock, X, FileText, Phone, Mail, Calendar, CreditCard, User } from 'lucide-react';

const apartments = [
    { id: 1, name: 'Room 101', color: '#3b82f6' },
    { id: 2, name: 'Room 102', color: '#22c55e' },
    { id: 3, name: 'Room 103', color: '#a855f7' },
    { id: 4, name: 'Room 104', color: '#f97316' },
];

export default function CalendarView({ bookings = [], blockedDates = [], onBlockDate }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedBooking, setSelectedBooking] = useState(null);
    const scrollContainerRef = useRef(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { daysInMonth, year, month };
    };

    const { daysInMonth, year, month } = getDaysInMonth(currentDate);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const CELL_WIDTH = 48;

    const formatDateString = (y, m, d) => {
        return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    };

    const isPastDate = (y, m, d) => {
        const date = new Date(y, m, d);
        return date < today;
    };

    const isBlocked = (dateStr) => blockedDates.includes(dateStr);

    const handleDateClick = (day) => {
        const dateStr = formatDateString(year, month, day);
        if (isPastDate(year, month, day)) return; // Can't modify past dates
        if (onBlockDate) {
            onBlockDate(dateStr);
        }
    };

    const getBookingPosition = (booking, year, month) => {
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        if (checkOut <= monthStart || checkIn > monthEnd) return null;

        const effectiveStart = checkIn < monthStart ? monthStart : checkIn;
        const effectiveEnd = checkOut > monthEnd ? monthEnd : checkOut;

        const startDay = effectiveStart.getDate();
        const duration = Math.ceil((effectiveEnd - effectiveStart) / (1000 * 60 * 60 * 24));

        const width = Math.max(1, duration) * CELL_WIDTH;
        const left = (startDay - 1) * CELL_WIDTH;

        return { left, width };
    };

    const renderTimelineHeader = () => {
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const isToday = new Date().toDateString() === date.toDateString();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const dateStr = formatDateString(year, month, i);
            const blocked = isBlocked(dateStr);
            const past = isPastDate(year, month, i);

            days.push(
                <div
                    key={i}
                    onClick={() => handleDateClick(i)}
                    style={{
                        width: `${CELL_WIDTH}px`,
                        minWidth: `${CELL_WIDTH}px`,
                        textAlign: 'center',
                        padding: '10px 0',
                        fontSize: '12px',
                        color: past ? '#d1d5db' : (isToday ? '#111827' : (isWeekend ? '#9ca3af' : '#6b7280')),
                        fontWeight: isToday ? 700 : 500,
                        backgroundColor: blocked ? '#fef2f2' : (isToday ? '#f0fdf4' : 'transparent'),
                        borderRight: '1px solid #f3f4f6',
                        cursor: past ? 'not-allowed' : 'pointer',
                        position: 'relative'
                    }}
                    title={blocked ? 'Blocked - Click to unblock' : (past ? 'Past date' : 'Click to block')}
                >
                    {blocked && <Lock size={10} style={{ position: 'absolute', top: '2px', right: '2px', color: '#ef4444' }} />}
                    <div style={{ marginBottom: '2px', fontSize: '10px', textTransform: 'uppercase' }}>
                        {date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                    </div>
                    <div>{i}</div>
                </div>
            );
        }
        return days;
    };

    const renderGridRows = () => {
        return apartments.map(apt => {
            const aptBookings = bookings.filter(b => b.apartment === apt.name);

            return (
                <div key={apt.id} style={{
                    height: '60px',
                    borderBottom: '1px solid #e5e7eb',
                    position: 'relative',
                    display: 'flex'
                }}>
                    {/* Background Grid Cells */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dateStr = formatDateString(year, month, i + 1);
                        const blocked = isBlocked(dateStr);
                        const past = isPastDate(year, month, i + 1);
                        const isWeekend = new Date(year, month, i + 1).getDay() === 0 || new Date(year, month, i + 1).getDay() === 6;

                        return (
                            <div
                                key={i}
                                onClick={() => handleDateClick(i + 1)}
                                style={{
                                    width: `${CELL_WIDTH}px`,
                                    minWidth: `${CELL_WIDTH}px`,
                                    height: '100%',
                                    borderRight: '1px solid #f9fafb',
                                    background: blocked ? '#fef2f2' : (past ? '#f9fafb' : (isWeekend ? '#fafafa' : 'transparent')),
                                    cursor: past ? 'not-allowed' : 'pointer'
                                }}
                            />
                        );
                    })}

                    {/* Bookings Overlay */}
                    {aptBookings.map(booking => {
                        const pos = getBookingPosition(booking, year, month);
                        if (!pos) return null;

                        return (
                            <div
                                key={booking.id}
                                onClick={(e) => { e.stopPropagation(); setSelectedBooking({ ...booking, apartment: apt.name, color: apt.color }); }}
                                style={{
                                    position: 'absolute',
                                    left: `${pos.left}px`,
                                    width: `${pos.width - 4}px`,
                                    top: '10px',
                                    height: '40px',
                                    backgroundColor: apt.color + '20',
                                    borderLeft: `3px solid ${apt.color}`,
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '11px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    color: '#1f2937',
                                    cursor: 'pointer',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                    zIndex: 10,
                                    marginLeft: '2px',
                                    transition: 'transform 0.1s ease'
                                }}
                                title={`${booking.guestName}\n${apt.name}\n${booking.checkIn} to ${booking.checkOut}`}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <div style={{ fontWeight: 600 }}>{booking.guestName}</div>
                                <div style={{ fontSize: '10px', opacity: 0.8 }}>
                                    {booking.status || 'Booked'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        });
    };

    // Booking Detail Modal
    const BookingModal = () => {
        if (!selectedBooking) return null;

        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }} onClick={() => setSelectedBooking(null)}>
                <div style={{
                    background: '#ffffff',
                    borderRadius: '8px',
                    width: '90%',
                    maxWidth: '500px',
                    maxHeight: '90vh',
                    overflow: 'auto'
                }} onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div style={{
                        padding: '20px',
                        borderBottom: '1px solid #e5e7eb',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '6px',
                                background: selectedBooking.color + '20',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <User size={20} color={selectedBooking.color} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>{selectedBooking.guestName}</h3>
                                <p style={{ fontSize: '13px', color: '#6b7280' }}>{selectedBooking.id}</p>
                            </div>
                        </div>
                        <button onClick={() => setSelectedBooking(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}>
                            <X size={20} color="#6b7280" />
                        </button>
                    </div>

                    {/* Details */}
                    <div style={{ padding: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Calendar size={16} color="#6b7280" />
                                <div>
                                    <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Check-in</p>
                                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{selectedBooking.checkIn}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Calendar size={16} color="#6b7280" />
                                <div>
                                    <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Check-out</p>
                                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{selectedBooking.checkOut}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '6px', marginBottom: '16px' }}>
                            <p style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Room Details</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedBooking.color }}></div>
                                <span style={{ fontSize: '14px', color: '#111827' }}>{selectedBooking.apartment}</span>
                            </div>
                        </div>

                        {/* Simulated Receipt */}
                        <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <FileText size={16} color="#6b7280" />
                                <p style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Receipt</p>
                            </div>
                            <div style={{ fontSize: '13px', color: '#4b5563' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Room Charges (3 nights)</span>
                                    <span>₹10,500</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Taxes & Fees</span>
                                    <span>₹1,260</span>
                                </div>
                                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#111827' }}>
                                    <span>Total</span>
                                    <span>₹11,760</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                            <button style={{
                                flex: 1,
                                padding: '10px',
                                background: '#111827',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                            }}>
                                <Phone size={14} />
                                Contact Guest
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div style={{
                background: '#ffffff',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#ffffff'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
                            {monthNames[month]} {year}
                        </h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={prevMonth} style={{ background: '#f3f4f6', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer' }}>
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={nextMonth} style={{ background: '#f3f4f6', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer' }}>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ display: 'flex', overflow: 'hidden' }}>
                    {/* Sidebar */}
                    <div style={{
                        width: '160px',
                        minWidth: '160px',
                        borderRight: '1px solid #e5e7eb',
                        background: '#ffffff',
                        zIndex: 20
                    }}>
                        <div style={{
                            height: '50px',
                            borderBottom: '1px solid #e5e7eb',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 16px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#6b7280',
                            textTransform: 'uppercase',
                            background: '#f9fafb'
                        }}>
                            Rooms
                        </div>
                        {apartments.map(apt => (
                            <div key={apt.id} style={{
                                height: '60px',
                                borderBottom: '1px solid #e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 16px',
                                gap: '10px'
                            }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: apt.color }}></div>
                                <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>{apt.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Timeline Scroll Area */}
                    <div
                        ref={scrollContainerRef}
                        style={{
                            flex: 1,
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <div style={{ minWidth: `${daysInMonth * CELL_WIDTH}px` }}>
                            <div style={{
                                height: '50px',
                                display: 'flex',
                                borderBottom: '1px solid #e5e7eb',
                                background: '#f9fafb'
                            }}>
                                {renderTimelineHeader()}
                            </div>
                            <div>
                                {renderGridRows()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BookingModal />
        </>
    );
}
