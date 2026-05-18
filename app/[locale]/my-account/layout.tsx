import Link from "next/link";
import {
	Box,
	Grid2 as Grid,
	Typography,
} from "@mui/material";
import Banner from '@/assets/images/TQ8xPxCpMNyptMB个人中心.webp';
import Image from "next/image";
import { ensureLocale } from "@/lib/i18n";

type RegisterPageProps = {
	params: Promise<{ locale: string }>;
	children: React.ReactNode;
};

export default async function ({ params, children }: RegisterPageProps) {
	const { locale: localeParam } = await params;
	const locale = ensureLocale(localeParam);

	return (
		<Box sx={{ mx: "auto" }}>
			<Box position={'relative'} color={'white'}>
				<Image src={Banner} style={{ width: '100%', height: 'auto' }} alt="Register banner" />
				<Box position={'absolute'} sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
					<Typography fontSize={44} mb={1.5}>{locale === 'en' ? 'My account' : "Tài khoản"}</Typography>
					<Box display={'flex'} alignItems={'center'} gap={1} justifyContent={'center'}>
						<Link href={'/'} style={{ textDecoration: 'none', color: "white" }}>
							<Typography fontSize={11} fontWeight={600}>
								{locale === 'en' ? 'HOME' : "TRANG CHỦ"}
							</Typography>
						</Link>
						/
						<Typography fontSize={11} fontWeight={600}>
							{locale === 'en' ? 'MY ACCOUNT' : "TÀI KHOẢN"}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Grid
				container
				spacing={{ xs: 4, md: 5 }}
				px={8}
				py={4}
				sx={{
					background: "#f5f5f5",
					fontFamily: "var(--font-optima), Arial, Helvetica, sans-serif",
					"&, & *": {
						fontFamily: "var(--font-optima), Arial, Helvetica, sans-serif !important",
					},
				}}
			>
				{children}
			</Grid>
		</Box>
	);
}
