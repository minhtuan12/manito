import Link from "next/link";
import Image from "next/image";
import { Box, Button, Grid2 as Grid, IconButton, InputBase, Stack, Typography } from "@mui/material";
import type { Locale } from "@/types/domain";

import MasterCard from "@/assets/images/mastercard.svg";
import Maestro from "@/assets/images/maestro.svg";
import Visa from "@/assets/images/visa.svg";
import Paypal from "@/assets/images/paypal-1.svg";
import Express from "@/assets/images/american-express-icon.svg";
import JCB from "@/assets/images/jcb-w.svg";

type SiteFooterProps = {
  locale: Locale;
};

type FooterLink = {
  href: string;
  label: { en: string; vi: string };
};

type FooterGroup = {
  title: { en: string; vi: string };
  links: FooterLink[];
};

const t = {
  subscribe: {
    en: "Subscribe To Our Newsletter",
    vi: "Đăng ký nhận bản tin của chúng tôi",
  },
  sale: {
    en: "5% off your first order for selected products in YAMOPAD's CHOICE.",
    vi: "Giảm 5% cho đơn hàng đầu tiên với các sản phẩm trong YAMOPAD's CHOICE.",
  },
  desc: {
    en: "Be the first to know about our new product launches and gain private access on special occasions.",
    vi: "Nhận thông tin sớm nhất về bộ sưu tập mới và quyền truy cập riêng trong các dịp đặc biệt.",
  },
  email: {
    en: "Email Address",
    vi: "Địa chỉ Email",
  },
  subscribeBtn: {
    en: "SUBSCRIBE",
    vi: "ĐĂNG KÝ",
  },
  policy: {
    en: "*I acknowledge that my email address will be processed by YAMOPAD Trading Ltd. in accordance with the Privacy Policy.",
    vi: "*Tôi đồng ý để YAMOPAD Trading Ltd. xử lý địa chỉ email của tôi theo Chính sách Bảo mật.",
  },
  follow: {
    en: "Follow Us",
    vi: "Theo dõi chúng tôi",
  },
  copyright: {
    en: "YAMOPAD Official Online Store North America",
    vi: "Cửa hàng trực tuyến chính thức YAMOPAD khu vực Bắc Mỹ",
  },
};

const footerGroups: FooterGroup[] = [
  {
    title: { en: "Get In Touch", vi: "Liên hệ" },
    links: [
      { label: { en: "FAQ", vi: "Câu hỏi thường gặp" }, href: "/faq" },
      { label: { en: "YAMOPAD Loyalty Club", vi: "CLB Khách hàng thân thiết YAMOPAD" }, href: "/yamopad-loyalty-club" },
      { label: { en: "Contact Us", vi: "Liên hệ chúng tôi" }, href: "/contact-us" },
    ],
  },
  {
    title: { en: "About YAMOPAD", vi: "Về YAMOPAD" },
    links: [
      { label: { en: "Inside YAMOPAD", vi: "Câu chuyện YAMOPAD" }, href: "/inside-yamopad" },
      { label: { en: "Soft Light", vi: "Soft Light" }, href: "/soft-light" },
      { label: { en: "Splendid Silk Moments", vi: "Splendid Silk Moments" }, href: "/splendid-silk-moments" },
    ],
  },
  {
    title: { en: "Services", vi: "Dịch vụ" },
    links: [
      { label: { en: "Delivery & Shipping", vi: "Vận chuyển và giao hàng" }, href: "/delivery-and-shipping" },
      { label: { en: "Returns & Exchanges", vi: "Đổi và trả hàng" }, href: "/returns-and-exchanges" },
      { label: { en: "Bespoke Monogramming", vi: "Thêu monogram" }, href: "/customize" },
      { label: { en: "Eye Mask Renewal", vi: "Đổi mới mặt nạ ngủ" }, href: "/category/gifts/eye-mask-renewal" },
      { label: { en: "Silk Collector's Club", vi: "Silk Collector's Club" }, href: "/silk-collectors-club" },
    ],
  },
  {
    title: { en: "Information", vi: "Thông tin" },
    links: [
      { label: { en: "Blog", vi: "Blog" }, href: "/blog" },
      { label: { en: "Care Guide", vi: "Hướng dẫn bảo quản" }, href: "/silk-care-guide" },
      { label: { en: "Machine Washable Silk", vi: "Lụa giặt máy" }, href: "/washable-silk" },
      { label: { en: "Size Guide", vi: "Bảng size" }, href: "/size-guide" },
      { label: { en: "Payment Methods", vi: "Phương thức thanh toán" }, href: "/payment-methods" },
      { label: { en: "Privacy Policy", vi: "Chính sách bảo mật" }, href: "/privacy-policy" },
      { label: { en: "Terms & Conditions", vi: "Điều khoản & điều kiện" }, href: "/terms" },
    ],
  },
];

