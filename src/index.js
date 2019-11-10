const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('port', process.env.PORT || 3000);
//rutas
app.use('/getHorariosApi', require('./routes/api'));
app.use('/', require('./routes/hola'));



app.listen(app.get('port'), ()=>{
    console.log(`Puerto ${app.get('port')} iniciado`);
});