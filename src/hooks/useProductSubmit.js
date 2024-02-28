import mainAxios from "../../axios.config.js";
import { instructions, setDelivered } from "../config/urls.config.js";
import useEmployeeStore from "../store/useEmployeeStore.js";

export const useProductSubmit = (insert) => {
  const { employeeToken } = useEmployeeStore();

  const handleSubmit = async (itemId, quantity = 0, note = "", state = null) => {
    const data = {
      note,
      id: itemId,
      state: state,
    };

    if (typeof quantity === "string" && quantity.includes(".")) {
      data.quantity = parseFloat(quantity.replace(",", "."));
    } else {
      data.quantity = parseInt(quantity);
    }

    try {
      const response = await mainAxios.post(insert, data, {
        headers: {
          Authorization: `Bearer ${employeeToken}`,
        },
      });

      if (response.status === 200) {
        console.log("Datos enviados correctamente", response.data);
      } else {
        throw new Error("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Hubo un error al enviar los datos: ", error);
      throw error;
    }
  };

  const handleSubmitCustomer = async (itemId, delivered = null, evidence = null) => {
    console.log(JSON.stringify({ itemId, delivered, image: evidence }, null, 2));
    // try {
    //   const response = await mainAxios.post(`${setDelivered}${itemId}`, { delivered, image: evidence },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${employeeToken}`,
    //       },
    //     }
    //   );

    //   if (response.status === 200) {
    //     console.log("Datos enviados correctamente", response.data);
    //   } else {
    //     throw new Error("Error al enviar los datos");
    //   }
    // } catch (error) {
    //   console.error("Hubo un error al enviar los datos: ", error);
    //   throw error;
    // }
  };

  const getEspecialInstructions = async (itemId) => {
    try {
      const response = await mainAxios.get(`${instructions}${itemId}`, {
        headers: {
          Authorization: `Bearer ${employeeToken}`,
        },
      });

      if (response.status === 200) {
        return response.data.special_instructions[0].specialInstructions;
      } else {
        throw new Error("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Hubo un error al obtener los datos: ", error);
      throw error;
    }
  }

  return {
    handleSubmit,
    handleSubmitCustomer,
    getEspecialInstructions
  };
};
