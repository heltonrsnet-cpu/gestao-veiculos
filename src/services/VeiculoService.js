import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const VeiculoService = {
  listarTodos: () => api.get('/veiculos'),
  buscarPorId: (id) => api.get(`/veiculos/${id}`),
  cadastrar: (dados) => api.post('/veiculos', dados),
  atualizar: (id, dados) => api.put(`/veiculos/${id}`, dados),
  excluir: (id) => api.delete(`/veiculos/${id}`)
};
