var meInput = document.getElementById('me_entry');
var innerMeInput = document.getElementById('inner_me_entry');

var submitBtn = document.getElementById('submitBtn');
var printBtn = document.getElementById('printBtn');

var meDiv = document.getElementById('meDiv');
var innerMeDiv = document.getElementById('innerMeDiv');

var errorMsg = document.getElementById('error_message');
var thanks = document.getElementById('thanks');

meInput.addEventListener('keypress', function (e) {
  if (e.which === 13) {
    submitHandler();
  }
});

innerMeInput.addEventListener('keypress', function (e) {
  if (e.which === 13) {
    submitHandler();
  }
})

submitBtn.addEventListener('click', submitHandler);

printBtn.addEventListener('click', function () {
  var classes = printBtn.getAttribute('class');

  if (classes.indexOf('warning') > -1) {
    alert('Meme not ready yet. Wait!');
  } else {
    var me = meInput.value;
    var innerMe = innerMeInput.value;
    meDiv.removeChild(meInput);
    innerMeDiv.removeChild(innerMeInput);

    var meText = document.createElement('span');
    meText.setAttribute('id', 'me_text');
    meText.innerText = me;

    var innerMeText = document.createElement('span');
    innerMeText.setAttribute('id', 'inner_me_text');
    innerMeText.innerText = innerMe;

    meDiv.appendChild(meText);
    innerMeDiv.appendChild(innerMeText);

    resetValue(meInput);
    resetValue(innerMeInput);

    submitBtn.removeEventListener('click', submitHandler);
    submitBtn.setAttribute('class', 'btn-lg btn-default');
    submitBtn.addEventListener('click', function () {
      alert('Dude just refresh to page to submit more');
    });
  }
});

function submitHandler() {
  var me = meInput.value;
  var innerMe = innerMeInput.value;

  if (me === '') {
    errorMessage.setAttribute('style', 'display: block');

    setTimeout(function () {
      errorMessage.setAttribute('style', 'display: none');
    }, 3000);

    return;
  }

  if (innerMe === '') {
    fetch('/api/memes?me=' + me)
    .then(function(res) {
      return res.json();
    })
    .then(function (meme) {
      innerMeInput.value = meme.innerMe;
      printBtn.setAttribute('class', 'btn-lg btn-success');
    })
    .catch(console.error);

  } else {

    fetch('/api/memes', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        me: me,
        innerMe: innerMe
      })
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (meme) {
      thanks.setAttribute('style', 'display: block');

      setTimeout(function () {
        thanks.setAttribute('style', 'display: none');
      }, 3000);

      printBtn.setAttribute('class', 'btn-lg btn-success');
    })
    .catch(console.error);
  }
}

function resetValue(input) {
  input.value = '';
}