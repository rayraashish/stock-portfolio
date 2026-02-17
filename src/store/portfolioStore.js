import { create } from "zustand";
import { initialPortfolio } from "../data/mockPortfolioData";

export const usePortfolioStore = create((set) => ({
  rows: initialPortfolio,

  addStock: (stock) =>
    set((state) => ({
      rows: [
        {
          id: String(Date.now()),
          ...stock,
          currentPrice: stock.purchasePrice, // simple default
        },
        ...state.rows,
      ],
    })),

  editStock: (id, updated) =>
    set((state) => ({
      rows: state.rows.map((r) =>
        r.id === id
          ? {
              ...r,
              ...updated,
              currentPrice: r.currentPrice, // keep existing
            }
          : r
      ),
    })),

  deleteStock: (id) =>
    set((state) => ({
      rows: state.rows.filter((r) => r.id !== id),
    })),
}));