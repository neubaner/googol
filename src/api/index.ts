export interface SWAPIResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Starship {
  /**
   * The ISO 8601 date format of the time that this resource was created.
   */
  created: Date
  /**
   * The maximum speed of this starship in atmosphere. n/a if this starship is incapable of atmosphering flight.
   */
  max_atmosphering_speed: string
  /**
   * The name of this starship. The common name, such as Death Star.
   */
  name: string
  /**
   * The cost of this starship new, in galactic credits.
   */
  cost_in_credits: string
  /**
   * The manufacturer of this starship. Comma seperated if more than one.
   */
  manufacturer: string
  /**
   * The Maximum number of Megalights this starship can travel in a standard hour. A Megalight is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
   */
  MGLT: string
  /**
   * The length of this starship in meters.
   */
  length: string
  /**
   * The maximum number of kilograms that this starship can transport.
   */
  cargo_capacity: string
  /**
   * An array of Film URL Resources that this starship has appeared in.
   */
  films: string[]
  /**
   * The number of personnel needed to run or pilot this starship.
   */
  crew: string
  /**
   * The class of this starships hyperdrive.
   */
  hyperdrive_rating: string
  /**
   * The class of this starship, such as Starfighter or Deep Space Mobile Battlestation.
   */
  starship_class: string
  /**
   * the ISO 8601 date format of the time that this resource was edited.
   */
  edited: Date
  /**
   * An array of People URL Resources that this starship has been piloted by.
   */
  pilots: string[]
  /**
   * The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
   */
  consumables: string
  /**
   * The model or official name of this starship. Such as T-65 X-wing or DS-1 Orbital Battle Station.
   */
  model: string
  /**
   * The number of non-essential people this starship can transport.
   */
  passengers: string
  /**
   * The hypermedia URL of this resource.
   */
  url: string
}

const baseUrl = 'https://swapi.co/api'

function rawObjectToStarship(raw: any): Starship {
  return {
    ...raw,
    created: new Date(raw.created),
    edited: new Date(raw.edited),
  }
}

export async function searchStarships(
  searchTerm: string,
  page: number = 1
): Promise<SWAPIResponse<Starship>> {
  const response = await fetch(
    `${baseUrl}/starships?search=${encodeURIComponent(searchTerm)}&page=${page}`
  )
  const body = await response.json()

  return {
    ...body,
    results: body.results.map(rawObjectToStarship),
  }
}
