import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import YAML from "yaml";
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

  const [customFields, setCustomFields] = useState([
    { key: "Language", value: "English" },
    { key: "Tone", value: "Friendly" },
    { key: "UseCase", value: "Support Agent" }
  ]);

  const [prompt, setPrompt] = useState("");

  const handleChange = (key, value) => {
    setPersona({ ...persona, [key]: value });
  };

  const handleCheckboxChange = (key) => {
    setPersona({ ...persona, [key]: !persona[key] });
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Input Bölümü */}
      <div className="space-y-4">
        <Card>
          <CardContent className="space-y-2 p-4">
            <Input type="file" accept=".json,.yaml,.yml" onChange={() => {}} />
            <Input placeholder="Full Name" value={persona.full_name} onChange={(e) => handleChange("full_name", e.target.value)} />
            <Input placeholder="Nickname" value={persona.nickname} onChange={(e) => handleChange("nickname", e.target.value)} />
            <Input placeholder="Birth Year" value={persona.birth_year} onChange={(e) => handleChange("birth_year", e.target.value)} />
            <Input placeholder="Gender" value={persona.gender} onChange={(e) => handleChange("gender", e.target.value)} />
            <Input placeholder="Country" value={persona.location.country} onChange={(e) => setPersona({ ...persona, location: { ...persona.location, country: e.target.value } })} />
            <Input placeholder="City" value={persona.location.city} onChange={(e) => setPersona({ ...persona, location: { ...persona.location, city: e.target.value } })} />
            <Input placeholder="Languages" value={persona.languages} onChange={(e) => handleChange("languages", e.target.value)} />
            <Input placeholder="Spouse" value={persona.spouse} onChange={(e) => handleChange("spouse", e.target.value)} />
            <Input placeholder="Children" value={persona.children} onChange={(e) => handleChange("children", e.target.value)} />
            <Input placeholder="Personality" value={persona.personality} onChange={(e) => handleChange("personality", e.target.value)} />
            <Input placeholder="Values" value={persona.values} onChange={(e) => handleChange("values", e.target.value)} />
            <Input placeholder="Title" value={persona.title} onChange={(e) => handleChange("title", e.target.value)} />
            <Input placeholder="Experience Years" value={persona.experience_years} onChange={(e) => handleChange("experience_years", e.target.value)} />
            <Input placeholder="Current Company" value={persona.current_company} onChange={(e) => handleChange("current_company", e.target.value)} />
            <Textarea placeholder="Responsibilities" value={persona.responsibilities} onChange={(e) => handleChange("responsibilities", e.target.value)} />
            <Input placeholder="Working Style" value={persona.working_style} onChange={(e) => handleChange("working_style", e.target.value)} />
            <Input placeholder="Preferred Tone" value={persona.preferred_tone} onChange={(e) => handleChange("preferred_tone", e.target.value)} />
            <Textarea placeholder="Context Tags" value={persona.context_tags} onChange={(e) => handleChange("context_tags", e.target.value)} />

            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={persona.wants_humanity_convert} onChange={() => handleCheckboxChange("wants_humanity_convert")} />
              <span>Wants Humanity Convert</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={persona.hates_generic_answers} onChange={() => handleCheckboxChange("hates_generic_answers")} />
              <span>Hates Generic Answers</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={persona.allows_follow_up_questions} onChange={() => handleCheckboxChange("allows_follow_up_questions")} />
              <span>Allows Follow Up Questions</span>
            </label>
          </CardContent>
        </Card>

        <CustomFieldEditor fields={customFields} setFields={setCustomFields} />

        <div className="flex flex-wrap gap-2">
          <Button onClick={exportJSON}>Export JSON</Button>
          <Button onClick={exportYAML}>Export YAML</Button>
          <Button onClick={exportMarkdown}>Export Markdown</Button>
        </div>
        <Button variant="outline" onClick={generatePrompt}>Generate Prompt</Button>

        {prompt && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">Generated Prompt:</h3>
              <pre className="text-sm whitespace-pre-wrap">{prompt}</pre>
              <Button className="mt-2" onClick={exportPrompt}>Download Prompt</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Preview Paneli */}
      <div>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">Persona Preview</h3>
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(persona, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
