"use client";

import Image from "next/image";
import {
	Box,
	Button,
	Grid2 as Grid,
	Grid2,
	Stack,
	Typography,
} from "@mui/material";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Category, Locale, Product } from "@/types/domain";
import type { Dictionary } from "@/lib/dictionaries";
import { useState } from "react";
import { X } from "lucide-react";

export default function ProductDetail({
	locale,
	product,
	category,
	dictionary,
}: {
	locale: Locale;
	product: Product;
	category?: Category;
	dictionary: Dictionary;
}) {
	const [previewImage, setPreviewImage] = useState(product?.image);
	const [selectedSize, setSelectedSize] = useState("");

	return (
		<Grid sx={{ pb: 2, pt: 13, px: 3, background: "#f5f5f5" }}>
			<Box my={5}>
				<Breadcrumb
					items={[
						{
							href: `/${locale}`,
							label: locale === "en" ? "Home" : "Trang chủ",
						},
						{
							href: `/${locale}/category/${product.categorySlug}`,
							label:
								category?.title[locale] ?? product.categorySlug,
						},
						{ label: product.title[locale] },
					]}
				/>
			</Box>
			<Grid container spacing={4}>
				<Grid size={{ xs: 12, md: 5 }}>
					<Box
						sx={{
							position: "relative",
							minHeight: 825,
							width: 520,
						}}
					>
						<Image
							src={previewImage}
							alt={product.title[locale]}
							fill
							style={{ objectFit: "cover" }}
						/>
					</Box>
				</Grid>
				<Grid size={{ xs: 12, md: 7 }}>
					<Stack spacing={2}>
						<Typography
							variant="h2"
							sx={{ fontSize: { xs: 30, md: 28 } }}
							textAlign={"center"}
							color="#7a7d81"
							fontWeight={600}
						>
							{product.title[locale]}
						</Typography>
						<Typography
							variant="subtitle1"
							color="#7a7d81"
							textAlign={"center"}
							fontSize={20}
						>
							${product.priceUsd}
						</Typography>
						<Typography
							color="#7a7d81"
							variant="subtitle1"
							fontSize={14}
						>
							{product.description[locale]}
						</Typography>
						<Typography>{product.details[locale]}</Typography>
						<Typography
							color="black"
							variant="subtitle1"
							fontSize={16}
						>
							{locale === "en" ? "COLOR" : "MÀU SẮC"}:
						</Typography>
						<Grid2 container spacing={3}>
							{product.colors.map((c, index) => (
								<Image
									onClick={() => setPreviewImage(c)}
									alt="Product Colors"
									src={c}
									key={index}
									width={90}
									height={135}
									style={{
										border:
											c === previewImage
												? "2px solid #d7d4c8"
												: "none",
										cursor: "pointer",
										height: "135px",
										width: "90px",
									}}
								/>
							))}
						</Grid2>
						<Typography
							color="black"
							variant="subtitle1"
							fontSize={16}
						>
							{locale === "en" ? "SIZE" : "KÍCH CỠ"}:
						</Typography>
						<Grid2 container spacing={2}>
							{["S", "M", "L"].map((c, index) => (
								<Box
									key={index}
									fontSize={14}
									height={52}
									width={72}
									display={"flex"}
									justifyContent={"center"}
									alignItems={"center"}
									sx={{
										cursor: "pointer",
										"&:hover": {
											background: "#d7d4c8",
										},
										background:
											selectedSize === c
												? "#d7d4c8"
												: "transparent",
									}}
									onClick={() => setSelectedSize(c)}
								>
									{c}
								</Box>
							))}
							{selectedSize && (
								<Box
									color={"#777777"}
									sx={{ cursor: "pointer" }}
									display={"flex"}
									gap={0.5}
									alignItems={"center"}
									onClick={() => {
										setSelectedSize("");
										setPreviewImage(product.image);
									}}
								>
									<X size={14} />
									<Typography
										variant="subtitle1"
										fontSize={12}
									>
										{locale === "en" ? "Clear" : "Xóa"}
									</Typography>
								</Box>
							)}
						</Grid2>
						<Grid2 container spacing={1.5} size={12} height={51}>
							<Grid size={5}>
								<Button
									variant="contained"
									sx={{
										color: "#7A7D81",
										width: "100%",
										height: "100%",
										fontWeight: 500,
										fontSize: 16,
										boxShadow: 'none',
									}}
								>
									{dictionary.common.addToCart}
								</Button>
							</Grid>
							<Grid size={5}>
								<Button
									variant="contained"
									sx={{
										color: "#7A7D81",
										width: "100%",
										height: "100%",
										fontWeight: 500,
										fontSize: 16,
										boxShadow: 'none',
									}}
								>
									{locale === "en" ? "BUY NOW" : "MUA NGAY"}
								</Button>
							</Grid>
						</Grid2>
					</Stack>
				</Grid>
			</Grid>
		</Grid>
	);
}
