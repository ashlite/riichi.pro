export function priceFormater(price: number, currency: 'IDR' | 'IDRshort' | 'none' | string = 'IDR') {
  let formattedPrice
  switch(currency) {
    case 'IDR':
      formattedPrice = new Intl.NumberFormat('id-ID', {style:'currency', currency: 'IDR', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(price)
      break
    case 'IDRshort':
      formattedPrice = new Intl.NumberFormat('id-ID', {style:'currency', currency: 'IDR', currencyDisplay: 'narrowSymbol', notation:'compact'}).format(price)
      break
    case 'none':
      formattedPrice = new Intl.NumberFormat('id-ID', {style: 'decimal'}).format(price)
      break
    default:
      formattedPrice = new Intl.NumberFormat('id-ID', {style:'currency', currency: currency, currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(price)
  }
  return formattedPrice
}

export function marginCalc(buy: number | undefined = 0, sell: number | undefined = 0, type: 'nominal'|'percent' | undefined = 'nominal'): number{
  if (type == 'nominal') return sell - buy
  else return Math.round(((sell - buy) / sell) * 100)
}

export function dateFormater(date: Date | string | undefined | null, settings: 'date' | 'time' | 'datetime' | 'monthly' | 'month' | 'isoDateTime'): string {
  if (date == undefined) {
    return '--'
  } else {
    const formatedDate = new Date(date)
  
    switch (settings) {
      case 'date':
        return new Intl.DateTimeFormat('id-ID', {dateStyle:'medium'}).format(formatedDate)
      case 'time':
        return new Intl.DateTimeFormat('id-ID', {timeStyle:'short'}).format(formatedDate)
      case 'datetime':
        return new Intl.DateTimeFormat('id-ID', {dateStyle:'medium', timeStyle:'short'}).format(formatedDate)
      case 'monthly':
        return new Intl.DateTimeFormat('id-ID',{month: 'long', year:'numeric'}).format(formatedDate)
      case 'month':
        return new Intl.DateTimeFormat('id-ID',{month: 'long'}).format(formatedDate)
      case 'isoDateTime':
        return formatedDate.toLocaleString('sv').replace(' ','T')
    }
  }
}

export function durationFormater(stime: number) {
  let resultString = ''
  let tempTime = stime

  if (tempTime > 3600) {
    const totalHour = Math.floor(tempTime/3600)
    tempTime = tempTime % 3600
    resultString += `${totalHour} jam `
  }

  if (tempTime > 60) {
    const totalMinute = Math.floor(tempTime/60)
    tempTime = tempTime % 60
    resultString += `${totalMinute} menit `
  }

  if (tempTime != 0) {
    resultString +=`${tempTime} detik`
  }

  return resultString
}

export function validUrl(urlString: string) {
  try{
    return Boolean(new URL(urlString))
  } catch (error) {
    return false
  }
}

export function getInitials(name: string): string {
  const words = name.split(" ")
  let initials = ""
  for (const word of words) {
    const firstLetter = word.charAt(0).toUpperCase();
    initials += firstLetter;
  }
  return initials;
}