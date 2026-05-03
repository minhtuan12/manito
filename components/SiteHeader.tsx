"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, UserRound, Shield, X, User } from "lucide-react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  Collapse,
  Paper,
  Grid,
  useTheme,
  Drawer,
  Grid2,
  Divider,
  Input,
  Checkbox,
  Theme,
} from "@mui/material";
import type { Locale } from "@/types/domain";
import type { ReturnTypeGetDictionary } from "@/lib/types-local";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import Image, { StaticImageData } from "next/image";
import ManitoLogo from "@/assets/images/manito.png";
import Image1 from "@/assets/images/manitosilk-women-new-collection.jpg";
import Image2 from "@/assets/images/manito-accessories-eye-masks-face-masks-collection.webp";
import Image3 from "@/assets/images/manito-accessories-lounge-shoes-bags-collection.webp";
import Image4 from "@/assets/images/manito-bedding-inserts-collection.webp";
import Image5 from "@/assets/images/manito-bedding-pieces-collection.webp";
import Image6 from "@/assets/images/manito-bedding-pillowcase-collection.webp";
import Image7 from "@/assets/images/manito-bedding-sets-collection.webp";
import { makeStyles } from "@mui/styles";
import { usePathname } from "next/navigation";

type SubmenuColumn = {
  heading: string;
  href: string;
  image: StaticImageData;
};

type NavItem = {
  key: keyof ReturnTypeGetDictionary["nav"];
  href: string;
  submenu?: SubmenuColumn[];
};

type SiteHeaderProps = {
  locale: Locale;
  dictionary: ReturnTypeGetDictionary;
  brand: string;
  pathWithoutLocale: string;
};

const useStyles: any = makeStyles((theme: Theme) => ({
  lostPassword: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
}))

