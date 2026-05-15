import { Routes, Route } from 'react-router-dom';
import VehicleList from './components/VehicleList';
import VehicleForm from './components/VehicleForm';
import VehicleDetail from './components/VehicleDetail';
import VehicleEdit from './components/VehicleEdit'; // Importação do componente de edição

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 uppercase tracking-wide">
          Gestão de Veículos
        </h1>
        
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route path="/novo" element={<VehicleForm />} />
          <Route path="/veiculo/:id" element={<VehicleDetail />} />
          {/* Rota dinâmica para a tela de edição */}
          <Route path="/editar/:id" element={<VehicleEdit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;