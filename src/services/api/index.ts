import instance from "../instance";

export const apiExchange = (data?: any): void => {
  instance.get("/exchange/product-list/", { data });
};
