import { useEffect, useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Orders {
  id: number;
  item: string;
}

interface OrdersBody {
  item: string;
}

function OrdersPage() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [item, setItem] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:3001/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('Server is not available');
      }
    };
    getOrder();
  }, []);

  const handleAddItem = async (e: SubmitEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const body: OrdersBody = { item };

    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setOrders([...orders, data]);
        setItem('');
        setMessage('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Server is not available');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeleteItem = async (id: number) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(orders.filter(order => order.id !== id));
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Server is not available');
    }
  };

  const handleStartEdit = (order: Orders) => {
    setEditingId(order.id);
    setIditItem(order.item);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditItem('');
  };

  const handleUpdateItem = async (id: number) => {
    const token = localStorage.getItem('token');
    const body: OrdersBody = { item: editItem };

    try {
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(orders.map(order => (order.id === id ? data : order)));
        setEditingId(null);
        setEditItem('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Server is not available');
    }
  };

  return (
    <div>
      <h2>Orders:</h2>
      <form onSubmit={handleAddItem}>
        <input
          value={item}
          onChange={e => setItem(e.target.value)}
          placeholder='Item name..'
          required
        />
        <button type='submit'>Add</button>
      </form>
      <p>{message}</p>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {editingId === order.id ? (
              <>
                <input
                  value={editItem}
                  onChange={e => setEditItem(e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => handleUpdateItem(order.id)}
                >
                  Save
                </button>
                <button type='button' onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {order.item}
                <button type='button' onClick={() => handleStartEdit(order)}>
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => handleDeleteItem(order.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button type='button' onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default OrdersPage;
