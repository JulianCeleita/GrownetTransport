import { create } from "zustand";
import mainAxios from "../../axios.config";
import { productsTransport } from "../config/urls.config";

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
            const resp = await mainAxios.get(`${productsTransport}${orderNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            const products = await resp.data;
            console.log('products', JSON.stringify(products, null, 2));
            set({ products: products.orders })
            set({ isLoading: false });
        } catch (error) {
            console.error('Error during request packing:', error)
            set({ isLoading: false });
        }
    },
}));
