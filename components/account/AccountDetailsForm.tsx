"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid2 as Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { AuthenticatedUser } from "@/types/account";

export function AccountDetailsForm({
  initialUser,
  dictionary,
}: {
  initialUser: AuthenticatedUser;
  dictionary: Record<string, string>;
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: initialUser.firstName,
    lastName: initialUser.lastName,
    displayName: initialUser.displayName,
    gender: initialUser.gender,
    email: initialUser.email,
    birthday: initialUser.birthday,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const response = await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(result.message ?? dictionary.failed);
      return;
    }

    setSuccess(dictionary.saved);
    setForm((current) => ({
      ...current,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }));
  };

  return (
    <Stack component="form" spacing={3} onSubmit={handleSubmit}>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {success ? <Alert severity="success">{success}</Alert> : null}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label={`${dictionary.firstName} *`} value={form.firstName} onChange={handleChange("firstName")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label={`${dictionary.lastName} *`} value={form.lastName} onChange={handleChange("lastName")} />
        </Grid>
      </Grid>
      <TextField fullWidth label={`${dictionary.displayName} *`} value={form.displayName} onChange={handleChange("displayName")} />
      <Typography fontStyle="italic" mt={-2}>
        {dictionary.displayNameHelp}
      </Typography>
      <TextField select fullWidth label={`${dictionary.gender} *`} value={form.gender} onChange={handleChange("gender")}>
        <MenuItem value="ms">{dictionary.genderMs}</MenuItem>
        <MenuItem value="mrs">{dictionary.genderMrs}</MenuItem>
        <MenuItem value="mr">{dictionary.genderMr}</MenuItem>
        <MenuItem value="not">{dictionary.genderNot}</MenuItem>
      </TextField>
      <TextField fullWidth label={`${dictionary.email} *`} value={form.email} onChange={handleChange("email")} />
      <Box border="1px solid #ddd7cd" px={3} py={3}>
        <Stack spacing={2.5}>
          <Typography fontSize={20} fontWeight={700} textTransform="uppercase">{dictionary.passwordChange}</Typography>
          <TextField fullWidth type="password" label={dictionary.currentPassword} value={form.currentPassword} onChange={handleChange("currentPassword")} />
          <TextField fullWidth type="password" label={dictionary.newPassword} value={form.newPassword} onChange={handleChange("newPassword")} />
          <TextField fullWidth type="password" label={dictionary.confirmNewPassword} value={form.confirmNewPassword} onChange={handleChange("confirmNewPassword")} />
        </Stack>
      </Box>
      <TextField
        fullWidth
        type="date"
        label={dictionary.birthday}
        value={form.birthday}
        onChange={handleChange("birthday")}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Box>
        <Button type="submit" disabled={loading} sx={{ bgcolor: "#d7d4c8", color: "#111111", px: 3.5, py: 1.2 }}>
          {loading ? dictionary.saving : dictionary.save}
        </Button>
      </Box>
    </Stack>
  );
}
