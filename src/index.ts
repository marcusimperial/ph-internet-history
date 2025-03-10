import 'dotenv/config';
import express, { Response } from 'express';
import cors from 'cors';
import path from 'path';
import { create } from 'express-handlebars';
import web from 'controllers/web';
import api from 'controllers/api';

const port = process.env.PORT!;
const app = express();
const hbs = create({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        isEven: function(i: number, options: any) {
            return i % 2 === 0 ? options.fn(this) : options.inverse(this);
        },
        isLowerRange: function(i: number, options: any) {
            return i < 3 ? options.fn(this) : options.inverse(this);
        }
    }
});


app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(web);
app.use('/api', api);
app.use((_, res: Response) => res.redirect('/past'));

const server = app.listen(Number(port), () => console.info(`Server running on port ${port}`));

export default server;