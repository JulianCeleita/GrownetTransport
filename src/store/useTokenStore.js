import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTokenStore = create(
  persist(
    (set) => ({
      token: "",
      idSupplier: "",
      setToken: (newToken) => {
        set({ token: newToken });
        console.log("Token guardado:", newToken);
      },
      setIdSupplier: (newIdSupplier) => {
        set({ idSupplier: newIdSupplier });
        console.log("IdSupplier guardado:", newIdSupplier);
      },
      initializeToken: async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");
          if (storedToken) {
            set({ token: JSON.parse(storedToken) });
          } else {
            console.error("no se encontró el token");
          }
        } catch (error) {
          console.error("Error al obtener el token de AsyncStorage:", error);
        }
      },
    }),
    {
      name: "token-storage",
      storage: {
        getItem: async (name) => {
          const result = await AsyncStorage.getItem(name);
          return result ? JSON.parse(result) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
      },
    }
  )
);

export default useTokenStore;
