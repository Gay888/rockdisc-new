/* ===== อ้างอิง element ที่ใช้บ่อย ===== */
const overlay = document.getElementById('overlay');
const headerBtn = document.getElementById('headerBtn');
const userChip = document.getElementById('userChip');
const avatarLetter = document.getElementById('avatarLetter');
const userGreeting = document.getElementById('userGreeting');
const toast = document.getElementById('toast');

const btnLogin = document.querySelector('.btn-log');
const btnSignup = document.querySelector('.btn-sign');

/* ===== โหลดหน้าใหม่ → เช็ค localStorage ===== */
window.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('rockdisc_user');
    if (savedName) {
        enterLoggedInState(savedName, false); // false = ไม่ต้องบันทึกซ้ำ
    }
});

/* ===== เปิด/ปิด ป๊อปอัป ===== */
function openModal(tab) {
    if (!overlay) return;
    overlay.classList.add('open');
    switchTab(tab);
}

function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
}

if (overlay) {
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });
}

if (btnLogin) btnLogin.addEventListener('click', () => openModal('login'));
if (btnSignup) btnSignup.addEventListener('click', () => openModal('signup'));

/* ===== สลับแท็บ ===== */
function switchTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('tabLogin').classList.toggle('active', isLogin);
    document.getElementById('tabSignup').classList.toggle('active', !isLogin);
    document.getElementById('paneLogin').classList.toggle('active', isLogin);
    document.getElementById('paneSignup').classList.toggle('active', !isLogin);
}

/* ===== toast ===== */
function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ===== เข้าสู่ระบบ ===== */
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    closeModal();
    enterLoggedInState(email.split('@')[0] || 'Member');
    showToast('เข้าสู่ระบบสำเร็จ ยินดีต้อนรับกลับ!');
    return false;
}

/* ===== สมัครสมาชิก ===== */
function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const pass = document.getElementById('signupPassword').value;
    const err = document.getElementById('signupError');

    if (!name || !email || pass.length < 6) {
        err.style.display = 'block';
        return false;
    }
    err.style.display = 'none';
    closeModal();
    enterLoggedInState(name);
    showToast('สมัครสมาชิกสำเร็จ! ยินดีต้อนรับสู่ ROCKDISC, ' + name);
    return false;
}

/* ===== แสดงสถานะ login ===== */
function enterLoggedInState(name, save = true) {
    if (save) localStorage.setItem('rockdisc_user', name); // บันทึกชื่อ
    if (headerBtn) headerBtn.classList.add('hidden');
    if (avatarLetter) avatarLetter.textContent = name.charAt(0).toUpperCase();
    if (userGreeting) userGreeting.textContent = 'สวัสดี, ' + name;
    if (userChip) userChip.classList.add('show');
}

/* ===== ออกจากระบบ ===== */
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) btnLogout.addEventListener('click', handleLogout);

function handleLogout() {
    localStorage.removeItem('rockdisc_user'); // ลบชื่อออก
    if (userChip) userChip.classList.remove('show');
    if (headerBtn) headerBtn.classList.remove('hidden');
    showToast('ออกจากระบบแล้ว แล้วพบกันใหม่!');
}