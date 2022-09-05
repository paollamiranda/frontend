import axios from "axios";
export default class CategoriasApi {
  async buscarTodosAsCategorias() {
    const response = await axios.get("http://localhost:4000/categorias");
    return response.data;
  }

  async buscarCategorias(id) {
    const response = await axios.get(`http://localhost:4000/categorias/${id}`);
    return response.data;
  }

  async adicionarCategorias(categoria) {
    const response = await axios.post("http://localhost:4000/categorias", categoria);
    return response.data;
  }

  async excluirCategorias(id) {
    const response = await axios.delete(`http://localhost:4000/categorias/${id}`);
    return response.data;
  }

  async atualizarCategorias(categoria) {
    const response = await axios.put(
      `http://localhost:4000/categorias/${categoria.id}`,
      categoria
    );
    return response.data;
  }
}