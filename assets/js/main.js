// Основной JavaScript для сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');
    
    // Инициализация темы
    initTheme();
    
    // Переключатель темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Бургер-меню
    initBurgerMenu();
    
    // Подсветка активной навигации
    highlightActiveNav();
    
    // Обработка тегов на странице блога
    initBlogTags();
});

// Работа с темой
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const button = document.getElementById('theme-toggle');
    if (button) {
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
    
    announceThemeChange(newTheme);
}

function announceThemeChange(theme) {
    const message = theme === 'dark' 
        ? 'Темная тема включена' 
        : 'Светлая тема включена';
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.padding = '0';
    announcement.style.margin = '-1px';
    announcement.style.overflow = 'hidden';
    announcement.style.clip = 'rect(0, 0, 0, 0)';
    announcement.style.whiteSpace = 'nowrap';
    announcement.style.border = '0';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// Бургер-меню
function initBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Блокировка скролла при открытом меню
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-item a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Закрытие меню при клике вне меню
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && 
                !event.target.closest('.burger-menu') &&
                mainNav.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Подсветка активной навигации
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-item a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || 
            (currentPath.startsWith(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Обработка тегов на странице блога
function initBlogTags() {
    // Обработка тегов на странице блога
    const blogTags = document.querySelectorAll('.post-tags .tag');
    blogTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            if (this.getAttribute('href') && this.getAttribute('href').includes('/blog/?tag=')) {
                e.preventDefault();
                
                // Анимация нажатия
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Получаем тег из data-атрибута
                const tagValue = this.getAttribute('data-tag');
                if (tagValue) {
                    // Обновляем URL с параметром тега
                    const newUrl = `/blog/?tag=${tagValue}`;
                    window.history.pushState({ tag: tagValue }, '', newUrl);
                    
                    // Фильтруем статьи
                    filterArticlesByTag(tagValue);
                }
            }
        });
        
        // Эффект при наведении
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Проверяем, есть ли тег в URL при загрузке страницы
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTag = urlParams.get('tag');
    
    if (selectedTag) {
        // Ждем немного, чтобы DOM полностью загрузился
        setTimeout(() => {
            filterArticlesByTag(selectedTag);
        }, 100);
    }
}

// Фильтрация статей по тегу
function filterArticlesByTag(tag) {
    // Находим все статьи и теги
    const articles = document.querySelectorAll('.post-preview');
    const allTags = document.querySelectorAll('.tag');
    
    // Сбрасываем все активные теги
    allTags.forEach(t => t.classList.remove('active'));
    
    // Активируем выбранный тег
    document.querySelectorAll(`.tag[data-tag="${tag}"]`).forEach(t => {
        t.classList.add('active');
    });
    
    // Счетчик видимых статей
    let visibleCount = 0;
    
    // Фильтруем статьи
    articles.forEach(article => {
        const articleTags = Array.from(article.querySelectorAll('.tag')).map(t => 
            t.getAttribute('data-tag')
        );
        
        if (articleTags.includes(tag)) {
            article.style.display = 'block';
            visibleCount++;
        } else {
            article.style.display = 'none';
        }
    });
    
    // Обновляем заголовок
    const title = document.querySelector('.content h1');
    if (title && tag) {
        const tagName = document.querySelector(`.tag[data-tag="${tag}"]`)?.textContent || tag;
        title.textContent = `Статьи с тегом: ${tagName}`;
        
        // Проверяем, есть ли уже кнопка "Показать все"
        let showAllBtn = document.querySelector('.show-all-btn');
        
        if (!showAllBtn) {
            // Добавляем кнопку "Показать все"
            showAllBtn = document.createElement('a');
            showAllBtn.href = '/blog/';
            showAllBtn.className = 'btn show-all-btn';
            showAllBtn.innerHTML = '<i class="fas fa-times"></i> Показать все статьи';
            showAllBtn.style.marginLeft = '20px';
            showAllBtn.style.fontSize = '0.9em';
            title.parentNode.insertBefore(showAllBtn, title.nextSibling);
        }
    }
    
    // Обновляем пагинацию
    updatePaginationForFilter(visibleCount);
}

// Обновление пагинации при фильтрации
function updatePaginationForFilter(visibleCount) {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
        if (visibleCount === 0) {
            pagination.style.display = 'none';
            // Показываем сообщение, если нет статей
            const noResults = document.createElement('p');
            noResults.className = 'no-results';
            noResults.textContent = 'Нет статей с выбранным тегом.';
            noResults.style.textAlign = 'center';
            noResults.style.color = 'var(--secondary-color)';
            noResults.style.marginTop = '40px';
            
            const content = document.querySelector('.content');
            if (content && !document.querySelector('.no-results')) {
                content.appendChild(noResults);
            }
        } else {
            pagination.style.display = 'flex';
            // Убираем сообщение, если оно есть
            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
        }
    }
}

// Обработка ссылок в статьях
function initArticleLinks() {
    const articleLinks = document.querySelectorAll('.post-content a');
    articleLinks.forEach(link => {
        // Добавляем иконку для внешних ссылок
        if (link.hostname !== window.location.hostname && !link.classList.contains('no-icon')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-external-link-alt';
            icon.style.marginLeft = '5px';
            icon.style.fontSize = '0.8em';
            link.appendChild(icon);
        }
    });
}

// Вызов при загрузке
initArticleLinks();

// Обработка пагинации
function initPagination() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Показываем индикатор загрузки
            const loader = document.createElement('div');
            loader.className = 'page-loader';
            loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            loader.style.position = 'fixed';
            loader.style.top = '20px';
            loader.style.right = '20px';
            loader.style.fontSize = '24px';
            loader.style.color = 'var(--primary-color)';
            loader.style.zIndex = '1000';
            document.body.appendChild(loader);
            
            // Убираем через 2 секунды на всякий случай
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 2000);
        });
    });
}

// Вызов при загрузке
initPagination();

// Обработка кнопок навигации между постами
function initPostNavigation() {
    const prevPosts = document.querySelectorAll('.prev-post');
    const nextPosts = document.querySelectorAll('.next-post');
    
    prevPosts.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'translateX(-5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = '';
        });
    });
    
    nextPosts.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'translateX(5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = '';
        });
    });
}

// Вызов при загрузке
initPostNavigation();

// Обработка истории браузера для фильтрации тегов
window.addEventListener('popstate', function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTag = urlParams.get('tag');
    
    if (selectedTag) {
        filterArticlesByTag(selectedTag);
    } else {
        // Показываем все статьи
        document.querySelectorAll('.post-preview').forEach(article => {
            article.style.display = 'block';
        });
        
        // Сбрасываем активные теги
        document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
        
        // Восстанавливаем заголовок
        const title = document.querySelector('.content h1');
        if (title) {
            title.textContent = 'Все записи блога';
            
            // Убираем кнопку "Показать все"
            const showAllBtn = document.querySelector('.show-all-btn');
            if (showAllBtn) {
                showAllBtn.remove();
            }
        }
        
        // Показываем пагинацию
        const pagination = document.querySelector('.pagination');
        if (pagination) {
            pagination.style.display = 'flex';
        }
        
        // Убираем сообщение, если оно есть
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.remove();
        }
    }
});
