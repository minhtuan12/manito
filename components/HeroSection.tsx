import Image from "next/image";
import { Box, Container, Stack, Typography } from "@mui/material";
import Banner1 from "@/assets/images/banner1.png";

type HeroSectionProps = {
  locale: "en" | "vi";
};

export function HeroSection({
  locale,
}: HeroSectionProps) {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "72svh", md: "100svh" },
        overflow: "hidden",
        backgroundColor: "#f2f0e1",
      }}
    >
      <Image
        src={Banner1}
        alt="YAMOPAD hero"
        priority
        style={{
          objectFit: "cover",
          width: "100vw",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      />

      <Box
        sx={{
          height: "100%",
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            maxWidth: 620,
            color: "#f8fafc",
            ml: { xs: 1, sm: 3, md: 8, lg: 12 },
          }}
        >
          {/* <Typography variant="overline" sx={{ letterSpacing: "0.24em", opacity: 0.9 }}>
            {locale === "en" ? "THE OCEAN FANTASY COLLECTION" : "BST OCEAN FANTASY"}
          </Typography> */}
        </Stack>
      </Container>
    </Box>
  );
}
