"use client";

import { useEffect, useState } from "react";
import { Box, Fab, Zoom } from "@mui/material";
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
    <>
      <Zoom in={visible}>
        <Fab
          aria-label="Go to top"
          onClick={handleClick}
          size="medium"
          sx={{
            position: "fixed",
            right: { xs: 14, md: 22 },
            bottom: { xs: 90, md: 100 },
            zIndex: 1400,
            color: "black",
          }}
        >
          <ChevronUp size={20} />
        </Fab>
      </Zoom>
      <Box sx={{ '& .MuiFab-root': { borderRadius: '60px' } }}>
        <Fab
          aria-label="Go to top"
          size="medium"
          sx={{
            position: "fixed",
            right: { xs: 14, md: 22 },
            bottom: { xs: 16, md: 24 },
            zIndex: 1400,
            color: "black",
            fontSize: 30,
            width: 72,
            height: 60,
          }}
        >
          Y
        </Fab>
      </Box>
    </>
  );
}
