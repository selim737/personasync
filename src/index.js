import React from 'react';
import ReactDOM from 'react-dom/client';
import PromptViewer from './components/PromptViewer';
import CustomFieldEditor from './components/CustomFieldEditor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>PersonaSync is live!</h1>
      <PromptViewer />
      <hr style={{ margin: '2rem 0' }} />
      <CustomFieldEditor />
    </div>
  </React.StrictMode>
);
