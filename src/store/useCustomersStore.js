import { create } from "zustand";
import mainAxios from "../../axios.config";
import { deliveryRoutes } from "../config/urls.config";

export const useCustomersStore = create((set) => ({
  customers: [],
  routesByDate: [],
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

      set({ routesByDate: RoutesByDate });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error during request:", error);
    }
  },
  setOrdersByDate: (nameRoute, routesByDate) => {
    const selectedRoute = routesByDate.find(
      (route) => route.nameRoute === nameRoute
    );
    if (selectedRoute) {
      const orderByDate = selectedRoute.accounts || [];
      set({ customers: orderByDate });
    } else {
      console.error(
        "No se encontró la ruta con el nombre especificado:",
        nameRoute
      );
    }
  },
}));
