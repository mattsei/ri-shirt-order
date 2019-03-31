var stripe = Stripe('pk_test_Av4EGz2o1zlJ5bgifGjh0cVp');

// Custom Element Styling -------------------------------------------------------

  var elements = stripe.elements();

  var style = {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 300,
      fontFamily: 'Helvetica Neue',
      fontSize: '15px',

      // margin: 0em;
      // max-width: 100%;
      // -webkit-box-flex: 1;
      // -ms-flex: 1 0 auto;
      // flex: 1 0 auto;
      // outline: none;
      // -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      // text-align: left;
      // line-height: 1.21428571em;
      // font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
      // padding: 0.67857143em 1em;
      // background: #FFFFFF;
      // border: 1px solid rgba(34, 36, 38, 0.15);
      // color: rgba(0, 0, 0, 0.87);
      // border-radius: 0.28571429rem;
      // -webkit-transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
      // transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
      // transition: box-shadow 0.1s ease, border-color 0.1s ease;
      // transition: box-shadow 0.1s ease, border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
      // -webkit-box-shadow: none;
      // box-shadow: none;

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

// -------------------------------------------------------------------------------------------------

  function setOutcome(result) {
  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.token) {
    // In this example, we're simply displaying the token
    // successElement.querySelector('.token').textContent = result.token.id;
    // successElement.classList.add('visible');

    // In a real integration, you'd submit the form with the token to your backend server
    var form = document.querySelector('form');
    form.querySelector('input[name="token"]').setAttribute('value', result.token.id);
    form.submit();
  } else if (result.error) {
    errorElement.textContent = result.error.message;
    errorElement.classList.add('visible');
  }
}

cardNumberElement.on('change', function(event) {
  setOutcome(event);
});

cardExpiryElement.on('change', function(event) {
  setOutcome(event);
});

cardCvcElement.on('change', function(event) {
  setOutcome(event);
});

/*document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  var options = {
    address_zip: document.getElementById('postal-code').value,
  };
  stripe.createToken(cardNumberElement, options).then(setOutcome);
});*/

//  DO NOT EDIT BELOW -----------------------------------------------------------

// card.addEventListener('change', function(event) {
//   var displayError = document.getElementById('card-errors');
//   if (event.error) {
//     displayError.textContent = event.error.message;
//   } else {
//     displayError.textContent = '';
//   }
// });

var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(cardNumberElement).then(function(result) {
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
