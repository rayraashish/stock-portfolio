import { Container, Typography, Grid, Paper } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { stockHistory } from "../data/mockStockData";

export default function Dashboard() {
  const categories = stockHistory.map((d) => d.date);
  const priceSeries = stockHistory.map((d) => d.price);
  const volumeSeries = stockHistory.map((d) => d.volume);

  const lineOptions = {
    title: { text: "Stock Price Trend" },
    xAxis: { categories, title: { text: "Date" } },
    yAxis: { title: { text: "Price (USD)" } },
    series: [{ name: "Price", data: priceSeries }],
    credits: { enabled: false },
  };

  const columnOptions = {
    chart: { type: "column" },
    title: { text: "Trading Volume" },
    xAxis: { categories, title: { text: "Date" } },
    yAxis: { title: { text: "Volume" } },
    series: [{ name: "Volume", data: volumeSeries }],
    credits: { enabled: false },
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={lineOptions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={columnOptions} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}