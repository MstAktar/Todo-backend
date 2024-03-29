//task-2
import express,{Express, Request, Response} from 'express';
import cors from 'cors';
import { Pool, QueryResult } from 'pg';

const app: Express = express()
app.use(cors())
app.use(express.json())
//task-5
app.use(express.urlencoded({extended: false}))

const port = 3001;

//task-2
/*app.get('/', (req: Request, res: Response) => {
    res.status(200).json({result: 'Success'})
})
app.listen(port)*/

//task-2
app.get('/', (req: Request, res: Response) => {
    const pool = openDb()
    pool.query('SELECT * FROM task', (error, result) => {
        if(error){
            res.status(500).json({error: error})
        }
        res.status(200).json(result.rows)
        })
    })
    const openDb = (): Pool => {
        const pool = new Pool({
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
        })
        return pool
    }
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

//task-2
app.post('/new', (req: Request, res: Response) => {
    const pool = openDb()
    pool.query('INSERT INTO task (description) VALUES ($1) returning *',
    [req.body.description], 
    (error: Error, result:QueryResult) => {
        if(error){
            res.status(500).json({error: error.message})
        }
        res.status(200).json({id: result.rows[0].id})
    })
})

//task-5
app.delete("/delete/:id", async(req: Request, res: Response)=>{
    const pool = openDb()

    const id = parseInt(req.params.id)

    pool.query('DELETE FROM task WHERE id = $1', 
    [id], 
    (error: Error, result: QueryResult) => {
        if(error){
            res.status(500).json({error: error.message})
        }
        res.status(200).json({message: "Task deleted"})
    })
})