const methods = [MasterCard, Maestro, Visa, Paypal, Express, JCB];

export function SiteFooter({ locale }: SiteFooterProps) {
  return (
    <Box component="footer" sx={{ bgcolor: "#1f1f1f", color: "black", mt: 8 }}>
      <Box sx={{ bgcolor: "#d7d4c8", px: { xs: 2, md: 8 }, py: { xs: 6, md: 7 } }}>
        <Grid container spacing={{ xs: 4, lg: 12 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography sx={{ letterSpacing: "0.14em", textTransform: "uppercase", mb: 1.5, fontSize: 25 }}>
              {t.subscribe[locale]}
            </Typography>
            <Typography sx={{ fontSize: 16, mb: 1 }}>{t.sale[locale]}</Typography>
            <Typography sx={{ fontSize: 14, opacity: 0.88 }}>{t.desc[locale]}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
              <InputBase
                placeholder={t.email[locale]}
                sx={{
                  flex: 1,
                  bgcolor: "#fff",
                  color: "#333",
                  px: 2,
                  py: 1.15,
                  fontSize: 14,
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "#d7d4c8",
                  px: 3.5,
                  py: 1.2,
                  minWidth: { xs: "100%", sm: "auto" },
                  "&:hover": { bgcolor: "#6a6456" },
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {t.subscribeBtn[locale]}
              </Button>
            </Stack>
            <Typography sx={{ mt: 1.25, fontSize: 12, opacity: 0.8 }}>{t.policy[locale]}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ px: { xs: 2, md: 5 }, pt: { xs: 5, md: 7 }, pb: 2, color: "#d7d4c8" }}>
        <Grid container spacing={{ xs: 3, md: 2 }}>
          {footerGroups.map((group) => (
            <Grid key={group.title.en} size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Typography sx={{ fontSize: 17, mb: 1.4 }}>{group.title[locale]}</Typography>
              <Stack spacing={0.8}>
                {group.links.map((item) => (
                  <Typography
                    key={item.label.en}
                    component={Link}
                    href={`/${locale}${item.href}`}
                    sx={{
                      color: "#d7d8d9",
                      textDecoration: "none",
                      fontSize: 13,
                      "&:hover": { color: "#fff" },
                    }}
                  >
                    {item.label[locale]}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}

          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Typography sx={{ color: "#ffffff", fontSize: 17, mb: 1.4 }}>{t.follow[locale]}</Typography>
            <Stack direction="row" mb={2.2}>
              <IconButton component={Link} href="https://www.facebook.com/profile.php?id=100092494595534" target="_blank" sx={{ color: "#d7d8d9" }}>
                <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-337 273 123.5 256" xmlSpace="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"></path> </g></svg>
              </IconButton>
              <IconButton component={Link} href="https://www.instagram.com/manitosilk_official/" target="_blank" sx={{ color: "#d7d8d9" }}>
                <svg fill="#ffffff" viewBox="0 0 32 32" height="22px" width="22px" id="Camada_1" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z"></path> <path d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8 c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z"></path> <path d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8 c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z"></path> </g> </g></svg>
              </IconButton>
              <IconButton component={Link} href="https://www.youtube.com/channel/UCmgFE02vJbBOA232zFdJ5tA" target="_blank" sx={{ color: "#d7d8d9" }}>
                <svg viewBox="0 0 24 24" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.5245 6.00694C20.3025 5.81544 20.0333 5.70603 19.836 5.63863C19.6156 5.56337 19.3637 5.50148 19.0989 5.44892C18.5677 5.34348 17.9037 5.26005 17.1675 5.19491C15.6904 5.06419 13.8392 5 12 5C10.1608 5 8.30956 5.06419 6.83246 5.1949C6.09632 5.26005 5.43231 5.34348 4.9011 5.44891C4.63628 5.50147 4.38443 5.56337 4.16403 5.63863C3.96667 5.70603 3.69746 5.81544 3.47552 6.00694C3.26514 6.18846 3.14612 6.41237 3.07941 6.55976C3.00507 6.724 2.94831 6.90201 2.90314 7.07448C2.81255 7.42043 2.74448 7.83867 2.69272 8.28448C2.58852 9.18195 2.53846 10.299 2.53846 11.409C2.53846 12.5198 2.58859 13.6529 2.69218 14.5835C2.74378 15.047 2.81086 15.4809 2.89786 15.8453C2.97306 16.1603 3.09841 16.5895 3.35221 16.9023C3.58757 17.1925 3.92217 17.324 4.08755 17.3836C4.30223 17.461 4.55045 17.5218 4.80667 17.572C5.32337 17.6733 5.98609 17.7527 6.72664 17.8146C8.2145 17.9389 10.1134 18 12 18C13.8865 18 15.7855 17.9389 17.2733 17.8146C18.0139 17.7527 18.6766 17.6733 19.1933 17.572C19.4495 17.5218 19.6978 17.461 19.9124 17.3836C20.0778 17.324 20.4124 17.1925 20.6478 16.9023C20.9016 16.5895 21.0269 16.1603 21.1021 15.8453C21.1891 15.4809 21.2562 15.047 21.3078 14.5835C21.4114 13.6529 21.4615 12.5198 21.4615 11.409C21.4615 10.299 21.4115 9.18195 21.3073 8.28448C21.2555 7.83868 21.1874 7.42043 21.0969 7.07448C21.0517 6.90201 20.9949 6.72401 20.9206 6.55976C20.8539 6.41236 20.7349 6.18846 20.5245 6.00694Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14.5385 11.5L10.0962 14.3578L10.0962 8.64207L14.5385 11.5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </IconButton>
              <IconButton component={Link} href="https://www.pinterest.com/manitosilk2008/" target="_blank" sx={{ color: "#d7d8d9" }}>
                <svg fill="#ffffff" viewBox="0 0 24 24" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.99 2C6.472 2 2 6.473 2 11.99c0 4.232 2.633 7.85 6.35 9.306-.088-.79-.166-2.006.034-2.868.182-.78 1.172-4.966 1.172-4.966s-.299-.599-.299-1.484c0-1.388.805-2.425 1.808-2.425.853 0 1.264.64 1.264 1.407 0 .858-.546 2.139-.827 3.327-.235.994.499 1.805 1.479 1.805 1.775 0 3.141-1.872 3.141-4.575 0-2.392-1.719-4.064-4.173-4.064-2.843 0-4.512 2.132-4.512 4.335 0 .858.331 1.779.744 2.28a.3.3 0 0 1 .069.286c-.076.315-.245.994-.277 1.133-.044.183-.145.222-.335.134-1.247-.581-2.027-2.405-2.027-3.871 0-3.151 2.289-6.045 6.601-6.045 3.466 0 6.159 2.469 6.159 5.77 0 3.444-2.171 6.213-5.184 6.213-1.013 0-1.964-.525-2.29-1.146l-.623 2.374c-.225.868-.834 1.956-1.241 2.62a10 10 0 0 0 2.958.445c5.517 0 9.99-4.473 9.99-9.99S17.507 2 11.99 2"></path></g></svg>
              </IconButton>
            </Stack>
            <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
              {methods.map((method, index) => (
                <Image key={index} src={method} alt="payment method" width={28} height={28} />
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography sx={{ fontSize: 13, lineHeight: 1.65, textAlign: "center", mt: 6, color: "white" }} variant="subtitle1">
          © YAMOPAD TRADING LTD. 2008-2026 | {t.copyright[locale]}
        </Typography>
      </Box>
    </Box>
  );
}
