$(document).ready(function () {

  $('.ui.radio.checkbox')
    .checkbox();

  $('select.dropdown')
    .dropdown();
    
  $('.ui.form')
    .form({
      fields: {
        name: ['empty'],
        email: ['email', 'empty'],
        street_address: ['empty'],
        city: ['empty'],
        postcode: ['number', 'exactLength[4]', 'empty'],
        quantity: ['integer', 'empty'],
        'card-number-element': ['creditCard', 'empty'],
        'card-expiry-element': ['regExp[/(0[1-9]|10|11|12)\/[1-9]{2}$/gm]', 'empty'],
        'card-cvc-element': ['maxLength[3]', 'empty'],
      }
    });

    $(function(){
      $("#size-link").click(function(){
        $("#size-modal").modal('show');
      });
      $("#size-modal").modal({
        closable: true
      });
    });

    $(function(){
      $("#shirt").click(function(){
        $("#shirt-modal").modal('show');
      });
      $("#shirt-modal").modal({
        closable: true
      });
    });

});