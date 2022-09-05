<script>
  import LivrosApi from "@/api/livros.js";
  import AutoresApi from "@/api/autores.js";
  import CategoriasApi from "@/api/categorias.js";
  import EditorasApi from "@/api/editoras.js";
  const livrosApi = new LivrosApi();
  const autoresApi = new AutoresApi();
  const categoriasApi = new CategoriasApi();
  const editorasApi = new EditorasApi();
  export default {
    data() {
      return {
        livro: {},
        livros: [],
        categoria: {},
        categorias: [],
        editora: {},
        editoras: [],
        autor: {},
        autores: [],
      };
    },
    async created() {
      this.livros = await LivrosApi.buscarTodosOsLivros();
      this.autores = await AutoresApi.buscarTodosOsAutores();
      this.categorias = await CategoriasApi.buscarTodasAsCategorias();
      this.editoras = await EditorasApi.buscarTodasAsEditoras();
    },
    methods: {
      async salvar() {
        if (this.livro.id) {
          await LivrosApi.atualizarLivro(this.livro);
        } else {
          await LivrosApi.adicionarLivro(this.livro);
        }
        this.livros = await LivrosApi.buscarTodosOsLivros();
        this.categorias = await CategoriasApi.buscarTodasAsCategorias();
        this.editoras = await EditorasApi.buscarTodasAsEditoras();
        this.autores = await AutoresApi.buscarTodosOsAutores();
        this.livro = {};
      },
      async excluir(livro) {
        await LivrosApi.excluirLivro(livro.id);
        this.livros = await LivrosApi.buscarTodosOsLivros();
      },
      editar(livro) {
        Object.assign(this.livro, livro);
      },
    },
  };
  </script>
  
  <template>
    <div class="container">
      <div class="title">
        <h2>Gerenciamento de Livros</h2>
      </div>
      <div class="form-input">
        <input type="text" placeholder="Nome" v-model="novo_livro" />
        <input type="number" placeholder="Quantidade" v-model="nova_quantidade" />
        <input type="number" placeholder="Preço" v-model="novo_preco" />
        <select id="categorias" v-model="livro.categoria">
              <option disabled value="">Escolha uma categoria</option>
              <option
                v-for="categoria of categorias"
                :key="categoria.id"
                :value="categoria.descricao"
              >
                {{ categoria.descricao }}
              </option>
            </select>
            <select id="autores" v-model="livro.autor">
              <option disabled value="">Escolha um autor</option>
              <option
                v-for="autor of autores"
                :key="autor.id"
                :value="autor.nome"
              >
                {{ autor.nome }}
              </option>
            </select>
            <select id="editoras" v-model="livro.editora">
              <option disabled value="">Escolha uma editora</option>
              <option
                v-for="editora of editoras"
                :key="editora.id"
                :value="editora.nome"
              >
                {{ editora.nome }}
              </option>
            </select>
        <button @click="salvar()">Salvar</button>
      </div>
      <div class="list-livros">
        <table>
          <thead>
            <tr>
              <th>ID</th>
                <th>Título</th>
                <th>Categoria</th>
                <th>Editora</th>
                <th>Autor</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="livro in livros" :key="livro.id">
              <td>{{ livro.id }}</td>
              <td>{{ livro.nome }}</td>
              <td>{{ livro.categoria }}</td>
              <td>{{ livro.editora }}</td>
              <td>{{ livro.autor }}</td>
              <td>{{ livro.quantidade }}</td>
              <td>{{ livro.preco }}</td>
              <td>
                <button class="excluir" @click="excluir()">Excluir</button>
                <button class="excluir" @click="editar()">Editar</button>
  
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <style>
  .title {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
  .form-input {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  .form-input input {
    width: 30%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 0 10px;
  }
  .form-input button {
    margin-left: 1%;
    width: 20%;
    height: 40px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 10px;
    background-color: rgb(0, 0, 0);
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  .list-editoras {
    display: flex;
    justify-content: center;
  }
  table {
    width: 80%;
    margin: 2% auto;
    border-collapse: collapse;
  }
  table tr th {
    border: 1px solid #ccc;
    padding: 10px;
    font-weight: bold;
  }
  table tr td {
    border: 1px solid #ccc;
    padding: 10px;
  }
  table tr:nth-child(odd) {
    background-color: #ccc;
  }
  .excluir{
    background-color: black;
    color: white;
    border:white;
    border-radius: 20px;
    width: 93%;
    height: 30px;
  }
  </style>