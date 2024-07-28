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
  //".keyword"和index.hbs裡的input的name一樣
  const keyword = req.query.keyword?.trim()
  const matchedRes = keyword ? restaurants.filter((res) =>
    Object.values(res).some((property) => {
      if (typeof property === 'string'){
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : restaurants
  res.render('index', { restaurants: matchedRes, keyword })
})

app.get('/restaurant/:id', (req, res)=>{
  const id = req.params.id
  const restaurant = restaurants.find((res) => res.id.toString() === id)
  res.render('show-page', { restaurant })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})