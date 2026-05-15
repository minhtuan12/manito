"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, UserRound, X, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  Collapse,
  Paper,
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
import Image from "next/image";
import MainLogo from "@/public/logo.svg";
import { makeStyles } from "@mui/styles";
import { usePathname } from "next/navigation";

export type HeaderNavSubItem = {
  id: string;
  heading: string;
  href: string;
  image: string;
};

export type HeaderNavItem = {
  id: string;
  label: string;
  href: string;
  submenu: HeaderNavSubItem[];
};

type SiteHeaderClientProps = {
  locale: Locale;
  dictionary: ReturnTypeGetDictionary;
  pathWithoutLocale: string;
  navItems: HeaderNavItem[];
};

const useStyles: any = makeStyles((theme: Theme) => ({
  lostPassword: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export function SiteHeaderClient({
  locale,
  dictionary,
  pathWithoutLocale,
  navItems,
}: SiteHeaderClientProps) {
  const classes = useStyles();
  const [headerHovered, setHeaderHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isStickyOnScrollDown, setIsStickyOnScrollDown] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [submenuHovered, setSubmenuHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasScrollableOverflow, setHasScrollableOverflow] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);
  const submenuRailRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
  const [openNavDrawer, setOpenNavDrawer] = useState(false);
  const pathname = usePathname();
  const isHomepage =
    pathname === "/" ||
    pathname === `/${locale}` ||
    pathname === `/${locale}/`;

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setOpenProfileDrawer(open);
      };

  const toggleNavDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setOpenNavDrawer(open);
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
    (item) => item.id === activeMenu,
  )?.submenu;
  const isOpen = !!activeMenu && !!currentSubmenu?.length;

  const updateSubmenuScrollState = useCallback(() => {
    const rail = submenuRailRef.current;
    if (!rail) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    setHasScrollableOverflow(maxScrollLeft > 4);
    setCanScrollLeft(rail.scrollLeft > 4);
    setCanScrollRight(rail.scrollLeft < maxScrollLeft - 4);
  }, []);

  const scrollSubmenu = useCallback((direction: "left" | "right") => {
    const rail = submenuRailRef.current;
    if (!rail) {
      return;
    }

    const cards = Array.from(
      rail.querySelectorAll<HTMLElement>("[data-submenu-card='true']"),
    );

    if (!cards.length) {
      return;
    }

    const viewportLeft = rail.scrollLeft;
    const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const step = rail.clientWidth;

    const snapRight = (rawLeft: number) => {
      const candidate = cards.find((card) => card.offsetLeft >= rawLeft - 1);
      return candidate ? candidate.offsetLeft : maxScrollLeft;
    };

    const snapLeft = (rawLeft: number) => {
      const candidate = [...cards].reverse().find((card) => card.offsetLeft <= rawLeft + 1);
      return candidate ? candidate.offsetLeft : 0;
    };

    if (direction === "right") {
      if (viewportLeft >= maxScrollLeft - 4) {
        rail.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      rail.scrollTo({
        left: snapRight(Math.min(maxScrollLeft, viewportLeft + step)),
        behavior: "smooth",
      });
      return;
    }

    if (viewportLeft <= 4) {
      const wrappedLeft = snapLeft(maxScrollLeft);
      rail.scrollTo({
        left: wrappedLeft,
        behavior: "smooth",
      });
      return;
    }

    rail.scrollTo({
      left: snapLeft(Math.max(0, viewportLeft - step)),
      behavior: "smooth",
    });
  }, []);

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

  useEffect(() => {
    updateSubmenuScrollState();

    const rail = submenuRailRef.current;
    if (!rail) {
      return;
    }

    const handleScroll = () => updateSubmenuScrollState();

    rail.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      rail.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [currentSubmenu, isOpen, updateSubmenuScrollState]);

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
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 104,
          px: { xs: 2, md: 4, xl: 20 },
          py: { xs: 2, md: 1 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr auto 1fr", md: "auto 1fr auto" },
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          spacing={{ xs: 0.25, md: 2 }}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Stack
            direction="row"
            spacing={0.25}
            alignItems="center"
            display={{ xs: "flex", md: "none" }}
          >
            <Button
              color="inherit"
              aria-label="menu"
              sx={{ minWidth: 40, p: 1 }}
              onClick={() => setOpenNavDrawer(true)}
            >
              <Menu size={20} />
            </Button>
            <Button
              component={Link}
              href={`/${locale}/search`}
              color="inherit"
              aria-label="search"
              sx={{ minWidth: 40, p: 1 }}
            >
              <Search size={18} />
            </Button>
          </Stack>

          <Box display={{ xs: "none", md: "block" }}>
            <Link href={`/${locale}`}>
              <Image
                src={MainLogo}
                alt={"Yamopad"}
                priority
                style={{ height: 80, width: 150 }}
              />
            </Link>
          </Box>

          <Stack direction="row" spacing={0.5} display={{ xs: "none", md: "flex" }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                component={Link}
                href={item.href}
                color="inherit"
                onMouseEnter={() =>
                  item.submenu.length
                    ? handleNavEnter(item.id)
                    : handleNavLeave()
                }
                onMouseLeave={handleNavLeave}
                sx={{
                  position: "relative",
                  fontWeight: activeMenu === item.id ? 600 : 400,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 8,
                    left: "50%",
                    transform:
                      activeMenu === item.id
                        ? "translateX(-50%) scaleX(1)"
                        : "translateX(-50%) scaleX(0)",
                    transformOrigin: "center",
                    width: "calc(100% - 24px)",
                    height: "1.5px",
                    backgroundColor: "currentColor",
                    transition: "transform 0.2s ease",
                    textTransform: "none",
                  },
                }}
                style={{ textTransform: "none", fontSize: 18, fontWeight: 800 }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Stack>

        <Box display={{ xs: "flex", md: "none" }} justifyContent="center">
          <Link href={`/${locale}`}>
            <Image
              src={MainLogo}
              alt={"Yamopad"}
              priority
              style={{ height: 80, width: 150 }}
            />
          </Link>
        </Box>

        <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="flex-end">
          <Box display={{ xs: "none", md: "block" }}>
            <LocaleSwitcher
              locale={locale}
              pathWithoutLocale={pathWithoutLocale}
              label={dictionary.common.language}
            />
          </Box>
          {[
            {
              icon: <UserRound size={18} />,
              label: "account",
            },
            {
              href: `/${locale}/search`,
              icon: <Search size={18} />,
              label: "search",
            },
            {
              href: `/${locale}/wishlist`,
              icon: <Heart size={18} />,
              label: "wishlist",
            },
            {
              href: `/${locale}/cart`,
              icon: <ShoppingBag size={18} />,
              label: "cart",
            },
          ]
            .filter((item) =>
              item.label === "account" ||
              item.label === "cart" ||
              (item.label !== "search" && item.label !== "wishlist"),
            )
            .map(({ href, icon, label }) =>
            href ? (
              <Button
                key={label}
                component={Link}
                href={href}
                color="inherit"
                aria-label={label}
                sx={{
                  minWidth: 40,
                  p: 1,
                  display:
                    label === "cart"
                      ? "inline-flex"
                      : { xs: "inline-flex", md: "inline-flex" },
                }}
              >
                {icon}
              </Button>
            ) : (
              <Button
                key={label}
                color="inherit"
                aria-label={label}
                sx={{ minWidth: 40, p: 1 }}
                onClick={() => setOpenProfileDrawer(true)}
              >
                {icon}
              </Button>
            ),
          )}
          {[
            {
              href: `/${locale}/search`,
              icon: <Search size={18} />,
              label: "search",
            },
            {
              href: `/${locale}/wishlist`,
              icon: <Heart size={18} />,
              label: "wishlist",
            },
          ].map(({ href, icon, label }) => (
            <Button
              key={label}
              component={Link}
              href={href}
              color="inherit"
              aria-label={label}
              sx={{ minWidth: 40, p: 1, display: { xs: "none", md: "inline-flex" } }}
            >
              {icon}
            </Button>
          ))}
        </Stack>
      </Toolbar>

      <Collapse
        in={isOpen}
        timeout={220}
        onMouseEnter={() => {
          setSubmenuHovered(true);
          handleSubmenuEnter();
        }}
        onMouseLeave={() => {
          setSubmenuHovered(false);
          handleNavLeave();
        }}
      >
        <Paper
          elevation={0}
          square
          sx={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 0,
            backgroundColor: "#ffffff",
            px: { xs: 2, md: 24 },
            py: 3,
            position: "relative",
          }}
        >
          <Button
            aria-label="Scroll submenu left"
            onClick={() => scrollSubmenu("left")}
            disabled={!canScrollLeft}
            sx={{
              position: "absolute",
              left: { xs: 8, md: 120 },
              top: "50%",
              transform: "translateY(-50%)",
              color: "#1a1a1a",
              opacity: submenuHovered && hasScrollableOverflow ? 1 : 0,
              pointerEvents: submenuHovered && hasScrollableOverflow ? "auto" : "none",
              transition: "opacity 180ms ease",
              zIndex: 2,
            }}
          >
            <ChevronLeft size={26} />
          </Button>
          <Button
            aria-label="Scroll submenu right"
            onClick={() => scrollSubmenu("right")}
            disabled={!canScrollRight}
            sx={{
              position: "absolute",
              right: { xs: 8, md: 120 },
              top: "50%",
              transform: "translateY(-50%)",
              color: "#1a1a1a",
              opacity: submenuHovered && hasScrollableOverflow ? 1 : 0,
              pointerEvents: submenuHovered && hasScrollableOverflow ? "auto" : "none",
              transition: "opacity 180ms ease",
              zIndex: 2,
            }}
          >
            <ChevronRight size={26} />
          </Button>
          <Box
            ref={submenuRailRef}
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              overflowY: "hidden",
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              px: { xs: 0, md: 6 },
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {currentSubmenu && currentSubmenu.map((col) => (
              <Box
                key={col.id}
                data-submenu-card="true"
                component={Link}
                href={col.href}
                sx={{
                  textDecoration: "none",
                  position: "relative",
                  display: "block",
                  border: "1px solid rgb(241, 241, 241)",
                  flex: {
                    xs: "0 0 76%",
                    sm: "0 0 38%",
                    md: "0 0 18%",
                  },
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    overflow: "hidden",
                    borderRadius: 1,
                  }}
                >
                  <Image
                    src={col.image}
                    alt={col.heading}
                    priority
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 20vw"
                    style={{
                      objectFit: "cover",
                    }}
                    quality={100}
                  />
                </Box>
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
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      color: theme.palette.grey[700],
                      display: "block",
                      fontSize: 14,
                      textTransform: "uppercase",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {col.heading}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Collapse>
      <Drawer
        anchor="left"
        open={openNavDrawer}
        onClose={toggleNavDrawer(false)}
      >
        <Box sx={{ width: 320, color: "#000" }} role="presentation">
          <Grid2 display={"flex"} justifyContent={"space-between"} alignItems={"center"} py={3} px={2}>
            <Typography fontWeight={600} fontSize={21} color="#000000">
              {locale === "en" ? "Menu" : "Danh Mục"}
            </Typography>
            <Grid2 gap={0.5} display={"flex"} alignItems={"center"} sx={{ cursor: "pointer" }} onClick={toggleNavDrawer(false)}>
              <X size={18} />
              <Typography fontFamily={"font-optima"} fontWeight={600}>
                {locale === "en" ? "Close" : "Đóng"}
              </Typography>
            </Grid2>
          </Grid2>
          <Divider sx={{ width: "100%" }} />
          <Stack px={2.5} py={3} spacing={2}>
            <LocaleSwitcher
              locale={locale}
              pathWithoutLocale={pathWithoutLocale}
              label={dictionary.common.language}
            />
            {navItems.map((item) => (
              <Box key={item.id}>
                <Typography
                  component={Link}
                  href={item.href}
                  onClick={() => setOpenNavDrawer(false)}
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: "#111111",
                    fontSize: 18,
                    fontWeight: 700,
                    py: 1,
                  }}
                >
                  {item.label}
                </Typography>
                {item.submenu.length ? (
                  <Stack spacing={1} pl={1} pb={1}>
                    {item.submenu.map((subitem) => (
                      <Typography
                        key={subitem.id}
                        component={Link}
                        href={subitem.href}
                        onClick={() => setOpenNavDrawer(false)}
                        sx={{
                          display: "block",
                          textDecoration: "none",
                          color: "#666666",
                          fontSize: 14,
                        }}
                      >
                        {subitem.heading}
                      </Typography>
                    ))}
                  </Stack>
                ) : null}
              </Box>
            ))}
          </Stack>
        </Box>
      </Drawer>
      <Drawer
        anchor={"right"}
        open={openProfileDrawer}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 350, color: "#000" }}
          role="presentation"
        >
          <Grid2 display={"flex"} justifyContent={"space-between"} alignItems={"center"} py={3} px={2}>
            <Typography fontWeight={600} fontSize={21} color="#000000">
              {locale === "en" ? "Sign in" : "Đăng nhập"}
            </Typography>
            <Grid2 gap={0.5} display={"flex"} alignItems={"center"} sx={{ cursor: "pointer" }} onClick={toggleDrawer(false)}>
              <X size={18} />
              <Typography fontFamily={"font-optima"} fontWeight={600}>
                {locale === "en" ? "Close" : "Đóng"}
              </Typography>
            </Grid2>
          </Grid2>
          <Divider sx={{ width: "100%" }} />
          <Grid2 py={3} px={2}>
            <Box display={"flex"} gap={1} flexDirection={"column"} mb={2.5}>
              <Typography variant="subtitle1">
                {locale === "en" ? "Username or email address" : "Tên đăng nhập hoặc email"} <span style={{ color: "red" }}>*</span>
              </Typography>
              <Input sx={{ border: "1px solid rgba(0,0,0,0.1)", paddingInline: 2, height: 42 }} />
            </Box>
            <Box display={"flex"} gap={1} flexDirection={"column"} mb={2.5}>
              <Typography variant="subtitle1">
                {locale === "en" ? "Password" : "Mật khẩu"} <span style={{ color: "red" }}>*</span>
              </Typography>
              <Input sx={{ border: "1px solid rgba(0,0,0,0.1)", paddingInline: 2, height: 42 }} />
            </Box>
            <Button sx={{ mb: 2.5, background: "#d7d4c8", color: "#272727", fontWeight: 400, width: "100%", height: 42 }}>
              <Typography variant="subtitle1" fontSize={12}>
                {locale === "en" ? "LOG IN" : "ĐĂNG NHẬP"}
              </Typography>
            </Button>
            <Grid2 display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Box display={"flex"} alignItems={"center"}>
                <Checkbox size="small" />
                <Typography variant="subtitle1" fontSize={16} ml={0.5}>
                  {locale === "en" ? "Remember me" : "Nhớ tài khoản"}
                </Typography>
              </Box>
              <Link href={`/${locale}/my-account/lost-password`} className={classes.lostPassword}>
                <Typography variant="subtitle1" fontSize={16} color="black">
                  {locale === "en" ? "Lost your password?" : "Quên mật khẩu?"}
                </Typography>
              </Link>
            </Grid2>
          </Grid2>
          <Divider sx={{ width: "100%" }} />
          <Grid2 display={"flex"} flexDirection={"column"} gap={1} py={3} px={2.5} justifyContent={"center"} alignItems={"center"}>
            <UserRound size={80} color="#f1f1f1" />
            <Typography variant="subtitle1" fontWeight={600}>
              {locale === "en" ? "No account yet?" : "Bạn chưa có tài khoản?"}
            </Typography>
            <Link href={`/${locale}/my-account/register`} style={{ marginTop: 10, letterSpacing: 0.6, textDecoration: "underline" }} className={classes.lostPassword}>
              <Typography variant="subtitle1" fontSize={13} lineHeight={1.2} fontWeight={600} color="black">
                {locale === "en" ? "CREATE AN ACCOUNT" : "TẠO TÀI KHOẢN"}
              </Typography>
            </Link>
          </Grid2>
          <Divider sx={{ width: "100%" }} />
        </Box>
      </Drawer>
    </AppBar >
  );
}
