import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function VehicleList() {
  const [veiculos, setVeiculos] = useState([]);
  
  // 1. Criamos os estados para controlar o que o usuário digita nos filtros
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroAno, setFiltroAno] = useState('');

  useEffect(() => {
    const carregarVeiculos = async () => {
      try {
        const resposta = await axios.get('http://localhost:3001/veiculos');
        setVeiculos(resposta.data);
      } catch (error) {
        console.error("Erro ao buscar os veículos:", error);
      }
    };
    carregarVeiculos();
  }, []);

  const deletarVeiculo = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
      try {
        await axios.delete(`http://localhost:3001/veiculos/${id}`);
        setVeiculos(veiculos.filter(v => v.id !== id));
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  // 2. Lógica do Filtro: cria uma lista temporária baseada no que foi digitado
  const veiculosFiltrados = veiculos.filter((veiculo) => {
    const bateMarca = veiculo.marca.toLowerCase().includes(filtroMarca.toLowerCase());
    const bateAno = filtroAno ? veiculo.ano.toString() === filtroAno : true;
    return bateMarca && bateAno;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Veículos Cadastrados</h2>
        <Link 
          to="/novo" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
        >
          + Novo Veículo
        </Link>
      </div>

      {/* 3. Interface visual dos Filtros */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">Filtrar por Marca</label>
          <input 
            type="text" 
            placeholder="Ex: Fiat, Chevrolet..." 
            value={filtroMarca}
            onChange={(e) => setFiltroMarca(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">Filtrar por Ano</label>
          <input 
            type="number" 
            placeholder="Ex: 2025" 
            value={filtroAno}
            onChange={(e) => setFiltroAno(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 4. Trocamos o 'veiculos.map' por 'veiculosFiltrados.map' */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {veiculosFiltrados.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-10">Nenhum veículo encontrado para esta busca.</p>
        ) : (
          veiculosFiltrados.map((veiculo) => (
            <div key={veiculo.id} className="bg-white p-5 rounded-lg shadow border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{veiculo.marca} {veiculo.modelo}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-400 uppercase">
                    {veiculo.placa}
                  </span>
                </div>
                <p className="text-gray-600 mb-1"><strong>Ano:</strong> {veiculo.ano}</p>
                <p className="text-gray-600 mb-4"><strong>Cor:</strong> {veiculo.cor}</p>
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                {/* O botão de detalhes em breve nos levará para a próxima tela */}
                <Link 
                  to={`/veiculo/${veiculo.id}`}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded text-sm transition text-center"
                >
                  Detalhes
                </Link>
                <button 
                  onClick={() => deletarVeiculo(veiculo.id)}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded text-sm transition"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}