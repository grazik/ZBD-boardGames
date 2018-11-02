import express from 'express';
import path from 'path';

const app = express();

app.use('/api', (req, res) => {
    res.json({ok: false});
});

app.use(express.static(path.resolve(__dirname, '../../dist/client')));

export default app;