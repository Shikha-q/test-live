// إعدادات النظام
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyVHrQbZG8HHPZ_bSfEovoC4ArTbCQEbsz1_h9rSMvE7ZPNOwzV3NY0lyDOeliwz8lg/exec";
const USERS_SHEET = "المستخدمين";

// متغيرات النظام
let currentUser = null;
let currentUsername = null;
let currentUserRole = 0;

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('loginMessage');
  
  // إظهار تحميل
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحقق...';
  submitBtn.disabled = true;
  
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&sheetName=${encodeURIComponent(USERS_SHEET)}`
    });
    
    const result = await response.json();
    
    if (result.success) {
      // تخزين بيانات المستخدم في localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        name: result.user.name,
        username: result.user.username,
        role: result.user.role
      }));
      
      // توجيه المستخدم إلى لوحة التحكم
      window.location.href = "dashboard.html";
    } else {
      messageDiv.textContent = result.message || "بيانات الدخول غير صحيحة";
      messageDiv.className = "alert alert-danger";
      messageDiv.classList.remove('hidden');
    }
  } catch (error) {
    console.error("Login error:", error);
    messageDiv.textContent = "حدث خطأ في الاتصال بالخادم";
    messageDiv.className = "alert alert-danger";
    messageDiv.classList.remove('hidden');
  } finally {
    // إعادة زر التسجيل إلى حالته الأصلية
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
});

// إخفاء شاشة التحميل بعد ثانيتين
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    document.getElementById('loaderScreen').classList.add('hidden');
  }, 2000);
});