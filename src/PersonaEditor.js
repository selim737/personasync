import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import CustomFieldEditor from "./components/CustomFieldEditor";
import YAML from "yaml";

export default function PersonaEditor() {
  const [persona, setPersona] = useState({
    name: "",
    description: "",
    languages: "",
    spouse: "",
    children: "",
    personality: "",
    interests: "",
    values: "",
    title: "",
    experience_years: "",
    current_company: "",
    responsibilities: "",
    working_style: "",
    preferred_tone: "",
    wants_humanity_convert: false,
    hates_generic_answers: false,
    allows_follow_up_questions: false,
    custom_fields: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersona({
      ...persona,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCustomFieldsChange = (fields) => {
    setPersona((prev) => ({
      ...prev,
      custom_fields: fields,
    }));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Persona Editor</h1>

      <Card style={{ marginBottom: "1rem" }}>
        <CardContent>
          <Input name="name" placeholder="Name" value={persona.name} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Textarea name="description" placeholder="Description" value={persona.description} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="languages" placeholder="Languages" value={persona.languages} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="spouse" placeholder="Spouse" value={persona.spouse} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="children" placeholder="Children" value={persona.children} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="personality" placeholder="Personality" value={persona.personality} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="interests" placeholder="Interests" value={persona.interests} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="values" placeholder="Values" value={persona.values} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="title" placeholder="Title" value={persona.title} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="experience_years" placeholder="Experience Years" value={persona.experience_years} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="current_company" placeholder="Current Company" value={persona.current_company} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="responsibilities" placeholder="Responsibilities" value={persona.responsibilities} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="working_style" placeholder="Working Style" value={persona.working_style} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />
          <Input name="preferred_tone" placeholder="Preferred Tone" value={persona.preferred_tone} onChange={handleChange} style={{ marginBottom: "0.5rem" }} />

          <label>
            <input type="checkbox" name="wants_humanity_convert" checked={persona.wants_humanity_convert} onChange={handleChange} />
            Wants Humanity Convert
          </label>
          <br />
          <label>
            <input type="checkbox" name="hates_generic_answers" checked={persona.hates_generic_answers} onChange={handleChange} />
            Hates Generic Answers
          </label>
          <br />
          <label>
            <input type="checkbox" name="allows_follow_up_questions" checked={persona.allows_follow_up_questions} onChange={handleChange} />
            Allows Follow Up Questions
          </label>
        </CardContent>
      </Card>

      <CustomFieldEditor fields={persona.custom_fields} onFieldsChange={handleCustomFieldsChange} />

      <Card>
        <CardContent>
          <h3>Persona Preview (JSON)</h3>
          <pre>{JSON.stringify(persona, null, 2)}</pre>

          <h3>Persona Preview (YAML)</h3>
          <pre>{YAML.stringify(persona)}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
