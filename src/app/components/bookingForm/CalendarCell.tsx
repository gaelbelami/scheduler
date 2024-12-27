import { CalendarDate, getLocalTimeZone, isSameMonth, isToday } from '@internationalized/date';
import React, { useRef } from 'react'
import { mergeProps, useCalendarCell } from 'react-aria';
import { CalendarState } from 'react-stately';
import { useFocusRing } from '@react-aria/focus';
import cn from "clsx"


export function CalendarCell({ state, date, currentMonth, isUnavailable }: { state: CalendarState; date: CalendarDate; currentMonth: CalendarDate; isUnavailable?: boolean }) {
  let ref = useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isDisabled,
    formattedDate
  } = useCalendarCell({ date }, state, ref);
  const {focusProps, isFocusVisible} = useFocusRing();
  const isDateToday = isToday(date, getLocalTimeZone());
  const isOutsideOfMounth = !isSameMonth(date, currentMonth);

  const finallyIsDisabled = isUnavailable || isDisabled;
    return (
    <td {...cellProps} className={`py-0.5 px-0.5 relative ${isFocusVisible ? ' z-10' : 'z-0'} `}>
        <div {...mergeProps(buttonProps, focusProps)} ref={ref} hidden={isOutsideOfMounth} className='w-10 h-10 sm:w-12 sm:h-12 outline-none group rounded-md'>
             <div className={cn("w-full h-full rounded-sm flex items-center justify-center text-sm font-semibold", finallyIsDisabled ? "text-muted-foreground cursor-not-allowed" : "" ,isSelected ? "bg-blue-500 text-white" : "", !isSelected && !finallyIsDisabled ? " hover:bg-primary/10 bg-secondary" : "" )}>
                {formattedDate}
                {isDateToday && <div className={cn("absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full", isSelected && "bg-white")}/>}
             </div>
        </div>
    </td>
  )
}
