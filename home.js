const userId = localStorage.getItem('userId');

async function fetchUsers() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "index.html"; // Redirect to login if no token
        return;
    }

    const response = await fetch("https://chat-app-backend-api-88av.onrender.com/api/v1/user", {
        headers: { "Authorization":token }
    });

    const users = await response.json();
   
    const userList = document.getElementById("userList");

    users.data.forEach(user => {
        const li = document.createElement("li");
      if(user.id!==userId)
      {
        li.innerHTML = `<a href="chat.html?userId=${user.id}">${user.name}</a>`;
      }else
      {
        li.innerHTML = `<a href="chat.html?userId=${user.id}">${user.name}(You)</a>`;
        const username = document.getElementById('username')
        username.innerText = user.name
      }
        userList.appendChild(li);
    });
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

fetchUsers(); // Load users on page load
