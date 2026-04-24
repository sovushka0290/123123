# Установка копии ProtoQol

Это полная, автономная копия платформы ProtoQol, подготовленная для демонстрации на хакатоне или развертывания на сервере.

1. Установите Python 3.11+.
2. Перейдите в корневую директорию проекта и создайте виртуальное окружение:
   ```bash
   python -m venv venv
   source venv/bin/activate   # Для Linux/Mac
   venv\Scripts\activate      # Для Windows
   ```
3. Установите зависимости:
   ```bash
   pip install -r requirements.txt
   ```
4. Создайте файл `.env` на основе `.env.example` и укажите там ваш `GEMINI_API_KEY` (если `SIMULATION_MODE=False`).
5. Запустите бэкенд FastAPI:
   ```bash
   uvicorn api.main:app --host 0.0.0.0 --port 8000
   ```
6. Откройте `frontend/index.html` в браузере с помощью Live Server или просто дважды кликнув на файл.

**Примечание:** Для деплоя на Vercel или Render не забудьте настроить CORS в файле `api/main.py`.
