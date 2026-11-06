import { useState, type SubmitEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface AuthBody {
  email: string;
  password: string;
}

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const navigate = useNavigate();

  const handleLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    const user: AuthBody = { email, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/orders');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Server is not available');
    }
  };

  return (
    <div>
      <h2>Login page:</h2>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          value={email}
          placeholder='Your email..'
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          value={password}
          placeholder='Your password..'
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button>Sign in</button>
      </form>
      <NavLink to='/register'>Do not have an account? Register now</NavLink>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;
