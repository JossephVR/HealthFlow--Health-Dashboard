// Import React for building the component and the Label component from Radix UI
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority"  // Import `cva` for creating variants
import { cn } from "../../lib/utils"  // Import a utility function for className management

// Define the variants for the Label component's styling using `cva`
const labelVariants = cva(
  // Default styling for the label component:
  // - `text-sm` for small text size
  // - `font-medium` for medium font weight
  // - `leading-none` to set line height to 1 (no extra space between lines)
  // - `peer-disabled:cursor-not-allowed` and `peer-disabled:opacity-70` to handle disabled states for form controls
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

// Create the Label component, using `forwardRef` to forward the ref to the Radix Label component
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}  // Forward the ref to the Radix UI label element
    className={cn(labelVariants(), className)}  // Apply default styles from `labelVariants` and allow additional classNames
    {...props}  // Spread any other props (e.g., `htmlFor`, `children`, etc.)
  />
))
Label.displayName = LabelPrimitive.Root.displayName  // Set the display name for better debugging

// Export the Label component for use in other parts of the application
export { Label }
