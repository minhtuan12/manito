import type { Locale } from "@/types/domain";

export type Dictionary = {
  nav: {
    women: string;
    men: string;
    kids: string;
    bedding: string;
    accessories: string;
    lifestyle: string;
    gifts: string;
    cart: string;
    wishlist: string;
    account: string;
    admin: string;
  };
  home: {
    featuredTitle: string;
    categoriesTitle: string;
  };
  common: {
    readMore: string;
    viewAll: string;
    search: string;
    price: string;
    addToCart: string;
    inStock: string;
    outOfStock: string;
    language: string;
    productInformation: string;
  };
  admin: {
    title: string;
    subtitle: string;
    products: string;
    categories: string;
    orders: string;
    customers: string;
    content: string;
    media: string;
    settings: string;
    dashboard: string;
  };
  account: {
    title: string;
    subtitle: string;
  };
  cart: {
    title: string;
    empty: string;
  };
  wishlist: {
    title: string;
    empty: string;
  };
  filter: any;
  [key: string]: any;
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      women: "Women",
      men: "Men",
      kids: "Kids",
      bedding: "Bedding",
      accessories: "Accessories",
      lifestyle: "Lifestyle",
      gifts: "Gifts",
      cart: "Cart",
      wishlist: "Wishlist",
      account: "My Account",
      admin: "Admin"
    },
    home: {
      featuredTitle: "Featured Products",
      categoriesTitle: "Shop By Category"
    },
    common: {
      readMore: "Read More",
      viewAll: "View All",
      search: "Search",
      price: "Price",
      addToCart: "Add to cart",
      inStock: "In stock",
      outOfStock: "Out of stock",
      language: "Language",
      productInformation: "Product Information"
    },
    admin: {
      title: "Admin CMS",
      subtitle: "Manage catalog, content, and orders in one Next.js workspace.",
      products: "Products",
      categories: "Categories",
      orders: "Orders",
      customers: "Customers",
      content: "Content",
      media: "Media",
      settings: "Settings",
      dashboard: "Dashboard"
    },
    account: {
      title: "My Account",
      subtitle: "Sign in or create an account to manage orders and wishlist."
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is currently empty."
    },
    wishlist: {
      title: "Wishlist",
      empty: "No items saved yet."
    },
    filter: {
      sortBy: "Sort by",
      popular: "Most Popular",
      newest: 'Newest',
      priceAsc: 'Price: low to high',
      priceDesc: 'Price: high to low',
      nameAsc: 'Name: A to Z',
      nameDesc: 'Name: Z to A',
      color: 'Color',
    },
  },
  vi: {
    nav: {
      women: "Nữ",
      men: "Nam",
      kids: "Trẻ em",
      bedding: "Chăn ga gối",
      accessories: "Phụ kiện",
      lifestyle: "Đời sống",
      gifts: "Quà tặng",
      cart: "Giỏ hàng",
      wishlist: "Yêu thích",
      account: "Tài khoản",
      admin: "Quản trị"
    },
    home: {
      featuredTitle: "Sản Phẩm Nổi Bật",
      categoriesTitle: "Mua Sắm Theo Danh Mục"
    },
    common: {
      readMore: "Xem thêm",
      viewAll: "Xem tất cả",
      search: "Tìm kiếm",
      price: "Giá",
      addToCart: "Thêm vào giỏ",
      inStock: "Còn hàng",
      outOfStock: "Hết hàng",
      language: "Ngôn ngữ",
      productInformation: "Thông Tin Sản Phẩm"
    },
    admin: {
      title: "CMS Quản Trị",
      subtitle: "Quản lý danh mục, nội dung và đơn hàng trong cùng một hệ Next.js.",
      products: "Sản phẩm",
      categories: "Danh mục",
      orders: "Đơn hàng",
      customers: "Khách hàng",
      content: "Nội dung",
      media: "Thư viện ảnh",
      settings: "Cài đặt",
      dashboard: "Tổng quan"
    },
    account: {
      title: "Tài Khoản",
      subtitle: "Đăng nhập hoặc tạo tài khoản để quản lý đơn hàng và danh sách yêu thích."
    },
    cart: {
      title: "Giỏ Hàng",
      empty: "Giỏ hàng của bạn đang trống."
    },
    wishlist: {
      title: "Danh Sách Yêu Thích",
      empty: "Bạn chưa lưu sản phẩm nào."
    },
    filter: {
      sortBy: "Sắp xếp theo",
      popular: "Phổ biến nhất",
      newest: 'Mới nhất',
      priceAsc: 'Price: thấp đến cao',
      priceDesc: 'Price: cao đến thấp',
      nameAsc: 'Tên sản phẩm: A tới Z',
      nameDesc: 'Tên sản phẩm: Z tới A',
      color: 'Màu sắc',
    },
  }
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
