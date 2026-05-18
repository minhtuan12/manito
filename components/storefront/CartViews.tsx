"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CreditCard, Star, X } from "lucide-react";
import type { Locale } from "@/types/domain";
import { useStorefront, type CartItem } from "@/components/storefront/StorefrontContext";

function getCopy(locale: Locale, subtotal: number) {
  return {
    shoppingCart: locale === "en" ? "Shopping Cart" : "Giỏ Hàng",
    close: locale === "en" ? "Close" : "Đóng",
    empty: locale === "en" ? "Your cart is currently empty." : "Giỏ hàng của bạn hiện đang trống.",
    sku: locale === "en" ? "SKU" : "Mã",
    subtotal: locale === "en" ? "Subtotal" : "Tạm tính",
    viewCart: locale === "en" ? "View Cart" : "Xem Giỏ Hàng",
    checkout: locale === "en" ? "Checkout" : "Thanh Toán",
    orderComplete: locale === "en" ? "Order Complete" : "Hoàn Tất Đơn Hàng",
    earn:
      locale === "en"
        ? `Complete your order and earn ${Math.round(subtotal)} points & rewards for a discount on a future purchase`
        : `Hoàn tất đơn hàng để nhận ${Math.round(subtotal)} điểm thưởng cho lần mua tiếp theo`,
    rewards:
      locale === "en"
        ? "You have points earned choose your rewards Click Here"
        : "Bạn đã có điểm tích lũy, hãy chọn phần thưởng tại đây",
    product: locale === "en" ? "PRODUCT" : "SẢN PHẨM",
    price: locale === "en" ? "PRICE" : "GIÁ",
    quantity: locale === "en" ? "QUANTITY" : "SỐ LƯỢNG",
    coupon: locale === "en" ? "Coupon code" : "Mã giảm giá",
    applyCoupon: locale === "en" ? "Apply Coupon" : "Áp Dụng Mã",
    updateCart: locale === "en" ? "Update Cart" : "Cập Nhật Giỏ Hàng",
    cartTotals: locale === "en" ? "Cart Totals" : "Tổng Giỏ Hàng",
    shipment: locale === "en" ? "Shipment" : "Vận Chuyển",
    freeShipping: locale === "en" ? "Free shipping" : "Miễn phí giao hàng",
    taxes: locale === "en" ? "Taxes" : "Thuế",
    taxesAtCheckout: locale === "en" ? "Taxes calculated at checkout" : "Thuế được tính khi thanh toán",
    total: locale === "en" ? "Total" : "Tổng Cộng",
    proceed: locale === "en" ? "Proceed to Checkout" : "Tiến Hành Thanh Toán",
    haveCoupon: locale === "en" ? "Have a coupon? ENTER CODE" : "Bạn có mã giảm giá? NHẬP MÃ",
    billing: locale === "en" ? "Billing Address" : "Địa Chỉ Thanh Toán",
    yourOrder: locale === "en" ? "Your Order" : "Đơn Hàng Của Bạn",
    methods:
      locale === "en"
        ? ["Debit & Credit Cards", "Credit / Debit Card", "PayPal"]
        : ["Thẻ Ghi Nợ & Tín Dụng", "Thẻ Tín Dụng / Ghi Nợ", "PayPal"],
    payByCard: locale === "en" ? "Debit or Credit Card" : "Thanh Toán Bằng Thẻ",
    firstName: locale === "en" ? "First name *" : "Tên *",
    lastName: locale === "en" ? "Last name *" : "Họ *",
    company: locale === "en" ? "Company name (optional)" : "Tên công ty (không bắt buộc)",
    country: locale === "en" ? "Country / Region *" : "Quốc gia / Khu vực *",
    street: locale === "en" ? "Street address *" : "Địa chỉ *",
    apartment: locale === "en" ? "Apartment, suite, unit, etc. (optional)" : "Căn hộ, suite, đơn vị... (không bắt buộc)",
    city: locale === "en" ? "Town / City *" : "Thành phố *",
    state: locale === "en" ? "State *" : "Tỉnh / Bang *",
    selectCountry: locale === "en" ? "Select a country / region..." : "Chọn quốc gia / khu vực...",
    selectState: locale === "en" ? "Select an option..." : "Chọn một tùy chọn...",
  };
}

