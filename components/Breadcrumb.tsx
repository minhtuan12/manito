import Link from "next/link";
import { Grid2, Typography } from "@mui/material";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  mb?: number;
};

export function Breadcrumb({ items, mb = 2 }: BreadcrumbProps) {
  return (
    <Grid2 display="flex" alignItems="center" gap={1} mb={mb}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Grid2 key={`${item.label}-${index}`} display="flex" alignItems="center" gap={1}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                style={{ color: "gray", textDecoration: "none", fontWeight: 400 }}
              >
                {item.label}
              </Link>
            ) : (
              <Typography fontWeight={600}>{item.label}</Typography>
            )}
            {!isLast ? <Typography color="text.secondary">/</Typography> : null}
          </Grid2>
        );
      })}
    </Grid2>
  );
}

