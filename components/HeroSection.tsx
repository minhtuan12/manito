import Image from "next/image";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Banner1 from "@/assets/images/banner1.png";
import Link from "next/link";

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
          top: { xs: '70%', md: "50%" },
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
        }}
      >
        <Stack
          spacing={{ xs: 1, md: 3 }}
          sx={{
            maxWidth: 620,
            color: "#f8fafc",
            ml: { xs: 1, sm: 3, md: 8, lg: 12 },
          }}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography fontSize={{ xs: 20, md: 36 }} variant="overline" sx={{ opacity: 0.9 }}>
            {locale === "en" ? "YAMOPAD SWEETIE COLLECTION" : "BỘ SƯU TẬP YAMOPAD"}
          </Typography>
          <Typography fontSize={{ xs: 12, md: 18 }} maxWidth={300} textAlign={'center'} variant="overline" sx={{ opacity: 0.9 }}>
            {locale === "en" ? "Quiet beauty in simple, sweet silk" : "Vẻ đẹp tĩnh lặng trong sự giản dị, ngọt ngào của lụa."}
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "white",
              width: "fit-content",
              px: 4,
              py: 3,
              height: "40px",
              fontWeight: 600,
              fontSize: 16,
              boxShadow: "none",
              bgcolor: { xs: 'transparent', md: '#dc977c' },
              border: { xs: '1px solid white', md: 'none' }
            }}
          >
            <Link href={`${locale}/category/nu`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {locale === "en" ? 'SHOP NOW' : 'MUA NGAY'}
            </Link>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
