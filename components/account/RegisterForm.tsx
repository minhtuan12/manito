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
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Locale } from "@/types/domain";

export function RegisterForm({ locale }: { locale: Locale }) {
  const router = useRouter();
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

  const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.acceptsTerms) {
      setError("You must accept the terms and conditions");
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
      setError(result.message ?? "Unable to create account");
      return;
    }

    router.push(`/${locale}/my-account`);
    router.refresh();
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }} sx={{ background: "white", py: 3, px: 5 }}>
        <Typography sx={{ fontSize: 22, mb: 4 }} fontWeight={400}>REGISTER</Typography>
        <Stack component="form" spacing={3} onSubmit={handleSubmit}>
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField select fullWidth label="Gender *" value={form.gender} onChange={handleChange("gender")} size="small">
            <MenuItem value="">Please select</MenuItem>
            <MenuItem value="ms">Ms.</MenuItem>
            <MenuItem value="mrs">Mrs.</MenuItem>
            <MenuItem value="mr">Mr.</MenuItem>
            <MenuItem value="not">Prefer not to say</MenuItem>
          </TextField>
          <Grid container spacing={1.6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="First Name *" size="small" value={form.firstName} onChange={handleChange("firstName")} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Last Name *" size="small" value={form.lastName} onChange={handleChange("lastName")} />
            </Grid>
          </Grid>
          <TextField fullWidth label="Email address *" type="email" size="small" value={form.email} onChange={handleChange("email")} />
          <TextField fullWidth label="Password *" type="password" size="small" value={form.password} onChange={handleChange("password")} />
          <TextField
            fullWidth
            type="date"
            label="Birthday (optional)"
            value={form.birthday}
            onChange={handleChange("birthday")}
            slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: "2026-05-15" } }}
            size="small"
          />
          <Typography sx={{ fontSize: 16 }}>
            Sign up and receive 5% Off in YAMOPAD&apos;s Choices reward!
          </Typography>
          <FormControlLabel
            control={<Checkbox size="small" checked={form.acceptsTerms} onChange={handleChange("acceptsTerms")} />}
            label={
              <Typography sx={{ fontSize: 16, ml: 1 }}>
                By choosing "CREATE ACCOUNT", you confirm that you have read and agreed with our{" "}
                <Link href="/terms" style={{ color: "inherit", textDecoration: "underline" }}>
                  Terms and Conditions
                </Link>
                ,{" "}
                <Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "underline" }}>
                  Privacy Policy
                </Link>
                , and that you want to create your YAMOPAD profile.
              </Typography>
            }
            sx={{ alignItems: "flex-start", m: 0 }}
          />
          <FormControlLabel
            control={<Checkbox size="small" checked={form.acceptsMarketing} onChange={handleChange("acceptsMarketing")} />}
            label={
              <Typography sx={{ fontSize: 16, ml: 1 }}>
                I wish to receive updates about YAMOPAD exclusive products, services and activities,
                through traditional and digital communication methods.
              </Typography>
            }
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
            {loading ? "Registering..." : "Register"}
          </Button>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }} px={1} py={3}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
          <Typography sx={{ fontSize: 22, fontWeight: 600, mb: 2.5 }}>LOGIN</Typography>
          <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.9, fontSize: 16, color: "#343434", textAlign: "center" }}>
            A MORE REWARDING WAY TO SHOP: RECEIVE 5% OFF YOUR FIRST YAMOPAD'S CHOICE ORDER EARN 1 POINT ON EVERY $1 YOU SPEND REDEEM POINTS FOR A DISCOUNT
          </Typography>
          <Button
            sx={{ mt: 2, bgcolor: "#d7d4c8", color: "black", px: 3, py: 1.5 }}
            component={Link}
            href={`/${locale}/my-account/login`}
          >
            <Typography fontWeight={400} fontSize={13}>
              Login
            </Typography>
          </Button>
          <Typography sx={{ fontSize: 12, mt: 2.5, color: "#555", lineHeight: 1.7, textAlign: "center" }}>
            *Registering for this site allows you to access your order status and history. We will only
            ask you for the information necessary to make the purchase process faster and easier.
          </Typography>
        </Box>
      </Grid>
    </>
  );
}
