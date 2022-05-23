// Variable for new post
const newForm = async function(event) {
  // stop refresh
  event.preventDefault();
// Variable for the title and body text
  const title = document.querySelector('input[name="titletext"]').value;
  const body = document.querySelector('textarea[name="bodytext"]').value;
// Pull in posts and make title and body a string
  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
// Then show dashboard handlebar
  document.location.replace('/dashboard');
};
//  Pull in new post form from handlebars
// Add a click response for submit button
document
  .querySelector('#newpostform')
  .addEventListener('submit', newForm);
