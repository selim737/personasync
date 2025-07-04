import { useState } from "react";
import CustomFieldEditor from "./components/CustomFieldEditor";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Persona Creator</h2>
        <input
          placeholder="Full Name"
          value={persona.full_name}
          onChange={(e) => handleChange("full_name", e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="Nickname"
          value={persona.nickname}
          onChange={(e) => handleChange("nickname", e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="Birth Year"
          value={persona.birth_year}
          onChange={(e) => handleChange("birth_year", e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="Country"
          value={persona.location.country}
          onChange={(e) =>
            setPersona({
              ...persona,
              location: { ...persona.location, country: e.target.value }
            })
          }
          className="border p-2 w-full"
        />
        <input
          placeholder="City"
          value={persona.location.city}
          onChange={(e) =>
            setPersona({
              ...persona,
              location: { ...persona.location, city: e.target.value }
            })
          }
          className="border p-2 w-full"
        />
        <input
          placeholder="Languages (comma separated)"
          value={persona.languages}
          onChange={(e) => handleChange("languages", e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Interests (comma separated)"
          value={persona.interests}
          onChange={(e) => handleChange("interests", e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Context Tags (comma separated)"
          value={persona.context_tags}
          onChange={(e) => handleChange("context_tags", e.target.value)}
          className="border p-2 w-full"
        />

        <CustomFieldEditor fields={customFields} setFields={setCustomFields} />

        <button
          onClick={generatePrompt}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Prompt
        </button>

        {prompt && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Generated Prompt:</h3>
            <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap text-sm">
              {prompt}
            </pre>
            <button
              onClick={exportPrompt}
              className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
            >
              Download Prompt
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Persona Preview (JSON)</h2>
        <pre className="text-sm whitespace-pre-wrap">
          {JSON.stringify(persona, null, 2)}
        </pre>
      </div>
    </div>
  );
}
