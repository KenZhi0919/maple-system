import instance from "../instance";
import { AxiosResponse } from "axios";
import { ProductListMultiItem, ApiResponse } from "@/@types/models";

export const apiExchange = (
  params?: any
): Promise<AxiosResponse<ApiResponse<ProductListMultiItem[]>>> => {
  return instance.get("exchange/product-list", { params });
};
