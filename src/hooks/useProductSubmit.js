import mainAxios from "../../axios.config.js";
import useEmployeeStore from "../store/useEmployeeStore.js";

export const useProductSubmit = (insert) => {
  const { employeeToken } = useEmployeeStore();

  const handleSubmit = async (
    itemId,
    quantity = 0,
    note = "",
    state = null
  ) => {
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

  return {
    handleSubmit,
  };
};
