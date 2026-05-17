"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Button, Divider, Grid2, Stack, TextField, Typography } from "@mui/material";
import { CreditCard, Star, X } from "lucide-react";
import type { Locale } from "@/types/domain";
import { useStorefront, type CartItem } from "@/components/storefront/StorefrontContext";

function QuantityControl({ item }: { item: CartItem }) {
  const { updateQuantity } = useStorefront();

  return (
    <Box display="inline-grid" gridTemplateColumns="28px 38px 28px" border="1px solid #dedede">
      <Button sx={{ minWidth: 0, p: 0, color: "#000" }} onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}>-</Button>
      <Box display="flex" alignItems="center" justifyContent="center" borderLeft="1px solid #dedede" borderRight="1px solid #dedede">
        <Typography fontSize={16}>{item.quantity}</Typography>
      </Box>
      <Button sx={{ minWidth: 0, p: 0, color: "#000" }} onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}>+</Button>
    </Box>
  );
}

function productOptionText(item: CartItem) {
  const values = Object.values(item.selectedOptions ?? {}).filter(Boolean);
  return values.length ? ` - ${values.join(", ")}` : "";
}

export function CartDrawerContent({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const { cartItems, removeFromCart, subtotal, formatPrice } = useStorefront();

  return (
    <Box width={{ xs: "100vw", sm: 428 }} height="100%" display="flex" flexDirection="column" bgcolor="#fff">
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2.5} py={3}>
        <Typography fontSize={28} fontWeight={800}>Shopping Cart</Typography>
        <Button onClick={onClose} sx={{ color: "#111", minWidth: 0, gap: 1 }}>
          <X size={22} />
          <Typography fontSize={21} fontWeight={800}>Close</Typography>
        </Button>
      </Box>
      <Divider />
      <Stack spacing={2.5} px={2.5} py={2.5} flex={1} overflow="auto">
        {cartItems.length === 0 ? (
          <Typography color="#666" fontSize={18}>Your cart is currently empty.</Typography>
        ) : cartItems.map((item) => (
          <Box key={item.product.slug} display="grid" gridTemplateColumns="82px 1fr auto" gap={2}>
            <Box position="relative" width={82} height={122} bgcolor="#eee">
              <Image src={item.product.images[0] ?? "/logo.svg"} alt={item.product.title[locale]} fill style={{ objectFit: "cover" }} />
            </Box>
            <Box>
              <Typography fontWeight={800} fontSize={17} lineHeight={1.35}>
                {item.product.title[locale]}{productOptionText(item)}
              </Typography>
              <Typography mt={1} fontSize={16}>SKU: {item.product.slug.toUpperCase().slice(0, 13)}</Typography>
              <Typography mt={1} fontSize={16} color="#555">{item.quantity} x {formatPrice(item.product.priceUsd)}</Typography>
            </Box>
            <Button onClick={() => removeFromCart(item.product.slug)} sx={{ color: "#111", minWidth: 24, p: 0, alignSelf: "start" }}>
              <X size={16} />
            </Button>
          </Box>
        ))}
      </Stack>
      <Box borderTop="1px solid #e5e5e5" px={2.5} py={2.5}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
          <Typography fontSize={28} fontWeight={800}>Subtotal:</Typography>
          <Typography fontSize={23}>{formatPrice(subtotal)}</Typography>
        </Box>
        <Stack spacing={1.5}>
          <Button component={Link} href={`/${locale}/cart`} onClick={onClose} sx={{ bgcolor: "#d7d4c8", color: "#111", borderRadius: 0, height: 52, letterSpacing: 7, "&:hover": { bgcolor: "#cac6ba" } }}>
            View Cart
          </Button>
          <Button component={Link} href={`/${locale}/checkout`} onClick={onClose} sx={{ bgcolor: "#d7d4c8", color: "#111", borderRadius: 0, height: 52, letterSpacing: 7, "&:hover": { bgcolor: "#cac6ba" } }}>
            Checkout
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export function CartPageClient({ locale }: { locale: Locale }) {
  const { cartItems, removeFromCart, subtotal, formatPrice } = useStorefront();

  return (
    <Box bgcolor="#f5f5f5" pt={14} minHeight="100vh">
      <Box height={96} sx={{ backgroundImage: "url('/assets/cart-banner.jpg')", bgcolor: "#666", backgroundSize: "cover" }} display="flex" alignItems="center" justifyContent="center">
        <Typography color="#fff" fontSize={28} fontWeight={800}>Shopping Cart <span style={{ opacity: 0.65 }}> → Checkout → Order Complete</span></Typography>
      </Box>
      <Grid2 container spacing={4} px={{ xs: 2, md: 8 }} py={7}>
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <Stack spacing={4} mb={5}>
            <Box display="flex" gap={2.5} alignItems="center"><Star size={38} /><Typography fontSize={21} fontWeight={800}>Complete your order and earn {Math.round(subtotal)} points & rewards for a discount on a future purchase</Typography></Box>
            <Box display="flex" gap={2.5} alignItems="center"><Star size={38} /><Typography fontSize={21} fontWeight={800}>You have points earned choose your rewards <u>Click Here</u></Typography></Box>
          </Stack>
          <Grid2 container py={2} borderBottom="1px solid #ddd" display={{ xs: "none", md: "flex" }}>
            <Grid2 size={5}><Typography fontWeight={800} fontSize={20} textAlign="center">PRODUCT</Typography></Grid2>
            <Grid2 size={2}><Typography fontWeight={800} fontSize={20}>SKU</Typography></Grid2>
            <Grid2 size={1.5}><Typography fontWeight={800} fontSize={20}>PRICE</Typography></Grid2>
            <Grid2 size={2}><Typography fontWeight={800} fontSize={20}>QUANTITY</Typography></Grid2>
            <Grid2 size={1.5}><Typography fontWeight={800} fontSize={20}>SUBTOTAL</Typography></Grid2>
          </Grid2>
          {cartItems.length === 0 ? <Typography py={6}>Your cart is currently empty.</Typography> : cartItems.map((item) => (
            <Grid2 key={item.product.slug} container alignItems="center" py={2.5} borderBottom="1px solid #ddd" spacing={2}>
              <Grid2 size={{ xs: 1, md: 0.5 }}><Button sx={{ minWidth: 0, color: "#001b33" }} onClick={() => removeFromCart(item.product.slug)}><X size={17} /></Button></Grid2>
              <Grid2 size={{ xs: 4, md: 1 }}><Box position="relative" width={100} height={151} bgcolor="#eee"><Image src={item.product.images[0] ?? "/logo.svg"} alt={item.product.title[locale]} fill style={{ objectFit: "cover" }} /></Box></Grid2>
              <Grid2 size={{ xs: 7, md: 3.5 }}><Typography fontWeight={800}>{item.product.title[locale]}{productOptionText(item)}</Typography></Grid2>
              <Grid2 size={{ xs: 6, md: 2 }}><Typography>{item.product.slug.toUpperCase().slice(0, 13)}</Typography></Grid2>
              <Grid2 size={{ xs: 6, md: 1.5 }}><Typography color="#777">{formatPrice(item.product.priceUsd)}</Typography></Grid2>
              <Grid2 size={{ xs: 6, md: 2 }}><QuantityControl item={item} /></Grid2>
              <Grid2 size={{ xs: 6, md: 1.5 }}><Typography fontSize={20}>{formatPrice(item.product.priceUsd * item.quantity)}</Typography></Grid2>
            </Grid2>
          ))}
          <Box display="flex" justifyContent="space-between" gap={2} mt={5} flexWrap="wrap">
            <Box display="flex" gap={1.5}><TextField placeholder="Coupon code" sx={{ bgcolor: "#fff", width: 286 }} /><Button sx={{ bgcolor: "#d7d4c8", color: "#111", borderRadius: 0, px: 3 }}>Apply Coupon</Button></Box>
            <Button sx={{ bgcolor: "#d7d4c8", color: "#888", borderRadius: 0, px: 4 }}>Update Cart</Button>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <Box border="3px solid #e1e1e1" p={{ xs: 2, md: 4 }}>
            <Typography fontSize={30} fontWeight={800} mb={3}>Cart Totals</Typography>
            {[["Subtotal", formatPrice(subtotal)], ["Shipment", "Free shipping"], ["Taxes", "Taxes calculated at checkout"]].map(([label, value]) => (
              <Box key={label} display="flex" justifyContent="space-between" py={2} borderBottom="1px solid #ddd"><Typography fontWeight={800}>{label}</Typography><Typography>{value}</Typography></Box>
            ))}
            <Box display="flex" justifyContent="space-between" py={2.5}><Typography fontSize={23} fontWeight={800}>Total</Typography><Typography fontSize={30}>{formatPrice(subtotal)}</Typography></Box>
            <Button component={Link} href={`/${locale}/checkout`} fullWidth sx={{ bgcolor: "#d7d4c8", color: "#111", borderRadius: 0, height: 53, mb: 1.5 }}>Proceed to Checkout</Button>
            <Button fullWidth sx={{ bgcolor: "#ffc439", color: "#003087", borderRadius: 1, height: 56, fontSize: 25, fontWeight: 800 }}>PayPal</Button>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export function CheckoutPageClient({ locale }: { locale: Locale }) {
  const { cartItems, subtotal, formatPrice } = useStorefront();

  return (
    <Box bgcolor="#f5f5f5" pt={14} px={{ xs: 2, md: 8 }} py={4} minHeight="100vh">
      <Typography fontWeight={800} mb={4}>Have a coupon? <u>ENTER CODE</u></Typography>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Typography fontSize={28} fontWeight={800} mb={3}>Billing Address</Typography>
          <Grid2 container spacing={3}>
            {["First name *", "Last name *"].map((label) => <Grid2 key={label} size={6}><Typography mb={1}>{label}</Typography><TextField fullWidth defaultValue={label.startsWith("First") ? "Tuan" : "Nguyen"} /></Grid2>)}
            {["Company name (optional)", "Country / Region *", "Street address *", "Apartment, suite, unit, etc. (optional)", "Town / City *", "State *"].map((label) => (
              <Grid2 key={label} size={12}><Typography mb={1}>{label}</Typography><TextField fullWidth placeholder={label.includes("Country") ? "Select a country / region..." : label.includes("State") ? "Select an option..." : ""} /></Grid2>
            ))}
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Box bgcolor="#fff" p={{ xs: 2, md: 5 }}>
            <Typography textAlign="center" fontSize={28} fontWeight={800} mb={3}>Your Order</Typography>
            <Box border="1px solid #f2f2f2" p={2}>
              <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ddd" pb={2}><Typography fontWeight={800}>PRODUCT</Typography><Typography fontWeight={800}>SUBTOTAL</Typography></Box>
              {cartItems.map((item) => (
                <Box key={item.product.slug} display="grid" gridTemplateColumns="28px 74px 1fr auto" gap={1.5} alignItems="center" py={2.5} borderBottom="1px solid #ddd">
                  <X size={15} />
                  <Box position="relative" width={74} height={110} bgcolor="#eee"><Image src={item.product.images[0] ?? "/logo.svg"} alt={item.product.title[locale]} fill style={{ objectFit: "cover" }} /></Box>
                  <Box><Typography>{item.product.title[locale]}{productOptionText(item)}</Typography><QuantityControl item={item} /></Box>
                  <Typography>{formatPrice(item.product.priceUsd * item.quantity)}</Typography>
                </Box>
              ))}
              <Box display="flex" justifyContent="space-between" py={2} borderBottom="1px solid #ddd"><Typography fontWeight={800}>Subtotal</Typography><Typography>{formatPrice(subtotal)}</Typography></Box>
              <Box display="flex" justifyContent="space-between" py={2} borderBottom="1px solid #ddd"><Typography fontWeight={800}>Shipment</Typography><Typography>Free shipping</Typography></Box>
              <Box display="flex" justifyContent="space-between" py={2}><Typography fontSize={22} fontWeight={800}>Total</Typography><Typography fontSize={28}>{formatPrice(subtotal)}</Typography></Box>
            </Box>
            <Stack spacing={2} mt={3}>
              {["Debit & Credit Cards", "Credit / Debit Card", "PayPal"].map((method, index) => <Typography key={method} fontSize={20}>○ {method}{index === 1 ? "  ▬" : ""}</Typography>)}
              <Button sx={{ bgcolor: "#2f3030", color: "#fff", height: 62, borderRadius: 1, fontSize: 22, fontWeight: 800, gap: 1 }}><CreditCard /> Debit or Credit Card</Button>
            </Stack>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
