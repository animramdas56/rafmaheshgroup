import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      console.log("LOGIN RESPONSE:", data) // 🔥 DEBUG IMPORTANT

      if (!res.ok) {
        alert(data.message || "Login failed")
        return
      }

      // ⚡ SAFETY CHECK (VERY IMPORTANT)
      if (!data.token) {
        alert("No token returned from server")
        return
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // 🔥 FORCE REFRESH AUTH STATE (optional but helpful)
      window.dispatchEvent(new Event("storage"))

      // 🚀 REDIRECT TO DASHBOARD
      navigate("/dashboard")

    } catch (error) {
      console.error(error)
      alert("Server error. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login