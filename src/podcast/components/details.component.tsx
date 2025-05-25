import * as React from "react";

import { cn } from "@/lib/utils";
import { PodcastHeader } from "./podcast-header";
import type { PodcastFeed } from "../models";

interface ResponsiveDrawerProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  podcast?: PodcastFeed;
}

export function ResponsiveDrawer({
  children,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  className,
  podcast,
}: ResponsiveDrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = setControlledOpen || setUncontrolledOpen;

  React.useEffect(() => {
    // Detectar si es mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <>
      {trigger && (
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          {trigger}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={cn(
          "fixed z-50 transition-all rounded-lg bg-black bg-opacity-75 duration-300 ease-in-out",

          isMobile
            ? "inset-x-0 bottom-0 h-[90vh] bg-background"
            : "inset-y-0 left-0 w-[26.125rem] bg-background",
          open
            ? "translate-y-0 translate-x-0"
            : isMobile
            ? "translate-y-full"
            : "-translate-x-full",
          className
        )}
      >
        <PodcastHeader podcast={podcast} onClose={() => setOpen(false)} />
        <div className="h-full w-full  bg-gray-900   bg-opacity-75 backdrop-blur-md">{children}</div>
      </div>
    </>
  );
}
