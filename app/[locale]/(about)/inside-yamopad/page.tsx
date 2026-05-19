import { notFound } from "next/navigation";
import { AboutPageTemplate } from "@/components/about/AboutPageTemplate";
import { aboutPages } from "@/lib/about-content";
import { ensureLocale } from "@/lib/i18n";
import { Box, Grid, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import Inside from "../../../../assets/images/Inside-MANITO1-1-600x749.jpg";
import SilkCollection from "../../../../assets/images/Inside-MANITO2-1.jpg";
import last from "../../../../assets/images/Inside-MANITO3.jpg";
import a from "../../../../assets/images/Inside-MANITO8-1-800x524.jpg";
import b from "../../../../assets/images/Inside-MANITO9-1-800x524.jpg";
import c from "../../../../assets/images/Inside-MANITO10-1-800x524.jpg";
import d from "../../../../assets/images/Inside-MANITO11-1-800x524.jpg";
import e from "../../../../assets/images/Inside-MANITO12-1-800x524.jpg";
import g from "../../../../assets/images/Inside-MANITO13-1-800x524.jpg";
import h from "../../../../assets/images/Inside-MANITO14-1-800x524.jpg";
import i from "../../../../assets/images/Inside-MANITO15-1-800x524.jpg";
import k from "../../../../assets/images/Inside-MANITO16-1-800x524.jpg";
import Timeline from "./Timeline";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function InsideYamopadPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const content = aboutPages["inside-yamopad"];
  const timeline = [
    {
      image: a,
      en: '2008: YAMOPAD was founded in Vancouver, Canada, North America.',
      vi: '2008: YAMOPAD được thành lập tại Vancouver, Canada, Bắc Mỹ.'
    },
    {
      image: b,
      en: '2009: YAMOPAD’s first flagship store in Canada officially opened at 1822 West 1st Avenue, Vancouver.',
      vi: '2009: Cửa hàng flagship đầu tiên của YAMOPAD tại Canada chính thức khai trương tại địa chỉ 1822 West 1st Avenue, Vancouver.'
    },
    {
      image: c,
      en: '2012: YAMOPAD became the partner for the Independent Spirit Awards dinner in the USA.',
      vi: '2012: YAMOPAD trở thành đối tác của bữa tiệc trao giải Independent Spirit Awards tại Hoa Kỳ.'
    },
    {
      image: d,
      en: '2018: YAMOPAD became the official partner of the world-renowned QUEEN CHARLOTTE’S BALL.',
      vi: '2018: YAMOPAD trở thành đối tác chính thức của sự kiện dạ hội QUEEN CHARLOTTE’S BALL nổi tiếng thế giới.'
    },
    {
      image: e,
      en: '2019: YAMOPAD became the Global Official VIP Partner for the world-class art fairs FRIEZE LONDON & FRIEZE MASTERS.',
      vi: '2019: YAMOPAD trở thành Đối tác VIP Chính thức Toàn cầu cho các hội chợ nghệ thuật đẳng cấp thế giới FRIEZE LONDON & FRIEZE MASTERS.'
    },
    {
      image: g,
      en: '2019: YAMOPAD launched its exclusive proprietary Soft Light fabric.',
      vi: '2019: YAMOPAD ra mắt loại vải Soft Light độc quyền của mình.'
    },
    {
      image: h,
      en: '2022: Having passed strict testing for harmful substances, YAMOPAD successively obtained OEKO-TEX® STANDARD 100 certification and the MADE IN GREEN label.',
      vi: '2022: Sau khi vượt qua các bài kiểm tra nghiêm ngặt về chất độc hại, YAMOPAD đã liên tiếp đạt được chứng nhận OEKO-TEX® STANDARD 100 và nhãn hiệu MADE IN GREEN.'
    },
    {
      image: i,
      en: '2023: Canadian Ambassador to China, Jennifer May, and Canadian Consul General in Shanghai, Dave Murphy, visited YAMOPAD.',
      vi: '2023: Đại sứ Canada tại Trung Quốc, Jennifer May, và Tổng Lãnh sự Canada tại Thượng Hải, Dave Murphy, đã đến thăm YAMOPAD.'
    },
    {
      image: k,
      en: '2025: YAMOPAD entered the renowned British luxury department store Harrods London.',
      vi: '2025: YAMOPAD gia nhập chuỗi cửa hàng bách hóa cao cấp nổi tiếng Harrods London của Anh.'
    },
  ];
  const materials = [
    {
      image: 'https://manitosilk.com/wp-content/uploads/Inside-MANITO4-800x600.jpg',
      title: {
        en: 'Pure Silk',
        vi: 'Lụa Nguyên Chất',
      },
      desc: {
        en: 'Mulberry silk contains 18 amino acids that naturally calm and moisturize the skin. Its friction coefficient is among the lowest of all fibers. YAMOPAD’s exclusive Soft Light fabric harnesses these qualities for a uniquely refined wearing experience.',
        vi: 'Lụa tằm chứa 18 axit amin giúp làm dịu và dưỡng ẩm da một cách tự nhiên. Hệ số ma sát của lụa thuộc hàng thấp nhất trong tất cả các loại sợi vải. Chất liệu Soft Light độc quyền của YAMOPAD khai thác tối đa những đặc tính này, mang đến trải nghiệm mặc tinh tế và khác biệt.',
      }
    },
    {
      image: 'https://manitosilk.com/wp-content/uploads/Inside-MANITO5-1-scaled-800x600.jpg',
      title: {
        en: 'Silk Plus',
        vi: 'Lụa Nâng Cấp',
      },
      desc: {
        en: 'Beyond traditional weaving, YAMOPAD develops mulberry silk with enhanced skin benefits. Our hyaluronic acid micro-mist treatment releases moisturizing elements upon contact with skin, offering delicate care throughout the night.',
        vi: 'Vượt ra ngoài kỹ thuật dệt truyền thống, YAMOPAD phát triển lụa tằm với khả năng chăm sóc da vượt trội. Công nghệ xử lý vi sương axit hyaluronic độc quyền giúp giải phóng các dưỡng chất ẩm khi tiếp xúc với da, mang lại sự chăm sóc nhẹ nhàng suốt đêm dài.',
      }
    },
    {
      image: 'https://manitosilk.com/wp-content/uploads/Inside-MANITO6-scaled-800x600.jpg',
      title: {
        en: 'Silk Mix',
        vi: 'Lụa Pha Trộn',
      },
      desc: {
        en: 'YAMOPAD explores beyond pure silk — blending with modal for greater stretch, or with cashmere for luxurious warmth. These combinations transform loungewear into elegant options for autumn and winter outings.',
        vi: 'YAMOPAD khám phá những giới hạn mới ngoài lụa nguyên chất — kết hợp cùng sợi modal để tăng độ co giãn, hoặc phối với cashmere để tạo hơi ấm sang trọng. Những sự kết hợp này biến trang phục mặc nhà thành lựa chọn thanh lịch lý tưởng cho mùa thu và mùa đông.',
      }
    },
    {
      image: 'https://manitosilk.com/wp-content/uploads/Inside-MANITO7-scaled-800x600.jpg',
      title: {
        en: 'Silk Match',
        vi: 'Lụa Phối Hợp',
      },
      desc: {
        en: 'While preserving silk’s natural sheen and softness, YAMOPAD incorporates feathers, lace, and crystals into its designs.Each layered element reflects a thoughtful balance of visual beauty and wearing comfort.',
        vi: 'Trong khi vẫn giữ nguyên vẻ óng ánh và độ mềm mại tự nhiên của lụa, YAMOPAD khéo léo tích hợp lông vũ, ren và pha lê vào các thiết kế. Mỗi lớp chi tiết đều phản ánh sự cân bằng tinh tế giữa vẻ đẹp thị giác và sự thoải mái khi mặc.',
      }
    },
  ]

  if (!content) {
    notFound();
  }

  return (
    <AboutPageTemplate locale={locale} content={content}>
      <Box px={{ xs: 10, lg: 16 }} py={15}>
        <Grid2
          container
          justifyContent={'center'}
          alignItems={"center"}
        >
          <Image
            src={Inside}
            alt="inside"
            width={0}
            height={0}
            className="w-auto h-auto"
          />
          <Grid2 size={6} px={6}>
            <Typography fontWeight={900} fontSize={40} color="#7a7d81" textAlign={'center'}>
              {locale === "en"
                ? "An unwavering pursuit of craftsmanship"
                : "Kiên trì theo đuổi sự tinh xảo trong nghề thủ công"}
            </Typography>
            <Typography fontSize={18} color="#7a7d81" textAlign={'center'} fontWeight={600} mt={2}>
              {locale === "en"
                ? "Conceived upon shimmering lakes, tranquil forests and snowcapped mountains – YAMOPAD’s origin in Vancouver began with an intention to advocate for nature. Our founders, Mr Kenmuir and the Zhang Family, sought to continue a lineage of meticulous artistry working with mulberry silk and weaving it with sophisticated functional luxury."
                : "Được thai nghén trên những hồ nước lấp lánh, những khu rừng yên tĩnh và những ngọn núi phủ tuyết trắng – nguồn gốc của YAMOPAD tại Vancouver bắt đầu với ý định bảo vệ thiên nhiên. Những người sáng lập của chúng tôi, ông Kenmuir và gia đình Zhang, mong muốn tiếp tục truyền thống nghệ thuật tỉ mỉ trong việc sử dụng tơ tằm và dệt nên những sản phẩm sang trọng, tinh tế và tiện dụng."}
            </Typography>
          </Grid2>
        </Grid2>

        <Grid2 textAlign={'center'} mt={10} px={18}>
          <Typography fontWeight={600} fontSize={30} color="#7a7d81" textAlign={'center'} textTransform={'uppercase'}>
            {locale === "en"
              ? "The second skin of the human body"
              : "Lớp da thứ hai của cơ thể người"}
          </Typography>
          <Typography fontSize={18} color="#7a7d81" textAlign={'center'} fontWeight={600} mt={2}>
            {locale === "en"
              ? "In his years consulting for businesses in different industries, Mr Kenmuir’s deep appreciation for mulberry silk derived from an opportunity to work with a Japanese cosmetic brand. Comprised of natural protein fibres such as keratin and collagen, while rich with 18 types of amino acids – the benefit of silk is known as “the second skin of the human body”. Its transformational healing properties were the perfect prescription to alleviate skin issues experienced by baby boomers such as Mr Kenmuir himself."
              : "Trong những năm làm tư vấn cho các doanh nghiệp thuộc nhiều ngành khác nhau, ông Kenmuir đã có sự trân trọng sâu sắc đối với tơ tằm từ cơ hội làm việc với một thương hiệu mỹ phẩm Nhật Bản. Được cấu tạo từ các sợi protein tự nhiên như keratin và collagen, đồng thời giàu 18 loại axit amin – lợi ích của tơ tằm được biết đến như “lớp da thứ hai của cơ thể con người”. Đặc tính chữa lành tuyệt vời của nó là giải pháp hoàn hảo để giảm bớt các vấn đề về da mà những người thuộc thế hệ Baby Boomer như chính ông Kenmuir gặp phải."}
          </Typography>
        </Grid2>

        <Timeline timeline={timeline} locale={locale} />

        <Grid2
          container
          justifyContent={'center'}
          alignItems={"center"}
          mt={10}
        >
          <Grid2 size={6} px={6}>
            <Typography fontWeight={900} fontSize={40} color="#7a7d81" textAlign={'center'}>
              {locale === "en"
                ? "A luxury home collection"
                : "Bộ sưu tập nhà sang trọng"}
            </Typography>
            <Typography fontSize={18} color="#7a7d81" textAlign={'center'} fontWeight={600} mt={2}>
              {locale === "en"
                ? "From planting mulberry trees and raising silkworms to establishing a silk reeling factory, the insistence on excellence is deeply rooted in the Zhang family legacy. Together in 2008, they developed a luxury home collection unrivalled in excellence for YAMOPAD’s launch, lavishly fashioned with only mulberry silk – a breathtaking aspiration to elevate sleep quality whilst leveraging the benefits of skin improvement and hair rejuvenation."
                : "Từ việc trồng cây dâu tằm và nuôi tằm đến việc thành lập nhà máy kéo sợi tơ, sự kiên định hướng đến sự hoàn hảo đã ăn sâu vào di sản của gia đình họ Trương. Cùng nhau vào năm 2008, họ đã phát triển một bộ sưu tập đồ dùng gia đình cao cấp với chất lượng tuyệt hảo cho sự ra mắt của YAMOPAD, được chế tác xa hoa chỉ với tơ tằm dâu – một khát vọng ngoạn mục nhằm nâng cao chất lượng giấc ngủ đồng thời tận dụng những lợi ích cải thiện làn da và trẻ hóa mái tóc."}
            </Typography>
          </Grid2>
          <Image
            src={SilkCollection}
            alt="inside"
            width={0}
            height={0}
            className="w-auto h-auto"
          />
        </Grid2>

        <Box mt={15} ml={-2}>
          <Typography fontSize={36} fontWeight={600} textAlign={'center'} color='#7a7d81'>
            {locale === 'en' ? 'Signature materials' : 'Tài liệu chữ ký'}
          </Typography>
          <Grid2 container size={12} display={'flex'} spacing={8} mt={2}>
            {materials.map(m => <Grid2 key={m.image} color={'#7a7d81'} size={{ xs: 12, md: 4, lg: 3 }}>
              <Image width={320} height={240} alt={m.title.en} src={m.image} />
              <Typography mt={1} maxWidth={'100%'} fontSize={20} fontWeight={700}>{m.title[locale]}</Typography>
              <Typography variant="subtitle1" maxWidth={'100%'} mt={1} fontSize={14} fontWeight={400}>{m.desc[locale]}</Typography>
            </Grid2>)}
          </Grid2>
        </Box>

        <Grid2
          container
          justifyContent={'center'}
          alignItems={"center"}
          mt={16}
        >
          <Image
            src={last}
            alt="inside"
            width={0}
            height={0}
            className="w-auto h-auto"
          />
          <Grid2 size={6} px={6}>
            <Typography fontWeight={900} fontSize={40} color="#7a7d81" textAlign={'center'}>
              {locale === "en"
                ? "Experience transparency, for a more sustainable future"
                : "Trải nghiệm sự minh bạch, vì một tương lai bền vững hơn"}
            </Typography>
            <Typography fontSize={18} color="#7a7d81" textAlign={'center'} fontWeight={600} mt={2}>
              {locale === "en"
                ? "YAMOPAD is certified by OEKO – TEX® STANDARD 100 and MADE IN GREEN. OEKO – TEX® STANDARD 100 is one of the world’s best-known labels for textiles tested for harmful substances. OEKO – TEX® MADE IN GREEN is a traceable product label for textiles that have been manufactured in environmentally friendly facilities under safe and socially responsible working conditions. OEKO – TEX® standards enable everyone to make responsible decisions and protect natural resources. Discover our products here and trace their entire textile value added."
                : "YAMOPAD được chứng nhận bởi OEKO – TEX® STANDARD 100 và MADE IN GREEN. OEKO – TEX® STANDARD 100 là một trong những nhãn hiệu nổi tiếng nhất thế giới dành cho hàng dệt may được kiểm tra các chất độc hại. OEKO – TEX® MADE IN GREEN là nhãn sản phẩm có thể truy xuất nguồn gốc dành cho hàng dệt may được sản xuất tại các cơ sở thân thiện với môi trường, trong điều kiện làm việc an toàn và có trách nhiệm xã hội. Tiêu chuẩn OEKO – TEX® cho phép mọi người đưa ra những quyết định có trách nhiệm và bảo vệ tài nguyên thiên nhiên. Khám phá các sản phẩm của chúng tôi tại đây và theo dõi toàn bộ giá trị gia tăng của hàng dệt may."}
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
    </AboutPageTemplate>
  );
}
