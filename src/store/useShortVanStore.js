import { create } from "zustand";
import mainAxios from "../../axios.config";
import { shortVanConfig } from "../config/urls.config";

export const useShortVanStore = create((set) => ({
  shortVanProducts: [],
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  setRestaurantData: (shortVanProducts) => set({ shortVanProducts }),
  setFetchShortVanProducts: async (token, data, toggle) => {
    try {
      set({ isLoading: true });
      const dataVan = {
        date: data.date,
        routeName: data.routeName,
      };
      const response = await mainAxios.post(shortVanConfig, dataVan, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { status, van } = response.data;

      if (status === 200 && Array.isArray(van)) {
        set({
          shortVanProducts: van.map((restaurant) => ({
            customerName: restaurant.custom,
            products: toggle
              ? restaurant.products
              : restaurant.products.filter((product) => {
                  return product.state_definitive !== "N/A";
                }),
          })),
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
      console.error(
        "Error de autenticación. Verifica las credenciales.",
        error
      );
    }
  },
}));
