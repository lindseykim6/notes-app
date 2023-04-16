import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';

// eslint-disable-next-line react/function-component-definition
const App = () => <div className="test">All the REACT are belong to us!</div>;

const root = createRoot(document.getElementById('main'));
root.render(<App />);
