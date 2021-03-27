const http = require('http')
const fs = require('fs')
const path = require('path')

let serverHTML = 'ServerHTML'

const server = http.createServer((req, res) => {

    console.log(req.url)
    console.log(req.code)
    let filePath = path.join(__dirname, serverHTML, req.url === '/' ? 'index.html' : req.url)
    console.log(filePath)

    const ext = path.extname(filePath)
    let contentType = 'text/html'

    switch (ext) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        default:
            contentType = 'text/html'
    }

    if (!ext) {
        filePath += '.html'
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(__dirname, serverHTML, 'error.html'), (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end('Error')
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.end(data)
                }
            })
        } else {
            res.writeHead(200, {
                'Content-Type': contentType
            })
            res.end(content)
        }
    })
})

const PORT =  3000

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`)
})