import instance from "../instance"
import { AxiosResponse } from "axios"
import {
  ProductListMultiItem,
  ProductDetailItem,
  ApiResponse,
} from "@/@types/models"

export const apiGetProductList = (
  params?: any
): Promise<AxiosResponse<ApiResponse<ProductListMultiItem[]>>> => {
  return instance.get("exchange/product-list", { params })
}

export const apiGetProductDetail = (
  params?: any
): Promise<AxiosResponse<ApiResponse<ProductDetailItem[]>>> => {
  return instance.get("exchange/product", { params })
}

export const apiPostProduct = (
  data: any
): Promise<AxiosResponse<ApiResponse>> => {
  return instance.post("exchange/product", data)
}

export const apiLogin = (data: any): Promise<AxiosResponse<ApiResponse>> => {
  return instance.post("accounts/user", data)
}
