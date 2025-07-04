import React from 'react';
import ReactDOM from 'react-dom/client';
import PromptViewer from './components/PromptViewer';
import CustomFieldEditor from './components/CustomFieldEditor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <PromptViewer />
    <hr />
    <CustomFieldEditor />
  </div>
);
