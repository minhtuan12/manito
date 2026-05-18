"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Timeline({ timeline, locale }: any) {
	const [startIdx, setStartIdx] = useState(0);
	const itemsPerView = 3;
	const canSlideLeft = startIdx > 0;
	const canSlideRight = startIdx + itemsPerView < timeline.length;
	const totalDots = timeline.length - itemsPerView + 1;

	return (
		<Box bgcolor={"#c3c3c3"} py={5} px={{ xs: 3, md: 6 }} mt={10}>
			{/* Title */}
			<Typography textAlign={"center"} color="white" fontWeight={600} fontSize={36}>
				{locale === "en" ? "Timeline" : "Dòng thời gian"}
			</Typography>

			{/* Carousel Row */}
			<Box display="flex" alignItems="flex-start" gap={1} mt={2}>
				{/* Left Arrow */}
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ pt: "120px", minWidth: 36 }}
				>
					<button
						onClick={() => setStartIdx((idx) => Math.max(0, idx - 1))}
						disabled={!canSlideLeft}
						style={{
							background: "none",
							border: "none",
							cursor: canSlideLeft ? "pointer" : "default",
							padding: 4,
							color: canSlideLeft ? "#1a1a1a" : "rgba(0,0,0,0.2)",
							display: "flex",
							alignItems: "center",
						}}
						aria-label="Previous"
					>
						<ChevronLeft size={28} strokeWidth={1.5} />
					</button>
				</Box>

				{/* Items */}
				<Box
					sx={{
						flex: 1,
						display: "grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gap: { xs: 2, md: 3 },
						overflow: "hidden",
					}}
				>
					{timeline
						.slice(startIdx, startIdx + itemsPerView)
						.map((t: any, idx: number) => (
							<Box key={t.en} sx={{ display: "flex", flexDirection: "column" }}>
								<Box
									sx={{
										width: "100%",
										position: "relative",
										lineHeight: 0,
										overflow: "hidden",
										"& img": {
											transition: "transform 0.45s ease",
										},
										"&:hover img": {
											transform: "scale(1.03)",
										},
									}}
								>
									<Image
										src={t.image}
										alt={t[locale]}
										width={411}
										height={220}
										style={{
											width: "100%",
											height: "220px",
											objectFit: "contain",
											display: "block",
										}}
									/>
								</Box>

								{/* Description */}
								<Typography
									sx={{
										mt: 1.5,
										ml: 1,
										fontSize: 12,
										fontWeight: 500,
										color: "white",
										lineHeight: 1.65,
									}}
									variant="subtitle1"
								>
									{t[locale]}
								</Typography>
							</Box>
						))}
				</Box>

				{/* Right Arrow */}
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ pt: "120px", minWidth: 36 }}
				>
					<button
						onClick={() =>
							setStartIdx((idx) =>
								Math.min(timeline.length - itemsPerView, idx + 1),
							)
						}
						disabled={!canSlideRight}
						style={{
							background: "none",
							border: "none",
							cursor: canSlideRight ? "pointer" : "default",
							padding: 4,
							color: canSlideRight ? "#1a1a1a" : "rgba(0,0,0,0.2)",
							display: "flex",
							alignItems: "center",
						}}
						aria-label="Next"
					>
						<ChevronRight size={28} strokeWidth={1.5} />
					</button>
				</Box>
			</Box>

			{/* Dot Indicators */}
			<Box display="flex" justifyContent="center" gap={1} mt={3}>
				{Array.from({ length: totalDots }).map((_, i) => (
					<Box
						key={i}
						onClick={() => setStartIdx(i)}
						sx={{
							width: 8,
							height: 8,
							borderRadius: "50%",
							bgcolor: i === startIdx ? "#2a2a2a" : "transparent",
							border: "1.5px solid #2a2a2a",
							cursor: "pointer",
							transition: "background 0.2s ease",
						}}
					/>
				))}
			</Box>
		</Box>
	);
}