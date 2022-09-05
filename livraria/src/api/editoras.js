import axios from "axios";
export default class EditorasApi {
  async buscarTodosAsEditoras() {
    const response = await axios.get("http://localhost:4000/editoras");
    return response.data;
  }

  async buscarEditoras(id) {
    const response = await axios.get(`http://localhost:4000/editoras${id}`);
    return response.data;
  }

  async adicionarEditoras(editora) {
    const response = await axios.post("http://localhost:4000/editoras", editora);
    return response.data;
  }

  async excluirEditoras(id) {
    const response = await axios.delete(`http://localhost:4000/editoras${id}`);
    return response.data;
  }

  async atualizarEditoras(editora) {
    const response = await axios.put(
      `http://localhost:4000/editoras${editora.id}`,
      editora
    );
    return response.data;
  }
}