import event from './event'
import teamMember from './teamMember' 
import recruitment from './recruitment' // <--- Changed this to match your file
import siteAssets from './siteAssets'
import merch from './merch'

export const schemaTypes = [
  event,
  teamMember, 
  recruitment, // <--- Match the import name above
  merch, // <--- Add this line
  siteAssets
]