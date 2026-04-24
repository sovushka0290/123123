# ProtoQol — UI Guide (Hero Section)

Этот документ содержит полный набор шрифтов, HTML, CSS и JS для Hero-секции.

## 1. Подключение шрифтов (в `<head>`)

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;700;800&family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
```

- **Inter** — для основного текста, подзаголовков, статистики.
- **Space Grotesk** — для заголовков (Hero-title, акцентные фразы).
- **Outfit** — для цифр (не используется в Hero, но подключён).

## 2. CSS стили Hero-секции

```css
/* ========== HERO СЕКЦИЯ ========== */
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: visible;
  background: #FFFFFF;
}

/* Контейнер с центрированием */
.hero .section-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
  z-index: 10;
}

/* Две колонки */
.hero-split {
  display: flex;
  align-items: center;
  gap: 4rem;
}

/* Левая колонка (текст + статистика) */
.hero-left {
  flex: 1;
}

/* Правая колонка (видео) */
.hero-right {
  flex: 0.8;
  display: flex;
  justify-content: center;
  position: relative;
}

/* Лейбл сверху */
.hero-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8B5CF6;
  background: rgba(139, 92, 246, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
}

/* Заголовок */
.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3.2rem, 5vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.hero-title .line-l,
.hero-title .line-r {
  display: block;
}

.hero-title .accent {
  color: #8B5CF6;
  background: linear-gradient(135deg, #8B5CF6, #00F0FF);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Подзаголовок */
.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  line-height: 1.5;
  color: #444;
  max-width: 550px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Статистика (4 блока) */
.stats-bar {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  padding: 0.75rem 1.25rem;
  text-align: center;
  backdrop-filter: blur(4px);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
}

.stat-number {
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: #000;
  line-height: 1;
}

.stat-caption {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
  margin-top: 0.25rem;
}

/* Видео в правой колонке */
.hero-right video {
  width: 180%;
  max-width: 1000px;
  transform: scale(1.5) translateX(-8%);
  mix-blend-mode: multiply;
  pointer-events: none;
  border-radius: 30px;
}

/* ========== АНИМАЦИИ ПОЯВЛЕНИЯ ========== */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }

/* ========== АДАПТИВНОСТЬ ========== */
@media (max-width: 1024px) {
  .hero-split {
    gap: 2rem;
  }
  .hero-title {
    font-size: 3rem;
  }
  .stats-bar {
    gap: 1rem;
  }
  .hero-right video {
    width: 100%;
    transform: scale(1.2) translateX(0);
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 60px 0;
  }
  .hero-split {
    flex-direction: column;
    text-align: center;
  }
  .hero-left {
    flex: auto;
    text-align: center;
  }
  .hero-subtitle {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .stats-bar {
    justify-content: center;
  }
  .hero-right {
    display: none; /* скрываем видео на мобильных */
  }
  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  .stat-number {
    font-size: 1.2rem;
  }
  .hero-label {
    font-size: 0.65rem;
  }
}
```

## 3. JavaScript для анимации при скролле (GSAP)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

```javascript
// Регистрируем ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Анимация разъезжающихся строк при скролле
gsap.to('.line-l', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
  x: -150,
  opacity: 0,
  filter: 'blur(20px)',
  duration: 1,
});

gsap.to('.line-r', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
  x: 150,
  opacity: 0,
  filter: 'blur(20px)',
  duration: 1,
});

// Плавное появление элементов
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
revealElements.forEach((el) => revealObserver.observe(el));
```
