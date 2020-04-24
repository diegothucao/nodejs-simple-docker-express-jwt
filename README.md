# Composer, express
This is an essential example to build docker with Composer, express

To run:  docker-compose up --build      

Code example

``` javascript
import cors from 'cors'
import { urlencoded, json } from 'body-parser'
import dotenv from 'dotenv'

dotenv.load()
var app = require('express')();
var http = require('http').createServer(app);

app.use(urlencoded({ extended: true, limit: '500mb' }))
app.use(json({ extended: true, limit: '500mb' }))
app.use(cors())

http.listen(process.env.PORT)


app.get('/', (_, res) => {
	res.send('Diego Cao: Hello')
})

```

If you see any issue, please do not hesitate to create an issue here or can contact me via email cao.trung.thu@gmail.com or [Linkedin](https://www.linkedin.com/in/diegothucao/)

Thanks
	
references
https://docs.docker.com/install/	
