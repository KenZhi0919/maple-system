export interface ApiResponse<T = any> {
  data_msg: string;
  data_status: number;
  result: T;
}
