import { Stack, Typography } from "@mui/material";
import { sanitizeRichTextHtml } from "@/lib/richText";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const subtitleHtml = subtitle ? sanitizeRichTextHtml(subtitle) : "";

  return (
    <Stack spacing={1} sx={{ mb: 3 }}>
      <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 42 } }}>
        {title}
      </Typography>
      {subtitle ? <Typography color="text.secondary" dangerouslySetInnerHTML={{ __html: subtitleHtml }} /> : null}
    </Stack>
  );
}
