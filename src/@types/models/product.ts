export interface Product {
  product_list: string | number | null;
  star: string;
  level: string;
  total_level: string;
  is_maple: boolean;
  maple_capability: string;
  price: string;
  maple_level?: string;
  label_level?: string;
  cut_num?: string;
  attack?: string;
  main_attribute?: string | null;
  potential_level?: string;
  potential_capability?: string[];
  spark_level?: string;
  spark_capability?: string[];
  is_equippable_soul?: boolean;
  soul_capability?: string | null;
  explanation?: string;
  images?: string[];
}
