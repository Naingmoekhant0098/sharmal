import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Button, Typography,Skeleton } from "@mui/material";
import theme from "../../../theme";
import ExchangeRateCardComponent from "../../../components/Card/ExchangeRateCardComponent";
import SkeletonCardComponent from '../../../components/Skeleton/SkeletonCardComponent';
import { GetExchangeRateAPI, UpdateExchangeRateAPI } from "../../../api/exchangerate/ExchangeRateAPI";
import { toast } from "react-toastify";

export default function ExchangeRatePage({ history }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetExchangeRateAPI(
      (response) => {
        setData(response);
        setLoading(false);
      },
      toast,
      history
    );
  }, [history]);

  const handleUpdateClick = () => {
    const payload = {
      ExchangeRates: data.map(({ ExchangeRateId, Currency, ExchangeRate }) => ({
        ExchangeRateId,
        Currency,
        ExchangeRate,
      })),
    };
    UpdateExchangeRateAPI(payload, toast);
  };

  const handleDataChange = (updatedData) => {
    setData(updatedData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {loading ? (
          <>
          <Skeleton variant="text" width={200} height={30} />
          <SkeletonCardComponent />
          </>
        ) : (
          <>
            <Typography variant="body1" color={theme.palette.text.main}>
              Last updated on {data[0].UpdatedDate}
            </Typography>
            <ExchangeRateCardComponent exchangeRates={data} onDataChange={handleDataChange} />
            <Button
              size="large"
              sx={{ padding: 2 }}
              className="default-btn"
              variant="contained"
              fullWidth
              onClick={handleUpdateClick}
            >
              Update
            </Button>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}
