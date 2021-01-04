// It was not really possible to collect all objects needed to fix the santavator before being able to operate it as they were distributed also on other floors.
// The santavator is basically a javascript application, so by analyzing the source code it was possible to identify two functions that were sending out posts moving the santavator to other floors.
const handleBtn = event => {
  const targetFloor = event.currentTarget.attributes['data-floor'].value;
  $.ajax({
    type: 'POST',
    url: POST_URL,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({ 
      targetFloor,
      id: getParams.id,
    }),
    success: (res, status) => {
      if (res.hash) {
        __POST_RESULTS__({
          resourceId: getParams.id || '1111',
          hash: res.hash,
          action: `goToFloor-${targetFloor}`,
        });
      }
    }
  });
}

const handleBtn4 = () => {
  const cover = document.querySelector('.print-cover');
  cover.classList.add('open');

  cover.addEventListener('click', () => {
    if (btn4.classList.contains('powered') && hasToken('besanta')) {
      $.ajax({
        type: 'POST',
        url: POST_URL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ 
          targetFloor: '3',
          id: getParams.id,
        }),
        success: (res, status) => {
          if (res.hash) {
            __POST_RESULTS__({
              resourceId: getParams.id || '1111',
              hash: res.hash,
              action: 'goToFloor-3',
            });
          }
        }
      });
    } else {
      __SEND_MSG__({
        type: 'sfx',
        filename: 'error.mp3',
      });
    }
  });
};

