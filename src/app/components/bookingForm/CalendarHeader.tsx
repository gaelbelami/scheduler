import {  } from "react";
import {type CalendarState } from "react-stately"
import { FocusableElement, DOMAttributes } from "@react-types/shared";
import {type AriaButtonProps } from "@react-aria/button"
import { useDateFormatter } from "@react-aria/i18n"
import { VisuallyHidden } from "@react-aria/visually-hidden"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarButton } from "./CalendarButton";


export function CalendarHeader({state, calendarProps, prevButtonProps, nextButtonProps }: {state: CalendarState; calendarProps: DOMAttributes<FocusableElement>; prevButtonProps: AriaButtonProps<"button">; nextButtonProps: AriaButtonProps<"button">;}) {
    const mountDateFormatter = useDateFormatter({
        month: 'short',
        year: 'numeric',
        timeZone: state.timeZone,
    })

    const [monthName, _ , year] = mountDateFormatter
    .formatToParts(state.visibleRange.start.toDate(state.timeZone))
    .map((part) => part.value);
    return (
        <div className="flex justify-between items-center pb-4">
            <VisuallyHidden>
            <h2 className="">{calendarProps["aria-label"]}</h2>
            </VisuallyHidden>

            <h2 className="font-semibold flex-1">{monthName} <span className="text-muted-foreground text-sm font-semibold">{year}</span> </h2>
            <div className="flex items-center gap-2">
                <CalendarButton {...prevButtonProps} state={state} side="left">
                    <ChevronLeft className="w-4 h-4" />
                </CalendarButton>
                <CalendarButton {...nextButtonProps} state={state} side="right">
                    <ChevronRight className="w-4 h-4" />
                </CalendarButton>
            </div>
            
        </div>
    )
}