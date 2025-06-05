import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function renderPage(res, pagePath, data = {}) {
  ejs.renderFile(path.join(__dirname, "../views/layouts/main.ejs"),
    { ...data, page: path.join("../pages", `${pagePath}.ejs`) }, {}, (error, pageContent) => {
      if (error) {
        console.error('Exception occured inside renderPage!\n', error)
        return res.status(500).send('Exception occured inside renderPage!')
      }
      res.send(pageContent)
    }
  )
}

export default renderPage