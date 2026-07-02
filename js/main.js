// Пользователи
var users = [
    { login: 'user123', password: '123456', fio: 'Иванов Иван', phone: '8(999)999-99-99', email: 'user@mail.ru' },
    { login: 'Admin', password: 'KorokNET', fio: 'Администратор', phone: '8(888)888-88-88', email: 'admin@mail.ru' }
];

// Заявки
var applications = [
    {
        id: 1,
        userLogin: 'user123',
        course: 'Графический дизайн',
        startDate: '2026-09-15',
        payment: 'Картой',
        status: 'Новое',
        review: ''
    },
    {
        id: 2,
        userLogin: 'user123',
        course: 'Веб-дизайн',
        startDate: '2026-10-01',
        payment: 'Безналичный',
        status: 'Идет обучение',
        review: ''
    },
    {
        id: 3,
        userLogin: 'user123',
        course: 'Motion-дизайн',
        startDate: '2026-08-20',
        payment: 'Картой',
        status: 'Обучение завершено',
        review: 'Отличный курс!'
    }
];

var currentUser = null;

function loginUser(login, password) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].login === login && users[i].password === password) {
            currentUser = users[i];
            localStorage.setItem('user', JSON.stringify(currentUser));
            return true;
        }
    }
    return false;
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('user');
    window.location.href = 'auth.html';
}

function getCurrentUser() {
    if (currentUser) return currentUser;
    var saved = localStorage.getItem('user');
    if (saved) {
        currentUser = JSON.parse(saved);
        return currentUser;
    }
    return null;
}

function registerUser(login, password, fio, phone, email) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].login === login) {
            return false;
        }
    }
    users.push({ login: login, password: password, fio: fio, phone: phone, email: email });
    return true;
}

function getUserApps(login) {
    var result = [];
    for (var i = 0; i < applications.length; i++) {
        if (applications[i].userLogin === login) {
            result.push(applications[i]);
        }
    }
    return result;
}

function addApplication(userLogin, course, startDate, payment) {
    var newId = applications.length + 1;
    applications.push({
        id: newId,
        userLogin: userLogin,
        course: course,
        startDate: startDate,
        payment: payment,
        status: 'Новое',
        review: ''
    });
    return true;
}

function updateStatus(id, newStatus) {
    for (var i = 0; i < applications.length; i++) {
        if (applications[i].id === id) {
            applications[i].status = newStatus;
            return true;
        }
    }
    return false;
}

function addReviewToApp(id, text) {
    for (var i = 0; i < applications.length; i++) {
        if (applications[i].id === id) {
            applications[i].review = text;
            return true;
        }
    }
    return false;
}

function validLogin(login) {
    return /^[a-zA-Z0-9]{6,}$/.test(login);
}

function validPassword(password) {
    return password.length >= 8;
}

function validFio(fio) {
    return /^[А-Яа-я\s]+$/.test(fio);
}

function validPhone(phone) {
    return /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phone);
}

function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
