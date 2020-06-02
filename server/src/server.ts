import express, { response } from 'express';

const app = express();

app.use(express.json());

//POST http://localhost:3333/users = Cria user
//GET http://localhost:3333/users = Lista user
//GET http://localhost:3333/users/5 = Busca dados user ID 5

//Request Param: embutido na rota, identifica o recurso
//Query Param: embutido na rota, opcao para filtros, paginação
//Request body: parametros para criação/atualização de info

//SELECT * FOM users WHERE name = 'Karlo'
//knex('users').where('name', 'Karlo').select('*')


const users = [
    'Karlo',
    'Mesquita',
    'Rodrigues',
    'karlo',
];

app.get('/users', (request, response) =>{
    //console.log('Listagem de usuários');
    //response.send({'Hello World!'})
    const search = String(request.query.search);

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);

    const user = users[id];

    return response.json(user);
});

app.post('/users',(request, response) => {
    const data = request.body;


    const user = {
        name: data.name,
        email: data.email,
    }

    response.json(user);
});

app.listen(3333);