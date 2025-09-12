import { useTheme } from "next-themes"        
import { Toaster as Sonner } from "sonner"
import type { ToasterProps } from "sonner"

export const Toaster = (props: ToasterProps) => {
  const { theme = "system" } = useTheme?.() ?? { theme: "system" } 

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"      
      richColors                
      closeButton
      className="app-toaster"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)"
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
