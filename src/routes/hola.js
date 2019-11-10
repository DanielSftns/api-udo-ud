const { Router } = require('express');
const router = Router(); 

router.get('/', (req,res)=>{
	res.json({"title": "hola mundo"});
});

module.exports = router;