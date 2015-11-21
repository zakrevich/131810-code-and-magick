'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formControls = document.querySelectorAll('.review-fields');
  var fieldsName = document.querySelector('.review-fields-name');
  var fieldText = document.querySelector('.review-fields-text');

  // форма и поля ввода
  var formElement = document.querySelector('.review-form');
  var stars = formElement['review-mark'];
  var name = formElement['review-name'];
  var reviewText = formElement['review-text'];

  name.required = true;
  name.value = docCookies.getItem('name');

  function getRadioValue() {
    for (var i = 0; i < stars.length; i++) {
      if (stars[i].checked === true) {
        return stars[i].value;
      }
    }

    return null;
  }

  function checkName() {
    var nameIsNotEmpty = (name.value !== '');
    fieldsName.classList.toggle('invisible', nameIsNotEmpty);
    return nameIsNotEmpty;
  }

  function checkStarsText() {
    if (getRadioValue() < 3) {
      if (reviewText.value === '') {
        reviewText.required = true;
        fieldText.classList.remove('invisible');
        return false;
      } else {
        fieldText.classList.add('invisible');
        return true;
      }
    } else {
      fieldText.classList.add('invisible');
      reviewText.required = false;
      return true;
    }
  }

  function removeAll() {
    var starsAndText = checkStarsText();
    var checkNameFunction = checkName();

    for (var i = 0; i < formControls.length; i++) {
      if (starsAndText && checkNameFunction) {
        formControls[i].classList.add('invisible');
      } else if (starsAndText !== true || checkNameFunction !== true) {
        formControls[i].classList.remove('invisible');
      }
    }
  }

  name.onchange = function() {
    removeAll();
  };

  reviewText.onchange = function() {
    removeAll();
  };

  for (var i = 0; i < stars.length; i++) {
    if (stars[i].value === docCookies.getItem('stars')) {
      stars[i].checked = true;
    }
    stars[i].onchange = function() {
      removeAll();
    };
  }

  formElement.onsubmit = function(evt) {
    evt.preventDefault();
    var now = new Date();
    var lastBirth = new Date(now.getFullYear() - 1 + '-12-09');
    var dateExpired = new Date(+now + +now - lastBirth);

    document.cookie = 'name=' + name.value + ';expires=' + dateExpired;

    var starsValue = getRadioValue();
    if (starsValue === true) {
      document.cookie = 'stars=' + starsValue + ';expires=' + dateExpired.toUTCString();
    }

    formElement.submit();
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    removeAll();
    formContainer.classList.remove('invisible');
    fieldText.classList.add('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
