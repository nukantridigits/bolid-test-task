$(function () {
	const REQUEST_LIMIT = 5;
	const STATUS_SUCCESS = 'success';
	const STATUS_SUCCESS_TEXT = 'success – успешный ответ ';
	const STATUS_ERROR = 'Error';
	const STATUS_ERROR_TEXT = 'Error - ошибка запроса ';

	const requestInfo = $('.request');
	const statusInfo = $('.status_value');
	const url = 'http://someurl.com';

	const request = function (limit) {
		let serverNoAnswerCount = 0;
		return function () {
			$.ajax({
				url: url,
				beforeSend: function() {
					requestInfo.text('Запрос#' + serverNoAnswerCount + ' ......');
				}
			})
				.done(function ({status}) {
					if (status === STATUS_SUCCESS) {
						statusInfo.text(STATUS_SUCCESS_TEXT)
					} else if (status === STATUS_ERROR) {
						statusInfo.text(STATUS_ERROR_TEXT)
					}

					requestInfo.text('');
				})
				.fail(function () {
					serverNoAnswerCount++;
					if (serverNoAnswerCount === limit) {
						statusInfo.text('Нет ответа')
						requestInfo.text('');
						return false;
					} else {
						sendRequest();
					}
				})
		};
	}

	const sendRequest = request(REQUEST_LIMIT);
	sendRequest();
});
