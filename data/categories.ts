import type { Category } from "@/types/domain";
import CatImage from '@/assets/images/Wedding-Womens-Silk-V-Neck-Nightdress1-300x450.jpg';
import Banner from '@/assets/images/MANITO-Women-Pajama-Set-Banner.webp';

export const categories: Category[] = [
  {
    id: "cat-women",
    slug: "women",
    title: { en: "Women", vi: "Nữ" },
    description: {
      en: "Silk pajamas, robes, camisoles and elegant loungewear for women.",
      vi: "Đồ ngủ lụa, áo choàng, áo hai dây và trang phục mặc nhà cao cấp cho nữ."
    },
    coverImage: CatImage,
    banner: Banner,
  },
  {
    id: "cat-men",
    slug: "men",
    title: { en: "Men", vi: "Nam" },
    description: {
      en: "Premium silk sets and robes tailored for modern menswear comfort.",
      vi: "Bộ lụa và áo choàng cao cấp cho sự thoải mái và thanh lịch của nam giới."
    },
    coverImage: CatImage,
    banner: Banner,
  },
  {
    id: "cat-kids",
    slug: "kids",
    title: { en: "Kids", vi: "Trẻ em" },
    description: {
      en: "Soft silk products for babies and children, from sleepwear to bedding.",
      vi: "Sản phẩm lụa mềm mại cho em bé và trẻ nhỏ, từ đồ ngủ đến chăn ga."
    },
    coverImage: CatImage,
    banner: Banner,
  },
  {
    id: "cat-bedding",
    slug: "bedding",
    title: { en: "Bedding", vi: "Chăn ga gối" },
    description: {
      en: "Mulberry silk pillowcases and bedding sets crafted for better sleep.",
      vi: "Vỏ gối và bộ chăn ga lụa tơ tằm cao cấp cho giấc ngủ chất lượng."
    },
    coverImage: CatImage,
    banner: Banner,
  }
];
