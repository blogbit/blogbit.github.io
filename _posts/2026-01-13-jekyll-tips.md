---
layout: post
title: "Советы по работе с Jekyll"
date: 2026-01-13 14:00:00 +0300
categories: [jekyll, разработка]
tags: [jekyll, советы, оптимизация]
---

Jekyll - мощный инструмент для создания статических сайтов. Вот несколько советов:

## Полезные советы:

### 1. Используйте фронт-матери
```yaml
---
layout: post
title: "Мой пост"
date: 2024-01-15
tags: [тег1, тег2]
---
```

### 2. Организуйте структуру
```
_posts/       # Посты блога
_layouts/     # HTML шаблоны
_includes/    # Переиспользуемые компоненты
assets/       # CSS, JS, изображения
_data/        # YAML/JSON данные
```

### 3. Оптимизируйте производительность
- Минифицируйте CSS/JS
- Используйте lazy loading для изображений
- Включите сжатие Gzip

### 4. Настройте SEO
- Добавьте мета-теги
- Создайте sitemap.xml
- Настройте robots.txt

## Полезные ресурсы:
- [Шпаргалка по Liquid](https://shopify.github.io/liquid/)
- [Markdown руководство](https://www.markdownguide.org/)
- [Оптимизация скорости сайта](https://web.dev/learn/)

Больше материалов в [Telegram канале ITfinds](https://t.me/ITfinds).
