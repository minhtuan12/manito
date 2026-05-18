import { notFound } from "next/navigation";
import { AboutPageTemplate } from "@/components/about/AboutPageTemplate";
import { aboutPages } from "@/lib/about-content";
import { ensureLocale } from "@/lib/i18n";
import { Box, Grid2, Typography } from "@mui/material";
import A from "assets/images/Kh5EWekmzmbXxAPsoftlight1.webp";
import B from "assets/images/PXiQG524AWSs6Pjsoftlight2.webp";
import C from "assets/images/mMEdxnRGEZjMsMn图片9-1024x710.webp";
import D from "assets/images/ZDbsnssiH4MCSpwsoftlight3.jpg";
import Image from "next/image";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SoftLightPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const content = aboutPages["soft-light"];

  if (!content) {
    notFound();
  }

  return (
    <AboutPageTemplate locale={locale} content={content}>
      <Box mt={10} color={'#7a7d81'} px={8}>
        <Grid2 container bgcolor={'#e8e7e2'} height={600}>
          <Grid2 size={{ xs: 12, lg: 6 }} px={6} alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
            <Typography fontWeight={900} fontSize={40} color="#7a7d81" textAlign={'center'}>
              {locale === "en"
                ? "Discover｜Innovation"
                : "Khám phá | Đổi mới"}
            </Typography>
            <Typography fontSize={18} color="#7a7d81" textAlign={'center'} fontWeight={600} mt={2}>
              {locale === "en"
                ? "From premium silk materials to the finest techniques, YAMOPAD is committed to practicing and improving heritage craftsmanship to create the aesthetics of fine living: the result is our extraordinary Soft Light®. A product of grace and beauty, Soft Light® has the defining pearlescent radiance and easy breathable quality of natural silk as well as a wide variety of colors."
                : "Từ chất liệu lụa cao cấp đến kỹ thuật chế tác tinh xảo nhất, YAMOPAD cam kết duy trì và nâng cao nghề thủ công truyền thống để tạo nên vẻ đẹp thẩm mỹ của cuộc sống thượng lưu: kết quả là sản phẩm Soft Light® đặc biệt của chúng tôi. Là một sản phẩm thanh lịch và tinh tế, Soft Light® sở hữu độ óng ánh đặc trưng và khả năng thoáng khí tuyệt vời của lụa tự nhiên, cùng với sự đa dạng về màu sắc."}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }} position={'relative'}>
            <Image src={A}
              alt="inside"
              fill
            />
          </Grid2>
        </Grid2>
      </Box>

      <Box mt={10} color={'#7a7d81'} px={8}>
        <Grid2 container bgcolor={'#e8e7e2'} height={600}>
          <Grid2 size={{ xs: 12, lg: 6 }} position={'relative'}>
            <Image src={B}
              alt="inside"
              fill
            />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }} px={6} alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
            <Typography fontWeight={900} fontSize={40} color="#7a7d81" textAlign={'center'}>
              {locale === "en"
                ? "Supreme Crude Material"
                : "Vật liệu thô tối cao"}
            </Typography>
            <Typography fontSize={18} color="#7a7d81" textAlign={'center'} fontWeight={600} mt={2}>
              {locale === "en"
                ? "YAMOPAD uses the “Jing Song × Hao Yue” (Pine × Moon) mulberry silkworm variety, which has a medium cocoon shape, great cleanliness, and uniform silk strands. These silkworms originate and live in the mid-latitude region where picturesque landscapes and serene lakes are abundant. From being born to forming their iconic cocoons as they grow, the life of a silkworm is a ballad of wonder, beauty, and poetic philosophy. The neat, high-quality cocoons are reeled through a meticulous process to produce luminous and uniform 6A silk with the highest marks in five categories: fiber deviation, maximum fiber deviation, second-degree variation evenness, cleanliness, and purity."
                : "YAMOPAD sử dụng giống tằm dâu “Jing Song × Hao Yue” (Thông × Trăng), có kén hình dạng trung bình, độ sạch cao và sợi tơ đồng đều. Những con tằm này có nguồn gốc và sinh sống ở vùng vĩ độ trung bình, nơi có nhiều cảnh quan tươi đẹp và hồ nước thanh bình. Từ khi sinh ra cho đến khi tạo thành những chiếc kén đặc trưng khi lớn lên, vòng đời của một con tằm là một bản trường ca kỳ diệu, tươi đẹp và triết lý thi vị. Những chiếc kén gọn gàng, chất lượng cao được kéo sợi qua một quy trình tỉ mỉ để tạo ra tơ 6A sáng bóng và đồng đều với điểm số cao nhất ở năm hạng mục: độ lệch sợi, độ lệch sợi tối đa, độ đồng đều biến thiên cấp hai, độ sạch và độ tinh khiết."}
            </Typography>
          </Grid2>
        </Grid2>
      </Box>

      <Box mt={10} color={'#7a7d81'} px={8}>
        <Grid2 container bgcolor={'#e8e7e2'} height={600}>
          <Grid2 size={{ xs: 12, lg: 6 }} px={6} alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
            <Typography fontWeight={900} fontSize={40} color="#7a7d81" textAlign={'center'}>
              {locale === "en"
                ? "Innovative Weaving"
                : "Dệt sáng tạo"}
            </Typography>
            <Typography fontSize={18} color="#7a7d81" textAlign={'center'} fontWeight={600} mt={2}>
              {locale === "en"
                ? "Unlike traditional satin fabrics, Soft Satin innovates both the weft and warp directions of weaving, challenging conventional perceptions with increasingly refined craftsmanship. Thousands of clockwise and counter-clockwise twists produce a matte crepe that reveals an understated dynamism, just like the YAMOPAD brand, an aesthetic of excellence that transcends frivolous complexity."
                : "Khác với các loại vải satin truyền thống, Soft Satin đổi mới cả hướng dệt ngang và dọc, thách thức những quan niệm thông thường bằng kỹ thuật chế tác ngày càng tinh tế. Hàng ngàn đường xoắn theo chiều kim đồng hồ và ngược chiều kim đồng hồ tạo ra một loại vải crepe mờ, thể hiện sự năng động kín đáo, giống như thương hiệu YAMOPAD, một vẻ đẹp xuất sắc vượt lên trên sự phức tạp phù phiếm."}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }} position={'relative'}>
            <Image src={C}
              alt="inside"
              fill
            />
          </Grid2>
        </Grid2>
      </Box>

      <Box mt={10} color={'#7a7d81'} px={8}>
        <Grid2 container bgcolor={'#e8e7e2'} height={600}>
          <Grid2 size={{ xs: 12, lg: 6 }} position={'relative'}>
            <Image src={D}
              alt="inside"
              fill
            />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }} px={6} alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
            <Typography fontWeight={900} fontSize={40} color="#7a7d81" textAlign={'center'}>
              {locale === "en"
                ? "Elegant Pre-finishing"
                : "Vật liệu thô tối cao"}
            </Typography>
            <Typography fontSize={18} color="#7a7d81" textAlign={'center'} fontWeight={600} mt={2}>
              {locale === "en"
                ? "Silk fabric is a natural canvas. They are similar to traditional roll films, floating in developer solution in a darkroom as a glimpse of life gently reveals itself captured on film, weaving together a world where lines of imagination and reality blur into dreamlike grandeur. Silk, on the other hand, reveals its world of radiant magic through processing in a heated environment, where sericin, pigments, oils, and wax substances stored in the sericin, hydrolyze and melt away."
                : "Vải lụa là một loại vải tự nhiên. Chúng tương tự như phim cuộn truyền thống, được ngâm trong dung dịch tráng phim trong phòng tối, nơi những khoảnh khắc cuộc sống nhẹ nhàng hiện ra và được ghi lại trên phim, dệt nên một thế giới nơi ranh giới giữa tưởng tượng và hiện thực hòa quyện vào vẻ đẹp huyền ảo như trong mơ. Mặt khác, lụa bộc lộ thế giới kỳ diệu rạng rỡ của nó thông qua quá trình xử lý trong môi trường nhiệt, nơi sericin, sắc tố, dầu và các chất sáp được lưu trữ trong sericin bị thủy phân và tan chảy."}
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
    </AboutPageTemplate>
  );
}
