const express = require ("express");
const app = express();

app.get ('/', (req, res) => {
    res.send('Good Morning, Martine');
});

app.listen(5000, () => {
    console.log ("The App is listening on port 5000.cd")
});