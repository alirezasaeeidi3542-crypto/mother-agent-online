import { useEffect, useState } from 'react';

export default function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/children')
      .then(res => res.json())
      .then(data => setAgents(data.children))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>لیست ایجنت‌ها</h1>
      <ul>
        {Object.keys(agents).length === 0
          ? <li>هیچ ایجنتی موجود نیست</li>
          : Object.keys(agents).map(id => (
            <li key={id}>{id}</li>
          ))
        }
      </ul>
    </div>
  );
}
