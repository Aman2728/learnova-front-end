// Toggle Password Visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const button = input.parentElement.querySelector(".toggle-password")
  const eyeIcon = button.querySelector(".eye-icon")

  if (input.type === "password") {
    input.type = "text"
    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    `
  } else {
    input.type = "password"
    eyeIcon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    `
  }
}

// ==============================
// GLOBAL LOGOUT HANDLER
// ==============================

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("logout-btn")) {

        // Remove only auth related data
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        // Clear session storage (optional)
        sessionStorage.clear();

        // Redirect to login page
        window.location.href = "/templates/login.html"; 
        // Change path if needed
    }
});

// Show Toast Notification
function showToast(message, type = "success") {
  // Remove existing toast if any
  const existingToast = document.querySelector(".toast")
  if (existingToast) {
    existingToast.remove()
  }

  // Create toast element
  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  const icon =
    type === "success"
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
       </svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
       </svg>`

  toast.innerHTML = `${icon}<span>${message}</span>`
  document.body.appendChild(toast)

  // Show toast
  setTimeout(() => toast.classList.add("show"), 10)

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}

// Set Loading State
function setLoading(button, isLoading) {
  const btnText = button.querySelector(".btn-text")
  const btnLoader = button.querySelector(".btn-loader")

  if (isLoading) {
    btnText.style.display = "none"
    btnLoader.style.display = "flex"
    button.disabled = true
  } else {
    btnText.style.display = "inline"
    btnLoader.style.display = "none"
    button.disabled = false
  }
}

// Validate Email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate Mobile
function isValidMobile(mobile) {
  const mobileRegex = /^[0-9]{10,15}$/
  return mobileRegex.test(mobile.replace(/[\s\-$$$$]/g, ""))
}

// Validate Password
function isValidPassword(password) {
  return password.length >= 8
}

// Handle Register Form
const registerForm = document.getElementById("registerForm")
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const submitBtn = document.getElementById("submitBtn")
    const username = document.getElementById("username").value.trim()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value
    const mobile = document.getElementById("mobile").value.trim()
    const role = document.getElementById("role").value
    const terms = document.getElementById("terms").checked

    // Validation
    if (username.length < 3) {
      showToast("Username must be at least 3 characters", "error")
      return
    }

    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address", "error")
      return
    }

    if (!isValidPassword(password)) {
      showToast("Password must be at least 8 characters", "error")
      return
    }

    if (!isValidMobile(mobile)) {
      showToast("Please enter a valid mobile number", "error")
      return
    }

    if (!role) {
      showToast("Please select a role", "error")
      return
    }

    if (!terms) {
      showToast("Please accept the terms and conditions", "error")
      return
    }

    // Simulate API call
    setLoading(submitBtn, true)

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user data (in real app, send to backend)
      const userData = { username, email, password, mobile, role }
      localStorage.setItem("learnova_user", JSON.stringify(userData))

      showToast("Account created successfully! Redirecting...", "success")

      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = "login.html"
      }, 2000)
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error")
    } finally {
      setLoading(submitBtn, false)
    }
  })
}

// Handle Login Form
const loginForm = document.getElementById("loginForm")
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const loginBtn = document.getElementById("loginBtn")
    const email = document.getElementById("loginEmail").value.trim()
    const password = document.getElementById("loginPassword").value
    const remember = document.getElementById("remember").checked

    // Validation
    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address", "error")
      return
    }

    if (!password) {
      showToast("Please enter your password", "error")
      return
    }

    // Simulate API call
    setLoading(loginBtn, true)

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check stored user (in real app, verify with backend)
      const storedUser = localStorage.getItem("learnova_user")

      if (storedUser) {
        const user = JSON.parse(storedUser)
        if (user.email === email && user.password === password) {
          if (remember) {
            localStorage.setItem("learnova_remember", email)
          }
          showToast(`Welcome back, ${user.username}!`, "success")

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            // In real app, redirect to dashboard
            showToast("Redirecting to dashboard...", "success")
          }, 2000)
          return
        }
      }

      showToast("Invalid email or password", "error")
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error")
    } finally {
      setLoading(loginBtn, false)
    }
  })

  // Auto-fill remembered email
  const rememberedEmail = localStorage.getItem("learnova_remember")
  if (rememberedEmail) {
    document.getElementById("loginEmail").value = rememberedEmail
    document.getElementById("remember").checked = true
  }
}

// Add input focus animations
document.querySelectorAll(".input-wrapper input, .input-wrapper select").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused")
  })

  input.addEventListener("blur", function () {
    this.parentElement.classList.remove("focused")
  })
})





