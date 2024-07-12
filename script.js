document.addEventListener("DOMContentLoaded", function () {
  updateUsersTable();

  document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const mobileNumber = document.getElementById("mobileNumber").value.trim();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      let valid = true;

      if (valid) {
        const user = {
          fullName,
          email,
          mobileNumber,
          username,
          password,
        };
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const submitButton = document.querySelector('button[type="submit"]');
        const userIndex = submitButton.getAttribute("data-index");

        if (userIndex !== null) {
          users[userIndex] = user;
          submitButton.removeAttribute("data-index");
          submitButton.textContent = "Submit";
          document.getElementById("message").textContent =
            "User updated successfully.";
        } else {
          users.push(user);
          document.getElementById("message").textContent =
            "User registered successfully.";
        }

        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("message").style.color = "#2ecc71";

        document.getElementById("registrationForm").reset();
        updateUsersTable();
      }
    });

  function updateUsersTable() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tbody = document.querySelector("#usersTable tbody");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
      const row = document.createElement("tr");

      Object.values(user).forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      const actionCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit-button";
      editButton.addEventListener("click", () => editUser(index));
      actionCell.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", () => deleteUser(index));
      actionCell.appendChild(deleteButton);

      row.appendChild(actionCell);

      tbody.appendChild(row);
    });

    document.getElementById("usersTableContainer").style.display =
      users.length > 0 ? "block" : "none";
  }

  function editUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[index];

    document.getElementById("fullName").value = user.fullName;
    document.getElementById("email").value = user.email;
    document.getElementById("mobileNumber").value = user.mobileNumber;
    document.getElementById("username").value = user.username;
    document.getElementById("password").value = user.password;

    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = "Update";
    submitButton.setAttribute("data-index", index);
  }

  function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("message").textContent =
      "User deleted successfully.";
    document.getElementById("message").style.color = "#e74c3c";

    updateUsersTable();
  }
});
