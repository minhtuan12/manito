"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import type { AccountAddress } from "@/types/account";

const countries = ["United States", "Canada", "Vietnam", "Singapore", "Australia"];
const states = ["California", "New York", "Texas", "Florida", "Washington", "Ho Chi Minh City", "Ha Noi"];

export function AddressForm({
  kind,
  initialAddress,
  dictionary,
}: {
  kind: "billing" | "shipping";
  initialAddress: AccountAddress | null;
  dictionary: Record<string, string>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState<AccountAddress>(
    initialAddress ?? {
      kind,
      firstName: "",
      lastName: "",
      companyName: "",
      country: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    },
  );

  const handleChange = (field: keyof AccountAddress) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const response = await fetch(`/api/account/addresses/${kind}`, {
      method: "PUT",
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
    router.refresh();
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit}>
      <Typography fontSize={24} fontWeight={700} textTransform="uppercase">
        {kind === "billing" ? dictionary.billingAddress : dictionary.shippingAddress}
      </Typography>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {success ? <Alert severity="success">{success}</Alert> : null}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label={`${dictionary.firstName} *`} value={form.firstName} onChange={handleChange("firstName")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label={`${dictionary.lastName} *`} value={form.lastName} onChange={handleChange("lastName")} />
        </Grid>
        <Grid size={12}>
          <TextField fullWidth label={dictionary.companyName} value={form.companyName} onChange={handleChange("companyName")} />
        </Grid>
        <Grid size={12}>
          <TextField select fullWidth label={`${dictionary.countryRegion} *`} value={form.country} onChange={handleChange("country")}>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={12}>
          <TextField fullWidth label={`${dictionary.streetAddress} *`} value={form.address1} onChange={handleChange("address1")} />
        </Grid>
        <Grid size={12}>
          <TextField fullWidth label={dictionary.apartment} value={form.address2} onChange={handleChange("address2")} />
        </Grid>
        <Grid size={12}>
          <TextField fullWidth label={`${dictionary.townCity} *`} value={form.city} onChange={handleChange("city")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField select fullWidth label={`${dictionary.state} *`} value={form.state} onChange={handleChange("state")}>
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label={dictionary.postCodeZip} value={form.postalCode} onChange={handleChange("postalCode")} />
        </Grid>
        <Grid size={12}>
          <TextField fullWidth label={dictionary.phone} value={form.phone} onChange={handleChange("phone")} />
        </Grid>
      </Grid>
      <Box>
        <Button type="submit" disabled={loading} sx={{ bgcolor: "#d7d4c8", color: "#111111", px: 3.5, py: 1.25 }}>
          {loading ? dictionary.saving : dictionary.save}
        </Button>
      </Box>
    </Stack>
  );
}
