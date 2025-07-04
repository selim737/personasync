import React, { useState } from 'react';

function CustomFieldEditor() {
  const [fields, setFields] = useState([]);
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  const handleAddField = () => {
    if (!keyInput || !valueInput) return;

    const newField = { key: keyInput, value: valueInput };
    setFields([...fields, newField]);
    setKeyInput('');
    setValueInput('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Custom Field Editor</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Field Name (key)"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Value"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
        <button onClick={handleAddField} style={{ marginLeft: '10px' }}>
          Add
        </button>
      </div>

      <ul>
        {fields.map((field, index) => (
          <li key={index}>
            <strong>{field.key}</strong>: {field.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomFieldEditor;
