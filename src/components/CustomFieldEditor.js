import React, { useState, useEffect } from 'react';

function CustomFieldEditor({ fields, setFields }) {
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  const handleEdit = (index, newValue) => {
    const updatedFields = [...fields];
    updatedFields[index].value = newValue;
    setFields(updatedFields);
  };

  const addField = () => {
    if (keyInput.trim() && valueInput.trim()) {
      setFields([...fields, { key: keyInput, value: valueInput }]);
      setKeyInput('');
      setValueInput('');
    }
  };

  return (
    <div>
      <h2>Custom Field Editor</h2>
      <ul>
        {fields.map((field, index) => (
          <li key={index}>
            <strong>{field.key}:</strong>
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleEdit(index, e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Field Name (key)"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
        <button onClick={addField}>Add</button>
      </div>
    </div>
  );
}

export default CustomFieldEditor;
