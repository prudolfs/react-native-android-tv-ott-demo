import { CatalogData } from '../types'

const CATALOG_URL =
  'https://gist.github.com/prudolfs/18022863b8fb8ac6c70009e6100e17e2/raw/catalog.json'

export const fetchCatalog = async (): Promise<CatalogData> => {
  try {
    const response = await fetch(CATALOG_URL)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to fetch catalog:', error)
    throw error
  }
}
