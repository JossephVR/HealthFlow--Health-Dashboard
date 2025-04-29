// Import React and necessary components from Radix UI for the Select component
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"  // Importing icons for the Select component
import { cn } from "../../lib/utils"  // Utility function for conditional class name management

// Destructure the necessary components from Radix SelectPrimitive for easier access
const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

// The trigger element of the Select component. It shows the currently selected value and a dropdown icon.
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}  // Forwards the ref to the Trigger component
    className={cn(
      // Styling for the trigger: flex, rounded, border, padding, etc.
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className  // Additional classes passed via the `className` prop
    )}
    {...props}  // Spread any other props (such as event handlers) to the trigger
  >
    {children}  {/* Render any children passed to the SelectTrigger (e.g., selected value) */}
    <SelectPrimitive.Icon asChild>
      {/* Render the ChevronDown icon as the dropdown indicator */}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName  // Set the display name for debugging

// The content area of the Select component, which shows the dropdown options.
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}  // Forwards the ref to the content
      className={cn(
        // Base styling for the dropdown content: max height, rounded corners, shadows, etc.
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        // Adjust the position of the dropdown based on the `position` prop
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className  // Additional classes passed via the `className` prop
      )}
      position={position}  // Set the position of the dropdown
      {...props}  // Spread any other props (e.g., event handlers) to the content
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",  // Padding for the viewport
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"  // Adjust the viewport size based on the trigger height and width
        )}
      >
        {children}  {/* Render the dropdown items */}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName  // Set the display name for debugging

// A single item within the Select dropdown.
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}  // Forwards the ref to the item
    className={cn(
      // Styling for the select item: flex, padding, rounded corners, focus states, etc.
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className  // Additional classes passed via the `className` prop
    )}
    {...props}  // Spread any other props (e.g., event handlers) to the item
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        {/* Render a check icon next to the selected item */}
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>  {/* Display the item's text */}
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName  // Set the display name for debugging

// Export all the necessary components for use in other parts of the application
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem
}
