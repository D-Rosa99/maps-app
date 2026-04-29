const { mkdirSync, writeFileSync } = require('fs')
require('dotenv').config()

const GMAP_KEY = process.env['GMAP_KEY']
const envDir = 'src/app/environments'
const envPath = 'src/app/environments/environment.ts'
const envPathDev = 'src/app/environments/environment.development.ts'
const envContext = `
  export const environment = {
    GMAP_KEY:'${GMAP_KEY}'
  };
`

if( !GMAP_KEY ) {
  throw new Error('************. Missing API key  .*******************');
}

mkdirSync(envDir, { recursive: true })
writeFileSync(envPath, envContext)
writeFileSync(envPathDev, envContext)
