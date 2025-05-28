import React, { useEffect, useState } from "react";
import "./Form.css";

const empty = {
  name: "",
  date: "",
  recipient: "",
  body: ""
};

function CoverLetterForm({ data = {}, setData }) {
  const [state, setState] = useState({ ...empty, ...data });

  useEffect(() => {
    setData(state);
    // eslint-disable-next-line
  }, [state]);

  return (
    <form className="rc-form" autoComplete="off">
      <section className="rc-form-block">
        <label>Your Name</label>
        <input type="text" placeholder="Your Name"
          value={state.name} onChange={e => setState(s => ({ ...s, name: e.target.value }))} />
      </section>
      <section className="rc-form-block">
        <label>Date</label>
        <input type="date" placeholder="Date"
          value={state.date} onChange={e => setState(s => ({ ...s, date: e.target.value }))} />
      </section>
      <section className="rc-form-block">
        <label>Recipient</label>
        <input type="text" placeholder="Recipient"
          value={state.recipient} onChange={e => setState(s => ({ ...s, recipient: e.target.value }))} />
      </section>
      <section className="rc-form-block">
        <label>Letter Body</label>
        <textarea placeholder="Body of the cover letter..." rows={7}
          value={state.body} onChange={e => setState(s => ({ ...s, body: e.target.value }))} style={{resize:"vertical"}} />
      </section>
    </form>
  );
}

export default CoverLetterForm;
