import { Button } from "@/components/ui/button";
import { AriaButtonProps, useButton } from "@react-aria/button"
import { mergeProps } from "@react-aria/utils";
import { CalendarState } from "react-stately";
import { useRef } from "react";
import { useFocusRing } from "@react-aria/focus";


export function CalendarButton(props: AriaButtonProps<"button"> & {state?: CalendarState; side?: "left" | "right"}) {
    
    const ref = useRef(null)
    const { buttonProps } = useButton(props, ref);
    const {} = useFocusRing();
    
    return (
        <Button variant="outline" size="icon" ref={ref} disabled={props.isDisabled} {...props} {...mergeProps(buttonProps)}>
            {props.children}
        </Button>
    )
}