const express = require('express')
const path = require('path')
const app = express();
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}))

//Set a static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

