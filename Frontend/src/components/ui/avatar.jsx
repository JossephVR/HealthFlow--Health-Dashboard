// Import necessary modules
// React: to create components
// AvatarPrimitive: base Avatar components from Radix UI
// cn: utility function to combine Tailwind CSS class names
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "../../lib/utils"

// Define the Avatar component
// Acts as the container for the avatar (image or fallback)
// Applies default rounded and sizing styles
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Basic circular avatar styling
      className
    )}
    {...props}
  />
))
// Set the display name for better debugging, using the original Radix display name
Avatar.displayName = AvatarPrimitive.Root.displayName

// Define the AvatarImage component
// Displays the actual user image inside the avatar
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)} // Makes the image cover the full avatar space
    {...props}
  />
))
// Set the display name for easier debugging
AvatarImage.displayName = AvatarPrimitive.Image.displayName

// Define the AvatarFallback component
// Shows a fallback (like user initials or icon) if the image fails to load
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // Centered content inside the fallback
      className
    )}
    {...props}
  />
))
// Set the display name for easier debugging
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Export the components to be used elsewhere
export { Avatar, AvatarImage, AvatarFallback }
