// Import necessary modules
// React: to create components
// cva: utility to manage Tailwind CSS variants easily
// cn: utility function to combine class names
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

// Define style variants for the Alert component using class-variance-authority (cva)
// It defines default and destructive styles
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground", // Default style
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive", // Style for destructive alerts
      },
    },
    defaultVariants: {
      variant: "default", // Default variant if none is specified
    },
  }
)

// Define the Alert component
// It uses the alertVariants for styling based on the 'variant' prop
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)} // Combine variant classes with custom className
    {...props}
  />
))
// Assign a display name for better debugging and readability
Alert.displayName = "Alert"

// Define the AlertTitle component
// Used for the title/header inside the Alert
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)} // Title styling
    {...props}
  />
))
// Set display name for easier debugging
AlertTitle.displayName = "AlertTitle"

// Define the AlertDescription component
// Used for the description or body text inside the Alert
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)} // Description text styling
    {...props}
  />
))
// Set display name for easier debugging
AlertDescription.displayName = "AlertDescription"

// Export the components for use in other parts of the application
export { Alert, AlertTitle, AlertDescription }
