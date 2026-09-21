# Chess Analyzer — Frontend

Веб-приложение для поиска игроков Chess.com, просмотра партий и анализа ходов с помощью Stockfish. Лендинг, поиск и просмотрщик партий на **Next.js** (App Router).

## Возможности

- Поиск игрока по нику Chess.com и список его партий с пагинацией
- Просмотр партии на интерактивной доске (`react-chessboard`, `chess.js`)
- Полный анализ партии и пошаговый разбор отдельных ходов через backend API
- Лендинг с анимациями (GSAP) и описанием продукта

## Стек

| Категория | Технологии |
|-----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router), React 19 |
| Язык | TypeScript |
| Стили | Tailwind CSS 4 |
| UI | shadcn/ui, Base UI, Lucide |
| Шахматы | chess.js, react-chessboard |
| Анимации | GSAP, `@gsap/react` |
| URL state | nuqs |
| Пакетный менеджер | [Bun](https://bun.sh/) (`bun.lock`) |
| Git hooks | Husky (pre-commit: `bun run lint`) |

## Требования

- [Bun](https://bun.sh/) (рекомендуется — в репозитории есть `bun.lock`) или Node.js 20+ с npm/yarn/pnpm
- Запущенный **backend** с REST API (см. переменную окружения ниже)

## Быстрый старт

```bash
cd chess-analizer-frontend
bun install
```

Создайте файл `.env.local` в корне фронтенда:


Укажите базовый URL вашего API **без** завершающего слэша. Клиент обращается к эндпоинтам вида:

- `GET /search/{username}?page=&limit=`
- `GET /games/{username}/{gameId}`
- `GET /analysis/{username}/{gameId}`
- `GET /{username}/{gameId}/analyze?move=`

Запуск в режиме разработки:

```bash
bun run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда | Описание |
|---------|----------|
| `bun run dev` | Dev-сервер Next.js |
| `bun run build` | Production-сборка |
| `bun run start` | Запуск собранного приложения |
| `bun run lint` | ESLint (Next.js config) |

## Маршруты

| Путь | Назначение |
|------|------------|
| `/` | Лендинг |
| `/search` | Поиск игрока |
| `/{username}/games` | Список партий игрока |
| `/{username}/game/{gameId}` | Просмотр партии |
| `/{username}/game/{gameId}/analysis` | Партия с панелью анализа |

## Структура проекта

```
app/                    # App Router: layouts и страницы
  (root)/               # Основные маршруты с общим layout
shared/
  components/           # UI: лендинг, поиск, игра, анализ
  hooks/                # Анализ, управление партией, звук, клавиши
  ui/                   # shadcn-компоненты (button, input, table, …)
  utils/                # PGN, форматирование анализа, time control
  constants/
  lib/
public/                 # Статика, иконки, звуки
```

Импорты через алиас `@/*` → корень проекта (`tsconfig.json`).

## Cursor Skills

В проекте: `.cursor/skills/base/` — инструкции для агента Cursor. Файл должен называться **`SKILL.md`** (регистр важен), с YAML frontmatter `name` и `description`.

## Лицензия

Приватный проект (`"private": true` в `package.json`).
