import { useState, type SubmitEvent } from 'react';
import { NavLink } from 'react-router-dom';

interface AuthBody {
  email: string;
  password: string;
}

function RegisterPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleRegister = async (e: SubmitEvent) => {
    e.preventDefault();

    const newUser: AuthBody = { email, password };

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();

      setMessage(data.message);

      if (response.ok) {
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setMessage('Server is not available');
    }
  };

  return (
    <div>
      <h2>Register form:</h2>
      <form onSubmit={handleRegister}>
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
        <button>Sign up</button>
      </form>
      <NavLink to='/login'>Already have an account? Sign in</NavLink>
      <p>{message}</p>
    </div>
  );
}

export default RegisterPage;
