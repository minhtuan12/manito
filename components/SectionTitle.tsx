import { Stack, Typography } from "@mui/material";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <Stack spacing={1} sx={{ mb: 3 }}>
      <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 42 } }}>
        {title}
      </Typography>
      {subtitle ? <Typography color="text.secondary">{subtitle}</Typography> : null}
    </Stack>
  );
}
