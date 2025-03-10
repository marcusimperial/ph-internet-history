"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = require("express-handlebars");
const web_1 = __importDefault(require("./controllers/web"));
const api_1 = __importDefault(require("./controllers/api"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const hbs = (0, express_handlebars_1.create)({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path_1.default.join(__dirname, 'views/layouts'),
    partialsDir: path_1.default.join(__dirname, 'views/partials'),
    helpers: {
        isEven: function (i, options) {
            return i % 2 === 0 ? options.fn(this) : options.inverse(this);
        },
        isLowerRange: function (i, options) {
            return i < 3 ? options.fn(this) : options.inverse(this);
        }
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.json());
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(web_1.default);
app.use('/api', api_1.default);
app.use((_, res) => res.redirect('/past'));
const server = app.listen(Number(port), () => console.info(`Server running on port ${port}`));
