"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2 as Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Locale } from "@/types/domain";

export function RegisterForm({ locale }: { locale: Locale }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "",
    acceptsTerms: false,
    acceptsMarketing: false,
  });

  const copy = {
    title: locale === "en" ? "REGISTER" : "ĐĂNG KÝ",
    login: locale === "en" ? "LOGIN" : "ĐĂNG NHẬP",
    gender: locale === "en" ? "Gender *" : "Danh xưng *",
    select: locale === "en" ? "Please select" : "Vui lòng chọn",
    ms: locale === "en" ? "Ms." : "Cô",
    mrs: locale === "en" ? "Mrs." : "Bà",
    mr: locale === "en" ? "Mr." : "Ông",
    not: locale === "en" ? "Prefer not to say" : "Không muốn tiết lộ",
    firstName: locale === "en" ? "First Name *" : "Tên *",
    lastName: locale === "en" ? "Last Name *" : "Họ *",
    email: locale === "en" ? "Email address *" : "Địa chỉ email *",
    password: locale === "en" ? "Password *" : "Mật khẩu *",
    birthday: locale === "en" ? "Birthday (optional)" : "Ngày sinh (không bắt buộc)",
    reward:
      locale === "en"
        ? "Sign up and receive 5% Off in YAMOPAD's Choices reward!"
        : "Đăng ký và nhận ưu đãi 5% cho YAMOPAD's Choices!",
    termsError: locale === "en" ? "You must accept the terms and conditions" : "Bạn phải đồng ý với các điều khoản và điều kiện",
    createError: locale === "en" ? "Unable to create account" : "Không thể tạo tài khoản",
    termsPrefix:
      locale === "en"
        ? 'By choosing "CREATE ACCOUNT", you confirm that you have read and agreed with our '
        : 'Bằng cách chọn "TẠO TÀI KHOẢN", bạn xác nhận rằng bạn đã đọc và đồng ý với ',
    termsLink: locale === "en" ? "Terms and Conditions" : "Điều Khoản Và Điều Kiện",
    privacyLink: locale === "en" ? "Privacy Policy" : "Chính Sách Bảo Mật",
    termsSuffix:
      locale === "en"
        ? ", and that you want to create your YAMOPAD profile."
        : ", đồng thời muốn tạo hồ sơ YAMOPAD của mình.",
    marketing:
      locale === "en"
        ? "I wish to receive updates about YAMOPAD exclusive products, services and activities, through traditional and digital communication methods."
        : "Tôi muốn nhận thông tin về sản phẩm, dịch vụ và hoạt động đặc quyền của YAMOPAD qua các kênh truyền thông truyền thống và kỹ thuật số.",
    submitting: locale === "en" ? "Registering..." : "Đang đăng ký...",
    submit: locale === "en" ? "Register" : "Đăng ký",
    loginIntro:
      locale === "en"
        ? "A MORE REWARDING WAY TO SHOP: RECEIVE 5% OFF YOUR FIRST YAMOPAD'S CHOICE ORDER EARN 1 POINT ON EVERY $1 YOU SPEND REDEEM POINTS FOR A DISCOUNT"
        : "MUA SẮM XỨNG ĐÁNG HƠN: NHẬN 5% ƯU ĐÃI CHO ĐƠN YAMOPAD'S CHOICE ĐẦU TIÊN TÍCH 1 ĐIỂM CHO MỖI $1 CHI TIÊU ĐỔI ĐIỂM ĐỂ NHẬN ƯU ĐÃI",
    registerHint:
      locale === "en"
        ? "*Registering for this site allows you to access your order status and history. We will only ask you for the information necessary to make the purchase process faster and easier."
        : "*Việc đăng ký tài khoản giúp bạn theo dõi tình trạng đơn hàng và lịch sử mua sắm. Chúng tôi chỉ yêu cầu những thông tin cần thiết để quá trình mua hàng nhanh và thuận tiện hơn.",
  };

  const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.acceptsTerms) {
      setError(copy.termsError);
      return;
    }

    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gender: form.gender || "not",
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        birthday: form.birthday || undefined,
        acceptsMarketing: form.acceptsMarketing,
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(result.message ?? copy.createError);
      return;
    }

    window.location.assign(`/${locale}/my-account`);
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }} sx={{ background: "white", py: 3, px: 5 }}>
        <Typography sx={{ fontSize: 22, mb: 4 }} fontWeight={400}>{copy.title}</Typography>
        <Stack component="form" spacing={3} onSubmit={handleSubmit}>
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField select fullWidth label={copy.gender} value={form.gender} onChange={handleChange("gender")} size="small">
            <MenuItem value="">{copy.select}</MenuItem>
            <MenuItem value="ms">{copy.ms}</MenuItem>
            <MenuItem value="mrs">{copy.mrs}</MenuItem>
            <MenuItem value="mr">{copy.mr}</MenuItem>
            <MenuItem value="not">{copy.not}</MenuItem>
          </TextField>
          <Grid container spacing={1.6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label={copy.firstName} size="small" value={form.firstName} onChange={handleChange("firstName")} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label={copy.lastName} size="small" value={form.lastName} onChange={handleChange("lastName")} />
            </Grid>
          </Grid>
          <TextField fullWidth label={copy.email} type="email" size="small" value={form.email} onChange={handleChange("email")} />
          <TextField fullWidth label={copy.password} type="password" size="small" value={form.password} onChange={handleChange("password")} />
          <TextField
            fullWidth
            type="date"
            label={copy.birthday}
            value={form.birthday}
            onChange={handleChange("birthday")}
            slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: "2026-05-15" } }}
            size="small"
          />
          <Typography sx={{ fontSize: 16 }}>
            {copy.reward}
          </Typography>
          <FormControlLabel
            control={<Checkbox size="small" checked={form.acceptsTerms} onChange={handleChange("acceptsTerms")} />}
            label={
              <Typography sx={{ fontSize: 16, ml: 1 }}>
                {copy.termsPrefix}
                <Link href="/terms" style={{ color: "inherit", textDecoration: "underline" }}>
                  {copy.termsLink}
                </Link>
                ,{" "}
                <Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "underline" }}>
                  {copy.privacyLink}
                </Link>
                {copy.termsSuffix}
              </Typography>
            }
            sx={{ alignItems: "flex-start", m: 0 }}
          />
          <FormControlLabel
            control={<Checkbox size="small" checked={form.acceptsMarketing} onChange={handleChange("acceptsMarketing")} />}
            label={<Typography sx={{ fontSize: 16, ml: 1 }}>{copy.marketing}</Typography>}
            sx={{ alignItems: "flex-start", m: 0 }}
          />
          <Button
            type="submit"
            disabled={loading}
            sx={{
              width: "100%",
              px: 3.5,
              py: 1,
              borderColor: "#2c2c2c",
              background: "#d7d4c8",
              color: "#2c2c2c",
              fontWeight: 400,
              fontSize: 14,
            }}
          >
            {loading ? copy.submitting : copy.submit}
          </Button>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }} px={1} py={3}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography sx={{ fontSize: 22, fontWeight: 600, mb: 2.5 }}>{copy.login}</Typography>
          <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.9, fontSize: 16, color: "#343434", textAlign: "center" }}>
            {copy.loginIntro}
          </Typography>
          <Button sx={{ mt: 2, bgcolor: "#d7d4c8", color: "black", px: 3, py: 1.5 }} component={Link} href={`/${locale}/my-account/login`}>
            <Typography fontWeight={400} fontSize={13}>
              {locale === "en" ? "Login" : "Đăng nhập"}
            </Typography>
          </Button>
          <Typography sx={{ fontSize: 12, mt: 2.5, color: "#555", lineHeight: 1.7, textAlign: "center" }}>
            {copy.registerHint}
          </Typography>
        </Box>
      </Grid>
    </>
  );
}
