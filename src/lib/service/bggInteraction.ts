import { XMLParser } from 'fast-xml-parser'
import toastAlert from 'store/toast'
import axios from 'axios'
import { decodeXML } from 'entities'
import type { iBggGroup } from 'interface/catalogue'

interface iBggGameData {
  name: string
  released?: number,
  category: 'Core Game' | 'Expansion' | 'Game Aksesori'
  min_player?: number
  max_player?: number
  min_playtime?: number
  max_playtime?: number
  min_age?: number
  game_difficulties?: number
  cover?: string
  thumb_cover?: string
  description?: string
}

interface iBggItem {
  success: boolean
  is_game?: boolean
  data?: iBggGameData
  group?: iBggGroup[]
}

const BggSingleItem = async(bggId: number): Promise<iBggItem> => {
  const fixArray: iBggGroup[] = [] 
  const responseBgg = await axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=${bggId}&stats=1`)
  const stringData = await responseBgg.data
  const parser = new XMLParser({
    ignoreAttributes : false,
    attributeNamePrefix : "",
  })
  const bggObject = parser.parse(stringData).items.item
  
  if (bggObject === undefined){
    toastAlert.error('Failed to get BGG data')
    return { success: false }
  }else if(bggObject.type == 'boardgameaccessory') {
    return {
      success: true,
      is_game: false,
      data: {
        name: decodeXML(decodeXML(Array.isArray(bggObject.name) ? bggObject.name[0].value : bggObject.name.value)),
        released: bggObject.yearpublished.value,
        category: 'Game Aksesori',
        cover: bggObject.image,
        thumb_cover: bggObject.thumbnail,
        description: decodeXML(decodeXML(bggObject.description)),
      },
      group: []
    }
  } else {
    const arrayBggStat = bggObject.link
    arrayBggStat.forEach((item: any): void => {
      if(item.type == 'boardgamecategory' || item.type == 'boardgamemechanic' || item.type == 'boardgamefamily') {
        fixArray.push({
          group_type: item.type,
          id: item.id,
          value: item.value
        })
      }
    })
  
    return {
      success: true,
      is_game: true,
      data:{
        name: decodeXML(decodeXML(Array.isArray(bggObject.name) ? bggObject.name[0].value : bggObject.name.value)),
        released: (bggObject.yearpublished.value ?? 0),
        category: (bggObject.type == 'boardgame' ? 'Core Game' : 'Expansion'),
        min_player: (bggObject.minplayers.value ?? 0),
        max_player: (bggObject.maxplayers.value ?? 0),
        min_playtime: (bggObject.minplaytime.value ?? 0),
        max_playtime: (bggObject.maxplaytime.value ?? 0),
        min_age: (bggObject.minage.value ?? 0),
        game_difficulties: Math.round((bggObject.statistics.ratings.averageweight.value ?? 0) * 100)/100,
        cover: bggObject.image,
        thumb_cover: bggObject.thumbnail,
        description: decodeXML(decodeXML(bggObject.description ?? '')),
      },
      group: fixArray
    }
  }
}

export default BggSingleItem