// Variable for function to stop refresh
const signupForm = async function(event) {
  event.preventDefault();
// Variable to pull in from handlebars
  const username = document.querySelector('#username-input-signup');
  const password = document.querySelector('#password-input-signup');
// Variable to pull in user and make username and password a string
  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
// Once completed, show dashboard page
  if (response.ok) {
    document.location.replace('/dashboard');
    // Or alert an error
  } else {
    alert('Failed to sign up');
  }
};
// Pull in signup form from handlebars
// Add a click response for submit button
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupForm);
