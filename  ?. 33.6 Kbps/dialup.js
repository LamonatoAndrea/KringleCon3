const urlVars = __PARSE_URL_VARS__();
const resourceId = urlVars.id;  
if (!resourceId) {
  console.error('No resource ID provided!');
}


const sfx = {
  dialtone: new Howl({
    src: ['./audio/dialtone.mp3', './audio/dialtone.wav'],
    loop: true,
    html: true,
  }),
  dtmf: new Howl({
    src: ['./audio/dtmf.mp3', './audio/dtmf.wav'],
    sprite: {
      1: [0, 190],
      2: [1 * 190, 190],
      3: [2 * 190, 190],
      4: [3 * 190, 190],
      5: [4 * 190, 190],
      6: [5 * 190, 190],
      7: [6 * 190, 190],
      8: [7 * 190, 190],
      9: [8 * 190, 190],
      0: [9 * 190, 190],
    },
  }),
  init_cr: new Howl({
    src: ['./audio/init_cr.mp3', './audio/init_cr.wav'],
    volume: 1.5,
  }),
  ms: new Howl({
    src: ['./audio/ms.mp3', './audio/ms.wav'],
  }),
  ansam: new Howl({
    src: ['./audio/ansam.mp3', './audio/ansam.wav'],
    loop: true,
  }),
  jm_l1: new Howl({
    src: ['./audio/jm_l1.mp3', './audio/jm_l1.wav'],
  }),
  info_trn: new Howl({
    src: ['./audio/info_trn.mp3', './audio/info_trn.wav'],
  }),
  resp_cr_es_cl: new Howl({
    src: ['./audio/resp_cr_es_cl.mp3', './audio/resp_cr_es_cl.wav'],
  }),
  ack: new Howl({
    src: ['./audio/ack.mp3','./audio/ack.wav'],
  }),
  cm_cj: new Howl({
    src: ['./audio/cm_cj.mp3', './audio/cm_cj.wav'],
  }),
  l1_l2_info: new Howl({
    src: ['./audio/l1_l2_info.mp3', './audio/l1_l2_info.wav'],
  }),
  trn: new Howl({
    src: ['./audio/trn.mp3', './audio/trn.wav'],
  }),
  updated: new Howl({
    src: ['./audio/updated.mp3'],
  }),
};

const dtmfHandler = function(evt) {
  const digit = evt.currentTarget.classList.value.substr(-1);
  if (phase === 1) {
    phase = 2;
    playPhase();
    toDial.push(digit);
    sfx.dtmf.play(digit);
  } else if (phase === 2) {
    toDial.push(digit);
    sfx.dtmf.play(digit);
    if (toDial.length === 7) {
      if (toDial.join('') === '7568347') {
        phase = 3;
        playPhase();
      } else {
        phase = 0;
        playPhase();
      }
    } 
  } else {
    phase = 0;
    playPhase();
  }

}
const led = document.querySelector('.led-indicator');
const handset = document.querySelector('.handset');
const pickup = document.querySelector('.pickup');
const btn1 = document.querySelector('.dtmf1');
const btn2 = document.querySelector('.dtmf2');
const btn3 = document.querySelector('.dtmf3');
const btn4 = document.querySelector('.dtmf4');
const btn5 = document.querySelector('.dtmf5');
const btn6 = document.querySelector('.dtmf6');
const btn7 = document.querySelector('.dtmf7');
const btn8 = document.querySelector('.dtmf8');
const btn9 = document.querySelector('.dtmf9');
const btn0 = document.querySelector('.dtmf0');
const btnrespCrEsCl = document.querySelector('.respCrEsCl');
const ack = document.querySelector('.ack');
const cm_cj = document.querySelector('.cm_cj');
const l1_l2_info = document.querySelector('.l1_l2_info');
const trn = document.querySelector('.trn');

