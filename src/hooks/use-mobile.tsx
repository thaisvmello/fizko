import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') {
      return
    }

    try {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      const onChange = () => {
        if (typeof window !== 'undefined') {
          setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }
      }

      mql.addEventListener("change", onChange)
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

      return () => {
        try {
          mql.removeEventListener("change", onChange)
        } catch (error) {
          console.warn('Error removing event listener:', error)
        }
      }
    } catch (error) {
      console.warn('Error setting up mobile detection:', error)
      setIsMobile(false) // Default to desktop
    }
  }, [])

  return !!isMobile
}
