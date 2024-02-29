import { create } from "zustand";
import mainAxios from "../../axios.config";
import { deliveryRoutes } from "../config/urls.config";

export const useCustomersStore = create((set) => ({
  routes: [],
  customers: [],
  isLoading: false,
  setCustomers: (routes, selectedRoute) => {
    set({ isLoading: true });
    const selectedRoutes = routes.find(
      (route) => route.nameRoute === selectedRoute
    );

    if (selectedRoutes) {
      const customer = selectedRoutes.accounts;
      set({ customers: customer.sort((a, b) => a.drop - b.drop) });
    } else {
      set({ customers: [] });
    }
    set({ isLoading: false });
  },
  setRoutesByDate: async (token, date) => {
    try {
      set({ isLoading: true });

      const response = await mainAxios.post(
        deliveryRoutes,
        { date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let routesByDate = await response.data.routes;
      set({ routes: routesByDate });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error during request:", error);
    }
  },
}));
