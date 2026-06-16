import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VehicleForm() {
  // Estado para armazenar os dados do formulário
  const [veiculo, setVeiculo] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    cor: ''
  });
  
  // Estado para mensagens de erro na validação
  const [erro, setErro] = useState('');
  
  // Hook do React Router para redirecionar o usuário após o cadastro
  const navigate = useNavigate();

  // Função genérica para atualizar o estado conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculo({ ...veiculo, [name]: value });
  };

  // NOVA FUNÇÃO: Validação rigorosa dos dados
  const validarDados = () => {
    const { placa, marca, modelo, ano, cor } = veiculo;

    // 1. Barrar campos vazios ou preenchidos apenas com espaços
    if (!marca.trim() || !modelo.trim() || !cor.trim() || !placa.trim() || !ano.toString().trim()) {
      setErro('Por favor, preencha todos os campos corretamente sem deixar espaços em branco.');
      return false;
    }

    // 2. Validar Ano (Exatamente 4 dígitos, entre 1900 e o ano limite)
    const anoAtual = new Date().getFullYear();
    const anoNumero = parseInt(ano, 10);
    if (ano.toString().length !== 4 || isNaN(anoNumero) || anoNumero < 1900 || anoNumero > anoAtual + 1) {
      setErro('Por favor, insira um ano válido com 4 dígitos.');
      return false;
    }

    // 3. Validar Placa (Aceita o padrão antigo ABC-1234 ou Mercosul ABC1D23)
    const placaLimpa = placa.replace("-", "").trim();
    const regexPlaca = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/;
    
    if (!regexPlaca.test(placaLimpa)) {
      setErro('Formato de placa inválido. Use os padrões ABC-1234 ou ABC1D23.');
      return false;
    }

    return true; // Se passar por todas as regras, libera o cadastro!
  };

  // Função disparada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    
    // Chama a nossa nova validação. Se retornar false, interrompe o envio.
    if (!validarDados()) {
      return;
    }

    try {
      // Fazendo a requisição POST para o json-server
      await axios.post('http://localhost:3001/veiculos', veiculo);
      setErro('');
      alert('Veículo cadastrado com sucesso!');
      
      // Redireciona de volta para a tela inicial (Listagem)
      navigate('/'); 
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setErro('Erro ao conectar com o servidor. O json-server está rodando?');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cadastrar Novo Veículo</h2>
      
      {/* Exibição da mensagem de erro, se houver */}
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
              placeholder="Ex: RVF3A46"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Marca</label>
            <input 
              type="text" 
              name="marca" 
              value={veiculo.marca} 
              onChange={handleChange} 
              placeholder="Ex: Fiat"
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
              placeholder="Ex: Argo 1.0"
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
              placeholder="Ex: 2025"
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
              placeholder="Ex: Branco"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-200"
          >
            Salvar Veículo
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