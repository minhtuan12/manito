import type { Locale } from "@/types/domain";
import type { ReturnTypeGetDictionary } from "@/lib/types-local";
import { getStorefrontCategoryTree } from "@/lib/storefront-data";
import { SiteHeaderClient, type HeaderNavItem } from "@/components/SiteHeaderClient";
import { aboutNavLinks } from "@/lib/about-content";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: ReturnTypeGetDictionary;
  pathWithoutLocale: string;
};

export async function SiteHeader({
  locale,
  dictionary,
  pathWithoutLocale,
}: SiteHeaderProps) {
  const categories = await getStorefrontCategoryTree();

  const navItems: HeaderNavItem[] = categories.map((category) => ({
    id: category.id,
    label: category.title[locale],
    href: `/${locale}/category/${category.path}`,
    submenu: category.children.map((child) => ({
      id: child.id,
      heading: child.title[locale],
      href: `/${locale}/category/${child.path}`,
      image: child.coverImage,
    })),
  }));

  navItems.push({
    id: "about-yamopad",
    label: locale === "en" ? "About Yamopad" : "Về Yamopad",
    href: `/${locale}/inside-yamopad`,
    submenu: aboutNavLinks.map((item) => ({
      id: item.id,
      heading: item.heading[locale],
      href: `/${locale}${item.href}`,
      image: item.image,
    })),
  });

  return (
    <SiteHeaderClient
      locale={locale}
      dictionary={dictionary}
      pathWithoutLocale={pathWithoutLocale}
      navItems={navItems}
    />
  );
}
