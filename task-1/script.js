$(function () {
	const SENSOR_TYPE = 'Sensor_type';
	const NUM = 'num';
	const NAME = 'name';
	const TEMPERATURE = 'temperature';
	const HUMIDITY = 'humidity';

	// Так как свойств у объектов мало, выбрал решение через создание массива в котором
	// они перечислены, если количество свойст было бы велико - перед проходом по свойствам объекта,
	// заполнял бы объекты недостающими свойствами с пустыми значениями, чтобы
	// не было пробелов в табличном представлении
	const props = [SENSOR_TYPE, NUM, NAME, TEMPERATURE, HUMIDITY];

	//получаем данные: ругался на CORS, поэтому заимпортил как переменную через <script></script>
	/*const url = 'data.json';
	function getJsonData(url) {
		$.getJSON(url, {})
			.done(function (payload) {
				dataRender(payload);
			});
	}*/

	//рендерим данные из json
	const dataRender = function (data) {
		let html = '';
		$.each(data, function (i, item) {
			html += '<div class="grid_row">';
			props.forEach(function (prop) {
				html += item.hasOwnProperty(prop) ?
					'<div class="grid_cell ' + prop + '">' + item[prop] + '</div>' :
					'<div class="grid_cell ' + prop + '"></div>';
			});
			html += '</div>';
		});
		$('.grid').append(html);
	}

	dataRender(json);
});
