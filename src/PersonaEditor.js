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
    const promptText = `You are now assisting ${persona.full_name} (${persona.nickname}).
They are an experienced ${persona.title} working at ${persona.current_company}.
They live in ${persona.location.city}, ${persona.location.country} and speak ${persona.languages}.
Interests include: ${persona.interests}.
They value: ${persona.values}.
Preferred tone: ${persona.preferred_tone}.
Please be ${persona.wants_humanity_convert ? "natural and human-like" : "formal"},
${persona.hates_generic_answers ? "avoid generic replies" : "generic replies are fine"},
${persona.allows_follow_up_questions ? "and feel free to ask clarifying questions." : "don't ask follow-ups."}`;

    setPrompt(promptText);
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
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

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Persona Creator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          "full_name",
          "nickname",
          "birth_year",
          "gender",
          "languages",
          "spouse",
          "children",
          "personality",
          "interests",
          "values",
          "title",
          "experience_years",
          "current_company",
          "responsibilities",
          "working_style",
          "preferred_tone",
          "context_tags",
        ].map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            value={persona[key]}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        ))}

        <input
          name="location.country"
          placeholder="Country"
          value={persona.location.country}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="location.city"
          placeholder="City"
          value={persona.location.city}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {[
          ["wants_humanity_convert", "Wants Humanity Convert"],
          ["hates_generic_answers", "Hates Generic Answers"],
          ["allows_follow_up_questions", "Allows Follow-Up Questions"],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={key}
              checked={persona[key]}
              onChange={handleChange}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={generatePrompt}>
          Generate Prompt
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={exportJSON}>
          Export JSON
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={exportYAML}>
          Export YAML
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={exportPrompt}>
          Export Prompt
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Persona Preview</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
          {JSON.stringify(persona, null, 2)}
        </pre>
      </div>

      {prompt && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Prompt:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">{prompt}</pre>
        </div>
      )}
    </div>
  );
}
