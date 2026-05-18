'use client'

import { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Heart, X } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/domain";

export default function CardItem({
	href,
	coverImage,
	title,
	isNew,
	wishlistProductSlug,
	locale = "en",
}: {
	href: string;
	coverImage: string | StaticImageData;
	title: string;
	isNew?: boolean;
	wishlistProductSlug?: string;
	locale?: Locale;
}) {
	const [feedback, setFeedback] = useState("");
	const [showLoginModal, setShowLoginModal] = useState(false);
	const copy = {
		saved: locale === "en" ? "Saved to wishlist" : "Đã lưu vào danh sách yêu thích",
		error: locale === "en" ? "Unable to save" : "Không thể lưu",
		newLabel: locale === "en" ? "NEW" : "MỚI",
		close: locale === "en" ? "Close login prompt" : "Đóng thông báo đăng nhập",
		loginTitle: locale === "en" ? "Please Log In" : "Vui Lòng Đăng Nhập",
		loginDescription: locale === "en" ? "You need to log in to view your wishlist." : "Bạn cần đăng nhập để xem danh sách yêu thích.",
		login: locale === "en" ? "Log In" : "Đăng Nhập",
		signupLead: locale === "en" ? "Do not have an account yet?" : "Bạn chưa có tài khoản?",
		signup: locale === "en" ? "Sign up" : "Đăng ký",
		signupTail: locale === "en" ? "now and enjoy 5% OFF for your first order." : "ngay để nhận ưu đãi 5% cho đơn hàng đầu tiên.",
	};

	const handleWishlist = async (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		event.preventDefault();

		if (!wishlistProductSlug) {
			return;
		}

		const response = await fetch("/api/wishlist", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ productSlug: wishlistProductSlug }),
		});

		if (response.status === 401) {
			setShowLoginModal(true);
			return;
		}

		setFeedback(response.ok ? copy.saved : copy.error);
		window.setTimeout(() => setFeedback(""), 1800);
	};

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
					pointerEvents: "auto",
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
						fontWeight: 900,
						width: "fit-content",
						px: 2,
						py: 0.5,
						fontSize: 14,
						boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
					}}
				>
					{copy.newLabel}
				</Box>
			}
			{wishlistProductSlug ? (
				<>
					<Box
						onClick={handleWishlist}
						className="favourite-box"
						top={10}
						right={10}
						position="absolute"
						sx={{
							width: { xs: 0, md: 52 },
							height: { xs: 0, md: 52 },
							backgroundColor: "#fff",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
							zIndex: 2,
						}}
					>
						<Heart size={22} />
					</Box>
					<Box
						onClick={handleWishlist}
						top={10}
						right={10}
						position="absolute"
						sx={{
							width: { xs: 52, md: 0 },
							height: { xs: 52, md: 0 },
							backgroundColor: "#fff",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
							borderRadius: '50%',
							zIndex: 2,
						}}
					>
						<Heart size={22} />
					</Box>
					{feedback ? (
						<Box
							position="absolute"
							left={10}
							bottom={10}
							bgcolor="rgba(255,255,255,0.92)"
							px={1.25}
							py={0.75}
						>
							<Typography fontSize={12} fontWeight={700}>{feedback}</Typography>
						</Box>
					) : null}
				</>
			) : null}
			<Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
				<Box
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();
					}}
					sx={{
						position: "fixed",
						inset: 0,
						bgcolor: "rgba(0,0,0,0.68)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 20,
					}}
				>
					<Button
						aria-label={copy.close}
						onClick={() => setShowLoginModal(false)}
						sx={{ position: "fixed", top: 16, right: 16, color: "#fff", minWidth: 40 }}
					>
						<X size={30} />
					</Button>
					<Box
						bgcolor="#fff"
						width={{ xs: "calc(100vw - 32px)", sm: 450 }}
						px={{ xs: 3, sm: 6 }}
						py={5}
						textAlign="center"
					>
						<Typography fontSize={29} fontWeight={800} mb={2}>
							{copy.loginTitle}
						</Typography>
						<Typography color="#777" fontSize={20} mb={3}>
							{copy.loginDescription}
						</Typography>
						<Button
							component={Link}
							href={`/${locale}/my-account/login`}
							sx={{ bgcolor: "#333", color: "#fff", borderRadius: 0, width: "100%", height: 47, mb: 3, fontWeight: 800, "&:hover": { bgcolor: "#111" } }}
						>
							{copy.login}
						</Button>
						<Typography color="#777" fontSize={17}>
							{copy.signupLead}{" "}
							<Link href={`/${locale}/my-account/register`} style={{ color: "#333", fontWeight: 800 }}>
								{copy.signup}
							</Link>{" "}
							{copy.signupTail}
						</Typography>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
}
