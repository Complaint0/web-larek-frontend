# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных 

Товар

```
export interface IProduct {
    _id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    imageUrl: string;
}
```

Пользовательска информация

```
export interface IUser {
    addr: string;
    email: string;
    phone:string;
    payment: string;
    products: string[];
}
```

Данные, используемые в форме выбора оплаты и адреса

```
export type IUserChoosePayment = Pick<IUser, 'payment' | 'addr'>;
```

Данные, используемые в форме ввода почты и телефона

```
export type IUserEnterEmail = Pick<IUser, 'email' | 'phone'>; 
```

## Архитектура

Код приложения написан согласно парадигме MVP:
- слой данных, отвечает за хранение и измнения данных;
- слой представления, отвечает за отображения данных ;
- презентер, отвечат за связь данных и отображения.

### Базовый код

#### Класс Api
Предназваничен для взаимодейтсвия с сервером.

Конструктом принимает следующие аргументы:
- baseUrl: string - адрес сервера
- options: RequestInit - заголовки запроса

Класс содержит следующие методы:
- handleResponse(response: Response): Promise<object> - отвечает за проверку ответа от сервера. 
- get(uri: string) - отвечает за принятие данных с сервера
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - отвечает за отправление запросов на сервер

#### Класс Events
Является брокером событий.

Содержит поле, которое отвечает за название действия и его функцию.

Ключевые методы:
- on<T extends object>(eventName: EventName, callback: (event: T) => void) - установить обработчик на событие
- emit<T extends object>(eventName: string, data?: T) - Инициировать событие с данными
- trigger<T extends object>(eventName: string, context?: Partial<T>) - Сделать коллбек триггер, генерирующий событие при вызове


### Класс для работы с API

#### Класс ProductAPI
Данный класс наследуется от базового класса API. Необходим для типизации ответов и запросов на сервер.

Методы:
- getProducts(): Promise<IProduct> - возврщает полученные с сервера товары
- order(data: IUser): Promise<IUser> - возвращает ответ с сервера о статусе покупки


### Классы данных

#### Класс Catalog

Класс отвечает за хранение и логику работы с карточками.
Конструктор класса принимает инстант брокера событий
В полях класса хранятся следующие данные:
- products: IProduct[] - массив объектов товаров
- curProduct: string | null - id товара, выбранного для просмотра в модальной окне

Так же класс предоставляет набор методов для взаимодействия с этими данными.
- addProductToCatalog(product: IProduct): void - добавляет карточку в каталог.
- getProductFromCatalog(id: string): void - возвращает карточку по id.

#### Класс UserData

Класс отвечает за хранение и логику работы с данными  пользователя.
Конструктор класса принимает инстант брокера событий
В полях класса хранятся следующие данные:
- addr: string - адрес пользователя
- email: string - почта пользоватя
- phone: string - телефон пользоватя
- payment: string - оплата пользоватя
- products: string[] - id товаров пользоватя
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Класс описывает набор методов для взаимодействия с данными пользователя.
- setUserProducts(ids: string[]): void - сохраняет покупаемые продукты классе
- setUserPayment(userData: IUserChoosePayment): void - сохраняет способ оплаты и адрес пользователя
- setUserEmail(userData: IUserEnterEmail): void - сохраняет почту и телефон пользователя 
- checkValidation(data: Record<keyof IUser, string>): boolean - проверяет объект с данными пользователя на валидность

#### Класс Basket

Класс отвечает за хранение и логику работы с корзиной товаров
Конструктор класса принимает инстант брокера событий
В полях класса хранятся следующие данные:
- products: IProduct[] - товары, которые находятся в корзине

Класс описывает набор методов для взаимодействия с корзиной.
- addProductToBaseket(product: IProduct): void - добавить товар в корзину;
- deleteProductFromBaseket(id: string): void - удалить товар из корзины;
- getProductsFromBasket(): IProduct[] - получить списко товаров из корзины;
- getTotalFromBasket(): number - получить обшую сумму товаров корзины;
- getCountProductsFromBasket(): number - получить количество товаров в корзине;
- clearBasket(): void - очистить корзину;


