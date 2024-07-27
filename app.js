const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
//用require把restaurant.json傳到樣板引擎中
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) =>{
  res.redirect('/restaurants')
})

//main.hbs裡面的{{{body}}}載入的是index.hbs
app.get('/restaurants', (req, res)=>{
  res.render('index', { restaurants })
})

app.get('/restaurant/:id', (req, res)=>{
  const id = req.params.id
  res.send(`read restaurant: ${id}`)
})

app.listen(port, ()=>{
  console.log(`express server is running on http://localhost:${port}`)
})