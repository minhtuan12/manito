import { notFound } from "next/navigation";
import { AboutPageTemplate } from "@/components/about/AboutPageTemplate";
import { aboutPages } from "@/lib/about-content";
import { ensureLocale } from "@/lib/i18n";
import { Box, Grid2, Typography } from "@mui/material";
import Image from "next/image";

type PageProps = {
  params: Promise<{ locale: string }>;
};

function Item({ reversed, locale, title, desc, image }: any) {
  if (reversed) {
    return (
      <Box mt={10} color={"#7a7d81"} px={8}>
        <Grid2 container bgcolor={"#e8e7e2"} height={{ xs: 1400, lg: 600 }}>
          <Grid2
            size={{ xs: 12, lg: 6 }}
            px={6}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Typography
              fontWeight={900}
              fontSize={40}
              color="#7a7d81"
              textAlign={"center"}
            >
              {title[locale]}
            </Typography>
            <Typography
              fontSize={18}
              color="#7a7d81"
              textAlign={"center"}
              fontWeight={600}
              mt={2}
            >
              {desc[locale]}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }} position={"relative"}>
            <Image src={image} alt="inside" fill />
          </Grid2>
        </Grid2>
      </Box>
    );
  }
  return (
    <Box mt={10} color={"#7a7d81"} px={8}>
      <Grid2 container bgcolor={"#e8e7e2"} height={{ xs: 1400, lg: 600 }}>
        <Grid2 size={{ xs: 12, lg: 6 }} position={"relative"}>
          <Image src={image} alt="inside" fill />
        </Grid2>
        <Grid2
          size={{ xs: 12, lg: 6 }}
          px={6}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography
            fontWeight={900}
            fontSize={40}
            color="#7a7d81"
            textAlign={"center"}
          >
            {title[locale]}
          </Typography>
          <Typography
            fontSize={18}
            color="#7a7d81"
            textAlign={"center"}
            fontWeight={600}
            mt={2}
          >
            {desc[locale]}
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default async function SplendidSilkMomentsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const content = aboutPages["splendid-silk-moments"];

  const contents = [
    {
      image: "https://manitosilk.com/wp-content/uploads/1-115.jpg",
      title: {
        en: "YAMOPAD Shanghai Flagship Store Opening",
        vi: "Khai trương cửa hàng Flagship YAMOPAD Thượng Hải",
      },
      desc: {
        en: "Jennifer May, Canadian Ambassador to China, and Dave Murphy, Canadian Consul General in Shanghai, attended the opening of YAMOPAD Xintiandi Flagship Store in Shanghai.",
        vi: "Bà Jennifer May, Đại sứ Canada tại Trung Quốc, và ông Dave Murphy, Tổng Lãnh sự Canada tại Thượng Hải, đã tham dự lễ khai trương cửa hàng flagship YAMOPAD Xintiandi tại Thượng Hải.",
      },
    },
    {
      image: "https://manitosilk.com/wp-content/uploads/26161731665142_.pic_.jpg",
      title: {
        en: "YAMOPAD × CREED",
        vi: "YAMOPAD × CREED",
      },
      desc: {
        en: "YAMOPAD with CREED brings the MBTI fragrance workshop to YAMOPAD’s boutique, starting a silk journey.",
        vi: "YAMOPAD hợp tác với CREED mang đến buổi hội thảo về nước hoa MBTI tại cửa hàng YAMOPAD, khởi đầu một hành trình khám phá hương thơm lụa.",
      },
    },
    {
      image: "https://manitosilk.com/wp-content/uploads/YAMOPAD-%C3%97-Naera-Hotel-Xitang-240718-1.jpg",
      title: {
        en: "YAMOPAD × Naera Hotel Xitang",
        vi: "YAMOPAD × Khách sạn Naera Xitang",
      },
      desc: {
        en: "As Mother’s Day is approaching, YAMOPAD and Naera Hotel Xitang invite families from all walks of life to enjoy a wonderful parent-child time. In the organic manor of Naera Hotel Xitang, guests wore The YAMOPAD Princess Series. Mothers and children fed lambs and picked fruits on the lawn. This cooperation created wonderful family memories and luxurious Silk Moments for the guests.",
        vi: "Nhân dịp Ngày của Mẹ đang đến gần, YAMOPAD và Khách sạn Naera Xitang trân trọng mời các gia đình từ mọi tầng lớp xã hội cùng tận hưởng những khoảnh khắc tuyệt vời bên con cái. Tại trang viên hữu cơ của Khách sạn Naera Xitang, khách mời được diện những bộ trang phục thuộc dòng YAMOPAD Princess Series. Các bà mẹ và con cái cùng nhau cho cừu ăn và hái trái cây trên bãi cỏ. Sự hợp tác này đã tạo nên những kỷ niệm gia đình tuyệt vời và những khoảnh khắc lụa sang trọng cho khách mời.",
      },
    },
    {
      image: "https://manitosilk.com/wp-content/uploads/5c94f7bf24289ce1ccef8f05782a3ca-1024x852.jpg",
      title: {
        en: "YAMOPAD Wedding Salon 2023",
        vi: "Triển lãm cưới YAMOPAD 2023",
      },
      desc: {
        en: "YAMOPAD collaborates with Amanyangyun for this year’s Wedding Salon, creating a truly exceptional wedding space where the beauty of nature comes to life amidst countless clouds and water.",
        vi: "YAMOPAD hợp tác với Amanyangyun cho Triển lãm cưới năm nay, tạo ra một không gian cưới thực sự đặc biệt, nơi vẻ đẹp của thiên nhiên sống động giữa vô vàn mây và nước.",
      },
    },
    {
      image: "https://manitosilk.com/wp-content/uploads/celebrities2-1024x852.jpg",
      title: {
        en: "THE ACADEMY AWARDS",
        vi: "GIẢI THƯỞNG OSCAR",
      },
      desc: {
        en: "For two consecutive years, YAMOPAD sponsored the delicate souvenir for the Academy Award and received high praise from celebrities such as Julianna Margulies. Our exquisite and sophisticated souvenirs have been cherished by Academy Award recipients and presenters alike, embodying the highest standards of luxury and sophistication.",
        vi: "Trong hai năm liên tiếp, YAMOPAD đã tài trợ món quà lưu niệm tinh tế cho Lễ trao giải Oscar và nhận được nhiều lời khen ngợi từ các ngôi sao nổi tiếng như Julianna Margulies. Những món quà lưu niệm sang trọng và đẳng cấp của chúng tôi được cả người nhận giải và người dẫn chương trình Oscar trân trọng, thể hiện tiêu chuẩn cao nhất về sự sang trọng và tinh tế.",
      },
    },
  ];

  if (!content) {
    notFound();
  }

  return (
    <AboutPageTemplate locale={locale} content={content}>
      {contents.map((c: any, index: any) => (
        <Item
          reversed={index % 2 === 0}
          locale={locale}
          image={c.image}
          title={c.title}
          desc={c.desc}
          key={index}
        />
      ))}
    </AboutPageTemplate>
  );
}
