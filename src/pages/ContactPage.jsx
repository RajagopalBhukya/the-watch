import React, { useState } from "react";
import { useJson } from "../hooks/useJson";

export default function ContactPage() {
  const { data } = useJson("/data/site-content.json");
  const [form, setForm] = useState({});
  const contact = data?.contact_us;

  if (!contact) return <section id="contact" className="contact-page" />;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const sendEmail = (event) => {
    event.preventDefault();
    const body = Object.entries(form)
      .map(([key, value]) => `${key.replaceAll("_", " ")}: ${value}`)
      .join("\n");

    window.location.href = `mailto:${contact.inquiry_emails.general}?subject=${encodeURIComponent("The Watch — Client Inquiry")}&body=${encodeURIComponent(body)}`;
  };

  const phoneHref = `tel:${contact.phone.international.replace(/\s/g, "")}`;

  return (
    <section id="contact" className="contact-page">
      <div className="contact-info">
        <p className="eyebrow">CONTACT THE WATCH</p>
        <h2>{contact.headline}</h2>
        <p>Response time: {contact.response_time_guarantee}</p>
        <div className="contact-block">
          <strong>{contact.physical_address.atelier}</strong>
          <span>{contact.physical_address.street}</span>
          <span>
            {contact.physical_address.city}, {contact.physical_address.postal_code},{" "}
            {contact.physical_address.country}
          </span>
        </div>
        <div className="contact-block">
          <a href={phoneHref}>{contact.phone.international}</a>
          <a href={`mailto:${contact.inquiry_emails.general}`}>{contact.inquiry_emails.general}</a>
          <span>{contact.operating_hours.weekdays} · {contact.operating_hours.timezone}</span>
        </div>
      </div>

      <form className="contact-form" onSubmit={sendEmail}>
        {contact.form_fields.map((field) => {
          const label = field.name.replaceAll("_", " ");

          if (field.type === "textarea") {
            return (
              <label key={field.name}>
                <span>{label}</span>
                <textarea name={field.name} required={field.required} onChange={updateField} />
              </label>
            );
          }

          if (field.type === "select") {
            return (
              <label key={field.name}>
                <span>{label}</span>
                <select name={field.name} onChange={updateField} defaultValue="">
                  <option value="" disabled>Select an option</option>
                  {field.options.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            );
          }

          return (
            <label key={field.name}>
              <span>{label}</span>
              <input name={field.name} type={field.type} required={field.required} onChange={updateField} />
            </label>
          );
        })}

        <div className="contact-actions">
          <button className="gold-btn" type="submit">SEND EMAIL</button>
          <a className="outline-btn" href={phoneHref}>CALL NOW</a>
        </div>
      </form>
    </section>
  );
}
