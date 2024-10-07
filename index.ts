import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// POST route handler
app.post("*", async (req: Request, res: Response) => {
    res.send("Hello post");
});

// GET route handler
app.get("*", async (req: Request, res: Response) => {
    res.send("Hello get");
});

app.listen(PORT, () =>{
    console.log("Server listening on PORT", PORT);
})