import Link from "next/link";
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid2 as Grid,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Banner from '@/assets/images/TQ8xPxCpMNyptMB个人中心.webp';
import Image from "next/image";
import { ensureLocale } from "@/lib/i18n";

type RegisterPageProps = {
	params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: RegisterPageProps) {
	const { locale: localeParam } = await params;
	const locale = ensureLocale(localeParam);

	return (
		<>
			<Grid size={{ xs: 12, md: 4 }}>
				<Typography sx={{ fontSize: 36, mb: 2.5 }}>Login</Typography>
				<Stack component="form" spacing={2}>
					<TextField fullWidth label="Username or email address *" size="small" />
					<TextField fullWidth type="password" label="Password *" size="small" />
					<Button
						variant="outlined"
						sx={{
							width: "fit-content",
							px: 3,
							py: 1,
							borderColor: "#2c2c2c",
							color: "#2c2c2c",
						}}
					>
						Log in
					</Button>
					<Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" useFlexGap>
						<Link href="/my-account/lost-password" style={{ color: "#1f1f1f", textDecoration: "underline", fontSize: 14 }}>
							Lost your password?
						</Link>
						<FormControlLabel control={<Checkbox size="small" />} label="Remember me" />
					</Stack>
				</Stack>
			</Grid>

			<Grid size={{ xs: 12, md: 4 }}>
				<Box sx={{ borderLeft: { md: "1px solid #d4d4d4" }, pl: { md: 4 }, pt: { xs: 1, md: 7 } }}>
					<Typography sx={{ textAlign: "center", mb: 2, fontSize: 18, color: "#555" }}>Or</Typography>
					<Typography sx={{ fontSize: 36, mb: 2.5 }}>Login</Typography>
					<Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.9, fontSize: 16, color: "#343434" }}>
						{`A MORE REWARDING WAY TO SHOP:\n\nRECEIVE 5% OFF YOUR FIRST YAMOPAD' S CHOICE ORDER\n\nEARN 1 POINT ON EVERY $1 YOU SPEND\n\nREDEEM POINTS FOR A DISCOUNT`}
					</Typography>
					<Button
						variant="contained"
						sx={{ mt: 3, bgcolor: "#2d2d2d", "&:hover": { bgcolor: "#1f1f1f" } }}
						component={Link}
						href="#"
					>
						Login
					</Button>
					<Typography sx={{ fontSize: 12, mt: 2.5, color: "#555", lineHeight: 1.7 }}>
						*Registering for this site allows you to access your order status and history. We will only
						ask you for the information necessary to make the purchase process faster and easier.
					</Typography>
				</Box>
			</Grid>
		</>
	);
}
