// دالة تسجيل الدخول
function login(username, password) {
  if (username === 'a' && password === 'a') {
    localStorage.setItem('isLoggedIn', 'true');
    return true;
  }
  return false;
}

// دالة التحقق من حالة الدخول
function checkLogin() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// دالة تسجيل الخروج
function logout() {
  localStorage.removeItem('isLoggedIn');
}