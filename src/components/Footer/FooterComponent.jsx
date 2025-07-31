import { Box, Typography, Grid, Link, Stack } from "@mui/material";
import React from "react";
import CopyrightComponent from "../Copyright/CopyrightComponent";
import SharmalLogo from "../../assets/icons/Logo.png";
import CallIcon from "../../assets/icons/CallIcon.png";
import EmailIcon from "../../assets/icons/EmailIcon.png";
import LocationIcon from "../../assets/icons/LocationIcon.png";
import FacebookIcon from "../../assets/icons/FacebookIcon.png";
import ViberIcon from "../../assets/icons/ViberIcon.png";
import TikTokIcon from "../../assets/icons/tiktokIcon.png";
import TelegramIcon from "../../assets/icons/telegramIcon.png";
import YoutubeIcon from "../../assets/icons/youtubeIcon.png";
import theme from "../../theme";

const FooterComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.text.primary,
        color: "white",
        // background: 'linear-gradient(183deg, rgba(224,222,247,1) 24%, rgba(255,255,255,1) 100%)',
        padding: "50px 0 0 0",
      }}
    >
      <Grid container spacing={4} justifyContent="center" marginBottom="20px">
        {/* Left Side */}
        <Grid item xs={12} md={6} lg={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <img
              src={SharmalLogo}
              alt="logo"
              style={{
                width: "120px",
                height: "auto",
                marginBottom: "10px",
                borderRadius: 120,
              }}
            />
            <Box
              sx={{
                paddingLeft: "10px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              {/* <Typography sx={{ fontSize: '16px', color: theme.palette.primary.main }}>သင့်စိတ်ကူးထဲက</Typography> */}
            </Box>

            <Box
              sx={{
                paddingLeft: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={CallIcon}
                  alt="CallIcon"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "10px",
                    filter: "invert(1)",
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    cursor : 'pointer',
                    transition: "0.3s",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  09752733981 , 09752733985
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={EmailIcon}
                  alt="EmailIcon"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "10px",
                    filter: "invert(1)",
                  }}
                />
                <Typography sx={{ fontWeight: "bold", fontSize: "20px",cursor : 'pointer',transition: "0.3s", "&:hover": {
                      color: theme.palette.secondary.main,
                    }, }}>
                  valiant2542023@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={LocationIcon}
                  alt="LocationIcon"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "10px",
                    filter: "invert(1)",
                  }}
                />
                <Typography sx={{ fontSize: "20px" ,cursor : 'pointer',transition: "0.3s", "&:hover": {
                      color: theme.palette.secondary.main,
                    },}}>
                  No.1217, 4th Floor, Pinlon Road, 35 Ward, North Dagon, Yangon.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={6} lg={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              mt: 3,
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              {[
                {
                  icon: FacebookIcon,
                  link: "https://www.facebook.com/share/1ErmjfwsTq/",
                },
                {
                  icon: TikTokIcon,
                  link: "https://www.tiktok.com/@sharmal225?_t=8pM0zVW6Qxo&_r=1",
                },
                {
                  icon: YoutubeIcon,
                  link: "https://youtube.com/@valiant-p7u?si=N5IIsDEvI_SY0aPD",
                },
                {
                  icon: TelegramIcon,
                  link: "https://t.me/+M1Pok3GWBjUzNmRl",
                },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    border: `1px solid ${theme.palette.footer.border}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                    },
                  }}
                  onClick={() => window.open(item.link, "_blank")}
                >
                  <img
                    src={item.icon}
                    alt="social"
                    style={{ width: "55%", height: "55%" }}
                  />
                </Box>
              ))}
              <a
                href="https://invite.viber.com/?g2=AQAFa5WLsH5s51TcsGBRxihGxVjiAn%2BG1ec0HIV%2FLZWSWVI56uo47Yuvt3DxmH5P"
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    border: `1px solid ${theme.palette.footer.border}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                    },
                  }}
                >
                  <img
                    src={ViberIcon}
                    alt="ViberIcon"
                    style={{ width: "110%", height: "110%" }}
                  />
                </Box>
              </a>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Typography variant='h6' sx={{ fontWeight: '700' }}>အိမ်ခြံမြေ</Typography>
                <Typography onClick={() => window.location.href = '/property?State=ရောင်းရန်'} variant='body2' sx={{ cursor: 'pointer' }}>အိမ်ခြံမြေ အရောင်း</Typography>
                <Typography onClick={() => window.location.href = '/property?State=ငှားရန်'} variant='body2' sx={{ cursor: 'pointer' }}>အိမ်ခြံမြေ အငှား</Typography>
              </Box> */}
              {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Typography variant='h6' sx={{ fontWeight: '700' }}>ကား</Typography>
                <Typography onClick={() => window.location.href = '/car'} variant='body2' sx={{ cursor: 'pointer' }}>ကား အရောင်း</Typography>
                <Typography onClick={() => window.location.href = '/contact'} variant='body2' sx={{ color: theme.palette.primary.main, fontWeight: '700', cursor: 'pointer' }}>ဆက်သွယ်ရန်</Typography>
              </Box> */}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom Bar */}
      <Box
        sx={{
          backgroundColor: theme.palette.text.primary, // dark background for better contrast
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px",
          padding: { xs: "0 20px", md: "0 50px", lg: "0 70px" },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 0 }}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            width: "100%",
            flexWrap: "wrap",
            textAlign: "center",
            padding: "16px",
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: { xs: "center", sm: "left" },
              color: "#E0E0E0",
              fontWeight: "bold",
            }}
          >
            Powered By{"-"}
            <Link
              href="https://www.nksoftwarehouse.com"
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                mx: 1,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              NK Software House
            </Link>
            |
            <Link
              href="https://facebook.com/nksoftwareshouse"
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                ml: 1,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Facebook
            </Link>
          </Typography>

          <Box sx={{ textAlign: "center", color: "#E0E0E0" }}>
            <CopyrightComponent />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              color: "#E0E0E0",
            }}
          >
            <Link href="/privacy-policy" underline="none">
              <Typography
                variant="body2"
                sx={{
                  color: { sm: "black", md: "white", lg: "white" },
                  cursor: "pointer",
                }}
              >
                Terms of Service - Privacy Policy
              </Typography>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default FooterComponent;
