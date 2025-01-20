
app.use(express.json());

const pessoas = [];

app.get('/pessoas', (req, res) => {
    res.json(pessoas);
}); /*para listar todas as pessoas cadastradas GET*/

app.post('/pessoas', (req, res) => {
    const { nome, idade, email, documento, endereco } = req.body;
  
    const novaPessoa = { nome, idade, email, documento, endereco };
    pessoas.push(novaPessoa);
  
    res.status(201).json({ message: 'Pessoa cadastrada com sucesso!', novaPessoa });
  }); /*para cadastrar uma pessoa POST*/

app.get('/pessoas/:email', (req, res) => {
    const { email } = req.params;
    const pessoa = pessoas.find(p => p.email === email);
    if (!pessoa) {
        return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    res.status(200).json(pessoa);
}); //para buscar uma pessoa pelo email GET*/








