import React, { useState } from "react";
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
    context_tags: "",
  });

  const [customFields, setCustomFields] = useState({
    language: "English",
    tone: "Friendly",
    useCase: "Support Agent",
  });

  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [prompt, setPrompt] = useState("");

  const updateField = (key, value) => {
    if (key.startsWith("location.")) {
      const locKey = key.split(".")[1];
      setPersona((prev) => ({
        ...prev,
        location: { ...prev.location, [locKey]: value },
      }));
    } else {
      setPersona((prev) => ({ ...prev, [key]: value }));
    }
  };

  const addField = () => {
    if (!newKey) return;
    setPersona((prev) => ({ ...prev, [newKey]: newValue }));
    setNewKey("");
    setNewValue("");
  };

  const generatePrompt = () => {
    const {
      full_name,
      nickname,
      birth_year,
      gender,
      location,
      languages,
      spouse,
      children,
      personality,
      interests,
      values,
      title,
      experience_years,
      current_company,
      responsibilities,
      working_style,
      preferred_tone,
      wants_humanity_convert,
      hates_generic_answers,
      allows_follow_up_questions,
      context_tags,
    } = persona;

    const { language, tone, useCase } = customFields;

    const promptText = `You are now assisting ${full_name || nickname || "a user"}.
They are an experienced ${title || "professional"} working at ${
      current_company || "a company"
    }. They live in ${location?.city || "a city"}, ${
      location?.country || "a country"
    } and speak ${languages || "a language"}.
Interests include: ${interests || "various topics"}.
They value: ${values || "important principles"}.
Preferred tone: ${preferred_tone || tone}.

Please be natural and human-like, avoid generic replies, and feel free to ask clarifying questions.

Custom Fields:
- Language: ${language}
- Tone: ${tone}
- UseCase: ${useCase}`;

    setPrompt(promptText);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(persona, null, 2)], {
      type: "application/json",
    });
    downloadBlob(blob, "persona.json");
  };

  const exportYAML = () => {
    const yamlData = YAML.stringify(persona);
    const blob = new Blob([yamlData], { type: "text/yaml" });
    downloadBlob(blob, "persona.yaml");
  };

  const exportMarkdown = () => {
    const markdown = Object.entries(persona)
      .map(([key, value]) => `- **${key}**: ${JSON.stringify(value)}`)
      .join("\n");
    const blob = new Blob([markdown], { type: "text/markdown" });
    downloadBlob(blob, "persona.md");
  };

  const exportPrompt = () => {
    const blob = new Blob([prompt], { type: "text/plain" });
    downloadBlob(blob, "persona_prompt.txt");
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Persona Creator</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        {[
          "full_name",
          "nickname",
          "birth_year",
          "location.country",
          "location.city",
          "languages",
          "interests",
          "context_tags",
        ].map((field) => (
          <input
            key={field}
            placeholder={field
              .replace("location.", "")
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
            value={
              field.startsWith("location.")
                ? persona.location[field.split(".")[1]]
                : persona[field] || ""
            }
            onChange={(e) => updateField(field, e.target.value)}
          />
        ))}
      </div>

      <h2>Custom Field Editor</h2>
      <ul>
        <li>
          <strong>Language:</strong>{" "}
          <input
            value={customFields.language}
            onChange={(e) =>
              setCustomFields({ ...customFields, language: e.target.value })
            }
          />
        </li>
        <li>
          <strong>Tone:</strong>{" "}
          <input
            value={customFields.tone}
            onChange={(e) =>
              setCustomFields({ ...customFields, tone: e.target.value })
            }
          />
        </li>
        <li>
          <strong>UseCase:</strong>{" "}
          <input
            value={customFields.useCase}
            onChange={(e) =>
              setCustomFields({ ...customFields, useCase: e.target.value })
            }
          />
        </li>
      </ul>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
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

      <button onClick={generatePrompt}>Generate Prompt</button>

      <h2 style={{ marginTop: "2rem" }}>Persona Preview (JSON)</h2>
      <pre>{JSON.stringify(persona, null, 2)}</pre>

      {prompt && (
        <div>
          <h2>Generated Prompt:</h2>
          <pre>{prompt}</pre>
          <button onClick={exportPrompt}>Download Prompt</button>
        </div>
      )}

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <button onClick={exportJSON}>Export JSON</button>
        <button onClick={exportYAML}>Export YAML</button>
        <button onClick={exportMarkdown}>Export Markdown</button>
      </div>
    </div>
  );
}
