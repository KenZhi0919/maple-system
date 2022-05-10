export interface ProductDetailItem {
  product_id: string | number;
  images: string[];
  product_list_data: product_list_data;
  star: number;
  level: number;
  total_level: number;
  cut_num: number;
  attack: number;
  main_attribute: string | null;
  potential_level: string;
  potential_capability: string[];
  spark_level: string;
  spark_capability: string[];
  soul_capability: string | null;
  is_maple: boolean;
  maple_capability: string;
  maple_level: number;
  explanation: string;
  price: number;
  create_date: string;
  is_equippable_soul: boolean;
}

export interface product_list_data {
  category: string;
  image: string;
  name: string;
  product_list_id: string;
  stage_level: string;
  type: string;
  zh_stage_level: string;
}
