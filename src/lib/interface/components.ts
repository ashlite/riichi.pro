export interface iSearchBarResult {
  query?: string
}

export interface iPaginationNavResult {
  item_page: number
  current_page: number
}

export interface iEditableResult {
  newValue: string | number
  dataId: string | number
}

export interface iMonthPickerResult {
  date: Date
}

export interface iDatePickerResult {
  date: Date
}