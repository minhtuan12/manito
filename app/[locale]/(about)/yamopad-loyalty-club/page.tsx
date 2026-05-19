import { notFound } from "next/navigation";
import { AboutPageTemplate } from "@/components/about/AboutPageTemplate";
import { aboutPages } from "@/lib/about-content";
import { ensureLocale } from "@/lib/i18n";
import { Box, Button, Grid2, Typography } from "@mui/material";
import A from 'assets/images/bRPsbYRBRJZBThd微信图片_20221102171717-200x102.webp';
import B from 'assets/images/Zs56pMnKAcicdk4微信图片_202211021717171-200x106.webp';
import C from 'assets/images/TdGeFiQ4pXzDdnY微信图片_202211021717173-200x103.webp';
import D from 'assets/images/72yWeZkBdnEbtph微信图片_202211021717172-200x103.webp';
import T from 'assets/images/Members_Benefits_Sheet-1024x582.webp';
import E from 'assets/images/SfFDhbJM7BnpxHD微信图片_20221114163450-1024x646.webp';
import G from 'assets/images/BhPXDzsy4RQ8fcp积分兑换.svg';
import H from 'assets/images/Sh2iwF36HnYwnSD图片3.svg';
import F from 'assets/images/AenXWpw64d8eGyS微信图片_202211141634501-1024x646.webp';
import J from 'assets/images/kdbDBbxxMEpGwMP微信图片_202211141634502-1024x646.webp';
import I from 'assets/images/AQCn3nfHjyixdFGrxa-birthday-lined.svg';
import IF from 'assets/images/EDzJcs3ktrWAKnC微信图片_202211141634503-1024x646.webp';
import IFG from 'assets/images/ZNkZGPMbAt5X5ji图片5.svg';
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function YamopadLoyaltyClubPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const content = aboutPages["yamopad-loyalty-club"];

  if (!content) {
    notFound();
  }

  const isVi = locale === 'vi';

  return <AboutPageTemplate locale={locale} content={content} hasServices>
    <Box bgcolor={'#f5f5f5'} display={'flex'} flexDirection={'column'} alignItems={'center'} pt={20} pb={8} color={'#7a7d81'}>
      <Typography fontWeight={600} fontSize={18}>
        {locale === 'en' ? 'A MORE REWARDING WAY TO SHOP' : 'MỘT CÁCH MUA SẮM THÚ VỊ HƠN'}
      </Typography>
      <Typography mt={2} fontSize={18}>
        {locale === 'en' ? 'Earn 1 point for every $1 you spend (*All calculations are based on USD)' : 'Tích điểm cho mỗi đô la bạn chi tiêu (*Tất cả các tính toán đều dựa trên đô la Mỹ)'}
      </Typography>
      <Typography mt={2} fontSize={18}>
        {locale === 'en' ? 'Receive 5% off your first order at YAMOPAD’s Choice' : 'Nhận ngay ưu đãi giảm 5% cho đơn hàng đầu tiên tại YAMOPAD’s Choice'}
      </Typography>
      <Button
        sx={{
          justifyContent: "flex-start",
          py: 2,
          px: 4,
          fontWeight: 900,
          fontSize: 18,
          border: '1px solid black',
          marginTop: 4,
          color: '#7a7d81',
          '&:hover': {
            color: 'black',
          }
        }}
      >
        <Link style={{ textDecoration: 'none', color: 'inherit' }} href="/my-account/register">{locale === 'en' ? 'JOIN NOW' : "THAM GIA NGAY"}</Link>
      </Button>
    </Box>

    <Box pt={10} color={'#7a7d81'} bgcolor={'white'}>
      <Typography textAlign={'center'} fontWeight={600} fontSize={26}>{locale === 'en' ? "Member’s Journey" : "Hành trình của thành viên"}</Typography>
      <Typography textAlign={'center'} fontWeight={600} mt={2} fontSize={26}>–––––––––––––––––– Y ––––––––––––––––––</Typography>
      <Grid2 mt={8} container justifyContent={'center'} gap={14}>
        <Grid2 justifyContent={'center'} alignItems={'center'} container flexDirection={'column'}>
          <Image src={A} alt="a" width={0} height={0} style={{ width: 'auto', height: 'auto' }} />
          <Typography color="black" mt={1} fontWeight={800} fontSize={18}>{locale === 'en' ? 'YAMOPAD Loyalty Member' : 'Thành viên thân thiết của YAMOPAD'}</Typography>
          <Typography color="black" mt={1} fontWeight={600} fontSize={16}>{locale === 'en' ? 'Create an account' : 'Tạo tài khoản'}</Typography>
        </Grid2>
        <Grid2 justifyContent={'center'} alignItems={'center'} container flexDirection={'column'}>
          <Image src={B} alt="a" width={0} height={0} style={{ width: 'auto', height: 'auto' }} />
          <Typography color="black" mt={1} fontWeight={800} fontSize={18}>{locale === 'en' ? 'YAMOPAD Silver Member' : 'Thành viên Bạc của YAMOPAD'}</Typography>
          <Typography color="black" mt={1} fontWeight={600} fontSize={16}>{locale === 'en' ? 'Gain over 300 points' : 'Đạt được hơn 300 điểm'}</Typography>
        </Grid2>
        <Grid2 justifyContent={'center'} alignItems={'center'} container flexDirection={'column'}>
          <Image src={C} alt="a" width={0} height={0} style={{ width: 'auto', height: 'auto' }} />
          <Typography color="black" mt={1} fontWeight={800} fontSize={18}>{locale === 'en' ? 'YAMOPAD Gold Member' : 'Thành viên Vàng của YAMOPAD'}</Typography>
          <Typography color="black" mt={1} fontWeight={600} fontSize={16}>{locale === 'en' ? 'Gain over 650 points' : 'Đạt được hơn 650 điểm'}</Typography>
        </Grid2>
        <Grid2 justifyContent={'center'} alignItems={'center'} container flexDirection={'column'}>
          <Image src={D} alt="a" width={0} height={0} style={{ width: 'auto', height: 'auto' }} />
          <Typography color="black" mt={1} fontWeight={800} fontSize={18}>{locale === 'en' ? 'YAMOPAD Platinum Member' : 'Thành viên Bạch kim của YAMOPAD'}</Typography>
          <Typography color="black" mt={1} fontWeight={600} fontSize={16}>{locale === 'en' ? 'Gain over 2000 points' : 'Đạt được hơn 2000 điểm'}</Typography>
        </Grid2>
      </Grid2>
    </Box>

    <Box pt={10} color={'#7a7d81'} bgcolor={'white'}>
      <Typography textAlign={'center'} fontWeight={600} fontSize={26}>{locale === 'en' ? "Member’s Benefits" : "Quyền lợi của thành viên"}</Typography>
      <Typography textAlign={'center'} fontWeight={500} mt={1.5} fontSize={16}>{locale === 'en' ? "Earn 1 point for every $1 you spend (*All calculations are based on USD)" : "Tích điểm cho mỗi đô la bạn chi tiêu (*Tất cả các tính toán đều dựa trên đô la Mỹ)"}</Typography>
      <Typography textAlign={'center'} fontWeight={600} mt={2.5} fontSize={26}>–––––––––––– Y ––––––––––––</Typography>
      <Box display={'flex'} justifyContent={'center'} mt={6}>
        <Image src={T} alt="a" width={0} height={0} style={{ width: 'auto', height: 'auto' }} />
      </Box>
    </Box>

    <Box pt={10} color={'#7a7d81'} bgcolor={'white'}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          minHeight: { xs: "auto", md: 520 },
        }}
      >
        {/* LEFT — Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 4, md: 6 },
            py: { xs: 6, md: 8 },
            bgcolor: "#fff",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <Image src={G} alt="a" width={60} height={60} />
          <Typography textAlign={'center'} fontWeight={600} mt={2.5} fontSize={26}>–––––––––––– Y ––––––––––––</Typography>

          {/* Title */}
          <Typography
            sx={{
              fontSize: { xs: "1.2rem", md: "1.45rem" },
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "capitalize",
            }}
          >
            {isVi ? "Đổi Điểm Thưởng" : "Reward Points Redemption"}
          </Typography>

          {/* Redeem Button */}
          <Button
            variant="outlined"
            sx={{
              borderColor: "#bbb",
              color: "#333",
              borderRadius: 0,
              px: 5,
              py: 2,
              mb: 4,
              mt: 4,
              fontSize: "0.78rem",
              letterSpacing: "0.15em",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#f5f5f5",
                borderColor: "#888",
              },
            }}
          >
            {isVi ? "ĐỔI NGAY" : "REDEEM NOW"}
          </Button>

          {/* Description 1 */}
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#333",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            {isVi
              ? "Với mỗi $1 bạn chi tiêu, bạn sẽ tích được 1 điểm. Những điểm này có thể được đổi thành các phiếu giảm giá có giá trị, mang lại nhiều ưu đãi hơn cho các sản phẩm lụa yêu thích của bạn."
              : "For every $1 you spend, you'll earn 1 point. These points can be redeemed for valuable coupons, unlocking even more indulgence on your favorite silk products."}
          </Typography>

          {/* Description 2 */}
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#333",
              lineHeight: 1.75,
              mb: 3,
            }}
          >
            {isVi
              ? "Xin lưu ý rằng sau khi bạn đổi điểm để nhận quà, số điểm tương ứng sẽ bị trừ ngay lập tức. Vì vậy, hãy chọn lựa thật sáng suốt và tận hưởng sự xa xỉ mà bạn xứng đáng có được."
              : "Please note that once you redeem your points for gifts, the corresponding points will be deducted instantly. So, choose wisely and relish the luxury you deserve."}
          </Typography>

          {/* Footnote */}
          <Typography
            sx={{
              fontSize: "0.78rem",
              color: "#888",
              fontStyle: "italic",
            }}
          >
            {isVi ? "*Tất cả tính toán dựa trên USD" : "*All calculations are based on USD"}
          </Typography>
        </Box>

        {/* RIGHT — Image */}
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 320, md: "100%" },
            overflow: "hidden",
          }}
        >
          <Image
            src={E}
            alt="YAMOPAD Silk"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          minHeight: { xs: "auto", md: 520 },
        }}
      >
        {/* RIGHT — Image */}
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 320, md: "100%" },
            overflow: "hidden",
          }}
        >
          <Image
            src={F}
            alt="YAMOPAD Silk"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Box>
        {/* LEFT — Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 4, md: 8 },
            py: { xs: 6, md: 8 },
            bgcolor: "#fff",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <Image src={H} alt="a" width={60} height={60} />
          <Typography textAlign={'center'} fontWeight={600} mt={2.5} fontSize={26}>–––––––––––– Y ––––––––––––</Typography>

          {/* Title */}
          <Typography
            sx={{
              fontSize: { xs: "1.2rem", md: "1.45rem" },
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "capitalize",
            }}
          >
            {isVi ? "Đăng ký trước để đặt hàng" : "Advance Access to Pre-order"}
          </Typography>

          {/* Redeem Button */}
          <Button
            variant="outlined"
            sx={{
              borderColor: "#bbb",
              color: "#333",
              borderRadius: 0,
              px: 5,
              py: 2,
              mb: 4,
              mt: 4,
              fontSize: "0.78rem",
              letterSpacing: "0.15em",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#f5f5f5",
                borderColor: "#888",
              },
            }}
          >
            {isVi ? "ĐĂNG KÝ NGAY" : "SUBSCRIBE NOW"}
          </Button>

          {/* Description 1 */}
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#333",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            {isVi
              ? "Hãy là người đầu tiên biết về các sản phẩm mới / phiên bản giới hạn / sản phẩm hợp tác thương hiệu của chúng tôi và nhận quyền ưu tiên đặt hàng trước."
              : "Be the first to know about our new product / limited edition / co-brand items launches and get advance access to pre-order."}
          </Typography>

          {/* Description 2 */}
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#333",
              lineHeight: 1.75,
              mb: 3,
            }}
          >
            {isVi
              ? "*Đôi khi có những ưu đãi đặt hàng trước, vui lòng liên hệ customerservice@manitosilk.com để biết thêm chi tiết."
              : "*Pre-order privileges are occasionally available, please contact customerservice@manitosilk.com for more details."}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          minHeight: { xs: "auto", md: 520 },
        }}
      >
        {/* LEFT — Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 4, md: 6 },
            py: { xs: 6, md: 8 },
            bgcolor: "#fff",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <Image src={I} alt="a" width={60} height={60} />
          <Typography textAlign={'center'} fontWeight={600} mt={2.5} fontSize={26}>–––––––––––– Y ––––––––––––</Typography>

          {/* Title */}
          <Typography
            sx={{
              fontSize: { xs: "1.2rem", md: "1.45rem" },
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "capitalize",
            }}
          >
            {isVi ? "Phiếu giảm giá sinh nhật độc quyền" : "Exclusive Birthday Coupons"}
          </Typography>

          {/* Redeem Button */}
          <Button
            variant="outlined"
            sx={{
              borderColor: "#bbb",
              color: "#333",
              borderRadius: 0,
              px: 5,
              py: 2,
              mb: 4,
              mt: 4,
              fontSize: "0.78rem",
              letterSpacing: "0.15em",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#f5f5f5",
                borderColor: "#888",
              },
            }}
          >
            {isVi ? "LIÊN HỆ" : "CONTACT US"}
          </Button>

          {/* Description 1 */}
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#333",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            {isVi
              ? "Thành viên có thể nhận được Phiếu giảm giá độc quyền trong tháng sinh nhật của mình (xem chi tiết trên biểu mẫu), vui lòng liên hệ bộ phận chăm sóc khách hàng trong cùng tháng đó để nhận phiếu."
              : "Members can enjoy Exclusive Coupons in their birth month (check the form for details), please contact customer support in the same month to receive them."}
          </Typography>

          {/* Description 2 */}
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#333",
              lineHeight: 1.75,
              mb: 3,
            }}
          >
            {isVi
              ? "*Mỗi thành viên chỉ được nhận một phiếu giảm giá theo tháng sinh trong một năm. Thành viên chỉ được hưởng phiếu giảm giá tương ứng với cấp độ thành viên tại thời điểm đăng ký."
              : "*Each member can only receive one birth month coupon in a year. Members are only entitled to the coupon of the corresponding level at the time of application."}
          </Typography>
        </Box>

        {/* RIGHT — Image */}
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 320, md: "100%" },
            overflow: "hidden",
          }}
        >
          <Image
            src={J}
            alt="YAMOPAD Silk"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          minHeight: { xs: "auto", md: 520 },
        }}
      >
        {/* RIGHT — Image */}
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 320, md: "100%" },
            overflow: "hidden",
          }}
        >
          <Image
            src={IF}
            alt="YAMOPAD Silk"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Box>
        {/* LEFT — Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 4, md: 8 },
            py: { xs: 6, md: 8 },
            bgcolor: "#fff",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <Image src={IFG} alt="a" width={60} height={60} />
          <Typography textAlign={'center'} fontWeight={600} mt={2.5} fontSize={26}>–––––––––––– Y ––––––––––––</Typography>

          {/* Title */}
          <Typography
            sx={{
              fontSize: { xs: "1.2rem", md: "1.45rem" },
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "capitalize",
            }}
          >
            {isVi ? "Đổi trả miễn phí" : "Free Return & Exchange"}
          </Typography>

          {/* Redeem Button */}
          <Button
            variant="outlined"
            sx={{
              borderColor: "#bbb",
              color: "#333",
              borderRadius: 0,
              px: 5,
              py: 2,
              mb: 4,
              mt: 4,
              fontSize: "0.78rem",
              letterSpacing: "0.15em",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#f5f5f5",
                borderColor: "#888",
              },
            }}
          >
            {isVi ? "KIỂM TRA NGAY" : "CHECK DETAILS"}
          </Button>

          {/* Description 1 */}
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#333",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            {isVi
              ? "Mỗi thành viên được đảm bảo một lần đổi trả hàng miễn phí sau khi đăng ký. Sau khi nâng cấp lên hạng Platinum, bạn sẽ được hưởng chính sách đổi trả miễn phí cho tất cả các đơn hàng."
              : "Each member is guaranteed one chance of a free return/exchange after registration. After upgrading to Platinum, you can enjoy a free returns policy on all orders."}
          </Typography>

          {/* Description 2 */}
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#333",
              lineHeight: 1.75,
              mb: 3,
            }}
          >
            {isVi
              ? "*Vui lòng nhớ gửi email cho chúng tôi trước khi trả lại hàng và gửi gói hàng trong vòng 30 ngày kể từ ngày giao hàng. Kiểm tra thêm chi tiết về Chính sách Trả hàng trước khi trả lại hàng."
              : "*Please remember to email us before returning and send the package within 30 days of the delivery date. Check more details on the Return Policy before your return."}
          </Typography>
        </Box>
      </Box>
    </Box>
  </AboutPageTemplate>;
}
