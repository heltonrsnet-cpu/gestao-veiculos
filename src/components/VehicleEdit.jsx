import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VehicleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [veiculo, setVeiculo] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    cor: ''
  });
  const [erro, setErro] = useState('');

  // Carrega os dados atuais do veículo para preencher o formulário assim que a tela abre
  useEffect(() => {
    const carregarVeiculo = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3001/veiculos/${id}`);
        setVeiculo(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar veículo:", error);
        setErro('Não foi possível carregar os dados do veículo.');
      }
    };
    carregarVeiculo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculo({ ...veiculo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica de campos obrigatórios
    if (!veiculo.placa || !veiculo.marca || !veiculo.modelo || !veiculo.ano || !veiculo.cor) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Faz o PUT para atualizar o registro específico no json-server
      await axios.put(`http://localhost:3001/veiculos/${id}`, veiculo);
      setErro('');
      alert('Veículo atualizado com sucesso!');
      navigate('/'); // Redireciona de volta para a listagem
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setErro('Erro ao salvar as alterações no servidor.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar Veículo</h2>

      {erro && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{erro}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Placa</label>
            <input
              type="text"
              name="placa"
              value={veiculo.placa}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase font-semibold bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Marca</label>
            <input
              type="text"
              name="marca"
              value={veiculo.marca}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={veiculo.modelo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Ano</label>
            <input
              type="number"
              name="ano"
              value={veiculo.ano}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Cor</label>
            <input
              type="text"
              name="cor"
              value={veiculo.cor}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded transition duration-200"
          >
            Salvar Alterações
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded transition duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}