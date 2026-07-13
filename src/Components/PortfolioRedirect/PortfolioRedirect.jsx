import { Navigate } from 'react-router-dom'
import { getRegionPortfolioPath } from '../../utils/regionPaths'

export default function PortfolioRedirect() {
  return <Navigate to={getRegionPortfolioPath()} replace />
}
