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