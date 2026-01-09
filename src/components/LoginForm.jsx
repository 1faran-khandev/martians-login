import { useState } from "react";
import "../styles/login.css";
import { fakeLogin } from "../utils/fakeAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await fakeLogin({ email, password });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Invalid email or password");
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <h1>Sign in</h1>

      {/* Disable form after success */}
      <fieldset disabled={status === "success"}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={status === "error" ? "true" : "false"}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-invalid={status === "error" ? "true" : "false"}
          />
        </div>

        {/* Error message */}
        {status === "error" && (
          <p className="error" role="alert" aria-live="polite">
            {error || "Invalid email or password"}
          </p>
        )}

        {/* Success message */}
        {status === "success" && (
          <p className="success">Signed in successfully.</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={
            status === "loading" || status === "success" || !email.trim() || !password.trim()
          }
        >
          {status === "loading"
            ? "Signing in…"
            : status === "success"
            ? "Signed in"
            : "Sign in"}
        </button>
      </fieldset>
    </form>
  );
}
