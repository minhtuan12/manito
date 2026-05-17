"use client";

import { useTranslation } from "@/lib/useTranslation";
import { Box, Grid2, Typography } from "@mui/material";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const sortBy = [
	"popular",
	"newest",
	"priceAsc",
	"priceDesc",
	"nameAsc",
	"nameDesc",
];

export default function Filter() {
	const [openFilter, setOpenFilter] = useState(false);
	const { t } = useTranslation();

	return (
		<>
			<Grid2
				alignItems={"center"}
				gap={0.5}
				display={"flex"}
				sx={{ cursor: "pointer" }}
				onClick={() => setOpenFilter(!openFilter)}
			>
				<SlidersHorizontal size={16} />
				<Typography fontWeight={800} fontSize={26}>{t('filter.common')}</Typography>
			</Grid2>
			<Grid2
				sx={{
					background: "#fff",
					overflow: "hidden",
					transform: openFilter ? "translateY(0)" : "translateY(-8px)",
					opacity: openFilter ? 1 : 0,
					maxHeight: openFilter ? "480px" : "0px",
					visibility: openFilter ? "visible" : "hidden",
					pointerEvents: openFilter ? "auto" : "none",
					transition:
						"transform 280ms ease, opacity 280ms ease, max-height 280ms ease, visibility 280ms ease",
				}}
				py={3.5}
				px={3.5}
				mt={3}
				mb={{ xs: 4, xl: 0 }}
				display={"flex"}
				flexDirection={{ xs: 'column', md: 'row' }}
				width={"100%"}
				height={'auto'}
				justifyContent={"start"}
				gap={4}
			>
				<Box display={"flex"} flexDirection={"column"} gap={2} minWidth={1 / 3}>
					<Typography
						sx={{ textTransform: "uppercase" }}
						fontWeight={800}
						fontSize={20}
					>
						{t("filter.sortBy")}
					</Typography>
					<Box display={"flex"} flexDirection={"column"} gap={1}>
						{sortBy.map((s) => (
							<Typography
								fontSize={18}
								key={s}
								variant="subtitle1"
								sx={{ textTransform: "capitalize", cursor: 'pointer' }}
							>
								{t(`filter.${s}`)}
							</Typography>
						))}
					</Box>
				</Box>
				<Box display={"flex"} flexDirection={"column"} gap={2} minWidth={1 / 3}>
					<Typography
						sx={{ textTransform: "uppercase" }}
						fontWeight={800}
						fontSize={20}
					>
						{t("filter.color")}
					</Typography>
				</Box>
				<Box display={"flex"} flexDirection={"column"} gap={2} minWidth={1 / 3}>
					<Typography
						sx={{ textTransform: "uppercase" }}
						fontWeight={800}
						fontSize={20}
					>
						{t("filter.size")}
					</Typography>
				</Box>
			</Grid2>
		</>
	);
}
