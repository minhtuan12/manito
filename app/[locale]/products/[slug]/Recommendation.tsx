"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import type { StorefrontProduct } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/types/domain";
import { useStorefront } from "@/components/storefront/StorefrontContext";

const DESKTOP_VISIBLE_ITEMS = 5;

export default function Recommendation({
	locale,
	dictionary,
	recommendationProducts,
}: {
	locale: Locale;
	dictionary: Dictionary;
	recommendationProducts: StorefrontProduct[];
}) {
	const [activePage, setActivePage] = useState(0);
	const { formatPrice } = useStorefront();

	const visibleProducts = recommendationProducts.slice(0, 10);
	const pages = useMemo(() => {
		const result: StorefrontProduct[][] = [];

		for (let index = 0; index < visibleProducts.length; index += DESKTOP_VISIBLE_ITEMS) {
			result.push(visibleProducts.slice(index, index + DESKTOP_VISIBLE_ITEMS));
		}

		return result;
	}, [visibleProducts]);

	return (
		<Box px={{ xs: 2, md: 2 }} pt={{ xs: 8, md: 10 }} pb={{ xs: 10, md: 12 }}>
			<Stack spacing={{ xs: 5, md: 7 }} alignItems="center">
				<Typography
					color="#8d7d69"
					fontSize={{ xs: 32, md: 26 }}
					textAlign="center"
					fontWeight={600}
				>
					{locale === "en" ? "Our Recommendations" : "Gợi Ý Dành Cho Bạn"}
				</Typography>

				<Box width="100%" overflow="hidden">
					<Box
						display="flex"
						flexDirection={{ xs: "column", md: "row" }}
						sx={{
							transform: {
								xs: "none",
								md: `translateX(-${activePage * 100}%)`,
							},
							transition: "transform 420ms ease",
						}}
					>
						{pages.map((page, pageIndex) => (
							<Box
								key={`page-${pageIndex}`}
								minWidth={{ xs: "100%", md: "100%" }}
								display="flex"
								flexWrap={{ xs: "wrap", md: "nowrap" }}
								justifyContent={page.length <= 3 ? 'center' : 'start'}
								gap={{ xs: 3, md: 2.5 }}
								px={{ md: 2 }}
							>
								{page.map((item) => (
									<Box
										key={item._id}
										component={Link}
										href={`/${locale}/products/${item.slug}`}
										sx={{
											textDecoration: "none",
											color: "inherit",
											display: "flex",
											flexDirection: "column",
											gap: 1.5,
											flex: {
												xs: "1 1 100%",
												sm: "1 1 calc(50% - 12px)",
												md: "0 0 calc((100% - 40px) / 5)",
											},
											minWidth: 0,
										}}
									>
										<Box
											position="relative"
											width="100%"
											sx={{
												aspectRatio: "0.78 / 1",
												backgroundColor: "#ece9e3",
												overflow: "hidden",
												"& img": {
													transition: "transform 320ms ease",
												},
												"&:hover img": {
													transform: "scale(1.02)",
												},
											}}
										>
											<Image
												src={item.images?.[0]}
												alt={item.title[locale]}
												fill
												style={{ objectFit: "cover" }}
											/>
										</Box>
										<Stack spacing={0.25} alignItems="center">
											<Typography
												color="#7a7d81"
												textAlign="center"
												fontSize={{ xs: 18, md: 20 }}
												fontWeight={900}
												lineHeight={1.25}
												sx={{
													display: "-webkit-box",
													overflow: "hidden",
													WebkitBoxOrient: "vertical",
													WebkitLineClamp: 2,
													minHeight: { md: 20 },
												}}
											>
												{item.title[locale]}
											</Typography>
											<Typography
												color="#a7a8aa"
												textAlign="center"
												fontSize={{ xs: 17, md: 16 }}
												variant='subtitle1'
											>
												{formatPrice(item.priceUsd)}
											</Typography>
										</Stack>
									</Box>
								))}
							</Box>
						))}
					</Box>
				</Box>

				{pages.length > 1 ? (
					<Box display="flex" alignItems="center" gap={1.25}>
						{pages.map((_, pageIndex) => {
							const isActive = pageIndex === activePage;

							return (
								<Box
									key={`dot-${pageIndex}`}
									component="button"
									type="button"
									aria-label={`${dictionary.common.viewAll} ${pageIndex + 1}`}
									onClick={() => setActivePage(pageIndex)}
									sx={{
										width: 10,
										height: 10,
										borderRadius: "50%",
										border: isActive ? "none" : "1px solid #a7a8aa",
										backgroundColor: isActive ? "#2f2f2f" : "transparent",
										padding: 0,
										cursor: "pointer",
									}}
								/>
							);
						})}
					</Box>
				) : <Box fontSize={20}>
					{locale === 'en' ? 'There`s no recommendations for now' : "Chưa có sản phẩm gợi ý nào cho bạn"}
				</Box>}
			</Stack>
		</Box>
	);
}
