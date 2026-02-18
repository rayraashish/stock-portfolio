
import { Box, Container, Typography, Paper } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { stockHistory } from "../data/mockStockData";

export default function Dashboard() {
  const categories = stockHistory.map((d) => d.date);
  const priceSeries = stockHistory.map((d) => d.price);
  const volumeSeries = stockHistory.map((d) => d.volume);

  const lineOptions = {
    chart: { height: 350 },
    title: { text: "Stock Price Trend" },
    xAxis: { categories },
    yAxis: { title: { text: "Price (USD)" } },
    series: [{ name: "Price", data: priceSeries }],
    credits: { enabled: false },
  };

  const columnOptions = {
    chart: { type: "column", height: 350 },
    title: { text: "Trading Volume" },
    xAxis: { categories },
    yAxis: { title: { text: "Volume" } },
    series: [{ name: "Volume", data: volumeSeries }],
    credits: { enabled: false },
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* FLEX layout so the container will be side by side*/}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
        }}
      >
        <Paper sx={{ p: 2, flex: 1, minWidth: 0 }}>
          <HighchartsReact highcharts={Highcharts} options={lineOptions} />
        </Paper>

        <Paper sx={{ p: 2, flex: 1, minWidth: 0 }}>
          <HighchartsReact highcharts={Highcharts} options={columnOptions} />
        </Paper>
      </Box>
    </Container>
  );
}