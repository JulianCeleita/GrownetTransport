import { create } from "zustand";

const useEmployeeStore = create((set) => ({
  employeeToken: null,
  selectedRoute: null,
  selectedDate: null,
  setSelectedRoute: (newRoute) => {
    set({ selectedRoute: newRoute });
  },
  setSelectedDate: (newDate) => {
    set({ selectedDate: newDate });
  },
  setEmployeeToken: (newToken) => {
    set({ employeeToken: newToken });
  },
}));

export default useEmployeeStore;
