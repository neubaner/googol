import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '../../redux/store'
import {
  fetchStarships,
  fetchStarshipsNextPage,
  setSearchTerm,
} from '../../redux/starship'
import StarshipList from '../StarshipList/StarshipList'
import { MainPageWrapper } from './styles'
import useDebounce from '../../hooks/useDebounce'

export interface MainPageProps {
  starships: ReduxState['starship']['items']
  isFetching: ReduxState['starship']['isFetching']
  doHaveNextPage: ReduxState['starship']['doHaveNextPage']
  page: ReduxState['starship']['page']
  searchTerm: ReduxState['starship']['searchTerm']
  error: ReduxState['starship']['error']
  fetchStarships: (searchTerm: string) => void
  fetchStarshipsNextPage: (searchTerm: string, page: number) => void
  setSearchTerm: (searchTerm: string) => void
}

const MainPage = ({
  starships,
  isFetching,
  doHaveNextPage,
  page,
  error,
  searchTerm,
  fetchStarships,
  fetchStarshipsNextPage,
  setSearchTerm,
}: MainPageProps) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    fetchStarships(debouncedSearchTerm)
  }, [fetchStarships, debouncedSearchTerm])

  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    [setSearchTerm]
  )

  const handleLoadMore = useCallback(
    () => fetchStarshipsNextPage(searchTerm, page),
    [fetchStarshipsNextPage, searchTerm, page]
  )

  return (
    <MainPageWrapper>
      <input value={searchTerm} onChange={handleSearchTermChange} />
      <StarshipList starships={starships} />
      {isFetching && <div>Loading...</div>}
      {doHaveNextPage && <button onClick={handleLoadMore}>Load more</button>}
    </MainPageWrapper>
  )
}

const mapStateToProps = ({
  starship: { error, isFetching, items, page, doHaveNextPage, searchTerm },
}: ReduxState) => ({
  starships: items,
  isFetching,
  page,
  doHaveNextPage,
  searchTerm,
  error,
})

const mapDispatchToProps = {
  fetchStarships,
  fetchStarshipsNextPage,
  setSearchTerm,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)
