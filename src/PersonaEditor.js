import { useState } from "react";
import YAML from "yaml";

export default function PersonaEditor() {
  const [persona, setPersona] = useState({
    full_name: "",
    nickname: "",
    birth_year: "",
    gender: "",
    location: { country: "", city: "" },
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
    wants_humanity_convert: true,
    hates_generic_answers: true,
    allows_follow_up_questions: true,
    context_tags: ""
  });

  const [customFields, setCustomFields] = useState([
    { key: "Language", value: "English" },
    { key: "Tone", value: "Friendly" },
    { key: "UseCase", value: "Support Agent" }
  ]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleChange = (key, value) => {
    setPersona({ ...persona, [key]: value });
  };

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    const json = JSON.stringify(persona, null, 2);
    downloadFile("persona.json", json);
  };

  const exportYAML = () => {
    const yaml = YAML.stringify(persona);
    downloadFile("persona.yaml", yaml);
  };

  const exportMarkdown = () => {
    const md = `# AI Persona\n\n` +
      `**Full Name:** ${persona.full_name}\n` +
      `**Nickname:** ${persona.nickname}\n` +
      `**Birth Year:** ${persona.birth_year}\n` +
      `**Location:** ${persona.location.city}, ${persona.location.country}\n` +
      `**Languages:** ${persona.languages}\n` +
      `**Spouse:** ${persona.spouse}\n` +
      `**Children:** ${persona.children}\n` +
      `**Personality:** ${persona.personality}\n` +
      `**Interests:** ${persona.interests}\n` +
      `**Values:** ${persona.values}\n` +
      `**Job Title:** ${persona.title}\n` +
      `**Experience:** ${persona.experience_years} years\n` +
      `**Current Company:** ${persona.current_company}\n` +
      `**Responsibilities:** ${persona.responsibilities}\n` +
      `**Working Style:** ${persona.working_style}\n` +
      `**Preferred Tone:** ${persona.preferred_tone}\n` +
      `**Tags:** ${persona.context_tags}`;
    downloadFile("persona.md", md);
  };

  const exportPrompt = () => {
    if (prompt) {
      downloadFile("ai_prompt.txt", prompt);
    }
  };

  const generatePrompt = () => {
    const promptText = `You are now assisting ${persona.full_name} (${persona.nickname}).\n` +
      `They are an experienced ${persona.title} working at ${persona.current_company}.\n` +
      `They live in ${persona.location.city}, ${persona.location.country} and speak ${persona.languages}.\n` +
      `Interests include: ${persona.interests}.\n` +
      `They value: ${persona.values}.\n` +
      `Preferred tone: ${persona.preferred_tone}.\n` +
      `Please be ${persona.wants_humanity_convert ? "natural and human-like" : "formal"}, ` +
      `${persona.hates_generic_answers ? "avoid generic replies" : "generic replies are fine"}, ` +
      `${persona.allows_follow_up_questions ? "and feel free to ask clarifying questions." : "don't ask follow-ups."}` +
      `\n\nCustom Fields:\n` +
      customFields.map(field => `- ${field.key}: ${field.value}`).join("\n");

    setPrompt(promptText);
  };

  const addField = () => {
    if (newKey && newValue) {
      setCustomFields([...customFields, { key: newKey, value: newValue }]);
      setNewKey("");
      setNewValue("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Persona Creator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input placeholder="Full Name" value={persona.full_name} onChange={(e) => handleChange("full_name", e.target.value)} />
        <input placeholder="Nickname" value={persona.nickname} onChange={(e) => handleChange("nickname", e.target.value)} />
        <input placeholder="Birth Year" value={persona.birth_year} onChange={(e) => handleChange("birth_year", e.target.value)} />
        <input placeholder="Country" value={persona.location.country} onChange={(e) => setPersona({ ...persona, location: { ...persona.location, country: e.target.value } })} />
        <input placeholder="City" value={persona.location.city} onChange={(e) => setPersona({ ...persona, location: { ...persona.location, city: e.target.value } })} />
        <input placeholder="Languages (comma separated)" value={persona.languages} onChange={(e) => handleChange("languages", e.target.value)} />
        <textarea placeholder="Interests (comma separated)" value={persona.interests} onChange={(e) => handleChange("interests", e.target.value)} />
        <textarea placeholder="Context Tags (comma separated)" value={persona.context_tags} onChange={(e) => handleChange("context_tags", e.target.value)} />
      </div>

      <h2 className="text-xl font-semibold mb-2">Custom Field Editor</h2>
      <ul className="mb-2">
        {customFields.map((field, index) => (
          <li key={index}><strong>{field.key}:</strong> {field.value}</li>
        ))}
      </ul>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Field Name (key)"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <input
          placeholder="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button onClick={addField}>Add</button>
      </div>

      <button onClick={generatePrompt} className="mb-4">Generate Prompt</button>

      <h2 className="text-xl font-semibold mb-2">Persona Preview (JSON)</h2>
      <pre className="bg-gray-100 p-2 text-sm">{JSON.stringify(persona, null, 2)}</pre>

      {prompt && (
        <div className="mt-4">
          <h3 className="font-bold mb-1">Generated Prompt:</h3>
          <pre className="bg-gray-100 p-2 text-sm whitespace-pre-wrap">{prompt}</pre>
          <button onClick={exportPrompt}>Download Prompt</button>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button onClick={exportJSON}>Export JSON</button>
        <button onClick={exportYAML}>Export YAML</button>
        <button onClick={exportMarkdown}>Export Markdown</button>
      </div>
    </div>
  );
} 
