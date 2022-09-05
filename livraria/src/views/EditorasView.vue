<script>
  import EditorasApi from "@/api/editoras.js";
  const editorasApi = new EditorasApi();
  export default {
    data() {
      return {
        editora: {},
        editoras: [],
      };
    },
    async created() {
      this.editora = await editorasApi.buscarTodasAsEditoras();
    },
    methods: {
      async salvar() {
        if (this.editora.id) {
          await editorasApi.atualizareditora(this.editora);
        } else {
          await editorasApi.adicionareditora(this.editora);
        }
        this.editora = await editorasApi.buscarTodasAsEditoras();
        this.editora = {};
      },
      async excluir(editora) {
        await editorasApi.excluireditora(editora.id);
        this.editora = await editorasApi.buscarTodasAsEditoras();
      },
      editar(editora) {
        Object.assign(this.editoras, editora);
      },
    },
  };
  </script>
  
  <template>
    <div class="container">
      <div class="title">
        <h2>Gerenciamento de Editoras</h2>
      </div>
      <div class="form-input">
        <input type="text" placeholder="Editora" v-model="editoras.nome" />
        <input type="text" placeholder="site" v-model="editoras.site">
        <button @click="salvar()">Salvar</button>
      </div>
      <div class="list-editoras">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Site</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="editoras in editora" :key="editoras.id">
              <td>{{ editoras.id }}</td>
              <td>{{ editoras.nome }}</td>
              <td>{{editoras.site}}</td>
              <td>
                <button class="excluir" @click="excluir()">Excluir</button>
                <button class="editar" @click="editar()">Editar</button>
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
    width: 60%;
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
    width: 50%;
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
      background-color: aliceblue;
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