function QuantityControl({ item }: { item: CartItem }) {
  const { updateQuantity } = useStorefront();

  return (
    <Box display="inline-grid" gridTemplateColumns="28px 38px 28px" border="1px solid #dedede">
      <Button sx={{ minWidth: 0, p: 0, color: "#000" }} onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}>-</Button>
      <Box display="flex" alignItems="center" justifyContent="center" borderLeft="1px solid #dedede" borderRight="1px solid #dedede">
        <Typography fontSize={16} variant="subtitle1">{item.quantity}</Typography>
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
  const copy = getCopy(locale, subtotal);

  return (
    <Box width={{ xs: "100vw", sm: 428 }} height="100%" display="flex" flexDirection="column" bgcolor="#fff">
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2.5} py={3}>
        <Typography fontSize={28} fontWeight={800}>{copy.shoppingCart}</Typography>
        <Button onClick={onClose} sx={{ color: "#111", minWidth: 0, gap: 1 }}>
          <X size={22} />
          <Typography fontSize={21} fontWeight={800}>{copy.close}</Typography>
        </Button>
      </Box>
      <Divider />
      <Stack spacing={2.5} px={2.5} py={2.5} flex={1} overflow="auto">
        {cartItems.length === 0 ? (
          <Typography color="#666" fontSize={18}>{copy.empty}</Typography>
        ) : cartItems.map((item) => (
          <Box key={item.product.slug} display="grid" gridTemplateColumns="82px 1fr auto" gap={2}>
            <Box position="relative" width={82} height={122} bgcolor="#eee">
              <Image src={item.product.images[0] ?? "/logo.svg"} alt={item.product.title[locale]} fill style={{ objectFit: "cover" }} />
            </Box>
            <Box>
              <Typography fontWeight={800} fontSize={17} lineHeight={1.35}>
                {item.product.title[locale]}{productOptionText(item)}
              </Typography>
              <Typography mt={1} fontSize={16}>{copy.sku}: {item.product.slug.toUpperCase().slice(0, 13)}</Typography>
              <Typography mt={1} fontSize={16} color="#555" variant="subtitle1">{item.quantity} x {formatPrice(item.product.priceUsd)}</Typography>
            </Box>
            <Button onClick={() => removeFromCart(item.product.slug)} sx={{ color: "#111", minWidth: 24, p: 0, alignSelf: "start" }}>
              <X size={16} />
            </Button>
          </Box>
        ))}
      </Stack>
      <Box borderTop="1px solid #e5e5e5" px={2.5} py={2.5}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
          <Typography fontSize={28} fontWeight={800}>{copy.subtotal}:</Typography>
          <Typography fontSize={23} variant="subtitle1">{formatPrice(subtotal)}</Typography>
        </Box>
        <Stack spacing={1.5}>
          <Button component={Link} href={`/${locale}/cart`} onClick={onClose} sx={{ bgcolor: "#d7d4c8", color: "#111", borderRadius: 0, height: 52, letterSpacing: 7, fontWeight: 600, "&:hover": { bgcolor: "#cac6ba" } }}>
            {copy.viewCart}
          </Button>
          <Button component={Link} href={`/${locale}/checkout`} onClick={onClose} sx={{ bgcolor: "#d7d4c8", color: "#111", borderRadius: 0, height: 52, letterSpacing: 7, fontWeight: 600, "&:hover": { bgcolor: "#cac6ba" } }}>
            {copy.checkout}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export function CartPageClient({ locale }: { locale: Locale }) {
  const { cartItems, removeFromCart, subtotal, formatPrice } = useStorefront();
  const copy = getCopy(locale, subtotal);

  return (
    <Box bgcolor="#f5f5f5" pt={14} minHeight="100vh">
      <Box height={96} sx={{ backgroundImage: "url('/assets/cart-banner.jpg')", bgcolor: "#666", backgroundSize: "cover" }} display="flex" alignItems="center" justifyContent="center">
        <Typography color="#fff" fontSize={28} fontWeight={800}>
          {copy.shoppingCart} <span style={{ opacity: 0.65 }}> → {copy.checkout} → {copy.orderComplete}</span>
        </Typography>
      </Box>
      <Grid2 container spacing={4} px={{ xs: 2, md: 8 }} py={7}>
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <Stack spacing={4} mb={5}>
            <Box display="flex" gap={2.5} alignItems="center"><Star size={38} /><Typography fontSize={21} fontWeight={800} variant="subtitle1">{copy.earn}</Typography></Box>
            <Box display="flex" gap={2.5} alignItems="center"><Star size={38} /><Typography fontSize={21} fontWeight={800} variant="subtitle1">{copy.rewards}</Typography></Box>
          </Stack>
          <Grid2 container py={2} borderBottom="1px solid #ddd" display={{ xs: "none", md: "flex" }}>
            <Grid2 size={5}><Typography fontWeight={800} fontSize={20} textAlign="center">{copy.product}</Typography></Grid2>
            <Grid2 size={2}><Typography fontWeight={800} fontSize={20}>{copy.sku}</Typography></Grid2>
            <Grid2 size={1.5}><Typography fontWeight={800} fontSize={20}>{copy.price}</Typography></Grid2>
            <Grid2 size={2}><Typography fontWeight={800} fontSize={20}>{copy.quantity}</Typography></Grid2>
            <Grid2 size={1.5}><Typography fontWeight={800} fontSize={20}>{copy.subtotal}</Typography></Grid2>
          </Grid2>
          {cartItems.length === 0 ? <Typography py={6}>{copy.empty}</Typography> : cartItems.map((item) => (
            <Grid2 key={item.product.slug} container alignItems="center" py={2.5} borderBottom="1px solid #ddd" spacing={2}>
              <Grid2 size={{ xs: 1, md: 0.5 }}><Button sx={{ minWidth: 0, color: "#001b33" }} onClick={() => removeFromCart(item.product.slug)}><X size={17} /></Button></Grid2>
              <Grid2 size={{ xs: 4, md: 1 }}><Box position="relative" width={100} height={151} bgcolor="#eee"><Image src={item.product.images[0] ?? "/logo.svg"} alt={item.product.title[locale]} fill style={{ objectFit: "cover" }} /></Box></Grid2>
              <Grid2 size={{ xs: 7, md: 3.5 }}><Typography fontWeight={800}>{item.product.title[locale]}{productOptionText(item)}</Typography></Grid2>
              <Grid2 size={{ xs: 6, md: 2 }}><Typography variant="subtitle1">{item.product.slug.toUpperCase().slice(0, 13)}</Typography></Grid2>
              <Grid2 size={{ xs: 6, md: 1.5 }}><Typography color="#777" variant="subtitle1">{formatPrice(item.product.priceUsd)}</Typography></Grid2>
              <Grid2 size={{ xs: 6, md: 2 }}><QuantityControl item={item} /></Grid2>
              <Grid2 size={{ xs: 6, md: 1.5 }}><Typography fontSize={20} variant="subtitle1">{formatPrice(item.product.priceUsd * item.quantity)}</Typography></Grid2>
            </Grid2>
          ))}
          <Box display="flex" justifyContent="space-between" gap={2} mt={5} flexWrap="wrap">
            <Box display="flex" gap={1.5}><TextField placeholder={copy.coupon} sx={{ bgcolor: "#fff", width: 286 }} /><Button sx={{ bgcolor: "#d7d4c8", color: "#111", borderRadius: 0, px: 3 }}>{copy.applyCoupon}</Button></Box>
            <Button sx={{ bgcolor: "#d7d4c8", color: "#888", borderRadius: 0, px: 4 }}>{copy.updateCart}</Button>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <Box border="3px solid #e1e1e1" p={{ xs: 2, md: 4 }}>
            <Typography fontSize={30} fontWeight={800} mb={3}>{copy.cartTotals}</Typography>
            {[[copy.subtotal, formatPrice(subtotal)], [copy.shipment, copy.freeShipping], [copy.taxes, copy.taxesAtCheckout]].map(([label, value]) => (
              <Box key={label} display="flex" justifyContent="space-between" py={2} borderBottom="1px solid #ddd">
                <Typography fontWeight={800}>{label}</Typography>
                <Typography variant="subtitle1">{value}</Typography>
              </Box>
            ))}
            <Box display="flex" justifyContent="space-between" py={2.5}>
              <Typography fontSize={23} fontWeight={800}>{copy.total}</Typography>
              <Typography fontSize={30} variant="subtitle1">{formatPrice(subtotal)}</Typography>
            </Box>
            <Button component={Link} href={`/${locale}/checkout`} fullWidth sx={{ bgcolor: "#d7d4c8", color: "#111", borderRadius: 0, height: 53, mb: 1.5 }}>{copy.proceed}</Button>
            <Button fullWidth sx={{ bgcolor: "#ffc439", color: "#003087", borderRadius: 1, height: 56, fontSize: 25, fontWeight: 800 }}>PayPal</Button>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export function CheckoutPageClient({ locale }: { locale: Locale }) {
  const { cartItems, subtotal, formatPrice } = useStorefront();
  const [paymentMethod, setPaymentMethod] = useState(locale === "en" ? "Debit & Credit Cards" : "Thẻ Ghi Nợ & Tín Dụng");
  const copy = getCopy(locale, subtotal);
  const nameLabels = [copy.firstName, copy.lastName];
  const detailLabels = [copy.company, copy.country, copy.street, copy.apartment, copy.city, copy.state];

  return (
    <Box bgcolor="#f5f5f5" pt={14} px={{ xs: 2, md: 8 }} py={4} minHeight="100vh">
      <Typography fontWeight={800} mb={4}>{copy.haveCoupon}</Typography>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Typography fontSize={28} fontWeight={800} mb={3}>{copy.billing}</Typography>
          <Grid2 container spacing={3}>
            {nameLabels.map((label) => (
              <Grid2 key={label} size={6}>
                <Typography mb={1}>{label}</Typography>
                <TextField fullWidth defaultValue={label === copy.firstName ? "Tuan" : "Nguyen"} />
              </Grid2>
            ))}
            {detailLabels.map((label) => (
              <Grid2 key={label} size={12}>
                <Typography mb={1}>{label}</Typography>
                <TextField fullWidth placeholder={label === copy.country ? copy.selectCountry : label === copy.state ? copy.selectState : ""} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Box bgcolor="#fff" p={{ xs: 2, md: 5 }}>
            <Typography textAlign="center" fontSize={28} fontWeight={800} mb={3}>{copy.yourOrder}</Typography>
            <Box border="1px solid #f2f2f2" p={2}>
              <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ddd" pb={2}>
                <Typography fontWeight={800}>{copy.product}</Typography>
                <Typography fontWeight={800}>{copy.subtotal}</Typography>
              </Box>
              {cartItems.map((item) => (
                <Box key={item.product.slug} display="grid" gridTemplateColumns="28px 74px 1fr auto" gap={1.5} alignItems="center" py={2.5} borderBottom="1px solid #ddd">
                  <X size={15} />
                  <Box position="relative" width={74} height={110} bgcolor="#eee"><Image src={item.product.images[0] ?? "/logo.svg"} alt={item.product.title[locale]} fill style={{ objectFit: "cover" }} /></Box>
                  <Box><Typography>{item.product.title[locale]}{productOptionText(item)}</Typography><QuantityControl item={item} /></Box>
                  <Typography variant="subtitle1">{formatPrice(item.product.priceUsd * item.quantity)}</Typography>
                </Box>
              ))}
              <Box display="flex" justifyContent="space-between" py={2} borderBottom="1px solid #ddd"><Typography fontWeight={800}>{copy.subtotal}</Typography><Typography variant="subtitle1">{formatPrice(subtotal)}</Typography></Box>
              <Box display="flex" justifyContent="space-between" py={2} borderBottom="1px solid #ddd"><Typography fontWeight={800}>{copy.shipment}</Typography><Typography variant="subtitle1">{copy.freeShipping}</Typography></Box>
              <Box display="flex" justifyContent="space-between" py={2}><Typography fontSize={22} fontWeight={800}>{copy.total}</Typography><Typography fontSize={28} variant="subtitle1">{formatPrice(subtotal)}</Typography></Box>
            </Box>
            <Stack spacing={2} mt={3}>
              <RadioGroup value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                {copy.methods.map((method) => (
                  <FormControlLabel
                    key={method}
                    value={method}
                    control={<Radio />}
                    label={<Typography fontSize={20} variant="subtitle1">{method}</Typography>}
                  />
                ))}
              </RadioGroup>
              <Button sx={{ bgcolor: "#2f3030", color: "#fff", height: 62, borderRadius: 1, fontSize: 22, fontWeight: 800, gap: 1 }}>
                <CreditCard />
                {paymentMethod === "PayPal" ? "PayPal" : copy.payByCard}
              </Button>
            </Stack>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
