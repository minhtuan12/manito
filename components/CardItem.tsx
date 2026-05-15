'use client'

import { Box } from "@mui/material";
import { Heart } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function CardItem({
	href,
	coverImage,
	title,
	isNew,
}: {
	href: string;
	coverImage: string | StaticImageData;
	title: string;
	isNew: boolean;
}) {
	return (
		<Box
			component={Link}
			href={href}
			sx={{
				textDecoration: "none",
				color: "inherit",
				display: "grid",
				gap: 1,
				overflow: "hidden",
				"& .cover": {
					transition: "transform 350ms ease",
				},
				"& .new-badge": {
					transform: "translateX(0)",
					transition: "transform 280ms ease",
				},
				"& .favourite-box": {
					opacity: 0,
					transform: "translateX(10px)",
					transition: "opacity 260ms ease, transform 260ms ease",
					pointerEvents: "none",
				},
				"&:hover .new-badge": {
					transform: "translateX(3px)",
				},
				"&:hover .favourite-box": {
					opacity: 1,
					transform: "translateX(0)",
				},
			}}
			minHeight={488}
			position={"relative"}
			width={'100%'}
		>
			<Image
				className="cover"
				src={coverImage}
				alt={title}
				fill
				style={{
					height: "100%",
					width: "100%",
					objectFit: "cover",
					transition: "transform 300ms ease",
				}}
			/>
			{
				isNew && <Box
					className="new-badge"
					top={10}
					left={0}
					position={"absolute"}
					sx={{
						background: "#ffffff",
						color: "black",
						fontWeight: 600,
						width: "fit-content",
						px: 2,
						py: 0.5,
						fontSize: 12,
						boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
					}}
				>
					NEW
				</Box>
			}
			<Box
				onClick={(e) => {
					// TODO: Handle favorite action, e.g., toggle favorite state, show toast, etc.
					e.stopPropagation();
					e.preventDefault();
				}}
				className="favourite-box"
				top={10}
				right={10}
				position="absolute"
				sx={{
					width: 52,
					height: 52,
					backgroundColor: "#fff",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
				}}
			>
				<Heart size={22} />
			</Box>
		</Box>
	);
}
