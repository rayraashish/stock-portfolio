import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";

const emptyForm = {
  ticker: "",
  companyName: "",
  quantity: "",
  purchasePrice: "",
  purchaseDate: "",
};

export default function StockFormModal({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        ticker: initialData.ticker || "",
        companyName: initialData.companyName || "",
        quantity: String(initialData.quantity ?? ""),
        purchasePrice: String(initialData.purchasePrice ?? ""),
        purchaseDate: initialData.purchaseDate || "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [initialData, open]);

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.ticker.trim()) nextErrors.ticker = "Ticker is required";
    if (!form.companyName.trim()) nextErrors.companyName = "Company name is required";

    const qty = Number(form.quantity);
    if (!form.quantity || Number.isNaN(qty) || qty <= 0) nextErrors.quantity = "Quantity must be > 0";

    const price = Number(form.purchasePrice);
    if (!form.purchasePrice || Number.isNaN(price) || price <= 0)
      nextErrors.purchasePrice = "Purchase price must be > 0";

    if (!form.purchaseDate) nextErrors.purchaseDate = "Purchase date is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave({
      ticker: form.ticker.trim().toUpperCase(),
      companyName: form.companyName.trim(),
      quantity: Number(form.quantity),
      purchasePrice: Number(form.purchasePrice),
      purchaseDate: form.purchaseDate,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Stock" : "Add Stock"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ticker"
              value={form.ticker}
              onChange={handleChange("ticker")}
              fullWidth
              error={!!errors.ticker}
              helperText={errors.ticker}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Name"
              value={form.companyName}
              onChange={handleChange("companyName")}
              fullWidth
              error={!!errors.companyName}
              helperText={errors.companyName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange("quantity")}
              fullWidth
              error={!!errors.quantity}
              helperText={errors.quantity}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Purchase Price"
              type="number"
              value={form.purchasePrice}
              onChange={handleChange("purchasePrice")}
              fullWidth
              error={!!errors.purchasePrice}
              helperText={errors.purchasePrice}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Date of Purchase"
              type="date"
              value={form.purchaseDate}
              onChange={handleChange("purchaseDate")}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.purchaseDate}
              helperText={errors.purchaseDate}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}