pickup.addEventListener('click', () => {
  if (phase === 0) {
    phase = 1;
    playPhase();
    secret += '39cajd'
  } else {
    phase = 0;
    playPhase();
  }
});
btn1.addEventListener('click', dtmfHandler);
btn2.addEventListener('click', dtmfHandler);
btn3.addEventListener('click', dtmfHandler);
btn4.addEventListener('click', dtmfHandler);
btn5.addEventListener('click', dtmfHandler);
btn6.addEventListener('click', dtmfHandler);
btn7.addEventListener('click', dtmfHandler);
btn8.addEventListener('click', dtmfHandler);
btn9.addEventListener('click', dtmfHandler);
btn0.addEventListener('click', dtmfHandler);
btnrespCrEsCl.addEventListener('click', () => {
  if (phase === 3) {
    phase = 4;
    playPhase();
    secret += '3j2jc'
  } else {
    phase = 0;
    playPhase();
  }
  sfx.resp_cr_es_cl.play();
});
ack.addEventListener('click', () => {
  if (phase === 4) {
    phase = 5;
    playPhase();
    secret += '329dz'
  } else {
    phase = 0;
    playPhase();
  }
  sfx.ack.play();
});
cm_cj.addEventListener('click', () => {
  if (phase === 5) {
    phase = 6;
    playPhase();
    secret += '4hhdd'
  } else {
    phase = 0;
    playPhase();
  }
  sfx.cm_cj.play();
});
l1_l2_info.addEventListener('click', () => {
  if (phase === 6) {
    phase = 7;
    playPhase();
    secret += 'hbvan3'
  } else {
    phase = 0;
    playPhase();
  }
  sfx.l1_l2_info.play();
});
trn.addEventListener('click', () => {
  if (phase === 7) {
    phase = 8;
    secret += 'djjzz'
    playPhase();
  } else {
    phase = 0;
    playPhase();
  }
  sfx.trn.play();
});

let phase = 0;
let toDial = [];
let timeouts = [];
let secret = '';

const clearTimeouts = () => timeouts.forEach(timeout => clearTimeout(timeout));
const playPhase = () => {
  clearTimeouts();
  switch (phase) {
    case 0:
      handset.style.display = 'block';
      led.classList = 'led-indicator off';
      pickup.innerText = 'Pick up';
      Object.keys(sfx).forEach(snd => sfx[snd].stop()); 
      toDial = [];
      secret = '';
      break;
    case 1:
      led.classList = 'led-indicator on';
      handset.style.display = 'none';
      pickup.innerText = 'Hang up';
      sfx.dialtone.play();
      break;
    case 2:
      sfx.dialtone.stop();
      break;
    case 3:
      timeouts.push(setTimeout(() => sfx.init_cr.play(), 1000));
      timeouts.push(setTimeout(() => {
        if (phase !== 4) {
          phase = 0;
          playPhase();
        }
      }, 4000));
      break;
    case 4:
      timeouts.push(setTimeout(() => sfx.ms.play(), 1600));
      timeouts.push(setTimeout(() => {
        if (phase !== 5) {
          phase = 0;
          playPhase();
        }
      }, 4000));
      break;
    case 5:
      timeouts.push(setTimeout(() => sfx.ansam.play(), 2000));
      timeouts.push(setTimeout(() => {
        if (phase !== 6) {
          phase = 0;
          playPhase();
        }
      }, 6000));
      break;
    case 6:
      sfx.ansam.stop();
      timeouts.push(setTimeout(() => sfx.jm_l1.play(), 2100));
      timeouts.push(setTimeout(() => {
        if (phase !== 7) {
          phase = 0;
          playPhase();
        }
      }, 5000));
      break;
    case 7:
      timeouts.push(setTimeout(() => sfx.info_trn.play(), 900));
      timeouts.push(setTimeout(() => {
        if (phase !== 8) {
          phase = 0;
          playPhase();
        }
      }, 4000));
      break;
    case 8:
      timeouts.push(setTimeout(() => {
        sfx.updated.play();
        timeouts.push(setTimeout(() => {
          phase = 0;
          playPhase();
        }, 3500));
        $.get("checkpass.php?i=" + secret + "&resourceId=" + resourceId, function( data ) {
          try {
            var result = JSON.parse(data);
            if (result.success) {
              __POST_RESULTS__({
                hash: result.hash,
                resourceId: result.resourceId,
              });
            }
          } catch (err) {
            console.log('error:', err);
          }
        });
      }, 5000));
      break;
  }
};

playPhase();