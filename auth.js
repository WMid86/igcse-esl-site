// Authentication script for the IGCSE ESL website.
// Supports multiple users with username/password stored in the `users` object.
// NOTE: Storing credentials client-side is not secure; this is meant for demonstration only.
(() => {
  const users = {
    // Example student IDs and passwords; replace with your actual list.
    "student1": "password1",
    "student2": "password2"
  };
  const currentUser = sessionStorage.getItem('currentUser');
  if (!currentUser) {
    const username = window.prompt('Enter your student ID / 请输入用户名:');
    if (!username || !(username in users)) {
      alert('Unknown user ID. Please contact your teacher for your login details.');
      window.location.reload();
    } else {
      const password = window.prompt('Enter your password / 请输入密码:');
      if (users[username] !== password) {
        alert('Incorrect password. Please try again.');
        window.location.reload();
      } else {
        sessionStorage.setItem('currentUser', username);
        sessionStorage.setItem('igcse_esl_authenticated', 'true');
        // Send custom event to GoatCounter for per-user tracking
        if (window.goatcounter && typeof window.goatcounter.count === 'function') {
          window.goatcounter.count({ path: '/' + username, title: 'login' });
        }
      }
    }
  }
})();