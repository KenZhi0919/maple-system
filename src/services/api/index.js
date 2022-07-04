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

export const apiGetUserInfo = () => {
  return instance.get('accounts/user')
}

export const apiGetUserSellProduct = () => {
  return instance.get('exchange/product/sell-product')
}

export const apiPatchUserInfo = (id, data) => {
  return instance.patch(`accounts/user/${id}`, data)
}
