import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2W8jg6YxkCvxxbFMuCrR0KX3a0pgXibg",
  authDomain: "login-proiect-web-foto.firebaseapp.com",
  databaseURL: "https://login-proiect-web-foto-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "login-proiect-web-foto",
  storageBucket: "login-proiect-web-foto.appspot.com",
  messagingSenderId: "1034306078322",
  appId: "1:1034306078322:web:fe9ff958658f57e19d24eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Funcția de înregistrare a unui nou utilizator
function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const fullName = document.getElementById('full_name').value;
  const phoneNumber = document.getElementById('phone_number').value;

  if (!validateEmail(email) || !validatePassword(password) || !validateField(fullName) || !validateField(phoneNumber)) {
    alert('All fields are required and must be valid.');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        full_name: fullName,
        phone_number: phoneNumber,
        last_login: Date.now(),
      };set(ref(database, 'users/' + user.uid), userData)
      .then(() => {
        alert('Registration successful');
        // Salvăm datele utilizatorului în local storage
        localStorage.setItem('currentUser', JSON.stringify(userData));
        // Redirecționăm utilizatorul către pagina următoare
        window.location.href = 'Calendar.html';
      })
        .catch((error) => alert(error.message));
    })
    .catch((error) => alert(error.message));
}

// Funcția de autentificare a utilizatorului
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!validateEmail(email) || !validatePassword(password)) {
    alert('Invalid email or password.');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    window.location.href = 'Calendar.html'; 
  })
    .catch((error) => alert(error.message));
}

// Funcție de validare a email-ului
function validateEmail(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(String(email).toLowerCase());
}

// Funcție de validare a parolei (minim 6 caractere)
function validatePassword(password) {
  return password.length >= 6;
}

// Funcție de validare a câmpurilor (nu trebuie să fie goale)
function validateField(field) {
  return field.trim() !== '';
}

// Atașează funcțiile la butoane când documentul este încărcat complet
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('login-btn').addEventListener('click', login);
  document.getElementById('register-btn').addEventListener('click', register);
});
