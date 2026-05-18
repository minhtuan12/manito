import type { Locale } from "@/types/domain";
import Inside from 'assets/images/manito-inside-manito.webp';
import Soft from 'assets/images/manito-soft-light.webp';
import Moment from 'assets/images/manito-splendid-silk-moment.webp';
import Loyalty from 'assets/images/manito-loyalty-club.webp';

export type LocalizedString = Record<Locale, string>;

export type AboutNavLink = {
  id: string;
  heading: LocalizedString;
  href: string;
  image: any;
};

export type AboutSection = {
  title?: LocalizedString;
  eyebrow?: LocalizedString;
  body: LocalizedString;
  image?: string;
  imageAlt?: string;
};

export type AboutPageContent = {
  title: LocalizedString;
  subtitle?: LocalizedString;
  heroImage: string;
  heroAlt: string;
  intro: LocalizedString;
  sections: AboutSection[];
};

export const aboutNavLinks: AboutNavLink[] = [
  {
    id: "inside-yamopad",
    heading: { en: "Inside Yamopad", vi: "Bên Trong Yamopad" },
    href: "/inside-yamopad",
    image: 'https://manitosilk.com/wp-content/uploads/manito-inside-manito-banner.webp?id=26850',
  },
  {
    id: "soft-light",
    heading: { en: "Soft Light®", vi: "Soft Light®" },
    href: "/soft-light",
    image: 'https://manitosilk.com/wp-content/uploads/soft-light.jpeg?id=5042',
  },
  {
    id: "splendid-silk-moments",
    heading: { en: "Splendid Silk Moments", vi: "Khoảnh Khắc Lụa Rực Rỡ" },
    href: "/splendid-silk-moments",
    image: 'https://manitosilk.com/wp-content/uploads/%E7%94%BB%E6%9D%BF-1-2.jpg?id=22334',
  },
  {
    id: "yamopad-loyalty-club",
    heading: { en: "Yamopad Loyalty Club", vi: "Câu Lạc Bộ Yamopad" },
    href: "https://manitosilk.com/wp-content/uploads/manito-loyalty-club-banner.webp?id=26847",
    image: Loyalty,
  },
];

