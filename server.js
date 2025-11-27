// 1. importar as biblitecas
const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');

// 2. configurar o servidor express
const app = express();
app.user(cors()); //permite que o front end acesse este back end
app.use(cors()); //permite que o servidor entenda o JSON

//3. conectar ao MongoDB
// !!! SUBSTITUA PELA STRING DE CONEXÃO !!!
const mongoURI = '';
mongoose.Connection(mongoURI,{useNewUrlParser: true, useUnifieldTopology: true})
    .then(() => console.log('Conectando ao MongoDB com sucesso!'))
    .catch(() => console.error('Erro ao conectar ao MongoDB:', err));

//4. definir o "Schema" . A estrutura dos dados
// que corresponderá a estrutura do seu formulário
const relatorioShema = new mongoose.Schema({
    titulo: String,
    tipo: String,
    ano: Number,
    status: String,
    data_envio: Date,
    responsavel: {
        nome: String,
        cargo: String,
        departamento: String
    },
    palavras_chave: (String),
    revisoes: ({
        data: Date,
        revisando_por: String,
        comentario: String
    })

});

// 5. criar o "model" - o objeto que representa sua coleção no banco
const Relatorio = mongoose.model('Relatorio', relatorioShema);

// 6. criar a "Rota" ou "EndPoint" = a url que o front irá chamar

app.post('/salvar-relatorio', async(req, res) => {
    try{
        // pega os dados que o front end enviou (estao em req.body)
        const dadosDoFormulario = req.body;

        // criar um novo documento com base nos dados
        const novoRelatorio = new Relatorio(dadosDoFormulario);

        // Salva o documento no banco de dados
        await novoRelatorio.save();

        // envia uma resposta de sucesso de volta para o front
        res.status(201).json({ message: 'Relatório salvo com sucesso! '});
        console.log('Relatório salvo: ', novoRelatorio);
    }catch(error){
        // se der erro, envia uma menssagem de erro
        res.status(500).json({ message: 'Ocorreu um erro ao salvar o relatório.',
        error: error});
        console.error('Erro ao salvar:', error);
    }
});

const PORT= 3000; // a porta em que a back end irá roda
app.listen(PORT, () => {
    console.log(`Servidor back-end rodando na porta ${PORT}`);
});