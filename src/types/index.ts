// Type definitions based on your data structure
export interface Address {
  ID: number
  city: string
  pincode: string
  state: string
  street: string
}

export interface Director {
  ID: number
  directorName: string
  directorEmail: string
}

export interface Product {
  ID: number
  title: string
  description?: string
}

export interface SPOC {
  ID: number
  Name: string
  Email: string
  Phone: string
  Position: string
}

export interface RevenueInfo {
  ID: number
  revenueBracket: string
  userImpact: number
}

export interface FundingInfo {
  ID: number
  fundingType: string
}

export interface ExhibitorData {
  ID: number
  name: string
  banner: string
  logo: string
  websiteURL: string
  pitchDeck: string
  dpiitCertNumber: string
  address: Address
  director: Director
  products: Product[]
  spoc: SPOC
  revenueInfo: RevenueInfo
  fundingInfo: FundingInfo
}
