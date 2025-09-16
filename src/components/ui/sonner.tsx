import { useTheme } from "next-themes"        
import { Toaster as Sonner } from "sonner"
import type { ToasterProps } from "sonner"

export const Toaster = (props: ToasterProps) => {
  const { theme = "system" } = useTheme?.() ?? { theme: "system" } 

  return (
    // <Sonner
    //   theme={theme as ToasterProps["theme"]}
    //   position="top-right"      
    //   richColors                
    //   closeButton
    //   className="app-toaster"
    //   style={
    //     {
    //       "--normal-bg": "var(--popover)",
    //       "--normal-text": "var(--popover-foreground)",
    //       "--normal-border": "var(--border)"
    //     } as React.CSSProperties
    //   }
    //   {...props}
    // />
    <Sonner
       theme={theme as ToasterProps["theme"]}
       position="top-right"
       richColors
       closeButton
      className="app-toaster"
    style={
    {
      "--normal-bg": "#1f2937", 
      "--normal-text": "#f9fafb", 
      "--normal-border": "#374151", 

      "--success-bg": "#006400", 
      "--success-text": "#d1fae5", 
      "--error-bg": "#8B0000",   
      "--error-text": "#fee2e2", 
      "--warning-bg": "#92400e", 
      "--warning-text": "#fef3c7", 
      "--info-bg": "#1e3a8a",    
      "--info-text": "#dbeafe",  
    } as React.CSSProperties
  }
  {...props}
/>

  )
}
