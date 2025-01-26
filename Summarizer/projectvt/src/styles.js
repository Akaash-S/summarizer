import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #6C63FF;
    --secondary-color: #4CAF50;
    --background-color: #F0F2F5;
    --text-color: #333333;
    --error-color: #FF6B6B;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--background-color);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .login-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
  }

  .login-card {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 40px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .login-header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      color: var(--primary-color);
      font-size: 28px;
      margin: 20px 0 10px;
    }

    p {
      color: var(--text-color);
      opacity: 0.7;
    }
  }

  .input-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
      color: var(--text-color);
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #E0E0E0;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: var(--primary-color);
        outline: none;
      }
    }
  }

  .login-button {
    width: 100%;
    padding: 12px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken(var(--primary-color), 10%);
    }

    &.loading {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .login-footer {
    margin-top: 20px;
    text-align: center;

    a {
      display: block;
      color: var(--primary-color);
      text-decoration: none;
      margin-top: 10px;
      font-size: 14px;
      transition: color 0.3s ease;

      &:hover {
        color: darken(var(--primary-color), 15%);
      }
    }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }

  .shake {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  }
`

