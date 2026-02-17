import { Container, Typography, Paper } from "@mui/material";

export default function Dashboard() {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Paper sx={{ p: 2 }}>
        Charts will go here (Line + Column).
      </Paper>
    </Container>
  );
}