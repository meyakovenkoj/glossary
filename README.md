# Как использовать?
Надо скачать yarn, python, npm и наверное что-то еще, но остальное есть на компе.

0. Клевая штука `direnv` если ставить её не хочца, то не забыть выполнить команды из `.envrc`

1. Создать окружение в backend:
```
cd backend
pipenv install
```

2. Запустить виртуальное окружение:
```
pipenv shell
```

3. Запускаем бэк:
```
flask run
```

4. Подготавливаем фронт:
```
cd ..
cd frontend
yarn install
yarn start
```

5. Заходим по адресу [http://localhost:3000/](http://localhost:3000/)

6. Нажимаем кнопку `Start` и вводим текст в окно ввода
В качестве разделителей используется точка-пробел '. '

7. Нажимаем готово (2 раза) и выбираем по одному слову, каждый раз нажимая на + в правом углу

8. После завешения набора слов нажимаем `Download`

Код говно, а реализация ещё хуже плюс запросы на перевод не очень быстрые - желательно не тыкать быстро :)

