import express from 'express'
import path from 'path'

const app = express();

app.use(express.static(path.resolve('../client/public/')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client/public/index.html'))
});

app.listen(process.env.PORT ?? 3001, console.log('You listen port:', process.env.PORT ?? 3001))