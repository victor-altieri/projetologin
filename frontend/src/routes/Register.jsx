import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/register", { email, senha });
      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (erro) {
      setMessage(erro.response?.data?.message || "Erro ao registrar usuário");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro de Usuário</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Cadastrar
          </button>
        </form>

        {message && (
          <div className="mt-4 p-2 text-sm text-center rounded 
            bg-green-100 text-green-700 border border-green-300">
            {message}
          </div>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta? <a href="/" className="text-blue-600 hover:underline">Faça Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
