// Import React for building the component and utility function `cn` for conditional class names
import * as React from "react"
import { cn } from "../../lib/utils"

// Define the Input component using forwardRef to pass the ref from parent to the input element
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}  // Set the type of the input (e.g., text, password, etc.)
      className={cn(
        // Default styling for the input field:
        // - flex for a flexible layout
        // - h-10 for height, w-full for full width
        // - rounded-md for rounded corners
        // - border-input for border color and border styling
        // - px-3 and py-2 for padding
        // - text-sm for smaller text size
        // - ring and focus-visible styles for better accessibility
        // - file-specific styles (for file input type)
        // - disabled styles (cursor and opacity changes)
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        
        // Allow additional className to be passed in, for customization
        className
      )}
      ref={ref}  // Forward the ref to the input element
      {...props}  // Spread additional props (e.g., value, onChange, etc.) onto the input element
    />
  )
})
Input.displayName = "Input"  // Assign a display name for the component (useful for debugging)

// Export the Input component for use in other parts of the application
export { Input }
