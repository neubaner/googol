import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '../../redux/store'
import {
  fetchStarships,
  fetchStarshipsNextPage,
  setSearchTerm,
} from '../../redux/starship'
import StarshipList from '../StarshipList/StarshipList'
import { MainPageWrapper, Error } from './styles'
import useDebounce from '../../hooks/useDebounce'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Title from '../Title/Title'
import StarshipModal from '../StarshipModal/StarshipModal'
import { showStarshipModal, closeStarshipModal } from '../../redux/ui'

export interface MainPageProps {
  starships: ReduxState['starship']['items']
  isFetching: ReduxState['starship']['isFetching']
  doHaveNextPage: ReduxState['starship']['doHaveNextPage']
  page: ReduxState['starship']['page']
  searchTerm: ReduxState['starship']['searchTerm']
  error: ReduxState['starship']['error']
  isModalOpen: ReduxState['ui']['isModalOpen']
  starshipIndex: ReduxState['ui']['starshipIndex']
  fetchStarships: (searchTerm: string) => void
  fetchStarshipsNextPage: (searchTerm: string, page: number) => void
  setSearchTerm: (searchTerm: string) => void
  showStarshipModal: (index: number) => void
  closeStarshipModal: () => void
}

const MainPage = ({
  starships,
  isFetching,
  doHaveNextPage,
  page,
  error,
  isModalOpen,
  starshipIndex,
  searchTerm,
  fetchStarships,
  fetchStarshipsNextPage,
  setSearchTerm,
  showStarshipModal,
  closeStarshipModal,
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
      <Title>Googol</Title>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      {error !== null && <Error>{error}</Error>}
      <StarshipList onClick={showStarshipModal} starships={starships} />
      {(doHaveNextPage || isFetching) && (
        <Button onClick={handleLoadMore} disabled={isFetching}>
          {isFetching ? 'Loading...' : 'Load more'}
        </Button>
      )}
      {isModalOpen && (
        <StarshipModal
          isOpen={isModalOpen}
          onModalClose={closeStarshipModal}
          starship={starships[starshipIndex]}
        />
      )}
    </MainPageWrapper>
  )
}

const mapStateToProps = ({
  starship: { error, isFetching, items, page, doHaveNextPage, searchTerm },
  ui: { isModalOpen, starshipIndex },
}: ReduxState) => ({
  starships: items,
  isFetching,
  page,
  doHaveNextPage,
  searchTerm,
  error,
  isModalOpen,
  starshipIndex,
})

const mapDispatchToProps = {
  fetchStarships,
  fetchStarshipsNextPage,
  setSearchTerm,
  showStarshipModal,
  closeStarshipModal,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)
