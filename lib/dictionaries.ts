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
  account: {
    title: string;
    subtitle: string;
    [key: string]: any;
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

const accountEn = {
  title: "My Account",
  subtitle: "Sign in or create an account to manage orders and wishlist.",
  dashboard: {
    greetingPrefix: "Hello",
    notYou: "not",
    description: "From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.",
  },
  orders: "Orders",
  ordersPage: {
    empty: "No order has been made yet.",
    browseProducts: "Browse products",
    order: "Order",
    placedOn: "Placed on",
    total: "Total",
  },
  addresses: {
    title: "Addresses",
    billingAddress: "Billing Address",
    shippingAddress: "Shipping Address",
    defaultNotice: "The following addresses will be used on the checkout page by default.",
    edit: "Edit",
    add: "Add",
    notSet: "You have not set up this type of address yet.",
    firstName: "First name",
    lastName: "Last name",
    companyName: "Company name (optional)",
    countryRegion: "Country / Region",
    streetAddress: "Street address",
    apartment: "Apartment, suite, unit, etc. (optional)",
    townCity: "Town / City",
    state: "State",
    postCodeZip: "Postcode / ZIP",
    phone: "Phone",
    save: "Save address",
    saving: "Saving...",
    saved: "Address saved successfully.",
    failed: "Failed to save address",
  },
  paymentMethods: {
    title: "Payment methods",
    add: "Add Payment Methods",
    empty: "No saved methods found.",
    endingIn: "ending in",
    expires: "Expires",
    setDefault: "Set default",
    default: "Default",
    remove: "Remove",
    hideForm: "Hide payment form",
    addMethod: "Add payment method",
    save: "Save payment method",
    saving: "Saving...",
    failedAdd: "Failed to add payment method",
    failedRemove: "Failed to remove payment method",
    failedUpdate: "Failed to update payment method",
    cardholderName: "Cardholder name",
    brand: "Brand",
    cardNumber: "Card number",
    expiryMonth: "Expiry month",
    expiryYear: "Expiry year",
  },
  accountDetails: {
    title: "Account details",
    firstName: "First name",
    lastName: "Last name",
    displayName: "Display name",
    displayNameHelp: "This will be how your name will be displayed in the account section and in reviews.",
    gender: "Gender",
    email: "Email address",
    passwordChange: "Password Change",
    currentPassword: "Current password (leave blank to leave unchanged)",
    newPassword: "New password (leave blank to leave unchanged)",
    confirmNewPassword: "Confirm new password",
    birthday: "Birthday (optional)",
    save: "Save changes",
    saving: "Saving...",
    saved: "Account details updated.",
    failed: "Failed to update account",
    genderMs: "Ms.",
    genderMrs: "Mrs.",
    genderMr: "Mr.",
    genderNot: "Prefer not to say",
  },
  pointsAndRewards: {
    title: "Points and rewards",
    myPoints: "My Points",
    availablePoints: "Available points",
    redeemedPoints: "Redeemed points",
    usedRewards: "Used rewards",
    rewardsValue: "rewards value",
    myLevels: "My Levels",
    currentLevel: "Current level",
    nextLevel: "Next level",
    pointsMoreNeeded: "points more needed to unlock next level",
    myRewards: "My Rewards",
    applyCoupon: "Apply Coupon",
    expiresOn: "Expires on",
  },
  wishlist: {
    title: "Wishlist",
    heading: "Your products wishlist",
    empty: "No products saved yet.",
    remove: "Remove",
    new: "NEW",
  },
  logout: "Logout",
};

const accountVi = {
  title: "Tài khoản",
  subtitle: "Đăng nhập hoặc tạo tài khoản để quản lý đơn hàng và danh sách yêu thích.",
  dashboard: {
    greetingPrefix: "Xin chào",
    notYou: "không phải",
    description: "Từ bảng điều khiển tài khoản, bạn có thể xem đơn hàng gần đây, quản lý địa chỉ giao hàng và thanh toán, đồng thời chỉnh sửa mật khẩu và thông tin tài khoản.",
  },
  orders: "Đơn hàng",
  ordersPage: {
    empty: "Bạn chưa có đơn hàng nào.",
    browseProducts: "Xem sản phẩm",
    order: "Đơn hàng",
    placedOn: "Đặt vào",
    total: "Tổng cộng",
  },
  addresses: {
    title: "Địa chỉ",
    billingAddress: "Địa chỉ thanh toán",
    shippingAddress: "Địa chỉ giao hàng",
    defaultNotice: "Các địa chỉ sau sẽ được sử dụng mặc định ở trang thanh toán.",
    edit: "Sửa",
    add: "Thêm",
    notSet: "Bạn chưa thiết lập loại địa chỉ này.",
    firstName: "Tên",
    lastName: "Họ",
    companyName: "Tên công ty (không bắt buộc)",
    countryRegion: "Quốc gia / Khu vực",
    streetAddress: "Địa chỉ đường",
    apartment: "Căn hộ, phòng, đơn vị, v.v. (không bắt buộc)",
    townCity: "Quận / Thành phố",
    state: "Tỉnh / Bang",
    postCodeZip: "Mã bưu chính",
    phone: "Số điện thoại",
    save: "Lưu địa chỉ",
    saving: "Đang lưu...",
    saved: "Đã lưu địa chỉ.",
    failed: "Không thể lưu địa chỉ",
  },
  paymentMethods: {
    title: "Phương thức thanh toán",
    add: "Thêm phương thức thanh toán",
    empty: "Chưa có phương thức thanh toán nào.",
    endingIn: "kết thúc bằng",
    expires: "Hết hạn",
    setDefault: "Đặt mặc định",
    default: "Mặc định",
    remove: "Xóa",
    hideForm: "Ẩn biểu mẫu thanh toán",
    addMethod: "Thêm phương thức thanh toán",
    save: "Lưu phương thức thanh toán",
    saving: "Đang lưu...",
    failedAdd: "Không thể thêm phương thức thanh toán",
    failedRemove: "Không thể xóa phương thức thanh toán",
    failedUpdate: "Không thể cập nhật phương thức thanh toán",
    cardholderName: "Tên chủ thẻ",
    brand: "Thương hiệu",
    cardNumber: "Số thẻ",
    expiryMonth: "Tháng hết hạn",
    expiryYear: "Năm hết hạn",
  },
  accountDetails: {
    title: "Chi tiết tài khoản",
    firstName: "Tên",
    lastName: "Họ",
    displayName: "Tên hiển thị",
    displayNameHelp: "Tên này sẽ được hiển thị trong khu vực tài khoản và trong đánh giá.",
    gender: "Danh xưng",
    email: "Địa chỉ email",
    passwordChange: "Đổi mật khẩu",
    currentPassword: "Mật khẩu hiện tại (để trống nếu không đổi)",
    newPassword: "Mật khẩu mới (để trống nếu không đổi)",
    confirmNewPassword: "Xác nhận mật khẩu mới",
    birthday: "Ngày sinh (không bắt buộc)",
    save: "Lưu thay đổi",
    saving: "Đang lưu...",
    saved: "Đã cập nhật chi tiết tài khoản.",
    failed: "Không thể cập nhật tài khoản",
    genderMs: "Cô/Bà",
    genderMrs: "Bà",
    genderMr: "Ông",
    genderNot: "Không muốn cho biết",
  },
  pointsAndRewards: {
    title: "Điểm và phần thưởng",
    myPoints: "Điểm của tôi",
    availablePoints: "Điểm khả dụng",
    redeemedPoints: "Điểm đã đổi",
    usedRewards: "Phần thưởng đã dùng",
    rewardsValue: "giá trị phần thưởng",
    myLevels: "Cấp độ của tôi",
    currentLevel: "Cấp độ hiện tại",
    nextLevel: "Cấp độ tiếp theo",
    pointsMoreNeeded: "điểm nữa để mở khóa cấp độ tiếp theo",
    myRewards: "Phần thưởng của tôi",
    applyCoupon: "Áp dụng mã",
    expiresOn: "Hết hạn vào",
  },
  wishlist: {
    title: "Danh sách yêu thích",
    heading: "Sản phẩm yêu thích của bạn",
    empty: "Bạn chưa lưu sản phẩm nào.",
    remove: "Xóa",
    new: "MỚI",
  },
  logout: "Đăng xuất",
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
    },
    home: {
      featuredTitle: "Featured Products",
      categoriesTitle: "Shop By Category",
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
      productInformation: "Product Information",
    },
    account: accountEn,
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is currently empty.",
    },
    wishlist: {
      title: "Wishlist",
      empty: "No items saved yet.",
    },
    filter: {
      sortBy: "Sort by",
      popular: "Most Popular",
      newest: "Newest",
      priceAsc: "Price: low to high",
      priceDesc: "Price: high to low",
      nameAsc: "Name: A to Z",
      nameDesc: "Name: Z to A",
      color: "Color",
      size: "Size",
      common: "Filters",
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
    },
    home: {
      featuredTitle: "Sản phẩm nổi bật",
      categoriesTitle: "Mua sắm theo danh mục",
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
      productInformation: "Thông tin sản phẩm",
    },
    account: accountVi,
    cart: {
      title: "Giỏ hàng",
      empty: "Giỏ hàng của bạn đang trống.",
    },
    wishlist: {
      title: "Danh sách yêu thích",
      empty: "Bạn chưa lưu sản phẩm nào.",
    },
    filter: {
      sortBy: "Sắp xếp theo",
      popular: "Phổ biến nhất",
      newest: "Mới nhất",
      priceAsc: "Giá: thấp đến cao",
      priceDesc: "Giá: cao đến thấp",
      nameAsc: "Tên sản phẩm: A tới Z",
      nameDesc: "Tên sản phẩm: Z tới A",
      color: "Màu sắc",
      size: "Kích cỡ",
      common: "Bộ lọc",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
