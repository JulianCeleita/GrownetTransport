import { create } from "zustand";
import mainAxios from "../../axios.config";
import { deliveryRoutes } from "../config/urls.config";

export const useCustomersStore = create((set) => ({
  customers: [],
  selectedRoute: "R1",
  selectedDate: new Date().toISOString().slice(0, 10),
  isLoading: false,
  setCustomers: (customer) => {
    set({ customers: customer });
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

      let RoutesByDate = await response.data.routes;
      RoutesByDate.sort((a, b) => {
        return a.nameRoute.localeCompare(b.nameRoute);
      });

      const selectedRoutes = RoutesByDate.find(
        (route) => route.nameRoute === "R1"
      );

      const customer = selectedRoutes.accounts || [];
      set({ customers: customer });

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error during request:", error);
    }
  },
}));
