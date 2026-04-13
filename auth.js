// Authentication script for the IGCSE ESL website.
// Supports multiple users with username/password stored in the `users` object.
// NOTE: Storing credentials client-side is not secure; this is meant for demonstration only.
(() => {
  // List of valid student IDs and their passwords.
  const users = {
    // Example student IDs and passwords; replace with your actual list.
    "student1": "password1",
    "student2": "password2"
  };

  // Master login credentials. The teacher or administrator can use these
  // to bypass individual accounts. These correspond to the original
  // single-user gate (username "igcse" and password "esl2026").
  const masterUsername = 'igcse';
  const masterPassword = 'esl2026';

  const currentUser = sessionStorage.getItem('currentUser');
  if (!currentUser) {
    const username = window.prompt('Enter your student ID or master username / 请输入用户名:');
    if (!username) {
      alert('Unknown user ID. Please contact your teacher for your login details.');
      window.location.reload();
      return;
    }
    // Ask for password
    const password = window.prompt('Enter your password / 请输入密码:');
    // If the entered password matches the master password, allow access
    // regardless of the username. This allows the teacher or administrator
    // to log in using only the master password without needing to
    // remember the master username. If both the username and password
    // match the predefined master credentials, that also succeeds.
    if (password === masterPassword) {
      // Set the user to the provided username if it matches the master
      // username, otherwise label them as 'master'.
      const loginUser = (username === masterUsername) ? masterUsername : 'master';
      sessionStorage.setItem('currentUser', loginUser);
      sessionStorage.setItem('igcse_esl_authenticated', 'true');
      if (window.goatcounter && typeof window.goatcounter.count === 'function') {
        window.goatcounter.count({ path: '/' + loginUser, title: 'login' });
      }
      return;
    }
    // Otherwise validate as a normal student account
    if (!(username in users)) {
      alert('Unknown user ID. Please contact your teacher for your login details.');
      window.location.reload();
    } else if (users[username] !== password) {
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
})();