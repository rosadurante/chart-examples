/* globals define */

define(['jquery', 'underscore', 'stackBarChart', 'pieChart'], function ($, _, StackBarChart, PieChart) {

  var dataStackBar = [
      {'key': 'main_key_1', 'value': {'kindle': 34, 'DVD': 54, 'books': 12, 'BlueRay': 20, 'Vinyl': 18 }},
      {'key': 'main_key_2', 'value': {'kindle': 40, 'DVD': 33, 'books': 60, 'BlueRay': 51, 'Vinyl': 28 }},
      {'key': 'main_key_3', 'value': {'kindle': 52, 'DVD': 23, 'books': 60, 'BlueRay': 16, 'Vinyl': 58 }},
      {'key': 'main_key_4', 'value': {'kindle': 78, 'DVD': 34, 'books': 22, 'BlueRay': 27, 'Vinyl': 34 }},
      {'key': 'main_key_5', 'value': {'kindle': 12, 'DVD': 52, 'books': 12, 'BlueRay': 20, 'Vinyl': 21 }},
      {'key': 'main_key_6', 'value': {'kindle': 34, 'DVD': 10, 'books': 23, 'BlueRay': 10, 'Vinyl': 38 }},
      {'key': 'main_key_7', 'value': {'kindle': 23, 'DVD': 23, 'books': 52, 'BlueRay': 21, 'Vinyl': 28 }},
      {'key': 'main_key_8', 'value': {'kindle': 62, 'DVD': 54, 'books': 32, 'BlueRay': 31, 'Vinyl': 18 }},
    ],
    dataPie = [
      {'label': 'Europe', 'value': 3000}, {'label': 'Asia', 'value': 12000}, {'label': 'African', 'value': 4500},
      {'label': 'Oceania', 'value': 2000}, {'label': 'America', 'value': 6500}, {'label': 'Antartida', 'value': 500}
    ]

  var chart_1 = new StackBarChart({ element: '.stackbar', data: dataStackBar, width: 600, height: 800});
  var chart_2 = new PieChart({ element: '.pie', data: dataPie});

  dataStackBar = [
    {'key': 'main_key_1', 'value': {'kindle': 1, 'DVD': 2, 'books': 2, 'BlueRay': 3}},
    {'key': 'main_key_2', 'value': {'kindle': 1, 'DVD': 3, 'books': 2, 'BlueRay': 2}},
    {'key': 'main_key_3', 'value': {'kindle': 3, 'DVD': 1, 'books': 3, 'BlueRay': 2}},
    {'key': 'main_key_4', 'value': {'kindle': 3, 'DVD': 3, 'books': 2, 'BlueRay': 2}},
    {'key': 'main_key_5', 'value': {'kindle': 2, 'DVD': 3, 'books': 2, 'BlueRay': 1}},
  ];
  dataPie = [
    {'label': 'Europe', 'value': 5000}, {'label': 'Asia', 'value': 11000}, {'label': 'African', 'value': 7500},
    {'label': 'Oceania', 'value': 1000}, {'label': 'America', 'value': 10500}, {'label': 'Antartida', 'value': 1500}
  ]

  setTimeout(function () {
    chart_1.updateData(dataStackBar);
    chart_2.updateData(dataPie);
  }, 3000);

});