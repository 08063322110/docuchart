import express from 'express';

export const app = express();
app.use (express.json());

app.get('/', (req,res) => {
    res.send('hello world');
});

app.listen (3000, () => {
    console.log('i am listening on port 3000')
})
app.listen()