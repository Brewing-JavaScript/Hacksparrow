import { useContext } from "react";

export const getUi = () => {
  const { setUi } = useContext();
  try {
    const screenui = sessionStorage.getItem('themeSettings');

    const ui = JSON.parse(screenui);
    setUi(ui);
  } catch (error) {
    console.log(error);
  }
};
