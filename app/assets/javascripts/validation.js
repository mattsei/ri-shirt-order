$(document).ready(function () {
  resetForms();

  var quantity = document.getElementById('quantity');
  var postcode = document.getElementById('postcode');

  quantity.onkeydown = function (e) {
    if (!((e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 48 && e.keyCode < 58) ||
        e.keyCode == 8)) {
      return false;
    }
  }
  postcode.onkeydown = function (e) {
    if (!((e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8)) {
      return false;
    }
  }

  delType = '';

  $('input[type=radio][name=delivery]').change(function () {
    delType = $(this).val();
  });

  $('#quantity').on('input', function () {
    if (delType === 'Post') {
      $('#result').text($('#quantity').val() * 55);
    } else {
      $('#result').text($('#quantity').val() * 45);
    }
  });
  $('input[type=radio][name=delivery]').change(function () {
    if (this.value === 'Post') {
      $('#result').text($('#quantity').val() * 55);
    } else {
      $('#result').text($('#quantity').val() * 45);
    }
  });

});

function resetForms() {
  document.forms['payment-form'].reset();
}