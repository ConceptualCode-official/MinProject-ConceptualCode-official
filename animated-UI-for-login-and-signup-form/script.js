document.addEventListener('DOMContentLoaded', () => {
 var sb = document.getElementById('signUpBtn'), sib = document.getElementById('signInBtn'), container = document.querySelector('.container'), sif = document.getElementById('sif'), sf = document.getElementById('sf');

 if (sb && sib && container && sif && sf) {
  sb.addEventListener('click', () => {
   container.classList.add('right-panel-active');
  });

  sib.addEventListener('click', () => {
   container.classList.remove('right-panel-active');
  });

  var showValidationMessage = (element, message, type) => {
   element.textContent = message;
   element.className = `validation-message show ${type}`;
   setTimeout(() => {
    element.classList.remove('show');
   }, 5000);
  };

  var clearValidationMessages = (formId) => {
   var messages = document.querySelectorAll(`#${formId} .validation-message`);
   messages.forEach(msg => {
    msg.classList.remove('show', 'error', 'warning', 'success');
    msg.textContent = '';
   });
  };

  sif.addEventListener('submit', (e) => {
   e.preventDefault();
   clearValidationMessages('sif');

   var ei = document.getElementById('signInEmail'), pi = document.getElementById('signInPassword'), ev = document.getElementById('signInev'), pwv = document.getElementById('signInpwv'), gv = document.getElementById('signIngv');

   let isValid = true;

   if (ei.value.trim() === '') {
    showValidationMessage(ev, 'Email cannot be empty.', 'error');
    isValid = false;
   }
   if (pi.value.trim() === '') {
    showValidationMessage(pwv, 'Password cannot be empty.', 'error');
    isValid = false;
   }

   if (isValid) {
    showValidationMessage(gv, 'Login successful!', 'success');
    console.log('Sign In Data:', {
     email: ei.value,
     password: pi.value
    });
    sif.reset();
   } else {
    showValidationMessage(gv, 'Please correct the errors above.', 'warning');
   }
  });

  sf.addEventListener('submit', (e) => {
   e.preventDefault();
   clearValidationMessages('sf');

   var ni = document.getElementById('signUpName'), ei = document.getElementById('signUpEmail'), pi = document.getElementById('signUpPassword'), cpi = document.getElementById('signUpConfirmPassword'), nv = document.getElementById('signUpnv'), ev = document.getElementById('signUpev'), pwv = document.getElementById('signUppwv'), cmpwv = document.getElementById('signUpcmpwv'), gv = document.getElementById('signUpgv');

   let isValid = true;

   if (ni.value.trim() === '') {
    showValidationMessage(nv, 'Name is required.', 'error');
    isValid = false;
   }
   if (ei.value.trim() === '') {
    showValidationMessage(ev, 'Email is required.', 'error');
    isValid = false;
   }
   if (pi.value.trim() === '') {
    showValidationMessage(pwv, 'Password is required.', 'error');
    isValid = false;
   } else if (pi.value.length < 6) {
    showValidationMessage(pwv, 'Password must be at least 6 characters.', 'warning');
    isValid = false;
   }
   if (cpi.value.trim() === '') {
    showValidationMessage(cmpwv, 'Confirm your password.', 'error');
    isValid = false;
   } else if (pi.value !== cpi.value) {
    showValidationMessage(cmpwv, 'Passwords do not match.', 'error');
    isValid = false;
   }

   if (isValid) {
    showValidationMessage(gv, 'Account created successfully!', 'success');
    console.log('Sign Up Data:', {
     name: ni.value,
     email: ei.value,
     password: pi.value
    });
    sf.reset();
   } else {
    showValidationMessage(gv, 'Please correct the errors above.', 'warning');
   }
  });
 }
});