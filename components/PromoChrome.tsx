"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Alert, Box, Button, IconButton, Modal, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { X } from "lucide-react";
import type { Locale } from "@/types/domain";
import SubscribeImage from "@/assets/images/manito-silk-womens-dress.webp";

const bannerStorageKey = "yamopad-promo-banner-dismissed";
const modalStorageKey = "yamopad-subscribe-modal-seen";
const bannerHeight = 46;

export function PromoChrome({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const isHomepage = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const copy = useMemo(
    () => ({
      banner:
        locale === "en"
          ? "Orders are processed in 5 business days, with shipping in 7-10 business days."
          : "Đơn hàng được xử lý trong 5 ngày làm việc, thời gian giao hàng từ 7-10 ngày làm việc.",
      title: locale === "en" ? "Welcome to Yamopad" : "Chào Mừng Đến Với Yamopad",
      description:
        locale === "en"
          ? "Subscribe now and receive 5% off your first Yamopad's Choice purchase."
          : "Đăng ký ngay để nhận ưu đãi 5% cho đơn Yamopad's Choice đầu tiên của bạn.",
      placeholder: locale === "en" ? "Email Address" : "Địa Chỉ Email",
      submit: locale === "en" ? "Subscribe" : "Đăng Ký",
      policy:
        locale === "en"
          ? "*I acknowledge that my email address will be processed by YAMOPAD Trading Ltd. in accordance with the Privacy Policy."
          : "*Tôi đồng ý để YAMOPAD Trading Ltd. xử lý địa chỉ email của tôi theo Chính sách Bảo mật.",
      success:
        locale === "en"
          ? "Subscription received successfully."
          : "Đăng ký nhận tin thành công.",
    }),
    [locale],
  );

  useEffect(() => {
    const dismissed = window.localStorage.getItem(bannerStorageKey) === "true";
    setShowBanner(!dismissed);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--promo-banner-offset", showBanner ? `${bannerHeight}px` : "0px");
    return () => root.style.setProperty("--promo-banner-offset", "0px");
  }, [showBanner]);

  useEffect(() => {
    if (!isHomepage) {
      setShowModal(false);
      return;
    }

    const seen = window.sessionStorage.getItem(modalStorageKey) === "true";
    if (!seen) {
      const timer = window.setTimeout(() => setShowModal(true), 300);
      return () => window.clearTimeout(timer);
    }
  }, [isHomepage]);

  const closeBanner = () => {
    window.localStorage.setItem(bannerStorageKey, "true");
    setShowBanner(false);
  };

  const closeModal = () => {
    window.sessionStorage.setItem(modalStorageKey, "true");
    setShowModal(false);
  };

  const handleSubscribe = () => {
    if (!email.trim()) {
      return;
    }

    window.sessionStorage.setItem(modalStorageKey, "true");
    setShowModal(false);
    setToastOpen(true);
    setEmail("");
  };

  return (
    <>
      {showBanner ? <Box sx={{ height: `${bannerHeight}px` }} /> : null}
      {showBanner ? (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1301,
            height: `${bannerHeight}px`,
            bgcolor: "#f4f0de",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 6,
          }}
        >
          <Typography variant="subtitle1" fontSize={{ xs: 13, md: 16 }} textAlign="center" color="#222">
            {copy.banner}
          </Typography>
          <IconButton onClick={closeBanner} sx={{ position: "absolute", right: 10, color: "#222" }}>
            <X size={20} />
          </IconButton>
        </Box>
      ) : null}

      <Modal open={showModal} onClose={closeModal}>
        <Box
          sx={{
            width: { xs: "92vw", md: 990 },
            maxWidth: "100%",
            bgcolor: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "48% 52%" },
          }}
        >
          <Box position="relative" minHeight={{ xs: 240, md: 640 }}>
            <Image src={SubscribeImage} alt="Subscribe" fill style={{ objectFit: "cover" }} />
          </Box>
          <Box px={{ xs: 3, md: 7 }} py={{ xs: 5, md: 7 }} position="relative">
            <IconButton onClick={closeModal} sx={{ position: "absolute", top: 10, right: 10, color: "#111" }}>
              <X size={22} />
            </IconButton>
            <Stack spacing={4.5} mt={{ xs: 2, md: 8 }}>
              <Typography textAlign="center" fontSize={{ xs: 34, md: 46 }} color="#1f1f1f">
                {copy.title}
              </Typography>
              <Typography variant="subtitle1" textAlign="center" fontSize={{ xs: 18, md: 22 }} color="#3f3a32" lineHeight={1.7}>
                {copy.description}
              </Typography>
              <TextField value={email} onChange={(event) => setEmail(event.target.value)} placeholder={copy.placeholder} fullWidth />
              <Button onClick={handleSubscribe} sx={{ bgcolor: "#d7d4c8", color: "#111", borderRadius: 0, py: 1.8, "&:hover": { bgcolor: "#cac6ba" } }}>
                {copy.submit}
              </Button>
              <Typography variant="subtitle1" fontSize={13} lineHeight={1.9} color="#555">
                {copy.policy}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Modal>

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success" variant="filled" onClose={() => setToastOpen(false)}>
          {copy.success}
        </Alert>
      </Snackbar>
    </>
  );
}
