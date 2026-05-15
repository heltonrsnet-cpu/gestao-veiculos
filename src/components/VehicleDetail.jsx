import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function VehicleDetail() {
  // O useParams pega o ID do veículo direto da URL (ex: /veiculo/1)
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [veiculo, setVeiculo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarVeiculo = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3001/veiculos/${id}`);
        setVeiculo(resposta.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do veículo:", error);
        setErro('Não foi possível carregar os detalhes deste veículo.');
      }
    };
    carregarVeiculo();
  }, [id]);

  if (erro) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center">
        <p className="text-red-500 font-semibold mb-4">{erro}</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Voltar para a Lista
        </button>
      </div>
    );
  }

  if (!veiculo) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Carregando detalhes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Detalhes do Veículo</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded border border-blue-400 uppercase">
          {veiculo.placa}
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-gray-700 text-lg"><strong>Marca:</strong> {veiculo.marca}</p>
        <p className="text-gray-700 text-lg"><strong>Modelo:</strong> {veiculo.modelo}</p>
        <p className="text-gray-700 text-lg"><strong>Ano:</strong> {veiculo.ano}</p>
        <p className="text-gray-700 text-lg"><strong>Cor:</strong> {veiculo.cor}</p>
      </div>

      <div className="flex gap-4 border-t pt-4">
        <button 
          onClick={() => navigate('/')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded transition duration-200"
        >
          Voltar
        </button>
        
        {/* Já deixamos o botão de Editar preparado para a próxima etapa */}
        <Link 
          to={`/editar/${veiculo.id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition duration-200 text-center"
        >
          Editar Veículo
        </Link>
      </div>
    </div>
  );
}