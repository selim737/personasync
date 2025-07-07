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
    context_tags: "",
  });

  const [prompt, setPrompt] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("location.")) {
      const locField = name.split(".")[1];
      setPersona((prev) => ({
        ...prev,
        location: { ...prev.location, [locField]: value },
      }));
    } else if (type === "checkbox") {
      setPersona((prev) => ({ ...prev, [name]: checked }));
    } else {
      setPersona((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generatePrompt = () => {
    const {
      full_name,
      nickname,
      birth_year,
      location,
      languages,
      interests,
      values,
      preferred_tone,
      wants_humanity_convert,
      hates_generic_answers,
      allows_follow_up_questions,
    } = persona;

    const lines = [
      `You are now assisting ${full_name || nickname || "a user"}.`,
      `They are an experienced ${
        persona.title || "professional"
      } working at ${persona.current_company || "a company"}.`,
      `They live in ${location.city}, ${location.country}.`,
      `They speak ${languages || "various languages"} and are interested in ${
        interests || "a wide range of topics"
      }.`,
      `They value ${values || "insight and clarity"}.`,
      `Preferred tone: ${preferred_tone || "natural"}.`,
    ];

    if (wants_humanity_convert)
      lines.push(
        "Please be natural and human-like, avoid generic replies, and feel free to ask clarifying questions."
      );
    if (hates_generic_answers) lines.push("Avoid generic answers.");
    if (allows_follow_up_questions)
      lines.push("You may ask follow-up questions when needed.");

    setPrompt(lines.join("\n"));
  };

  const addField = () => {
    if (newKey) {
      setPersona((prev) => ({ ...prev, [newKey]: newValue }));
      setNewKey("");
      setNewValue("");
    }
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(persona, null, 2)], {
      type: "application/json",
    });
    downloadFile(blob, "persona.json");
  };

  const exportYAML = () => {
    const yaml = YAML.stringify(persona);
    const blob = new Blob([yaml], { type: "text/yaml" });
    downloadFile(blob, "persona.yaml");
  };

  const exportPrompt = () => {
    const blob = new Blob([prompt], { type: "text/plain" });
    downloadFile(blob, "persona_prompt.txt");
  };

  const exportMarkdown = () => {
    const md = `## Persona Prompt\n\n\`\`\`\n${prompt}\n\`\`\`\n`;
    const blob = new Blob([md], { type: "text/markdown" });
    downloadFile(blob, "persona_prompt.md");
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Persona Creator</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          name="full_name"
          placeholder="Full Name"
          value={persona.full_name}
          onChange={handleChange}
        />
        <input
          name="nickname"
          placeholder="Nickname"
          value={persona.nickname}
          onChange={handleChange}
        />
        <input
          name="birth_year"
          placeholder="Birth Year"
          value={persona.birth_year}
          onChange={handleChange}
        />
        <input
          name="location.country"
          placeholder="Country"
          value={persona.location.country}
          onChange={handleChange}
        />
        <input
          name="location.city"
          placeholder="City"
          value={persona.location.city}
          onChange={handleChange}
        />
        <input
          name="languages"
          placeholder="Languages (comma separated)"
          value={persona.languages}
          onChange={handleChange}
        />
        <input
          name="interests"
          placeholder="Interests (comma separated)"
          value={persona.interests}
          onChange={handleChange}
        />
        <input
          name="context_tags"
          placeholder="Context Tags (comma separated)"
          value={persona.context_tags}
          onChange={handleChange}
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">Custom Field Editor</h2>
      <ul className="mb-2 list-disc list-inside">
        <li>
          <strong>Language:</strong>{" "}
          <input
            name="languages"
            value={persona.languages}
            onChange={handleChange}
          />
        </li>
        <li>
          <strong>Tone:</strong>{" "}
          <input
            name="preferred_tone"
            value={persona.preferred_tone}
            onChange={handleChange}
          />
        </li>
        <li>
          <strong>UseCase:</strong>{" "}
          <input
            name="title"
            value={persona.title}
            onChange={handleChange}
          />
        </li>
      </ul>

      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            name="wants_humanity_convert"
            checked={persona.wants_humanity_convert}
            onChange={handleChange}
          />{" "}
          Wants Humanity Convert
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="hates_generic_answers"
            checked={persona.hates_generic_answers}
            onChange={handleChange}
          />{" "}
          Hates Generic Answers
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="allows_follow_up_questions"
            checked={persona.allows_follow_up_questions}
            onChange={handleChange}
          />{" "}
          Allows Follow Up Questions
        </label>
      </div>

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

      <button onClick={generatePrompt} className="mb-4">
        Generate Prompt
      </button>

      <h2 className="text-xl font-semibold mb-2">Persona Preview (JSON)</h2>
      <pre className="bg-gray-100 p-2 text-sm">{JSON.stringify(persona, null, 2)}</pre>

      {prompt && (
        <div className="mt-4">
          <h3 className="font-bold mb-1">Generated Prompt:</h3>
          <pre className="bg-gray-100 p-2 text-sm">{prompt}</pre>
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
