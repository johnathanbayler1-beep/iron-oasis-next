'use client';

import { useState, useCallback } from 'react';
import { Hero }         from '@/components/Hero';
import { About }        from '@/components/About';
import { Pricing }      from '@/components/Pricing';
import BookingModal     from '@/components/BookingModal';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking  = useCallback(() => setIsBookingOpen(true),  []);
  const closeBooking = useCallback(() => setIsBookingOpen(false), []);

  return (
    <>
      <main>
        <Hero   onBookingOpen={openBooking} />
        <About />
        <Pricing onBookingOpen={openBooking} />
      </main>
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </>
  );
}
