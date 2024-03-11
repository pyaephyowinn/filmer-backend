# Filmer Dashboard Backend

## Getting Started

First, install dependencies:

```bash
    pnpm install

    or

    npm install
```

And run the development server:

```
    pnpm start:dev

    or

    npm run start:dev
```

## Features

1. **Video CRUD**
2. **Image CRUD**
3. **Category CRUD**

## Structure

```
App
└── src
    ├── assets
    │   ├── styles
    │   ├── images
    ├── <moduleName> for auth, categories, cloudinary, films, users
    │   ├── dto             (TypeORM dto)
    │   ├── moduleName.controller            (core component dir)
    │   ├── moduleName.module          (layout component dir)
    │   └── moduleName.service         (app sidebar component)
    ├── config
    │   └── env             (to upload env variables)
    ├── guards              (layout components)
    │   └── auth.guard.ts             (to upload env variables)
    ├── schemas
    │   ├── category.schema.ts
    │   ├── film.schema.ts
    │   ├── image.schema.ts
    │   └── category.schema.ts
    ├── app.controller.ts            (api services)
    ├── app.module.ts               (global state)
    └── main.ts               (shared functions dir)
```

## Pull Request

Prefix for your pull requests.

- feat: A new feature
- fix: A bug fix
- chore: Other changes that don't modify src
- refactor: A code change that neither fixes a bug nor adds a feature
