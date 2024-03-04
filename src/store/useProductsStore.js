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
        console.log({ token, orderNumber });
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
            console.log('products', JSON.stringify(products, null, 2));
            set({ products: products.orders[0] })
            set({ isLoading: false });
        } catch (error) {
            console.error('Error during request packing:', error)
            set({ isLoading: false });
        }
    },
}));
