function toggleForms() {
    document.getElementById('loginForm').style.display = document.getElementById('loginForm').style.display === 'none' ? 'block' : 'none';

    document.getElementById('signupForm').style.display = document.getElementById('signupForm').style.display === 'none' ? 'block' : 'none';
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('https://chat-app-backend-api-88av.onrender.com/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.status === 200) {
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('token', result.token); // Store JWT token
        window.location.href = 'home.html';
    } else {
        alert(result.message || 'Something Went Wrong');
    }
}

async function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const mobile = document.getElementById('signupMobile').value;
    const password = document.getElementById('signupPassword').value;

    const response = await fetch('https://chat-app-backend-api-88av.onrender.com/api/v1/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile, password }),
    });

    const result = await response.json();
    alert(result.message || 'Sign-up successful');
}
