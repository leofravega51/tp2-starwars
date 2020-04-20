const redis = require('redis');
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 5000;
const portRedis = 6379;

const StarWars = redis.createClient(portRedis, 'db-starwars');
app.set('port', port);


StarWars.on('connect', function(){
    console.log(`Conectado a Redis en el puerto ${portRedis}`);
});


app.get('/starwars/agregarPersonaje?', async (req,res, next) => {
    try{
        const reqEpisodio = req.query.episodio;
        const reqPersonaje = req.query.personaje;
        
        if(reqEpisodio != null && reqPersonaje != null) {
            StarWars.lrange(reqEpisodio, 0, -1, (error, characters) =>{
                if(characters.includes(reqPersonaje)){
                    res.status(200).send("El personaje ya existe en la base de datos!");
                } else{
                    StarWars.lpush(reqEpisodio, reqPersonaje);
                    res.status(201).send("El personaje fue agregado con éxito!");
                }
            }) 
        } else {
            next();
        }
       
    } catch(error) {
        return next(error);
    }
})

app.get('/starwars/borrarPersonaje?', async (req,res, next) => {
    try{
        const reqEpisodio = req.query.episodio;
        const reqPersonaje = req.query.personaje;


        if(reqEpisodio != null && reqPersonaje != null){
            StarWars.lrange(reqEpisodio, 0, -1, (error, characters) =>{
                if (!characters.includes(reqPersonaje)){
                    res.status(200).send("El personaje no existe en la base de datos!");
                } else{
                    StarWars.llen(reqEpisodio, (error, len)=>{
                        for(i=0; i<=len;i++){
                            StarWars.lindex(reqEpisodio, i, (error, character) => {
                                if(character == reqPersonaje){
                                    StarWars.lrem(reqEpisodio, 1, reqPersonaje);
                                }
                            })
                        }
                    });
                    res.status(201).send(`El personaje ${reqPersonaje} fue eliminado con éxito!`);
                }
            });            
        }else {
            next();
        }
    }catch(error) {
        return next(error);
    }
})

app.get('/starwars/listarPersonajes?', async (req,res, next) => {
    try{
        const reqEpisodio = req.query.episodio;

        if(reqEpisodio != null){
            StarWars.exists(reqEpisodio, (error, episodio) => {
                if(episodio == 1){
                    StarWars.lrange(reqEpisodio, 0, -1, (error, characters) => {
                    res.status(201).send(characters.map(character => character))
                    });
                } else {
                    res.status(200).send("0");
                }
            });
        } else {
            next();
        }
    }catch(error) {
        return next(error);
    }
})



app.listen(app.get('port'), (err) => {
    console.log(`Server running on port ${port}`);
});

