import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Rediriger vers le dashboard après connexion réussie
    } catch (err) {
      console.log(err);
      setError("Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Connexion</h2>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm">Mot de passe</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-black py-2 rounded">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
