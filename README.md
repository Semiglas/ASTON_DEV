Представляю вам Сервис по поиску фильмов и добавлению их в избранное:)

Инструкция по уставноке:

- скачиваете репу
- получаете файл .env
- пишем в терминал "npm install"
- потом "cd src/server"
- потом node main.js
- потом возвращаетесь в рут и пишем "npm run dev"

## 1 уровень (обязательный - необходимый минимум)

- [x] Реализованы Требования к функциональности
- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используем Firebase

## React

- [x] Пишем функциональные компоненты с хуками в приоритете над классовыми [components](/src/components/), [pages](src/pages/)
- [x] Есть рендеринг списков [MovieList](/src/components/MovieList.jsx)
- [x] Реализована хотя бы одна форма [Login](src/pages/Login.jsx)
- [x] Есть применение Контекст API [AuthContext](src/contexts/AuthContext.jsx)
- [x] Есть применение предохранителя ErrorBoundary [ErrorBoundary](src/components/ErrorBoundary.jsx)
- [x] Есть хотя бы один кастомный хук [useDebounce, useFavorite, useHistory](src/hooks/)
- [x] Хотя бы несколько компонентов используют PropTypes [MovieList](src/components/MovieList.jsx),[FavoriteButton](src/components/FavoriteButton.jsx)
- [x] Поиск не должен триггерить много запросов к серверу [Search](src/components/SearchComponent.jsx)
- [x] Есть применение lazy + Suspense [AppRoutes](src/routes/AppRoutes.jsx)

## Redux

- [x] Используем Modern Redux with Redux Toolkit Store [store](src/store/index.js)
- [x] Используем слайсы Slice [Slices](src/slices/)
- [x] Есть хотя бы одна кастомная мидлвара [LoggerMiddleware](src/middlewares/LoggerMiddleware.js)
- [x]Используется RTK Query [api](src/api/MoviesApi.js)
- [x]Используется Transforming Responses [api](src/api/MoviesApi.js)

## 2 уровень (необязательный)

- [x] Использован Firebase [useFavorites, useHistory](src/hooks/)
- [ ] Виртуализация списков
- [x] Telegram Feature Flag
- [ ] Тесты

## Использовано дополнительно:

- [x] TailwindCSS
