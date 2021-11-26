import { ref } from "vue"

export function usePageSearch() {
  const pageContentRef = ref()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleSearchClick = (searchInfo) => {
    pageContentRef.value?.getPageData(searchInfo)
  }
  return [pageContentRef, handleResetClick, handleSearchClick]
}
