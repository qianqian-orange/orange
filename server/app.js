const path = require('path')
const fs = require('fs')
const express = require('express')
const favicon = require('serve-favicon')

const app = express()

app.use(favicon(path.join(__dirname, './public/favicon.ico')))

/* application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: false }))
/* application/json */
app.use(express.json())

const router = express.Router()

// 获取数据
router.get('/data', (req, res) => {
  fs.readFile(path.resolve(__dirname, './config.json'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      res.json({ code: 1 })
      return
    }
    res.setHeader('Content-Type', 'application/json')
    // res.send(data)
    res.json({
      code: 0,
      data: JSON.parse(data),
    })
  })
})

// 保存数据
router.post('/save', (req, res) => {
  fs.writeFile(path.resolve(__dirname, './config.json'), JSON.stringify(req.body), (err) => {
    if (err) {
      console.log(err)
      res.json({ code: 1 })
      return
    }
    res.json({ code: 0 })
  })
})

// 获取表单数据
router.post('/form', (req, res) => {
  res.json({
    code: 0,
    message: 'ok',
  })
})

app.use('/orange/api', router)

// app.use((req, res) => {
//   fs.readFile(path.join(__dirname, './public/index.html'), 'utf-8', (err, data) => {
//     if (err) return res.json({ code: 1 })
//     res.setHeader('Content-Type', 'text/html; charset=utf-8')
//     res.send(data)
//   })
// })

app.listen(9000, () => {
  console.log('server start at port 9000!')
})
