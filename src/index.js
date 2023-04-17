import { engine } from 'express-handlebars';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connect from './config/db/index.js';
import route from './routes/index.js';
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

//Connect to DB
connect();

// cau hinh app
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));
// Midleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP Logger
app.use(morgan('combined'));

//Template engine: handlebars
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);
app.listen(port, () => {
    console.log(`Example app listening on port http:://localhost:${port}`);
});
