"use client"
import { cn } from "@/lib/utils";
import { Children, cloneElement, ReactElement } from "react";
import { ButtonProps } from "./button";

interface ButtonGroupProps {
  children: ReactElement<ButtonProps>[];
  className?: string;
}

export function ButtonGroup({ children, className }: ButtonGroupProps) {
  const totalButtons = Children.count(children);
  return (
    <div className={cn("flex w-full", className)}>
      {children.map((child, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === totalButtons - 1;
        return cloneElement(child, {
          className: cn(
            {
              "rounded-l-none": !isFirstItem,
              "rounded-r-none": !isLastItem,
              "border-r-0": !isFirstItem,
              "border-l-0": !isLastItem,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
}
