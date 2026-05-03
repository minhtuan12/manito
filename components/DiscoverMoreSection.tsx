import Image from "next/image";
import Link from "next/link";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import type { Locale } from "@/types/domain";

import DisImage from "@/assets/images/CB3A9159-2-600x400.webp";

type DiscoverMoreSectionProps = {
  locale: Locale;
};

const discoverItems = [
  {
    key: "second-skin",
    image: DisImage,
    title: {
      en: "The Second Skin Of The Human Body",
      vi: "Làn Da Thứ Hai Của Cơ Thể Con Người",
    },
    body: {
      en: "Mulberry silk – a breathtaking aspiration to elevate sleep quality whilst leveraging the benefits of skin improvement and hair rejuvenation, which benefit is known as “the second skin of the human body”.",
      vi: "Lụa tơ tằm – một khát vọng tuyệt vời để nâng cao chất lượng giấc ngủ đồng thời tận dụng những lợi ích cải thiện làn da và phục hồi mái tóc, được biết đến như \"lớp da thứ hai của cơ thể con người\".",
    },
    href: "/soft-light/",
    cta: { en: "Discover More", vi: "Khám Phá Thêm" },
  },
  {
    key: "sustainable",
    image: DisImage,
    title: {
      en: "For A More Sustainable Future",
      vi: "Hướng Đến Tương Lai Bền Vững",
    },
    body: {
      en: "MANITO is certified by OEKO – TEX STANDARD 100 and MADE IN GREEN. OEKO-TEX STANDARD 100 is one of the world’s best-known labels for textiles tested for harmful substances.",
      vi: "MANITO đạt chứng nhận OEKO-TEX STANDARD 100 và MADE IN GREEN. OEKO-TEX STANDARD 100 là một trong những nhãn hiệu nổi tiếng nhất thế giới dành cho hàng dệt may được kiểm tra về các chất độc hại.",
    },
    href: "/inside-manito/",
    cta: { en: "Discover More", vi: "Khám Phá Thêm" },
  },
  {
    key: "bespoke",
    image: DisImage,
    title: {
      en: "Bespoke Monogramming",
      vi: "Thêu Monogram Cá Nhân",
    },
    body: {
      en: "You can customize gifts exclusively for yourself or others through our personalization service, including bespoke monogramming.",
      vi: "Bạn có thể tùy chỉnh quà tặng dành riêng cho bản thân hoặc người khác thông qua dịch vụ cá nhân hóa của chúng tôi, bao gồm cả việc khắc tên viết tắt theo yêu cầu.",
    },
    href: "/customize/",
    cta: { en: "Shop Personalization", vi: "Mua Dịch Vụ Cá Nhân" },
  },
] as const;

export function DiscoverMoreSection({ locale }: DiscoverMoreSectionProps) {
  return (
    <Box sx={{ px: 2, py: { xs: 8, md: 11 } }}>
      <Typography
        textAlign="center"
        sx={{
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#5a5a5a",
          fontSize: { xs: 15, md: 22 },
          mb: { xs: 5, md: 7 },
        }}
      >
        {locale === 'en' ? 'Discover More' : 'Khám Phá Thêm'}
      </Typography>

      <Grid container spacing={{ xs: 4, md: 3 }}>
        {discoverItems.map((item) => (
          <Grid key={item.key} size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "grid" }}>
              <Box sx={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src={item.image}
                  alt={item.title.en}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    transition: "transform 420ms ease",
                  }}
                />
              </Box>

              <Box mt={4} minHeight={150}>
                <Typography sx={{ color: "#2d2d2d", fontSize: { xs: 23, md: 24 }, lineHeight: 1.25 }}>
                  {item.title[locale]}
                </Typography>
                <Typography sx={{ color: 'gray', mt: 2, fontSize: 17, lineHeight: 1.7, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}>
                  {item.body[locale]}
                </Typography>
              </Box>
              <Link
                href={item.href}
                style={{
                  width: "fit-content",
                  color: "#555656",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  marginTop: 20,
                  fontWeight: 600,
                }}
              >
                {item.cta[locale]}
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
