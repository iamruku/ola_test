const isEmpty = function(op) {
	if (op === null || op === undefined || op === '' || op.length === 0) {
		return true;
	}
	return false;
};

const padDigit = function(digit) {
	if (digit < 10) {
		return '0' + digit;
	}
	return digit;
};

const getTimestamp = function(date) {
	return (
		date.getFullYear() +
		'-' +
		padDigit(date.getMonth()) +
		'-' +
		padDigit(date.getDate()) +
		' ' +
		padDigit(date.getHours()) +
		':' +
		padDigit(date.getMinutes())
	);
};

document.addEventListener('DOMContentLoaded', function() {
	const model = {
		id: 0,
		userName: 'Akashdeep B',
		userHandle: '@ab1992',
		inputVal: '',
		listOfTweets: [],
		currentIndex: null
	};

	var inputElement = document.getElementById('id-tweet-ip');
	var formElement = document.getElementById('id-tweet-form');
	var tweetContainer = document.getElementById('id-list-of-tweets');

	function changeModelInput(value) {
		model.inputVal = value;
		inputElement.value = value;
	}

	function editTweet(tweet) {
		model.currentIndex = tweet.id;
		changeModelInput(tweet.tweet);
	}

	function deleteTweet(id) {
		var index;
		if (model.listOfTweets.length === 1) {
			index = 0;
		} else {
			index = model.listOfTweets.length - 1 - id;
		}
		if (!isEmpty(index)) {
			model.listOfTweets.splice(index, 1);
			showListOfTweets();
		}
	}

	function prepareTweet(tweet) {
		var parent = document.createElement('div');
		parent.className = 'cls-tweet';

		var userLine = document.createElement('div');

		var userName = document.createElement('span');
		userName.className = 'cls-tweet-user';
		userName.innerHTML = tweet.user;
		userLine.appendChild(userName);

		var userHandle = document.createElement('span');
		userHandle.className = 'cls-tweet-handle';
		userHandle.innerHTML = tweet.handle;
		userLine.appendChild(userHandle);

		var userTimestamp = document.createElement('div');
		userTimestamp.className = 'cls-tweet-timestamp';
		userTimestamp.innerHTML = tweet.time;

		var userTweet = document.createElement('p');
		userTweet.className = 'cls-tweet-tweet';
		userTweet.innerHTML = tweet.tweet;

		var editButton = document.createElement('button');
		editButton.type = 'button';
		editButton.className = 'cls-primary-button cls-edit';
		editButton.id = 'id-edit-' + tweet.id;
		editButton.innerHTML = 'Edit';
		editButton.addEventListener('click', function() {
			editTweet(tweet);
		});

		var deleteButton = document.createElement('button');
		deleteButton.type = 'button';
		deleteButton.className = 'cls-error-button cls-delete';
		deleteButton.id = 'id-delete-' + tweet.id;
		deleteButton.innerHTML = 'Delete';

		deleteButton.addEventListener('click', function() {
			deleteTweet(tweet.id);
		});

		parent.appendChild(userLine);
		parent.appendChild(userTimestamp);
		parent.appendChild(userTweet);
		parent.appendChild(editButton);
		parent.appendChild(deleteButton);
		return parent;
	}

	function showListOfTweets() {
		tweetContainer.innerHTML = '';
		if (isEmpty(model.listOfTweets)) {
			return;
		}
		model.listOfTweets.forEach(element => {
			const tweet = prepareTweet(element);
			tweetContainer.appendChild(tweet);
		});
	}

	inputElement.addEventListener('input', function(event) {
		model.inputVal = inputElement.value;
	});

	formElement.addEventListener('submit', function(event) {
		event.preventDefault();

		var errorElement = document.getElementById('id-error');
		var error = false;
		var msg = '';
		if (isEmpty(model.inputVal)) {
			error = true;
			msg = 'Please write something to tweet';
		} else if (model.inputVal.length > 160) {
			error = true;
			msg = 'Max characters allowed is 160';
		}
		if (error) {
			errorElement.innerHTML = msg;
			return;
		} else {
			errorElement.innerHTML = '';
		}

		if (isEmpty(model.currentIndex)) {
			model.listOfTweets.unshift({
				id: model.id++,
				user: model.userName,
				handle: model.userHandle,
				tweet: model.inputVal,
				time: getTimestamp(new Date())
			});
		} else {
			var index;
			if (model.listOfTweets.length === 1) {
				index = 0;
			} else {
				index = model.listOfTweets.length - 1 - model.currentIndex;
			}
			model.listOfTweets[index] = {
				id: model.currentIndex,
				user: model.userName,
				handle: model.userHandle,
				tweet: model.inputVal,
				time: model.listOfTweets[index].time
			};
			model.currentIndex = null;
		}
		changeModelInput('');
		showListOfTweets();
	});
});
