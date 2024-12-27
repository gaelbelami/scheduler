'use client'
import { Calendar } from './Calendar'
import { today, getLocalTimeZone, parseDate, CalendarDate } from '@internationalized/date'

import { CalendarProps, DateValue } from "@react-types/calendar";
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';

interface RenderCalendarProps {
  availability: {
    day: string
    isActive: boolean
  }[]
}

export const RenderCalendar = ({availability}: RenderCalendarProps) => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const [date, setDate]  = useState(() => {
    const dateParam = searchParams.get('date');
    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
  })

  useEffect(() => { 
    const dateParam = searchParams.get('date');
    if (dateParam) {
      setDate(parseDate(dateParam));
    }
  }
  , [searchParams]);

  const handleDateChange = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set('date', date.toString());
    router.push(url.toString());

  }
  
  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return !availability[adjustedDayOfWeek].isActive;
  }
  
  return (
    <div>
        <Calendar minValue={today(getLocalTimeZone())} isDateUnavailable={isDateUnavailable} value={date} onChange={handleDateChange}/>
    </div>
  )
}