export function SiteHeader({
  locale,
  dictionary,
  brand,
  pathWithoutLocale,
}: SiteHeaderProps) {
  const classes = useStyles();
  const [headerHovered, setHeaderHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isStickyOnScrollDown, setIsStickyOnScrollDown] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);
  const theme = useTheme();
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
  const pathname = usePathname();
  const isHomepage =
    pathname === "/" ||
    pathname === `/${locale}` ||
    pathname === `/${locale}/`;

  const navItems: NavItem[] = [
    {
      key: "women",
      href: `/${locale}/category/women`,
      submenu: [
        {
          heading: "New",
          href: `/${locale}/category/women/new`,
          image: Image1,
        },
        {
          heading: "Best Sellers",
          href: `/${locale}/category/women/best-sellers`,
          image: Image2,
        },
        {
          heading: "Pijama Sets",
          href: `/${locale}/category/women/pijama-sets`,
          image: Image3,
        },
        {
          heading: "Dresses & Skirts",
          href: `/${locale}/category/women/dresses-skirts`,
          image: Image4,
        },
      ],
    },
    {
      key: "men",
      href: `/${locale}/category/men`,
      submenu: [
        {
          heading: "New",
          href: `/${locale}/category/men/new`,
          image: Image5,
        },
        {
          heading: "Best Sellers",
          href: `/${locale}/category/men/best-sellers`,
          image: Image6,
        },
        {
          heading: "Pijama Sets",
          href: `/${locale}/category/men/pijama-sets`,
          image: Image6,
        },
        {
          heading: "Robes",
          href: `/${locale}/category/men/robes`,
          image: Image7,
        },
      ],
    },
    {
      key: "kids",
      href: `/${locale}/category/kids`,
      submenu: [
        {
          heading: "Kid's New",
          href: `/${locale}/category/men/robes`,
          image: Image7,
        },
        {
          heading: "Baby (1-36 months)",
          href: `/${locale}/category/men/robes`,
          image: Image7,
        },
        {
          heading: "Kids (3-12 years)",
          href: `/${locale}/category/men/robes`,
          image: Image7,
        },
        {
          heading: "Kid's Bedding",
          href: `/${locale}/category/men/robes`,
          image: Image7,
        },
      ],
    },
    {
      key: "bedding",
      href: `/${locale}/category/bedding`,
      submenu: [
        {
          heading: "Bedding's Best Sellers",
          href: `/${locale}/category/men/robes`,
          image: Image1,
        },
        {
          heading: "Bedding Sets",
          href: `/${locale}/category/men/robes`,
          image: Image2,
        },
        {
          heading: "Pillowcase",
          href: `/${locale}/category/men/robes`,
          image: Image3,
        },
        {
          heading: "Bedding Pieces",
          href: `/${locale}/category/men/robes`,
          image: Image4,
        },
      ],
    },
    {
      key: "accessories",
      href: `/${locale}/category/accessories`,
      submenu: [
        {
          heading: "Accessories New",
          href: `/${locale}/category/men/accessories-new`,
          image: Image1,
        },
        {
          heading: "Eye Masks & Face Masks",
          href: `/${locale}/category/men/eye-masks-face-masks`,
          image: Image2,
        },
        {
          heading: "Hair Accessories",
          href: `/${locale}/category/men/hair-accessories`,
          image: Image3,
        },
        {
          heading: "Lounge Shoes & Bags",
          href: `/${locale}/category/men/lounge-shoes-bags`,
          image: Image4,
        },
      ],
    },
    {
      key: "lifestyle",
      href: `/${locale}/category/lifestyle`,
      submenu: [
        {
          heading: "Wash & Care",
          href: `/${locale}/category/men/wash-care`,
          image: Image1,
        },
        {
          heading: "Travel Kits",
          href: `/${locale}/category/men/travel-kits`,
          image: Image2,
        },
        {
          heading: "Fragrances",
          href: `/${locale}/category/men/fragrances`,
          image: Image3,
        },
      ],
    },
    {
      key: "gifts",
      href: `/${locale}/category/gifts`,
      submenu: [
        {
          heading: "Customized Gifts",
          href: `/${locale}/category/men/customized-gifts`,
          image: Image1,
        },
        {
          heading: "Eye Mask Renewale",
          href: `/${locale}/category/men/eye-mask-renewable`,
          image: Image2,
        },
        {
          heading: "Fragrances",
          href: `/${locale}/category/men/fragrances`,
          image: Image3,
        },
      ],
    },
  ];

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setOpenProfileDrawer(open);
      };

  const handleNavEnter = useCallback((key: string) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setActiveMenu(key);
  }, []);

  const handleNavLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 120);
  }, []);

  const handleSubmenuEnter = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
  }, []);

  const currentSubmenu = navItems.find(
    (item) => item.key === activeMenu,
  )?.submenu;
  const isOpen = !!activeMenu && !!currentSubmenu;

  useEffect(() => {
    if (!isHomepage) {
      setIsStickyOnScrollDown(false);
      setIsAtTop(false);
      return;
    }

    const onScroll = () => {
      const currentY = window.scrollY;
      const lastY = lastScrollYRef.current;
      const delta = currentY - lastY;

      // Ignore tiny jitter and only toggle after header has left the first viewport area.
      if (Math.abs(delta) > 2) {
        if (delta > 0 && currentY > 120) {
          setIsStickyOnScrollDown(true);
        } else if (delta < 0) {
          setIsStickyOnScrollDown(false);
        }
      }

      if (currentY <= 8) {
        setIsStickyOnScrollDown(false);
      }
      setIsAtTop(currentY <= 8);

      lastScrollYRef.current = currentY;
    };

    lastScrollYRef.current = window.scrollY;
    setIsAtTop(window.scrollY <= 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomepage]);

  const useTransparentHeader = isHomepage && isAtTop && !headerHovered && !isOpen;

  return (
    <AppBar
      position={isHomepage ? (!isStickyOnScrollDown ? "fixed" : "absolute") : "absolute"}
      elevation={0}
      onMouseEnter={() => setHeaderHovered(true)}
      onMouseLeave={() => {
        setHeaderHovered(false);
        handleNavLeave();
      }}
      sx={{
        backgroundColor: useTransparentHeader ? "transparent" : "#f5f5f5",
        color: useTransparentHeader ? "white" : "#1a1a1a",
        transition: "background-color 0.25s ease, color 0.25s ease",
        boxShadow: useTransparentHeader ? "none" : "0 1px 0 0 rgba(0,0,0,0.08)",
        top: isHomepage ? 0 : "auto",
        left: isHomepage ? 0 : "auto",
        right: isHomepage ? 0 : "auto",
      }}
    >
      {/* ── Main toolbar ── */}
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 104,
          px: { xs: 2, md: 4, xl: 20 },
          py: { xs: 2, md: 1 },
        }}
      >
        {/* Left: brand + nav */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Link href={"/"}>
            <Image
              src={ManitoLogo}
              alt={brand}
              priority
              style={{ height: 80, width: 150 }}
            />
          </Link>

          <Stack direction="row" spacing={0.5}>
            {navItems.map((item) => (
              <Button
                key={item.key}
                component={Link}
                href={item.href}
                color="inherit"
                onMouseEnter={() =>
                  item.submenu
                    ? handleNavEnter(item.key)
                    : handleNavLeave()
                }
                onMouseLeave={handleNavLeave}
                sx={{
                  position: "relative",
                  fontWeight:
                    activeMenu === item.key ? 600 : 400,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 8,
                    left: "50%",
                    transform:
                      activeMenu === item.key
                        ? "translateX(-50%) scaleX(1)"
                        : "translateX(-50%) scaleX(0)",
                    transformOrigin: "center",
                    width: "calc(100% - 24px)",
                    height: "1.5px",
                    backgroundColor: "currentColor",
                    transition: "transform 0.2s ease",
                    textTransform: 'none',
                  },
                }}
                style={{ textTransform: 'none' }}
              >
                {dictionary.nav[item.key]}
              </Button>
            ))}
          </Stack>
        </Stack>

        {/* Right: utilities */}
        <Stack direction="row" spacing={0.5} alignItems="center">
          <LocaleSwitcher
            locale={locale}
            pathWithoutLocale={pathWithoutLocale}
            label={dictionary.common.language}
          />
          {[
            {
              href: `/${locale}/search`,
              icon: <Search size={18} />,
              label: "search",
            },
            {
              href: `/${locale}/cart`,
              icon: <ShoppingBag size={18} />,
              label: "cart",
            },
            {
              href: `/${locale}/wishlist`,
              icon: <Heart size={18} />,
              label: "wishlist",
            },
            {
              icon: <UserRound size={18} />,
              label: "account",
            },
            {
              href: `/${locale}/admin`,
              icon: <Shield size={18} />,
              label: "admin",
            },
          ].map(({ href, icon, label }) => (
            href ? <Button
              key={label}
              component={Link}
              href={href}
              color="inherit"
              aria-label={label}
              sx={{ minWidth: 40, p: 1 }}
            >
              {icon}
            </Button> : <Button
              key={label}
              color="inherit"
              aria-label={label}
              sx={{ minWidth: 40, p: 1 }}
              onClick={() => setOpenProfileDrawer(true)}
            >
              {icon}
            </Button>
          ))}
        </Stack>
      </Toolbar>

      {/* ── Submenu panel ── */}
      <Collapse
        in={isOpen}
        timeout={220}
        onMouseEnter={handleSubmenuEnter}
        onMouseLeave={handleNavLeave}
      >
        <Paper
          elevation={0}
          square
          sx={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 0,
            backgroundColor: "#ffffff",
            px: { xs: 2, md: 6 },
            py: 3,
          }}
        >
          <Grid container gap={4} justifyContent="center">
            {currentSubmenu?.map((col) => (
              <Grid
                item
                key={col.heading}
                xs={12}
                sm={6}
                md={2}
                position={"relative"}
                component={Link}
                href={col.href}
                sx={{ textDecoration: "none" }}
              >
                <Image
                  src={col.image}
                  alt={col.heading}
                  priority
                  width={0}
                  height={0}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 4,
                  }}
                  quality={100}
                />
                <Box
                  position={"absolute"}
                  bottom={0}
                  left={0}
                  sx={{ background: "rgba(255,255,255,0.8)" }}
                  width={"100%"}
                  py={1}
                  px={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: theme.palette.grey[600],
                      display: "block",
                      fontSize: "0.68rem",
                      textTransform: "uppercase",
                      lineClamp: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {col.heading}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Collapse>
      <Drawer
        anchor={'right'}
        open={openProfileDrawer}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 350, color: '#000' }}
          role="presentation"
        >
          <Grid2 display={'flex'} justifyContent={'space-between'} alignItems={'center'} py={3} px={2}>
            <Typography fontWeight={600} fontSize={21} color="#000000">
              {locale === 'en' ? 'Sign in' : 'Đăng nhập'}
            </Typography>
            <Grid2 gap={0.5} display={'flex'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={toggleDrawer(false)}>
              <X size={18} />
              <Typography fontFamily={'font-optima'} fontWeight={600}>
                {locale === 'en' ? "Close" : "Đóng"}
              </Typography>
            </Grid2>
          </Grid2>
          <Divider sx={{ width: '100%' }} />
          <Grid2 py={3} px={2}>
            <Box display={'flex'} gap={1} flexDirection={'column'} mb={2.5}>
              <Typography variant="subtitle1">
                {locale === 'en' ? "Username or email address" : "Tên đăng nhập hoặc email"} <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Input sx={{ border: '1px solid rgba(0,0,0,0.1)', paddingInline: 2, height: 42 }} />
            </Box>
            <Box display={'flex'} gap={1} flexDirection={'column'} mb={2.5}>
              <Typography variant="subtitle1">
                {locale === 'en' ? "Password" : "Mật khẩu"} <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Input sx={{ border: '1px solid rgba(0,0,0,0.1)', paddingInline: 2, height: 42 }} />
            </Box>
            <Button sx={{ mb: 2.5, background: '#d7d4c8', color: '#272727', fontWeight: 400, width: '100%', height: 42 }}>
              <Typography variant="subtitle1" fontSize={12}>
                {locale === 'en' ? "LOG IN" : "ĐĂNG NHẬP"}
              </Typography>
            </Button>
            <Grid2 display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Box display={'flex'} alignItems={'center'}>
                <Checkbox size="small" />
                <Typography variant="subtitle1" fontSize={16} ml={0.5}>
                  {locale === 'en' ? "Remember me" : "Nhớ tài khoản"}
                </Typography>
              </Box>
              <Link href={`/${locale}/my-account/lost-password`} className={classes.lostPassword}>
                <Typography variant="subtitle1" fontSize={16} color="black">
                  {locale === 'en' ? "Lost your password?" : "Quên mật khẩu?"}
                </Typography>
              </Link>
            </Grid2>
          </Grid2>
          <Divider sx={{ width: '100%' }} />
          <Grid2 display={'flex'} flexDirection={'column'} gap={1} py={3} px={2.5} justifyContent={'center'} alignItems={'center'}>
            <UserRound size={80} color="#f1f1f1" />
            <Typography variant="subtitle1" fontWeight={600}>
              {locale === 'en' ? "No account yet?" : "Bạn chưa có tài khoản?"}
            </Typography>
            <Link href={`/${locale}/my-account/register`} style={{ marginTop: 10, letterSpacing: 0.6, textDecoration: 'underline' }} className={classes.lostPassword}>
              <Typography variant="subtitle1" fontSize={13} lineHeight={1.2} fontWeight={600} color="black">
                {locale === 'en' ? "CREATE AN ACCOUNT" : "TẠO TÀI KHOẢN"}
              </Typography>
            </Link>
          </Grid2>
          <Divider sx={{ width: '100%' }} />
        </Box>
      </Drawer>
    </AppBar>
  );
}
