import React, { useState } from 'react';
import YAML from 'yaml';

import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import CustomFieldEditor from './components/CustomFieldEditor';

const defaultPersona = {
  name: '',
  description: '',
  languages: '',
  spouse: '',
  children: '',
  personality: '',
  interests: '',
  values: '',
  title: '',
  experience_years: '',
  current_company: '',
  responsibilities: '',
  working_style: '',
  preferred_tone: '',
  wants_humanity_convert: false,
  hates_generic_answers: false,
  allows_follow_up_questions: false,
  custom_fields: {},
};

export default function PersonaEditor() {
  const [persona, setPersona] = useState(defaultPersona);

  const handleChange = (field, value) => {
    setPersona({ ...persona, [field]: value });
  };

  const handleCustomFieldsChange = (updatedFields) => {
    setPersona({ ...persona, custom_fields: updatedFields });
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
      <div style={{ flex: 1 }}>
        <Card>
          <CardContent>
            <h2>Edit Persona</h2>
            {Object.keys(defaultPersona).map((key) => {
              if (key === 'custom_fields') return null;
              if (typeof defaultPersona[key] === 'boolean') {
                return (
                  <div key={key}>
                    <label>
                      <input
                        type="checkbox"
                        checked={persona[key]}
                        onChange={(e) => handleChange(key, e.target.checked)}
                      />{' '}
                      {key.replaceAll('_', ' ')}
                    </label>
                  </div>
                );
              }
              return (
                <div key={key}>
                  <label>{key.replaceAll('_', ' ')}</label>
                  <Input
                    value={persona[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </div>
              );
            })}
            <CustomFieldEditor
              fields={persona.custom_fields}
              onChange={handleCustomFieldsChange}
            />
          </CardContent>
        </Card>
      </div>
      <div style={{ flex: 1 }}>
        <Card>
          <CardContent>
            <h2>Persona Preview</h2>
            <Textarea
              rows={30}
              value={YAML.stringify(persona)}
              readOnly
            />
            <Button onClick={() => navigator.clipboard.writeText(YAML.stringify(persona))}>
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
