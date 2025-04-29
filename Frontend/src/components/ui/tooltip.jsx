// Import React and necessary components from Radix UI for the Tooltip component
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "../../lib/utils"  // Utility function for conditional class name management

// Destructure the necessary components from Radix TooltipPrimitive for easier access
const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

// The content of the Tooltip component, which displays when the trigger is hovered or focused.
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}  // Forwards the ref to the content
      sideOffset={sideOffset}  // Distance between the trigger and the tooltip content
      className={cn(
        // Styling for the tooltip content: background color, padding, text size, animations, etc.
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className  // Additional classes passed via the `className` prop
      )}
      {...props}  // Spread any other props (e.g., event handlers) to the content
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName  // Set the display name for debugging

// Export all the necessary Tooltip components for use in other parts of the application
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
