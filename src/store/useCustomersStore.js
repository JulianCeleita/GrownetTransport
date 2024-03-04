import { create } from "zustand";
import mainAxios from "../../axios.config";
import { deliveryRoutes } from "../config/urls.config";

export const useCustomersStore = create((set) => ({
  customers: [],
  isLoading: false,
  error: null,
  setCustomers: (customers) => {
    set({ customers: customers });
  },
  setFetchCustomers: async (employeeToken, date, selectedRoute) => {
    set({ isLoading: true });

    if (selectedRoute === null || selectedRoute === undefined) {
      set({
        customers: [],
        error: `User without route assigned for date: ${date}`,
        isLoading: false
      });
      return;
    }

    try {
      const response = await mainAxios.post(
        deliveryRoutes,
        { date },
        {
          headers: {
            Authorization: `Bearer ${employeeToken}`,
          },
        }
      );

      let routesByDate = await response.data.routes;

      const selectedRoutes = routesByDate.find(
        (route) => route.nameRoute === selectedRoute
      );

      if (selectedRoutes) {
        const customer = selectedRoutes.accounts;
        console.log("customer", JSON.stringify(customer, null, 2));
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
