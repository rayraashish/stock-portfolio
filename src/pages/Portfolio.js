
import {
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useMemo, useState } from "react";
import StockFormModal from "../components/StockFormModal";
import { usePortfolioStore } from "../store/portfolioStore";

export default function Portfolio() {
  // ✅ Zustand state + actions
  const rows = usePortfolioStore((s) => s.rows);
  const addStock = usePortfolioStore((s) => s.addStock);
  const editStock = usePortfolioStore((s) => s.editStock);
  const deleteStock = usePortfolioStore((s) => s.deleteStock);

  // ✅ UI state (local to this page)
  const [openForm, setOpenForm] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAddClick = () => {
    setEditingRow(null);
    setOpenForm(true);
  };

  const handleEditClick = (row) => {
    setEditingRow(row);
    setOpenForm(true);
  };

  const handleSave = (data) => {
    if (editingRow) {
      // ✅ Edit existing in Zustand store
      editStock(editingRow.id, data);
    } else {
      // ✅ Add new in Zustand store
      addStock(data);
    }

    setOpenForm(false);
    setEditingRow(null);
  };

  const handleDeleteConfirm = () => {
    // ✅ Delete from Zustand store
    deleteStock(deleteTarget.id);
    setDeleteTarget(null);
  };

  const totalValue = useMemo(() => {
    return rows.reduce((sum, r) => sum + r.currentPrice * r.quantity, 0);
  }, [rows]);

  return (
    <Container sx={{ mt: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Portfolio</Typography>
        <Button variant="contained" onClick={handleAddClick}>
          Add Stock
        </Button>
      </Stack>

      <Typography sx={{ mb: 2 }}>
        Total Portfolio Value: <b>${totalValue.toFixed(2)}</b>
      </Typography>

      <Paper sx={{ p: 2, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Ticker</b>
              </TableCell>
              <TableCell>
                <b>Company</b>
              </TableCell>
              <TableCell>
                <b>Quantity</b>
              </TableCell>
              <TableCell>
                <b>Purchase Price</b>
              </TableCell>
              <TableCell>
                <b>Current Price</b>
              </TableCell>
              <TableCell>
                <b>Purchase Date</b>
              </TableCell>
              <TableCell align="right">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.ticker}</TableCell>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>${row.purchasePrice}</TableCell>
                <TableCell>${row.currentPrice}</TableCell>
                <TableCell>{row.purchaseDate}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditClick(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => setDeleteTarget(row)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}

            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No stocks added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ✅ Add/Edit Modal */}
      <StockFormModal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingRow(null);
        }}
        onSave={handleSave}
        initialData={editingRow}
      />

      {/* ✅ Delete Confirm Dialog */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Stock</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <b>{deleteTarget?.ticker}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}