import event from './event'
import teamMember from './teamMember' 
import recruitment from './recruitment' // <--- Changed this to match your file
import siteAssets from './siteAssets'

export const schemaTypes = [
  event,
  teamMember, 
  recruitment, // <--- Match the import name above
  siteAssets
]