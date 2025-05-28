import React, { useEffect, useState } from "react";
import "./Form.css";

const empty = {
  name: "",
  email: "",
  phone: "",
  education: [],
  experience: [],
  skills: []
};

function ResumeForm({ data = {}, setData }) {
  // Controlled state for all fields
  const [state, setState] = useState({ ...empty, ...data });

  useEffect(() => {
    setData(state);
    // eslint-disable-next-line
  }, [state]);

  // Handlers for education/experience/skills
  const handleArrayChange = (field, idx, key, value) => {
    setState((prev) => {
      const arr = [...prev[field]];
      arr[idx][key] = value;
      return { ...prev, [field]: arr };
    });
  };
  const handleAddToArray = (field, obj) => {
    setState((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), obj]
    }));
  };
  const handleRemoveFromArray = (field, idx) => {
    setState((prev) => {
      const arr = [...prev[field]];
      arr.splice(idx, 1);
      return { ...prev, [field]: arr };
    });
  };
  const handleSkillChange = (idx, value) => {
    setState((prev) => {
      const arr = [...(prev.skills || [])];
      arr[idx] = value;
      return { ...prev, skills: arr };
    });
  };

  return (
    <form className="rc-form" autoComplete="off">
      <section className="rc-form-block">
        <label>Personal Info</label>
        <div className="rc-fields">
          <input type="text" placeholder="Full Name"
            value={state.name} onChange={e => setState(s => ({ ...s, name: e.target.value }))} />
          <input type="email" placeholder="Email"
            value={state.email} onChange={e => setState(s => ({ ...s, email: e.target.value }))} />
          <input type="tel" placeholder="Phone"
            value={state.phone} onChange={e => setState(s => ({ ...s, phone: e.target.value }))} />
        </div>
      </section>
      <section className="rc-form-block">
        <label>
          Education
          <button type="button" className="rc-form-add" onClick={() =>
            handleAddToArray("education", { degree: "", institution: "", year: "" })
          }>+ Add</button>
        </label>
        {(state.education || []).map((edu, idx) => (
          <div key={idx} className="rc-form-array">
            <input type="text" placeholder="Degree" value={edu.degree}
              onChange={e => handleArrayChange("education", idx, "degree", e.target.value)} />
            <input type="text" placeholder="Institution" value={edu.institution}
              onChange={e => handleArrayChange("education", idx, "institution", e.target.value)} />
            <input type="text" placeholder="Year" value={edu.year}
              onChange={e => handleArrayChange("education", idx, "year", e.target.value)} />
            <button type="button" title="Remove" className="rc-form-remove"
              onClick={() => handleRemoveFromArray("education", idx)}>✕</button>
          </div>
        ))}
      </section>
      <section className="rc-form-block">
        <label>
          Experience
          <button type="button" className="rc-form-add" onClick={() =>
            handleAddToArray("experience", { company: "", role: "", start: "", end: "", description: "" })
          }>+ Add</button>
        </label>
        {(state.experience || []).map((exp, idx) => (
          <div key={idx} className="rc-form-array">
            <input type="text" placeholder="Role" value={exp.role}
              onChange={e => handleArrayChange("experience", idx, "role", e.target.value)} />
            <input type="text" placeholder="Company" value={exp.company}
              onChange={e => handleArrayChange("experience", idx, "company", e.target.value)} />
            <input type="text" placeholder="From" value={exp.start}
              onChange={e => handleArrayChange("experience", idx, "start", e.target.value)} />
            <input type="text" placeholder="To" value={exp.end}
              onChange={e => handleArrayChange("experience", idx, "end", e.target.value)} />
            <input type="text" placeholder="Description" value={exp.description}
              onChange={e => handleArrayChange("experience", idx, "description", e.target.value)} />
            <button type="button" title="Remove" className="rc-form-remove"
              onClick={() => handleRemoveFromArray("experience", idx)}>✕</button>
          </div>
        ))}
      </section>
      <section className="rc-form-block">
        <label>
          Skills
          <button type="button" className="rc-form-add" onClick={() =>
            handleAddToArray("skills", "")
          }>+ Add</button>
        </label>
        {(state.skills || []).map((sk, idx) => (
          <div key={idx} className="rc-form-array">
            <input type="text" placeholder="Skill" value={sk}
              onChange={e => handleSkillChange(idx, e.target.value)} />
            <button type="button" title="Remove" className="rc-form-remove"
              onClick={() => handleRemoveFromArray("skills", idx)}>✕</button>
          </div>
        ))}
      </section>
    </form>
  );
}

export default ResumeForm;
