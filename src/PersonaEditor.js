import { useState } from "react";
import YAML from "yaml";
import CustomFieldEditor from "./components/CustomFieldEditor";

// Sade bileşenler
const Card = ({ children }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
    {children}
  </div>
);

const CardContent = ({ children }) => <div>{children}</div>;

const Button = ({ children, onClick }) => (
  <button onClick={onClick} style={{ margin: '4px', padding: '8px 12px' }}>
    {children}
  </button>
);

const Input = (props) => (
  <input
    {...props}
    style={{ display: 'block', marginBottom: '8px', padding: '6px', width: '100%' }}
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    style={{ display: 'block', marginBottom: '8px', padding: '6px', width: '100%', minHeight: '60px' }}
  />
);

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

  const [prompt, setPrompt] = useState("");
  const [customFields, setCustomFields] = useState([
    { key: "Language", value: "English" },
    { key: "Tone", value: "Friendly" },
    { key: "UseCase", value: "Support Agent" }
  ]);

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

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      <div style={{ flex: 1, minWidth: "300px" }}>
        <Card>
          <CardContent>
            <Input type="file" accept=".json,.yaml,.yml" onChange={() => {}} />
            <Input placeholder="Full Name" value={persona.full_name} onChange={(e) => handleChange("full_name", e.target.value)} />
            <Input placeholder="Nickname" value={persona.nickname} onChange={(e) => handleChange("nickname", e.target.value)} />
            <Input placeholder="Birth Year" value={persona.birth_year} onChange={(e) => handleChange("birth_year", e.target.value)} />
            <Input placeholder="Country" value={persona.location.country} onChange={(e) => setPersona({ ...persona, location: { ...persona.location, country: e.target.value } })} />
            <Input placeholder="City" value={persona.location.city} onChange={(e) => setPersona({ ...persona, location: { ...persona.location, city: e.target.value } })} />
            <Input placeholder="Languages (comma separated)" value={persona.languages} onChange={(e) => handleChange("languages", e.target.value)} />
            <Textarea placeholder="Interests (comma separated)" value={persona.interests} onChange={(e) => handleChange("interests", e.target.value)} />
            <Textarea placeholder="Context Tags (comma separated)" value={persona.context_tags} onChange={(e) => handleChange("context_tags", e.target.value)} />
          </CardContent>
        </Card>

        <CustomFieldEditor fields={customFields} setFields={setCustomFields} />

        <div>
          <Button onClick={exportJSON}>Export JSON</Button>
          <Button onClick={exportYAML}>Export YAML</Button>
          <Button onClick={exportMarkdown}>Export Markdown</Button>
        </div>

        <Button onClick={generatePrompt}>Generate Prompt</Button>

        {prompt && (
          <Card>
            <CardContent>
              <h3 style={{ fontWeight: "bold" }}>Generated Prompt:</h3>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}>{prompt}</pre>
              <Button onClick={exportPrompt}>Download Prompt</Button>
            </CardContent>
          </Card>
        )}
      </div>

      <div style={{ flex: 1, minWidth: "300px" }}>
        <Card>
          <CardContent>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}>
              {JSON.stringify(persona, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
