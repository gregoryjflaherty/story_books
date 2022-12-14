const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')

//Load config
dotenv.config({ path: 'config/config.env'})

const app = express()

connectDB()

//handle bars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//routes
app.use('/', require('./routes/index'))


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

