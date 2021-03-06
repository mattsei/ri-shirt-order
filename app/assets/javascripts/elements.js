
var public_key = document.querySelector("meta[name='stripe-public-key']").content;
var stripe = Stripe(public_key);
var elements = stripe.elements();

var style = {
  base: {
    color: '#31325F',

    '::placeholder': {
      color: '#CFD7E0',
    },
  },
};

var cardNumberElement = elements.create('cardNumber', {
  style: style
});
cardNumberElement.mount('#card-number-element');

var cardExpiryElement = elements.create('cardExpiry', {
  style: style
});
cardExpiryElement.mount('#card-expiry-element');

var cardCvcElement = elements.create('cardCvc', {
  style: style
});
cardCvcElement.mount('#card-cvc-element');

function setOutcome(result) {
  var successElement = document.querySelector('.stripe-success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.token) {
    var form = document.querySelector('form');
    form.querySelector('input[name="token"]').setAttribute('value', result.token.id);
    form.submit();
  } else if (result.error) {
    errorElement.textContent = result.error.message;
    errorElement.classList.add('visible');
  }
}

cardNumberElement.on('change', function (event) {
  setOutcome(event);
});

cardExpiryElement.on('change', function (event) {
  setOutcome(event);
});

cardCvcElement.on('change', function (event) {
  setOutcome(event);
});

var form = document.getElementById('payment-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  stripe.createToken(cardNumberElement).then(function (result) {
    if (result.error) {
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);
  form.submit();
}