# Схема сети как код

Этот скрипт позволяет нарисовать схему сети, описав ее в виде кода. Нарисовать новую или исправить старую схему - легко - поправить пару строк кода. Смотрите сами ;)

## Пример

![](examples/example1.png)

Вот код, который описывает эту схему

`````
  const elements = {
    nodes: [                                                    // описываем узлы
      { id: 'client', type: 'smartphone', label: 'Mobile App'},
      { id: 'server', type: 'server', label: 'Main Server'},
      { id: 'db1', type: 'database', group: 'db cluster', label: 'DB 1'},
      { id: 'db2', type: 'database', group: 'db cluster', label: 'DB 2'},
    ],
    edges: [                                                    // указываем связи
      { source: 'client', target: 'server', label: 'request' },
      { source: 'server', target: 'db1', label: 'request' },
      { source: 'server', target: 'db2', label: 'request' },
    ],
  };
  Diagram('scheme1', elements);
`````

## Как начать использовать?

1. Добавьте в ваш html загрузку скрипта

`````
<script src="https://unpkg.com/@antirek/network-diagram@0.1.1/dist/code-full.min.js"></script>

`````
2. Добавьте div для схемы, задав ширину и высоту

`````
  <div id="scheme1" style="height: 300px;width: 800px;"></div>
`````

3. Опишите вашу схему сети

`````
<script>      
  const elements = {
    edges: [
      { source: 'client', target: 'server', label: 'request' },
      { source: 'server', target: 'db1', label: 'request' },
      { source: 'server', target: 'db2', label: 'request' },
    ],
    nodes: [
      { id: 'client', type: 'smartphone', label: 'Mobile App'},
      { id: 'server', type: 'server', label: 'Main Server'},
      { id: 'db1', type: 'database', group: 'db cluster', label: 'DB 1'},
      { id: 'db2', type: 'database', group: 'db cluster', label: 'DB 2'},
    ]
  };
  Diagram('scheme1', elements);
</script>
`````

Подробнее в [example.html](examples/example.html)

## Опции

Для отрисовки схемы используется [cytoscape.js](https://js.cytoscape.org/). Схема отрисовывается в двух режимах: auto и grid. Для grid режима необходимо указать positions. Positions - это список элементов с указанием строки и колонки их расположения. Явное указание positions позволяет точно зафиксировать вид схемы.

`````
  positions: [
    { id: 'client', row: 1, col: 2, },
    { id: 'server', row: 2, col: 4, },
    { id: 'db1', row: 1, col: 5, },
    { id: 'db2', row: 3, col: 5, },
  ]
`````

#### Пример кода layout = grid

`````
  const elements = {
    edges: [
      { source: 'client', target: 'server', label: 'request' },
      { source: 'server', target: 'db1', label: 'request' },
      { source: 'server', target: 'db2', label: 'request' },
    ],
    nodes: [
      { id: 'client', type: 'smartphone', label: 'Mobile App'},
      { id: 'server', type: 'server', label: 'Main Server'},
      { id: 'db1', type: 'database', group: 'db cluster', label: 'DB 1'},
      { id: 'db2', type: 'database', group: 'db cluster', label: 'DB 2'},
    ],
    positions: [
      { id: 'client', row: 1, col: 2, },
      { id: 'server', row: 2, col: 4, },
      { id: 'db1', row: 1, col: 5, },
      { id: 'db2', row: 3, col: 5, },
    ],
  };
  Diagram('scheme', elements, {layout:'grid'});
`````

## Типы объектов

Для nodes можно указать type, который меняет отображаемую иконку объекта. 

Доступные type

- smartphone
- desktop
- server
- pod
- database

## Группы

Для nodes можно указать group. Список group необходимо указать в elements.




Еще примеры схем