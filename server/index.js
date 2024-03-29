"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//task-2
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//task-5
app.use(express_1.default.urlencoded({ extended: false }));
const port = 3001;
//task-2
/*app.get('/', (req: Request, res: Response) => {
    res.status(200).json({result: 'Success'})
})
app.listen(port)*/
//task-2
app.get('/', (req, res) => {
    const pool = openDb();
    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            res.status(500).json({ error: error });
        }
        res.status(200).json(result.rows);
    });
});
const openDb = () => {
    const pool = new pg_1.Pool({
        /* user: 'postgres',
         host: 'localhost',
         database: 'todo',
         password: 'airen',
         port: 5432*/
        user: 'root',
        host: 'dpg-cgat23pmbg55nqjvnrj0-a.oregon-postgres.render.com',
        database: 'todo_2b0i',
        password: '9lVZrFtziWaYiC0PV8TfrjdkqsOLXzyD',
        port: 5432,
        ssl: true
    });
    return pool;
};
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
//task-2
app.post('/new', (req, res) => {
    const pool = openDb();
    pool.query('INSERT INTO task (description) VALUES ($1) returning *', [req.body.description], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
});
//task-5
app.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = openDb();
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM task WHERE id = $1', [id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: "Task deleted" });
    });
}));
