import { engine } from 'express-handlebars';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';


const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

// cau hinh app
const app = express();
const port = 3001;

app.use( express.static(path.join(__dirname, 'public')));


// HTTP Logger
app.use(morgan('combined'));

//Template engine: handlebars
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views' ,path.join(__dirname, 'resources/views'));


//Route
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});
app.listen(port, () => {
  console.log(`Example app listening on port http:://localhost:${port}`)
});