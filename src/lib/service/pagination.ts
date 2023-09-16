import type { iPagination } from "interface/utils"

export const updatePagination = (url: URL, totalRow: number): iPagination => {
  let itemPage = url.searchParams.has('itemPage') ? Number(url.searchParams.get('itemPage')) : 50
  if (itemPage < 0) {
    itemPage = 1
  }

  let currentPage = url.searchParams.has('currentPage') ? Number(url.searchParams.get('currentPage')) : 1
  if (currentPage < 1) {
    currentPage = 1
  }
  
  let itemSkip = itemPage * (currentPage - 1)
  const totalItem = totalRow ?? 0
  const totalPage = Math.ceil(totalItem/itemPage) < 1 ? 1 : Math.ceil(totalItem/itemPage)

  if (currentPage > totalPage) {
    currentPage = totalPage
    itemSkip = itemPage * (currentPage - 1)
  }

  return {
    current_page: currentPage,
    item_page: itemPage,
    item_skip: itemSkip,
    total_item: totalItem,
    total_page: totalPage,
  }
}