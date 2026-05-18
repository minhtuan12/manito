"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Locale } from "@/types/domain";

export function LoginForm({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const copy = {
    title: locale === "en" ? "Login" : "Đăng nhập",
    register: locale === "en" ? "Register" : "Đăng ký",
    identifier: locale === "en" ? "Username or email address *" : "Tên đăng nhập hoặc email *",
    password: locale === "en" ? "Password *" : "Mật khẩu *",
    loading: locale === "en" ? "Loading..." : "Đang tải...",
    submit: locale === "en" ? "Log in" : "Đăng nhập",
    forgot: locale === "en" ? "Lost your password?" : "Quên mật khẩu?",
    remember: locale === "en" ? "Remember me" : "Nhớ tài khoản",
    registerIntro:
      locale === "en"
        ? "A MORE REWARDING WAY TO SHOP:\n\nRECEIVE 5% OFF YOUR FIRST YAMOPAD'S CHOICE ORDER\n\nEARN 1 POINT ON EVERY $1 YOU SPEND\n\nREDEEM POINTS FOR A DISCOUNT"
        : "MUA SẮM XỨNG ĐÁNG HƠN:\n\nNHẬN 5% ƯU ĐÃI CHO ĐƠN YAMOPAD'S CHOICE ĐẦU TIÊN\n\nTÍCH 1 ĐIỂM CHO MỖI $1 CHI TIÊU\n\nĐỔI ĐIỂM ĐỂ NHẬN ƯU ĐÃI",
    registerHint:
      locale === "en"
        ? "*Registering for this site allows you to access your order status and history. We will only ask you for the information necessary to make the purchase process faster and easier."
        : "*Việc đăng ký tài khoản giúp bạn theo dõi tình trạng đơn hàng và lịch sử mua sắm. Chúng tôi chỉ yêu cầu những thông tin cần thiết để quá trình mua hàng nhanh và thuận tiện hơn.",
    errorFallback: locale === "en" ? "Unable to login" : "Không thể đăng nhập",
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(result.message ?? copy.errorFallback);
      return;
    }

    router.push(`/${locale}/my-account`);
    router.refresh();
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography sx={{ fontSize: 36, mb: 2.5 }}>{copy.title}</Typography>
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField fullWidth label={copy.identifier} size="small" value={identifier} onChange={(event) => setIdentifier(event.target.value)} />
          <TextField fullWidth type="password" label={copy.password} size="small" value={password} onChange={(event) => setPassword(event.target.value)} />
          <Button
            type="submit"
            variant="outlined"
            disabled={loading}
            sx={{
              width: "fit-content",
              px: 3,
              py: 1,
              borderColor: "#2c2c2c",
              color: "#2c2c2c",
            }}
          >
            {loading ? copy.loading : copy.submit}
          </Button>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" useFlexGap>
            <Link href={`/${locale}/my-account/login`} style={{ color: "#1f1f1f", textDecoration: "underline", fontSize: 14 }}>
              {copy.forgot}
            </Link>
            <FormControlLabel control={<Checkbox size="small" />} label={copy.remember} />
          </Stack>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ borderLeft: { md: "1px solid #d4d4d4" }, pl: { md: 4 }, pt: { xs: 1, md: 7 } }}>
          <Typography sx={{ textAlign: "center", mb: 2, fontSize: 18, color: "#555" }}>
            {locale === "en" ? "Or" : "Hoặc"}
          </Typography>
          <Typography sx={{ fontSize: 36, mb: 2.5 }}>{copy.register}</Typography>
          <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.9, fontSize: 16, color: "#343434" }}>
            {copy.registerIntro}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, bgcolor: "#2d2d2d", "&:hover": { bgcolor: "#1f1f1f" } }}
            component={Link}
            href={`/${locale}/my-account/register`}
          >
            {copy.register}
          </Button>
          <Typography sx={{ fontSize: 12, mt: 2.5, color: "#555", lineHeight: 1.7 }}>
            {copy.registerHint}
          </Typography>
        </Box>
      </Grid>
    </>
  );
}
