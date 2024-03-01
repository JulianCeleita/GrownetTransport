import { create } from "zustand";
import mainAxios from "../../axios.config";
import { productsLoading } from "../config/urls.config";

export const useProductsStore = create((set) => ({
    products: [],
    isLoading: false,
    setProducts: (products) => {
        set({ products: products })
    },
    setFetchProducts: async (token, orderNumber) => {
        set({ isLoading: true });
        try {
            const resp = await mainAxios.get(`${productsLoading}${orderNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            const products = await resp.data;
            // console.log('products', products);
            set({ products: products.orders[0] })
            set({ isLoading: false });
        } catch (error) {
            console.error('Error during request packing:', error)
            set({ isLoading: false });
        }
    },
}));
