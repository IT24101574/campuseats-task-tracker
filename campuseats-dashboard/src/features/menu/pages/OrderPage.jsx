import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../../components/Button";

function validate(values) {
  const nextErrors = {};
  if (values.name.trim().length < 2) nextErrors.name = "Name must contain at least 2 characters.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
    nextErrors.email = "Enter a valid email address.";
  }
  if (Number(values.qty) < 1) nextErrors.qty = "Quantity must be at least 1.";
  return nextErrors;
}

function OrderPage() {
  const [searchParams] = useSearchParams();
  const demo = searchParams.get("demo");
  const [form, setForm] = useState(
    demo === "error"
      ? { name: "A", email: "invalid-email", qty: 0 }
      : { name: "", email: "", qty: 1 },
  );
  const [errors, setErrors] = useState(
    demo === "error" ? validate({ name: "A", email: "invalid-email", qty: 0 }) : {},
  );
  const [done, setDone] = useState(demo === "success");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setDone(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setDone(true);
  }

  if (done) {
    return (
      <section className="success-card">
        <span className="success-icon">✓</span>
        <p className="eyebrow">Order confirmed</p>
        <h1>Thanks{form.name ? `, ${form.name}` : ""}!</h1>
        <p>Your order was received successfully. You can collect it from the campus pickup point.</p>
        <Link className="button-link" to="/">Return to menu</Link>
      </section>
    );
  }

  return (
    <section className="form-layout">
      <div className="form-intro">
        <p className="eyebrow">Quick campus pickup</p>
        <h1>Place your order</h1>
        <p>Enter your details below. All fields are required before the order can be submitted.</p>
      </div>

      <form className="order-form" onSubmit={handleSubmit} noValidate>
        <label>
          <span>Student name</span>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Nimal Perera" />
          {errors.name && <small className="field-error">{errors.name}</small>}
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="student@example.com" />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>
        <label>
          <span>Quantity</span>
          <input name="qty" type="number" min="1" value={form.qty} onChange={handleChange} />
          {errors.qty && <small className="field-error">{errors.qty}</small>}
        </label>
        <Button type="submit">Place order</Button>
      </form>
    </section>
  );
}

export default OrderPage;
