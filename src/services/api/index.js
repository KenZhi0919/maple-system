import instance from '../instance'

export const apiGetProductList = params => {
  return instance.get('exchange/product-list', { params })
}

export const apiGetProductDetail = params => {
  return instance.get('exchange/product', { params })
}

export const apiPostProduct = data => {
  return instance.post('exchange/product', data)
}

export const apiLogin = data => {
  return instance.post('accounts/user', data)
}

export const apiLoginThirdParty = data => {
  return instance.post('accounts/three-party-login', data)
}
