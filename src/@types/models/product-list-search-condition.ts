export interface ProductListSearchCondition {
  category: string
  type: string
  stage_level?: number[]
  star?: number
  is_maple?: boolean | number
  maple_capability?: string
  total_level?: number
  min_price?: number
  max_price?: number
  ordering?: string
}
