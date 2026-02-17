import { Container, Typography, Paper } from "@mui/material";

export default function Portfolio() {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Portfolio
      </Typography>

      <Paper sx={{ p: 2 }}>
        Portfolio table will go here (Add/Edit/Delete).
      </Paper>
    </Container>
  );
}