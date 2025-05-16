document.addEventListener('DOMContentLoaded', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenu) {
    mobileMenu.addEventListener('click', function () {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  const navLinks = document.querySelectorAll('.nav-menu li a');

  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const subscriptionForm = document.getElementById('subscription-form');

  if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Hapus semua error msG
      clearErrors();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const age = document.getElementById('age');
      const genderOptions = document.querySelectorAll('input[name="gender"]');

      let isValid = true;

      if (!name.value.trim()) {
        displayError('name', 'Name is required');
        isValid = false;
      }

      if (!email.value.trim()) {
        displayError('email', 'Email is required');
        isValid = false;
      } else if (!email.value.includes('@')) {
        displayError('email', 'Email must contain @');
        isValid = false;
      }

      if (!password.value) {
        displayError('password', 'Password is required');
        isValid = false;
      } else if (password.value.length < 6) {
        displayError('password', 'Password must be at least 6 characters');
        isValid = false;
      }

      if (!age.value) {
        displayError('age', 'Age is required');
        isValid = false;
      } else if (Number(age.value) < 17) {
        displayError('age', 'You must be at least 17 years old');
        isValid = false;
      }

      let genderSelected = false;
      genderOptions.forEach((option) => {
        if (option.checked) {
          genderSelected = true;
        }
      });

      if (!genderSelected) {
        displayError('gender', 'Please select a gender');
        isValid = false;
      }

      if (isValid) {
        document
          .getElementById('subscription-form-container')
          .classList.add('hidden');
        document
          .getElementById('subscription-success')
          .classList.remove('hidden');
      }
    });

    const subscribeAnotherBtn = document.getElementById('subscribe-another');
    if (subscribeAnotherBtn) {
      subscribeAnotherBtn.addEventListener('click', function () {
        document.getElementById('subscription-form').reset();
        document.getElementById('subscription-success').classList.add('hidden');
        document
          .getElementById('subscription-form-container')
          .classList.remove('hidden');
      });
    }
  }

  function displayError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
      errorElement.textContent = message;
    }

    const inputField = document.getElementById(fieldName);
    if (inputField) {
      inputField.classList.add('error');
    }
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((error) => {
      error.textContent = '';
    });

    const inputFields = document.querySelectorAll('input');
    inputFields.forEach((field) => {
      field.classList.remove('error');
    });
  }
});
