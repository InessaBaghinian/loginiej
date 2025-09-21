// function updateDashboardCredentials() {
//     if (currentUser) {
//         document.getElementById('dashboardEmail').textContent = currentUser.email;
//         document.getElementById('dashboardName').textContent = currentUser.name;
//     }
// }
let currentUser = null, resetEmail = null, verificationCode = null;

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => 
        p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}


function validateEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function genCode() {
    return Math.floor(100000 + Math.random() * 900000) + '';
}

let users = JSON.parse(localStorage.getItem('users')) || [];
if (!users.find(u => u.email === 'test@example.com')) {
    users.push({ name: 'Demo User', email: 'test@example.com', 
        password: 'password123' });
    localStorage.setItem('users', JSON.stringify(users));
}

function updateDashboardCredentials() {
    if (currentUser) {
        document.getElementById('dashboardEmail').textContent 
        = currentUser.email;
        document.getElementById('dashboardName').textContent 
        = currentUser.name;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ['registerLink','loginLink','forgotPasswordLink','backToLoginLink'].forEach(id => {
        document.getElementById(id).onclick = e => {
            e.preventDefault();
            showPage(id === 'registerLink' ? 'registerPage' : id === 'loginLink' || id === 'backToLoginLink' ? 'loginPage' : 'forgotPasswordPage');
        };
    });

    document.getElementById('resendCodeLink').onclick = e => {
        e.preventDefault();
        if (resetEmail) verificationCode = genCode();
    };

    document.getElementById('logoutBtn').onclick = e => {
        e.preventDefault();
        currentUser = null;
        showPage('loginPage');
        document.getElementById('loginForm').reset();
    };

    document.getElementById('loginForm').onsubmit = e => {
        e.preventDefault();
        const email = loginEmail.value.trim(), password = loginPassword.value;
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            showPage('dashboardPage');
            updateDashboardCredentials();
        }
    };

    document.getElementById('registerForm').onsubmit = e => {
        e.preventDefault();
        const name = registerName.value.trim(), email = registerEmail.value.trim(), password = registerPassword.value, confirm = confirmPassword.value;
        if (!users.find(u => u.email === email) && password === confirm && password.length >= 6 && validateEmail(email)) {
            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            showPage('loginPage');
            registerForm.reset();
        }
    };

    document.getElementById('forgotPasswordForm').onsubmit = e => {
        e.preventDefault();
        const email = forgotEmail.value.trim();
        if (users.find(u => u.email === email) && validateEmail(email)) {
            resetEmail = email;
            verificationCode = genCode();
            showPage('verificationPage');
        }
    };

    document.getElementById('verificationForm').onsubmit = e => {
        e.preventDefault();
        const code = verificationCode.value.trim();
        if (code === verificationCode) showPage('resetPasswordPage');
    };

    document.getElementById('resetPasswordForm').onsubmit = e => {
        e.preventDefault();
        const np = newPassword.value, cp = confirmNewPassword.value;
        const idx = users.findIndex(u => u.email === resetEmail);
        if (np === cp && np.length >= 6 && idx !== -1) {
            users[idx].password = np;
            localStorage.setItem('users', JSON.stringify(users));
            resetEmail = null; verificationCode = null;
            showPage('loginPage');
            resetPasswordForm.reset();
        }
    };
    showPage('loginPage');
});

const form = document.getElementById("registerForm");
form.addEventListener("submit",function(event){
    event.preventDefault();
    document.getElementById("errorname").textContent = "";
    document.getElementById("erroremail").textContent = "";
    document.getElementById("errorpassword").textContent = "";

    let hasError = false;

    let name = document.getElementById("registerName").value.trim();
    let email = document.getElementById("registerEmail").value.trim();
    let password = document.getElementById("registerPassword").value.trim();
    let confirmpassword = document.getElementById("confirmPassword").value.trim();

    if(name === "") {
        document.getElementById("errorname").textContent = "Name is required";
        hasError = true;
    }

    if(email === "") {
        document.getElementById("erroremail").textContent = "Email is requied";
        hasError = true;
    } else if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("erroremail").textContent = "Enter a valid email";
        hasError = true;
    }

    if(password === "") {
        document.getElementById("errorpassword").textContent = "Password is requied";
        hasError = true;
    } else if (password.length < 6) {
        document.getElementById("errorpassword").textContent = "Password must be at least 6";
        hasError = true;
    }

    if(confirmpassword !== password){
        document.getElementById("errorpassword").textContent = "Password sxal";
        hasError = true;
    }

    if(!hasError) {
        alert("Form submitted successfully!");
    }
});



































const kochak = document.getElementById("lusin");

kochak.addEventListener("click", () => {
  document.body.classList.toggle("sev");

  if (document.body.classList.contains("sev")) {
    kochak.textContent = "Light";
  } else {
    kochak.textContent = "Dark";
  }
}); //չաշխատեց սա նորմալ 

//մնացածնե ինչ գրել եմ նենցա տենց չեմ հասկացել ինչ ա գրած  