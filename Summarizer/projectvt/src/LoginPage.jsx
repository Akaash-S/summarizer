import React, { useState } from "react"
import UniqueLogo from "./UniqueLogo"

const UniqueLoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt with:", { email, password })
      setIsLoading(false)
      setEmail("")
      setPassword("")
    }, 2000)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <UniqueLogo />
          <h1>Welcome Back</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className={`login-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="login-footer">
          <a href="#forgot-password">Forgot Password?</a>
          <a href="#sign-up">Don't have an account? Sign Up</a>
        </div>
      </div>
    </div>
  )
}

export default UniqueLoginPage

