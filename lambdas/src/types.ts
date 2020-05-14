export interface APIResponse {
  statusCode: number
  body: string
}

// from https://gumroad.com/ping
export interface GumroadPing {
  sale_id: string
  sale_timestamp: string
  order_number: number
  seller_id: string
  product_id: string
  product_permalink: string
  email: string
  url_params: { [key: string]: string }
  full_name: string
  purchaser_id: string
  subscription_id: string
  ip_country: string
  price: number
  recurrence: string
  variants: string
  offer_code: string
  test: boolean
  custom_fields: { [key: string]: string }
  shipping_information: { [key: string]: string }
  is_recurring_charge: boolean
  is_preorder_authorization: boolean
  license_key: string
  quantity: number
  shipping_rate: number
  affiliate: string
  affiliate_credit_amount_cents: number
  is_gift_receiver_purchase: boolean
  gifter_email: string
  gift_price: number
  refunded: boolean
}
