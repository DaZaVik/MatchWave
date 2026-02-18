# MatchWave 💙

MatchWave — это веб-приложение для знакомств по принципу:
анкета → лента → лайк → взаимный матч.

Проект реализован как полноценная клиент-серверная система:

Frontend (React SPA)
↓
REST API (FastAPI)
↓
PostgreSQL (База данных)

---

# 🎯 Цель проекта

Создать систему, в которой:

- Пользователь может зарегистрироваться
- Создать и редактировать профиль
- Просматривать других пользователей
- Ставить лайки
- Получать матч при взаимном лайке
- Администратор может управлять пользователями

---

# 🛠 Технологический стек

## Backend
- Python 3.11+
- FastAPI
- SQLAlchemy 2.x
- Alembic
- PostgreSQL
- JWT (python-jose)
- passlib[bcrypt]

## Frontend
- React
- Vite
- Axios
- React Router DOM

---

# 👥 Роли в системе

## 1️⃣ Гость
- Может видеть публичную страницу
- Может перейти на регистрацию и вход
- Не имеет доступа к защищённым API

## 2️⃣ Клиент (User)
- Авторизация
- Управление своим профилем
- Просмотр ленты
- Лайки
- Просмотр матчей

## 3️⃣ Администратор
- Просмотр списка пользователей
- Бан / разбан пользователей
- Контроль системы

---

# 🗄 Структура базы данных

## users
| Поле | Тип | Описание |
|------|-----|----------|
| id | int | ID пользователя |
| email | string | Email |
| password_hash | string | Хеш пароля |
| role | string | user / admin |
| is_banned | bool | Заблокирован ли |
| created_at | datetime | Дата регистрации |

## profiles
| Поле | Тип |
|------|-----|
| id | int |
| user_id | FK → users |
| name | string |
| age | int |
| city | string |
| description | text |

## likes
| Поле | Тип |
|------|-----|
| id | int |
| from_user_id | FK |
| to_user_id | FK |
| created_at | datetime |

## matches
| Поле | Тип |
|------|-----|
| id | int |
| user1_id | FK |
| user2_id | FK |
| created_at | datetime |

---

# 🔌 REST API

Базовый URL:
```
http://localhost:8000
```

Swagger документация:
```
/docs
```

---

# 🔐 Аутентификация

## POST /auth/register
Регистрация пользователя.

### Request
```json
{
  "email": "test@mail.com",
  "password": "123456"
}
```

### Response
```json
{
  "message": "User created successfully"
}
```

---

## POST /auth/login
Вход в систему.

### Request
```json
{
  "email": "test@mail.com",
  "password": "123456"
}
```

### Response
```json
{
  "access_token": "JWT_TOKEN",
  "token_type": "bearer"
}
```

---

## GET /auth/me
Получить данные текущего пользователя.

Требует заголовок:
```
Authorization: Bearer JWT_TOKEN
```

### Response
```json
{
  "id": 1,
  "email": "test@mail.com",
  "role": "user",
  "is_banned": false
}
```

---

# 👤 Профиль

## GET /profiles/me
Получить свой профиль.

## PUT /profiles/me
Создать или обновить профиль.

### Request
```json
{
  "name": "Alex",
  "age": 22,
  "city": "Berlin",
  "description": "Люблю спорт"
}
```

---

# 📰 Лента

## GET /feed
Возвращает список профилей других пользователей.

### Response
```json
[
  {
    "id": 2,
    "name": "Maria",
    "age": 21,
    "city": "Paris",
    "description": "Люблю путешествия"
  }
]
```

---

# ❤️ Лайки

## POST /likes/{profile_id}
Поставить лайк пользователю.

Если лайк взаимный — создаётся match.

---

# 🤝 Матчи

## GET /matches
Получить список взаимных матчей.

---

# 🛡 Администрирование

## GET /admin/users
Получить список всех пользователей.

## POST /admin/users/{user_id}/ban
Заблокировать пользователя.

## POST /admin/users/{user_id}/unban
Разблокировать пользователя.

---

# 🧪 Демонстрационный сценарий

1. Пользователь регистрируется
2. Авторизуется
3. Создаёт профиль
4. Просматривает ленту
5. Ставит лайк
6. При взаимном лайке появляется матч
7. Администратор может заблокировать пользователя

---

# 📌 Статус проекта

MVP включает:
- Авторизацию
- Профили
- Ленту
- Лайки и матчи
- Администрирование

Проект соответствует требованиям дисциплины: фронтенд на фреймворке, REST API, PostgreSQL