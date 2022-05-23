// Variable for Login form 
const loginForm = async function(event) {
  // Stop Refresh
    event.preventDefault();
  // Connect to handlebars html
    const username = document.querySelector('#username-input-login');
    const password = document.querySelector('#password-input-login');
  // fetch login data
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  // If password and username value is acceptable, replace page with dashboard handlebar
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to login');
    }
  };
  
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginForm);
  