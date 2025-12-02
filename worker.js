import fs from 'fs'
import path from 'path'

import server from '#nodes/server.js'
import app from '#nodes/app.js'
import src from '#nodes/src.js'

const baseFolder = './'

server(
  app({
    indexFile: './index.html', 
    static: [
      src(/^\/(html|css|js|image|md|font)/, {
        baseFolder
      })
    ]
  })
)()
