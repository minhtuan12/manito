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
      setError(result.message ?? "Unable to login");
      return;
    }

    router.push(`/${locale}/my-account`);
    router.refresh();
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography sx={{ fontSize: 36, mb: 2.5 }}>Login</Typography>
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField fullWidth label="Username or email address *" size="small" value={identifier} onChange={(event) => setIdentifier(event.target.value)} />
          <TextField fullWidth type="password" label="Password *" size="small" value={password} onChange={(event) => setPassword(event.target.value)} />
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
            {loading ? "Loading..." : "Log in"}
          </Button>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" useFlexGap>
            <Link href={`/${locale}/my-account/login`} style={{ color: "#1f1f1f", textDecoration: "underline", fontSize: 14 }}>
              Lost your password?
            </Link>
            <FormControlLabel control={<Checkbox size="small" />} label="Remember me" />
          </Stack>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ borderLeft: { md: "1px solid #d4d4d4" }, pl: { md: 4 }, pt: { xs: 1, md: 7 } }}>
          <Typography sx={{ textAlign: "center", mb: 2, fontSize: 18, color: "#555" }}>Or</Typography>
          <Typography sx={{ fontSize: 36, mb: 2.5 }}>Register</Typography>
          <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.9, fontSize: 16, color: "#343434" }}>
            {`A MORE REWARDING WAY TO SHOP:\n\nRECEIVE 5% OFF YOUR FIRST YAMOPAD'S CHOICE ORDER\n\nEARN 1 POINT ON EVERY $1 YOU SPEND\n\nREDEEM POINTS FOR A DISCOUNT`}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, bgcolor: "#2d2d2d", "&:hover": { bgcolor: "#1f1f1f" } }}
            component={Link}
            href={`/${locale}/my-account/register`}
          >
            Register
          </Button>
          <Typography sx={{ fontSize: 12, mt: 2.5, color: "#555", lineHeight: 1.7 }}>
            *Registering for this site allows you to access your order status and history. We will only
            ask you for the information necessary to make the purchase process faster and easier.
          </Typography>
        </Box>
      </Grid>
    </>
  );
}
