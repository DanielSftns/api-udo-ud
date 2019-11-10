const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('port', process.env.PORT || 3000);
//rutas
app.use('/api-udo-ud', require('./routes/api'));


app.listen(app.get('port'), ()=>{
    console.log(`Puerto ${app.get('port')} iniciado`);
});