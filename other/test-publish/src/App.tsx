import React from 'react';
import './App.css';

import { Button, Input } from 'react-ui-study';

const App: React.FC = () => {
  const [value, setValue] = React.useState('123');

  return (
    <div className="app">
      <Button type="primary">{value}</Button>
      <hr />
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default App;
