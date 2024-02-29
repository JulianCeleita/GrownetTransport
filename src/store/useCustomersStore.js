import { create } from "zustand";
import mainAxios from "../../axios.config";
import { deliveryRoutes } from "../config/urls.config";

export const useCustomersStore = create((set) => ({
  customers: [],
  isLoading: false,
  setCustomers: (customer) => {
    set({ customers: customer });
  },
  setRoutesByDate: async (token, date, selectedRoute) => {
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

      console.log('RoutesByDate', RoutesByDate);

      const selectedRoutes = RoutesByDate.find(
        (route) => route.nameRoute === selectedRoute
      );

      if (selectedRoutes) {
        const customer = selectedRoutes.accounts;
        set({ customers: customer.sort((a, b) => a.drop - b.drop) });
      } else {
        set({ customers: [] });
      }

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error during request:", error);
    }
  },
}));
