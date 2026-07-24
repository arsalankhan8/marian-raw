import { REGIONS } from '../constants/regions'
import { getSelectedRegion } from './regionPaths'

export const US_PORTFOLIO_SLUGS = [
  'four-season',
  'NYUTheatre',
  'le-jardin',
  'little-island',
  'days-end',
  'WeatherheadSchool',
  'AirForce',
  'NewYorkTimes',
  'ElevatedAcre',
  'GoldmanSachs',
  'NYUGym',
  '3-world-trade-center',
  'John-a-paulson-center',
]

export const CA_PORTFOLIO_SLUGS = [
  'td-terrace',
  'viva-next-brt-station',
  'the-well',
  'LuminousVeil',
  'the-bow',
  'garrison-crossing',
  'the-spirit-garden',
  'glen-road-pedestrian-bridge',
  '7-dale-condominium',
  'art-galary',
  'front-facade',
  'landmark-project',
  'house-of-commons',
  'centre-block-rehabilitation',
  'axium-packaging',
  'welland-canal',
  'peter-george-centre',
  'garrison-point',
  'ten-york',
  'uoft-oise',
  '50-wellesley',
  'royal-ontario-museum',
  'MississaugaLaserCentre',
  'TorontoPearsonAirport',
]


const isUSProject = (project) => {
  const loc = (project.location || '').toLowerCase()
  return (
    loc.includes('new york') ||
    loc.includes('ohio') ||
    loc.includes('virginia')
  )
}

const isCanadaProject = (project) => {
  const loc = (project.location || '').toLowerCase()
  return (
    loc.includes('ontario') ||
    loc.includes('alberta') ||
    loc.includes('quebec') ||
    loc.includes('british columbia')
  )
}

const matchesRegion = (project, region) => {
  if (region === REGIONS.US) return isUSProject(project)
  return isCanadaProject(project)
}

const sortBySlugOrder = (projects, slugOrder) => {
  const orderMap = new Map(slugOrder.map((slug, index) => [slug, index]))
  return [...projects].sort((a, b) => {
    const aIndex = orderMap.get(a.slug) ?? Number.MAX_SAFE_INTEGER
    const bIndex = orderMap.get(b.slug) ?? Number.MAX_SAFE_INTEGER
    return aIndex - bIndex
  })
}

export function filterPortfolioByRegion(data = [], region = "canada") {
  if (!Array.isArray(data)) return [];

  const normalizedRegion = region.toLowerCase();

  return data.filter((item) => {
    const itemRegion = (
      item.region ||
      item.country ||
      ""
    ).toLowerCase();

    return itemRegion === normalizedRegion;
  });
}