/* global reviews: true */

'use strict';
(function() {
  document.querySelector('.reviews-filter').classList.add('invisible');
  var container = document.querySelector('.reviews-list');
  var reviewsNumber = [
    'review-rating',
    'review-rating-one',
    'review-rating-two',
    'review-rating-three',
    'review-rating-four',
    'review-rating-five'
  ];

  reviews.forEach(function(review) {
    var element = getElementFromTemplate(review);
    container.appendChild(element);
  });

  function getElementFromTemplate(data) {
    var template = document.querySelector('#review-template');
    var element;

    if ('content' in template) {
      element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }

    element.querySelector('.review-author').alt = data.author.name;
    element.querySelector('.review-author').title = data.author.name;
    element.querySelector('.review-rating').classList.add(reviewsNumber[data.rating]);
    element.querySelector('.review-text').textContent = data.description;

    var imageElement = element.querySelector('.review-author');
    var authorPicture = new Image();

    authorPicture.onerror = function() {
      element.classList.add('review-load-failure');
    };

    var timeout = setTimeout(function() {
      element.classList.add('review-load-failure');
    }, 10000);

    authorPicture.onload = function() {
      clearTimeout(timeout);
      element.replaceChild(authorPicture, imageElement);
      authorPicture.classList.add('review-author');
      authorPicture.alt = data.author.name;
      authorPicture.title = data.author.name;
      authorPicture.width = '124';
      authorPicture.height = '124';
    };
    authorPicture.src = data.author.picture;

    return element;
  }
})();
