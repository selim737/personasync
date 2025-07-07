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

  const handleChange = (key, value) => {
    if (key.includes(".")) {
      const [parent, child] = key.split(".");
      setPersona((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setPersona((prev) => ({ ...prev, [key]: value }));
    }
  };

  const generatePrompt = () => {
    const {
      full_name,
      nickname,
      birth_year,
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

    const prompt = `
You are now assisting ${full_name || nickname || "a user"}.
They are an experienced ${title || "individual"} working at ${
      current_company || "an organization"
    }.
They live in ${location.city}, ${location.country} and speak ${languages}.
Interests include: ${interests}.
They value: ${values}.
Preferred tone: ${preferred_tone}.

Please be natural and human-like, avoid generic replies, and feel free to ask clarifying questions.

Custom Fields:
- Language: ${languages}
- Tone: ${preferred_tone}
- UseCase: Support Agent
    `.trim();

    setPrompt(prompt);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(persona, null, 2)], {
      type: "application/json",
    });
    download(blob, "persona.json");
  };

  const exportYAML = () => {
    const yaml = YAML.stringify(persona);
    const blob = new Blob([yaml], { type: "text/yaml" });
    download(blob, "persona.yaml");
  };

  const exportMarkdown = () => {
    const md = `\`\`\`json\n${JSON.stringify(persona, null, 2)}\n\`\`\``;
    const blob = new Blob([md], { type: "text/markdown" });
    download(blob, "persona.md");
  };

  const exportPrompt = () => {
    const blob = new Blob([prompt], { type: "text/plain" });
    download(blob, "prompt.txt");
  };

  const download = (blob, filename) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  };

  const addField = () => {
    setPersona((prev) => ({ ...prev, [newKey]: newValue }));
    setNewKey("");
    setNewValue("");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Persona Creator</h1>
      <div className="flex flex-wrap gap-2">
        <input placeholder="Full Name" value={persona.full_name} onChange={(e) => handleChange("full_name", e.target.value)} />
        <input placeholder="Nickname" value={persona.nickname} onChange={(e) => handleChange("nickname", e.target.value)} />
        <input placeholder="Birth Year" value={persona.birth_year} onChange={(e) => handleChange("birth_year", e.target.value)} />
        <input placeholder="Country" value={persona.location.country} onChange={(e) => handleChange("location.country", e.target.value)} />
        <input placeholder="City" value={persona.location.city} onChange={(e) => handleChange("location.city", e.target.value)} />
        <input placeholder="Languages (comma separated)" value={persona.languages} onChange={(e) => handleChange("languages", e.target.value)} />
        <input placeholder="Spouse" value={persona.spouse} onChange={(e) => handleChange("spouse", e.target.value)} />
        <input placeholder="Children" value={persona.children} onChange={(e) => handleChange("children", e.target.value)} />
        <input placeholder="Personality" value={persona.personality} onChange={(e) => handleChange("personality", e.target.value)} />
        <input placeholder="Values" value={persona.values} onChange={(e) => handleChange("values", e.target.value)} />
        <input placeholder="Title" value={persona.title} onChange={(e) => handleChange("title", e.target.value)} />
        <input placeholder="Experience Years" value={persona.experience_years} onChange={(e) => handleChange("experience_years", e.target.value)} />
        <input placeholder="Current Company" value={persona.current_company} onChange={(e) => handleChange("current_company", e.target.value)} />
        <input placeholder="Responsibilities" value={persona.responsibilities} onChange={(e) => handleChange("responsibilities", e.target.value)} />
        <input placeholder="Working Style" value={persona.working_style} onChange={(e) => handleChange("working_style", e.target.value)} />
        <input placeholder="Interests (comma separated)" value={persona.interests} onChange={(e) => handleChange("interests", e.target.value)} />
        <input placeholder="Context Tags (comma separated)" value={persona.context_tags} onChange={(e) => handleChange("context_tags", e.target.value)} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-4">Custom Field Editor</h2>
        <ul className="list-disc pl-5">
          <li><strong>Language:</strong> <input value={persona.languages} onChange={(e) => handleChange("languages", e.target.value)} /></li>
          <li><strong>Tone:</strong> <input value={persona.preferred_tone} onChange={(e) => handleChange("preferred_tone", e.target.value)} /></li>
          <li><strong>UseCase:</strong> <input value="Support Agent" readOnly /></li>
        </ul>
        <div className="flex gap-2 mb-4">
          <input placeholder="Field Name (key)" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
          <input placeholder="Value" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
          <button onClick={addField}>Add</button>
        </div>
        <button onClick={generatePrompt}>Generate Prompt</button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-4">Persona Preview (JSON)</h2>
        <pre className="bg-gray-100 p-2 text-sm">{JSON.stringify(persona, null, 2)}</pre>
      </div>

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