export const aboutPages: Record<string, AboutPageContent> = {
  "inside-yamopad": {
    title: { en: "Inside Yamopad", vi: "Bên Trong Yamopad" },
    subtitle: { en: "Partner With Nature And Introduce Aesthetic Inspiration Of Fluidity Into Life", vi: "Hòa Mình Với Thiên Nhiên Và Đưa Nguồn Cảm Hứng Thẩm Mỹ Về Sự Uyển Chuyển Vào Cuộc Sống" },
    heroImage: "https://manitosilk.com/wp-content/uploads/manito-inside-manito-banner.webp?id=26850",
    heroAlt: "Inside Yamopad hero",
    intro: {
      en: "Inspired by the stillness of nature and the intimacy of home, Yamopad approaches silk as a way of living. This page follows the source structure: heritage, material philosophy, and the quiet discipline behind each collection.",
      vi: "Lấy cảm hứng từ sự tĩnh lặng của thiên nhiên và cảm giác thân thuộc của tổ ấm, Yamopad tiếp cận lụa như một phong cách sống. Trang này bám theo cấu trúc gốc: di sản, triết lý chất liệu và sự chỉn chu phía sau mỗi bộ sưu tập.",
    },
    sections: [
      {
        eyebrow: { en: "Origin", vi: "Nguồn Cội" },
        title: { en: "An Unwavering Pursuit Of Purity", vi: "Hành Trình Kiên Định Theo Đuổi Sự Thuần Khiết" },
        body: {
          en: "The original page frames the brand around purity, nature, and calm luxury. Here, that idea is preserved through a spacious editorial block, restrained typography, and a single atmospheric visual anchor.",
          vi: "Trang gốc định hình thương hiệu xoay quanh sự thuần khiết, thiên nhiên và vẻ sang trọng tĩnh lặng. Tại đây, tinh thần đó được giữ lại bằng bố cục biên tập thoáng, typography tiết chế và một điểm nhấn hình ảnh giàu cảm xúc.",
        },
        image: "/assets/images/manitosilk-best-seller.jpg",
        imageAlt: "Yamopad purity story",
      },
      {
        title: { en: "Artisan Silk", vi: "Nghệ Thuật Chế Tác Lụa" },
        body: {
          en: "Inside the source experience, craft is treated as a patient practice rather than a slogan. We echo that by pairing close-up imagery with long-form copy about careful finishing, tactile softness, and the discipline of premium silk making.",
          vi: "Trong trải nghiệm nguồn, tay nghề được xem như một quá trình bền bỉ thay vì một khẩu hiệu. Phần này giữ lại tinh thần đó bằng hình ảnh cận cảnh cùng đoạn mô tả dài về hoàn thiện tinh tế, độ mềm chạm tay và kỷ luật trong chế tác lụa cao cấp.",
        },
        image: "/assets/images/manito-silk-womens-dress.webp",
        imageAlt: "Artisan silk",
      },
      {
        title: { en: "For A More Sustainable Future", vi: "Hướng Đến Một Tương Lai Bền Vững Hơn" },
        body: {
          en: "The source page closes with trust-building proof around standards and responsible making. This implementation keeps that role focused and quiet, making it easy to scan without disturbing the tone of the rest of the page.",
          vi: "Trang gốc khép lại bằng lớp thông tin tạo niềm tin về tiêu chuẩn và sản xuất có trách nhiệm. Bản dựng này giữ đúng vai trò đó, trình bày gọn để dễ đọc mà không phá vỡ nhịp điệu của toàn trang.",
        },
        image: "/assets/images/manitosilk-bedding-new.jpg",
        imageAlt: "Sustainable future",
      },
    ],
  },
  "soft-light": {
    title: { en: "Soft Light®", vi: "Soft Light®" },
    subtitle: { en: "Extraordinary Fabric Presented With Craftsmanship Excellence", vi: "Chất Liệu Phi Thường Được Tôn Vinh Bằng Tay Nghề Tinh Xảo" },
    heroImage: "https://manitosilk.com/wp-content/uploads/soft-light.jpeg?id=5042",
    heroAlt: "Soft Light hero",
    intro: {
      en: "The source page introduces Soft Light® as the signature fabric expression of the brand: breathable, lustrous, and quietly radiant. This version follows that editorial rhythm with image-led sections and long-reading blocks.",
      vi: "Trang gốc giới thiệu Soft Light® như biểu đạt chất liệu đặc trưng của thương hiệu: thoáng nhẹ, óng ánh và rạng rỡ một cách tinh tế. Phiên bản này bám theo nhịp kể biên tập đó bằng các phần nội dung dẫn dắt bởi hình ảnh và đoạn đọc dài.",
    },
    sections: [
      {
        eyebrow: { en: "Discover | Innovation", vi: "Khám Phá | Đổi Mới" },
        title: { en: "Pearlescent Radiance", vi: "Ánh Ngọc Trai Dịu Nhẹ" },
        body: {
          en: "From the public source copy: Soft Light® is defined by a pearlescent glow and breathable natural silk quality. That positioning is preserved here, with a strong hero image and minimal chrome around the text.",
          vi: "Theo nội dung công khai từ trang nguồn: Soft Light® được định nghĩa bởi độ óng ánh như ngọc trai và cảm giác thoáng nhẹ của lụa tự nhiên. Bản dựng này giữ nguyên định vị đó bằng hình ảnh chủ đạo mạnh và phần chữ ít chi tiết thừa.",
        },
        image: "/assets/images/manito-bedding-sets-collection.webp",
        imageAlt: "Pearlescent silk",
      },
      {
        title: { en: "Supreme Crude Material", vi: "Nguyên Liệu Thô Tuyển Chọn" },
        body: {
          en: "The original page leans heavily on the relationship between raw material selection and final touch. This section keeps that emphasis through a simple two-column composition and generous negative space.",
          vi: "Trang gốc nhấn mạnh mối liên hệ giữa khâu chọn nguyên liệu và cảm nhận thành phẩm. Phần này giữ trọng tâm ấy bằng bố cục hai cột đơn giản và khoảng trắng rộng rãi.",
        },
        image: "/assets/images/manito-bedding-pillowcase-collection.webp",
        imageAlt: "Supreme silk material",
      },
      {
        title: { en: "Grace, Breathability, And Color Depth", vi: "Thanh Nhã, Thoáng Nhẹ Và Độ Sâu Màu Sắc" },
        body: {
          en: "Soft Light® on the source site balances luxury with ease. The implementation mirrors that balance by using descriptive sections instead of busy widgets, keeping the page calm and premium.",
          vi: "Soft Light® trên trang nguồn cân bằng giữa xa xỉ và sự dễ chịu. Bản triển khai này phản chiếu điều đó bằng các khối mô tả rõ ràng thay vì widget rối mắt, giữ tổng thể yên tĩnh và cao cấp.",
        },
        image: "/assets/images/manitosilk-women-new-collection.jpg",
        imageAlt: "Soft light colors",
      },
    ],
  },
  "splendid-silk-moments": {
    title: { en: "Splendid Silk Moments", vi: "Khoảnh Khắc Lụa Rực Rỡ" },
    subtitle: { en: "Witness Every Silk Moment", vi: "Chứng Kiến Từng Khoảnh Khắc Của Lụa" },
    heroImage: "https://manitosilk.com/wp-content/uploads/%E7%94%BB%E6%9D%BF-1-2.jpg?id=22334",
    heroAlt: "Splendid silk moments hero",
    intro: {
      en: "The source page is a story-led archive of collaborations, launches, and editorial moments. This implementation recreates that role as a clean timeline of brand milestones with image-supported feature blocks.",
      vi: "Trang nguồn là một kho lưu trữ giàu tính kể chuyện về các màn hợp tác, ra mắt và khoảnh khắc biên tập của thương hiệu. Bản dựng này tái tạo đúng vai trò đó như một dòng thời gian các cột mốc với những khối nội dung hỗ trợ bằng hình ảnh.",
    },
    sections: [
      {
        title: { en: "YAMOPAD Launched at Harrods London", vi: "YAMOPAD Ra Mắt Tại Harrods London" },
        body: {
          en: "December 2025. The public source highlights a curated Harrods presentation that opens a new chapter in luxury living. This section keeps that headline and date-forward storytelling format.",
          vi: "Tháng 12/2025. Nguồn công khai nhấn mạnh màn giới thiệu được tuyển chọn kỹ lưỡng tại Harrods, mở ra một chương mới của phong cách sống xa xỉ. Phần này giữ nguyên dạng kể chuyện bằng tiêu đề và mốc thời gian.",
        },
        image: "/assets/images/manitosilk-women-pajama-collection.jpg",
        imageAlt: "Harrods launch",
      },
      {
        title: { en: "YAMOPAD × WEDGWOOD", vi: "YAMOPAD × WEDGWOOD" },
        body: {
          en: "April 2025. The source frames this collaboration as a meeting of spring-summer silk and heritage porcelain. We preserve that tone with a restrained editorial card rather than a product-heavy layout.",
          vi: "Tháng 4/2025. Trang nguồn mô tả sự hợp tác này như cuộc gặp giữa lụa xuân hè và di sản sứ cao cấp. Bản dựng giữ tinh thần đó bằng một thẻ biên tập tiết chế thay vì bố cục nặng tính bán hàng.",
        },
        image: "/assets/images/manitosilk-sweetie-new-600x731.jpg",
        imageAlt: "Wedgwood collaboration",
      },
      {
        title: { en: "Press, Events, And Cultural Collaborations", vi: "Báo Chí, Sự Kiện Và Hợp Tác Văn Hóa" },
        body: {
          en: "The public archive also references J Hotel, Rolls-Royce, Raffles, Naera Hotel Xitang, and the Academy Awards. Instead of compressing them into noise, this page keeps them in a readable milestone sequence.",
          vi: "Kho lưu trữ công khai cũng nhắc tới J Hotel, Rolls-Royce, Raffles, Naera Hotel Xitang và Academy Awards. Thay vì nén chúng thành một khối rối mắt, trang này giữ chúng trong một chuỗi cột mốc dễ theo dõi.",
        },
        image: "/assets/images/manito-lifestyle-fragrances-collection.webp",
        imageAlt: "Press and events",
      },
    ],
  },
  "yamopad-loyalty-club": {
    title: { en: "Yamopad Loyalty Club", vi: "Câu Lạc Bộ Yamopad" },
    subtitle: { en: "Welcome to your YAMOPAD", vi: "Chào mừng đến với YAMOPAD của bạn" },
    heroImage: "https://manitosilk.com/wp-content/uploads/manito-loyalty-club-banner.webp?id=26847",
    heroAlt: "Yamopad loyalty club hero",
    intro: {
      en: "The source loyalty page combines tier progression, benefits, redemption, and newsletter-driven conversion. This version keeps that structure while fitting the current codebase and visual system.",
      vi: "Trang loyalty gốc kết hợp hành trình thăng hạng, quyền lợi, đổi thưởng và lớp chuyển đổi gắn với newsletter. Phiên bản này giữ nguyên cấu trúc đó nhưng phù hợp với codebase và hệ thị giác hiện tại.",
    },
    sections: [
      {
        title: { en: "Member’s Journey", vi: "Hành Trình Thành Viên" },
        body: {
          en: "The public source moves from Loyalty Member to Silver, Gold, and Platinum tiers. We preserve that hierarchy through vertically paced content and a neutral premium palette.",
          vi: "Nguồn công khai dẫn dắt từ Loyalty Member tới Silver, Gold và Platinum. Bản dựng giữ nguyên thứ bậc đó bằng nhịp nội dung theo chiều dọc và bảng màu trung tính cao cấp.",
        },
        image: "/assets/images/Bestie-Gift-Box-600x731.webp",
        imageAlt: "Member journey",
      },
      {
        title: { en: "Reward Points Redemption", vi: "Đổi Điểm Thưởng" },
        body: {
          en: "The source promise is simple: earn 1 point for every $1 spent and redeem points for valuable coupons. This section keeps that message prominent and easy to scan.",
          vi: "Cam kết ở trang nguồn rất rõ: nhận 1 điểm cho mỗi 1 đô la chi tiêu và đổi điểm lấy coupon giá trị. Phần này giữ thông điệp đó nổi bật và dễ đọc.",
        },
        image: "/assets/images/manito-gifts-customized-gifts-collection.webp",
        imageAlt: "Reward redemption",
      },
      {
        title: { en: "Exclusive Member Benefits", vi: "Đặc Quyền Thành Viên" },
        body: {
          en: "Advance access, birthday coupons, free return and exchange, and custom embroidery all appear on the source page. They are retained here as focused editorial sections rather than dense table UI.",
          vi: "Quyền mua trước, coupon sinh nhật, đổi trả miễn phí và thêu tùy chỉnh đều xuất hiện trên trang nguồn. Chúng được giữ lại tại đây dưới dạng các phần biên tập tập trung thay vì bảng biểu dày đặc.",
        },
        image: "/assets/images/manitosilk-best-seller.jpg",
        imageAlt: "Member benefits",
      },
    ],
  },
};
