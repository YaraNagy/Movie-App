const API_URL = 'http://localhost:5501/users';
// Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isNotEmpty(value) {
    return value.trim() !== '';
}
// Alert Function
function showAlert(message, isSuccess = false) {
    const alertBox = document.getElementById('login-alert');
    alertBox.textContent = message;
    alertBox.classList.remove('hidden');
    if (isSuccess) {
        alertBox.classList.remove('bg-red-100', 'border-red-400', 'text-red-700');
        alertBox.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
    } else {
        alertBox.classList.remove('bg-green-100', 'border-green-400', 'text-green-700');
        alertBox.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
    }
}

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    let valid = true;
    if (!isValidEmail(email)) {
        document.getElementById('login-email-error').textContent = 'Please enter a valid email address.';
        document.getElementById('login-email-error').classList.remove('hidden');
        valid = false;
    } else {
        document.getElementById('login-email-error').classList.add('hidden');
    }
    if (!isNotEmpty(password)) {
        document.getElementById('login-password-error').textContent = 'Password cannot be empty.';
        document.getElementById('login-password-error').classList.remove('hidden');
        valid = false;
    } else {
        document.getElementById('login-password-error').classList.add('hidden');
    }

    if (!valid) return;
// create request 
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}?email=${email}&password=${password}`, true);
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
            console.log('Status:', xhr.status); 
            console.log('Response:', xhr.responseText); 
            if (xhr.status === 200) {
                const users = JSON.parse(xhr.responseText);
                if (users.length > 0) {
                    localStorage.setItem('user', JSON.stringify(users[0]));
                    showAlert('Login successful!', true);
                    setTimeout(() => {
                        window.location.href = '../Home Page/Home.html';
                    }, 1500);
                } else {
                    showAlert('Invalid email or password.');
                }
            } else {
                showAlert('Error during login process.');
            }
        }
    });
    xhr.send();
});

//Logout Function
function logout() {
    localStorage.removeItem('user');
    window.location.href = './login.html';
}

document.getElementById('logout-link').addEventListener('click', function (e) {
    e.preventDefault(); 
    logout();
});