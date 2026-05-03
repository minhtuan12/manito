"use client";

import { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import { ChevronUp } from "lucide-react";

export function GoToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={visible}>
      <Fab
        aria-label="Go to top"
        onClick={handleClick}
        size="medium"
        sx={{
          position: "fixed",
          right: { xs: 14, md: 22 },
          bottom: { xs: 16, md: 24 },
          zIndex: 1400,
          color: "black",
          boxShadow: "0 10px 24px rgba(0, 0, 0, 0.28)",
        }}
      >
        <ChevronUp size={20} />
      </Fab>
    </Zoom>
  );
}
