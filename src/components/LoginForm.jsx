import { useState } from "react";
import "../styles/login.css";
import { fakeLogin } from "../utils/fakeAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
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
      setError(err.message);
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <h1>Sign in</h1>

      {/* Email Field */}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          required
          aria-invalid={status === "error" ? "true" : "false"}
          aria-describedby="email-error"
        />
      </div>

      {/* Password Field */}
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
          required
          aria-invalid={status === "error" ? "true" : "false"}
          aria-describedby="password-error"
        />
      </div>

      {/* Error Message */}
      {status === "error" && (
        <p className="error" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      {/* Success Message */}
      {status === "success" && (
        <p className="success">Signed in successfully.</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading" || !email.trim() || !password.trim()}
      >
        {status === "loading" ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