### Базовые классы

#### Класс View 
Отвечает за общую функцоинальность отображений. Является джненериком. 

Методы класса:
- render(data?: Partial<T>): HTMLElement - отобржает изменение на странице
- toggle(element: HTMLElement, className: string, value?: boolean) - переключает класс
- setText(element: HTMLElement, value: unknow) - устанавливает текст;
- setImage(element: HTMLImageElement, src: string, alt? :string) - устанавливает картинк

#### Form
Является дженериком. Отвечает за общую функциональность формы.
Конструктор принимает темплейт формы.
- modal: HTMLElement - темплейт формы
- submitButton: HTMLButtonElement - кнопка
- inputs: NodeListOf<HTMLInputElement> - коллекция полйе ввода
- errors: Record<string, HTMLElement> - объект хранязий ощибку под полями формы

Методы класса: 
- setValid(isValid: boolean) - изменяет активность формы
- getData<T>(): T - возвращает введенные данные

### Классы отображения

#### Класс Page
Расширяет класс View. Реализует главную страницу.
Конструктор класса получает базовый элемент разметки.
Содерижт следующие поля:
- productsContainer: HTMLElement - контейнер карточки карточки
- counterProductContainer: HTMLElement - элемент количества товаров в корзине

Содержит следующие методы:
- productsTotal(value: number) - отображает количество продуктов в корзине
- productList(items: HTMLElement[]) - отображает товары


#### Класс Product
Расщиряет класс View. Реализует элемент товара.

Констркутор класса получает экземпляр брокера событий и темплейт карточки.
Содержит следующие поля:
- name: string;
- category: string;
- description: string;
- price: number;
- imageUrl: string;

Методы класса:
- геттер id - возвращает уникальный идентификатор товара
- setData(product: IProduct): void - заполняет карточку
- render(): HTMLElement - возвращает товар с установленными слушателями


#### Класс ProductsContainer
Отвечает за отображение списка карточек на странцие. 
В конструкто приманиет контейнер, в котором размещаются карточки.

Методы:
сеттер container для отображения содержимого

#### Класс Modal
Расширяет класс View. Реализует модальное окно. Позволяет открыть соответсвующее содержимое темплейта в модально окно. Также предоставляет методы открытия и закрытия модального окна. 
Конструктом класса получает селектор HTML разметки, а также экземпляр класса `EventEmitter`.

Поля класса:
- modal: HTMLElement - элемент модального окна
- events: IEvents - брокер событий

Методы:
- setData(item: HTMLElement) - устанавливается содержимое модального окна

#### Класс IProductCompact
Реализует карточку товара при клике на нее.
Констуктор получает темплейт мини-карточки товара и объект брокера событий.
- modal: HMTLElement - окно выбора мини-кароточки
- button: HTMLElement - кнопка добавленя в корзину

- setData(data: IProduct):  - заполняет карточку
- getData(): HTMLElement - возвращает карточку

#### Класс Basket
Реализует корзину страницы.
Конструктор класса получает базовый элемент разметки.
Содерижт следующие поля:
- productsContainer: HTMLElement - темплейт корзины
- products: IProduct;

Методы:
- setBasket(item: IProduct): void - заполяет корзину данными
- render(): HTMLElement - возвращает товар с установленными слушателями


#### Класс ChoosePayment 
Расширяет класс Form. Реалиузет формы выбора оплаты и ввода адреса.
Поля класса:
- payment: string
- addr: string;

Методы
- getChoosePaymentForm(): HTMLElemnt - возвращает разметку формы выборы способа оплаты 

#### Класс ChooseEmail 
Расширяет класс Form. Реализует форму ввода почты и адреса.
Поля класса:
- email: string;
- phone: string;

Методы:
- getChooseEmailForm(): HTMLElement - возвращает разметку формы ввода почты


#### Класс PaymentSucces
Реализует корзину страницы.
Конструктор класса получает базовый элемент разметки.
Содерижт следующие поля:
- productsContainer: HTMLElement - темплейт успешной оплаты
- products: IProduct;

Методы:
- setSucces(count: value): void - заполяет разметку данными

