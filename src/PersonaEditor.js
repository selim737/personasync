import React, { useState, useEffect } from "react";
import YAML from "yaml";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import CustomFieldEditor from "./components/CustomFieldEditor";

const PersonaEditor = () => {
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
    custom_fields: {},
  });

  const [yamlOutput, setYamlOutput] = useState("");

  useEffect(() => {
    const yamlData = YAML.stringify(persona);
    setYamlOutput(yamlData);
  }, [persona]);

  const handleChange = (field, value) => {
    setPersona((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field) => {
    setPersona((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      <Card>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Name"
            value={persona.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            placeholder="Languages"
            value={persona.languages}
            onChange={(e) => handleChange("languages", e.target.value)}
          />
          <Input
            placeholder="Spouse"
            value={persona.spouse}
            onChange={(e) => handleChange("spouse", e.target.value)}
          />
          <Input
            placeholder="Children"
            value={persona.children}
            onChange={(e) => handleChange("children", e.target.value)}
          />
          <Input
            placeholder="Personality"
            value={persona.personality}
            onChange={(e) => handleChange("personality", e.target.value)}
          />
          <Input
            placeholder="Interests"
            value={persona.interests}
            onChange={(e) => handleChange("interests", e.target.value)}
          />
          <Input
            placeholder="Values"
            value={persona.values}
            onChange={(e) => handleChange("values", e.target.value)}
          />
          <Input
            placeholder="Title"
            value={persona.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            placeholder="Experience (Years)"
            value={persona.experience_years}
            onChange={(e) => handleChange("experience_years", e.target.value)}
          />
          <Input
            placeholder="Current Company"
            value={persona.current_company}
            onChange={(e) => handleChange("current_company", e.target.value)}
          />
          <Input
            placeholder="Responsibilities"
            value={persona.responsibilities}
            onChange={(e) => handleChange("responsibilities", e.target.value)}
          />
          <Input
            placeholder="Working Style"
            value={persona.working_style}
            onChange={(e) => handleChange("working_style", e.target.value)}
          />
          <Input
            placeholder="Preferred Tone"
            value={persona.preferred_tone}
            onChange={(e) => handleChange("preferred_tone", e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <Textarea
            placeholder="Description"
            value={persona.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={persona.wants_humanity_convert}
                onChange={() => handleCheckboxChange("wants_humanity_convert")}
              />
              <span>Wants Humanity Convert</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={persona.hates_generic_answers}
                onChange={() => handleCheckboxChange("hates_generic_answers")}
              />
              <span>Hates Generic Answers</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={persona.allows_follow_up_questions}
                onChange={() => handleCheckboxChange("allows_follow_up_questions")}
              />
              <span>Allows Follow Up Questions</span>
            </label>
          </div>

          <CustomFieldEditor
            customFields={persona.custom_fields}
            setCustomFields={(newFields) =>
              setPersona((prev) => ({ ...prev, custom_fields: newFields }))
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Persona Preview</h2>
          <Textarea
            className="font-mono text-sm"
            rows={20}
            value={yamlOutput}
            readOnly
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaEditor;
