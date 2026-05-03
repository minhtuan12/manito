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
import { ensureLocale } from "@/lib/i18n";

type RegisterPageProps = {
	params: Promise<{ locale: string }>;
};

export default async function RegisterPage({ params }: RegisterPageProps) {
	const { locale: localeParam } = await params;
	const locale = ensureLocale(localeParam);

	return (
		<>
			<Grid size={{ xs: 12, md: 6 }} sx={{ background: 'white', py: 3, px: 5 }}>
				<Typography sx={{ fontSize: 22, mb: 4 }} fontWeight={400}>REGISTER</Typography>
				<Stack component="form" spacing={3}>
					<TextField select fullWidth label="Gender *" defaultValue="" size="small">
						<MenuItem value="">Please select</MenuItem>
						<MenuItem value="ms">Ms.</MenuItem>
						<MenuItem value="mrs">Mrs.</MenuItem>
						<MenuItem value="mr">Mr.</MenuItem>
						<MenuItem value="not">Prefer not to say</MenuItem>
					</TextField>

					<Grid container spacing={1.6}>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField fullWidth label="First Name *" size="small" />
						</Grid>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField fullWidth label="Last Name *" size="small" />
						</Grid>
					</Grid>

					<TextField fullWidth label="Email address *" type="email" size="small" />
					<TextField fullWidth label="Password *" type="password" size="small" />

					<TextField
						fullWidth
						type="date"
						label="Birthday (optional)"
						slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: "2026-05-01" } }}
						size="small"
					/>

					<Typography sx={{ fontSize: 16 }}>
						Sign up and receive 5% Off in MANITO&apos;s Choices reward!
					</Typography>

					<FormControlLabel
						control={<Checkbox size="small" />}
						label={
							<Typography sx={{ fontSize: 16, ml: 1 }}>
								By choosing "CREATE ACCOUNT", you confirm that you have read and agreed with our{" "}
								<Link href="/terms" style={{ color: "inherit", textDecoration: "underline" }}>
									Terms and Conditions
								</Link>
								,{" "}
								<Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "underline" }}>
									Privacy Policy
								</Link>
								, and that you want to create your MANITO profile.
							</Typography>
						}
						sx={{ alignItems: "flex-start", m: 0 }}
					/>

					<FormControlLabel
						control={<Checkbox size="small" />}
						label={
							<Typography sx={{ fontSize: 16, ml: 1 }}>
								I wish to receive updates about MANITO exclusive products, services and activities,
								through traditional and digital communication methods.
							</Typography>
						}
						sx={{ alignItems: "flex-start", m: 0 }}
					/>

					<Button
						sx={{
							width: "100%",
							px: 3.5,
							py: 1,
							borderColor: "#2c2c2c",
							background: '#d7d4c8',
							color: "#2c2c2c",
							fontWeight: 400,
							fontSize: 14,
						}}
					>
						Register
					</Button>
				</Stack>
			</Grid>

			<Grid size={{ xs: 12, md: 6 }} px={1} py={3}>
				<Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
					<Typography sx={{ fontSize: 22, fontWeight: 600, mb: 2.5 }}>LOGIN</Typography>
					<Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.9, fontSize: 16, color: "#343434", textAlign: 'center' }}>
						A MORE REWARDING WAY TO SHOP: RECEIVE 5% OFF YOUR FIRST MANITO' S CHOICE ORDER EARN 1 POINT ON EVERY $1 YOU SPEND REDEEM POINTS FOR A DISCOUNT
					</Typography>
					<Button
						sx={{ mt: 2, bgcolor: "#d7d4c8", color: 'black', px: 3, py: 1.5 }}
						component={Link}
						href={`${locale}/my-account/login`}
					>
						<Typography fontWeight={400} fontSize={13}>
							Login
						</Typography>
					</Button>
					<Typography sx={{ fontSize: 12, mt: 2.5, color: "#555", lineHeight: 1.7, textAlign: 'center' }}>
						*Registering for this site allows you to access your order status and history. We will only
						ask you for the information necessary to make the purchase process faster and easier.
					</Typography>
				</Box>
			</Grid >
		</>
	);
}
