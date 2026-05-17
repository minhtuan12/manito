"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { PaymentMethod } from "@/types/account";

export function PaymentMethodsManager({
  initialItems,
  dictionary,
}: {
  initialItems: PaymentMethod[];
  dictionary: Record<string, string>;
}) {
  const [items, setItems] = useState(initialItems);
  const [showForm, setShowForm] = useState(items.length === 0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    cardholderName: "",
    brand: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    isDefault: items.length === 0,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/account/payment-methods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(result.message ?? dictionary.failedAdd);
      return;
    }

    setItems((current) => [...current, result.paymentMethod]);
    setShowForm(false);
    setForm({
      cardholderName: "",
      brand: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      isDefault: false,
    });
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/account/payment-methods/${id}`, { method: "DELETE" });
    const result = await response.json();

    if (!response.ok) {
      setError(result.message ?? dictionary.failedRemove);
      return;
    }

    setItems(result.items);
  };

  const handleSetDefault = async (id: string) => {
    const response = await fetch(`/api/account/payment-methods/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDefault: true }),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.message ?? dictionary.failedUpdate);
      return;
    }

    setItems((current) =>
      current.map((item) => ({
        ...item,
        isDefault: item.id === result.paymentMethod.id,
      })),
    );
  };

  return (
    <Stack spacing={3}>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {items.length === 0 ? (
        <Alert sx={{ bgcolor: "#de7b4d", color: "white", "& .MuiAlert-icon": { color: "white" } }} severity="info">
          {dictionary.empty}
        </Alert>
      ) : (
        <Stack spacing={2}>
          {items.map((method) => (
            <Box key={method.id} border="1px solid #ddd7cd" px={3} py={2.5}>
              <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography fontSize={18} fontWeight={700}>
                    {method.brand.toUpperCase()} {dictionary.endingIn} {method.last4}
                  </Typography>
                  <Typography color="#666" mt={0.75}>
                    {method.cardholderName} • {dictionary.expires} {method.expiryMonth}/{method.expiryYear}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1.5}>
                  {!method.isDefault ? (
                    <Button onClick={() => handleSetDefault(method.id)} sx={{ color: "#111111" }}>
                      {dictionary.setDefault}
                    </Button>
                  ) : (
                    <Typography color="#8d7d69" fontWeight={700}>{dictionary.default}</Typography>
                  )}
                  <Button onClick={() => handleDelete(method.id)} sx={{ color: "#111111" }}>
                    {dictionary.remove}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
      <Box>
        <Button sx={{ bgcolor: "#d7d4c8", color: "#111111", px: 2.5, py: 1.2 }} onClick={() => setShowForm((current) => !current)}>
          {showForm ? dictionary.hideForm : dictionary.addMethod}
        </Button>
      </Box>
      {showForm ? (
        <Box component="form" onSubmit={handleSubmit} border="1px solid #ddd7cd" px={3} py={3}>
          <Stack spacing={2.5}>
            <Typography fontSize={22} fontWeight={700}>{dictionary.add}</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label={dictionary.cardholderName} value={form.cardholderName} onChange={(event) => setForm((current) => ({ ...current, cardholderName: event.target.value }))} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label={dictionary.brand} value={form.brand} onChange={(event) => setForm((current) => ({ ...current, brand: event.target.value }))} />
              </Grid>
              <Grid size={12}>
                <TextField fullWidth label={dictionary.cardNumber} value={form.cardNumber} onChange={(event) => setForm((current) => ({ ...current, cardNumber: event.target.value }))} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label={dictionary.expiryMonth} value={form.expiryMonth} onChange={(event) => setForm((current) => ({ ...current, expiryMonth: event.target.value }))} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label={dictionary.expiryYear} value={form.expiryYear} onChange={(event) => setForm((current) => ({ ...current, expiryYear: event.target.value }))} />
              </Grid>
            </Grid>
            <Divider />
            <Box>
              <Button type="submit" disabled={loading} sx={{ bgcolor: "#111111", color: "white", px: 3.5, py: 1.2 }}>
                {loading ? dictionary.saving : dictionary.save}
              </Button>
            </Box>
          </Stack>
        </Box>
      ) : null}
    </Stack>
  );
}
