const pythag2d = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
const angleBetween = (x1, y1, x2, y2) =>  Math.atan2(y2 - y1, x2 - x1);
const rad2deg = rad => rad * 180 / Math.PI;
const deg2rad = deg => deg * (Math.PI / 180);
const clearCanvas = (ctx) => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
const vecInRect = (vec, x1, y1, x2, y2) => vec.x > x1 && vec.x < x2 && vec.y > y1 && vec.y < y2;

const boxParent = document.querySelector('.box-parent');
const lsErrorMsg = document.querySelector('.localstorage-error');

try {
  localStorage.getItem('test');
} catch (err) {
  lsErrorMsg.style.display = 'block';
}

const getLS = key => {
  try {
    return localStorage.getItem(key);
  } catch (err) {}
}

const setLS = (key, val) => {
  try {
    localStorage.setItem(key, val);
  } catch (err) {}
}

const clearLS = (key, val) => {
  try {
    localStorage.clear();
  } catch (err) {}
}

const POST_URL = '/';

const PARTICLE_COLORS = [
  'red',
  'yellow',
  'green',
  'white',
]

const PARTICLE_IMAGES = PARTICLE_COLORS.map(color => {
  let img = new Image();
  img.src = `images/particle_${color}.png`;
  return img;
});

const getParams = __PARSE_URL_VARS__();
let tokens = (getParams.tokens || '').split(',');
document.body.classList = tokens.join(' ');
// document.body.classList = [ ...tokens, 'open' ].join(' ');

const hasToken = name => tokens.indexOf(name) !== -1;

const btn15img = document.querySelector('img.f15btn');

if (hasToken('workshop-button')) {
  btn15img.classList.add('found');
}

const canvas = document.querySelector('canvas#stage');
const CANVAS_WIDTH = canvas.clientWidth;
const CANVAS_HEIGHT = canvas.clientHeight;

const parentElement = document.querySelector('.parent');
const ctx = canvas.getContext('2d');

const canvasOffset = [
  canvas.offsetLeft,
  canvas.offsetTop,
];

const particleCategory = 0x002;
const itemCategory = 0x004;

var pl = planck, Vec2 = pl.Vec2;
var world = new pl.World(Vec2(0, 0));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    const type = elmnt.getAttribute('data-type');
    const name = elmnt.getAttribute('data-name');

    if (type !== 'portal') {
      state[type][name].position = [
        elmnt.offsetLeft - pos1 - canvasOffset[0] + elmnt.clientWidth / 2 + 77, 
        elmnt.offsetTop - pos2 - canvasOffset[1] + elmnt.clientHeight / 2,
      ];
    } else {
      state[type][name].position = [
        elmnt.offsetLeft - pos1 - canvasOffset[0] + 77 + 38.5, 
        elmnt.offsetTop - pos2 - canvasOffset[1] + 42,
      ];
    }

    if (type === 'item' && typeof bodies[name] !== 'undefined') {
      bodies[name].setPosition(planck.Vec2(
        elmnt.offsetLeft - pos1 - canvasOffset[0] + elmnt.clientWidth / 2, 
        elmnt.offsetTop - pos2 - canvasOffset[1] + elmnt.clientHeight / 2,
      ));
    }

    setLS('elevatorData', JSON.stringify(state));
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

$('.key').click(() => {
  if (hasToken('elevator-key')) {
    document.body.classList.toggle('open');
  }
});

const octSize = 35;
const elbowPoints = [];
while(elbowPoints.length < 7) {
  let angle = deg2rad(elbowPoints.length * 60);
  elbowPoints.push(planck.Vec2(Math.cos(angle) * octSize, Math.sin(angle) * octSize));
};

var nut = world.createDynamicBody(Vec2(0.0, 800.0));
let elbowFixture = nut.createFixture(pl.Polygon(elbowPoints), 1.0);
nut.setStatic(true);
elbowFixture.setFilterData({
  groupIndex: 1,
  categoryBits: itemCategory,
  maskBits: 0xFFFF,
});
elbowFixture.setFriction(0);

var nut2 = world.createDynamicBody(Vec2(0.0, 800.0));
let elbowFixture2 = nut2.createFixture(pl.Polygon(elbowPoints), 1.0);
nut2.setStatic(true);
elbowFixture2.setFilterData({
  groupIndex: 1,
  categoryBits: itemCategory,
  maskBits: 0xFFFF,
});
elbowFixture2.setFriction(0);
nut2.setAngle(deg2rad(30));

var candycane = world.createDynamicBody(Vec2(0.0, 800.0));
let caneFixture = candycane.createFixture(pl.Box(50, 12), 1);
candycane.setStatic(true);
caneFixture.setFilterData({
  groupIndex: 1,
  categoryBits: itemCategory,
  maskBits: 0xFFFF,
});
caneFixture.setFriction(0);
candycane.setAngle(deg2rad(45));

bodies = {
  nut,
  nut2,
  candycane,
};

const defaultState = {
  planet: {
    marble: {
      gravity: 200,
      force: 20000,
      position: [ 572, 255 ],
      dimensions: [ 100, 100 ],
      get: false,
    },
    marble2: {
      gravity: 150,
      force: 20000,
      position: [ 143.5, 107.5 ],
      dimensions: [ 75, 75 ],
      get: false,
    },
  },
  light: {
    redlight: {
      position: [ 254.5, 309 ],
      dimensions: [ 75, 75 ],
      get: false,
    },
    yellowlight: {
      position: [ 290.5, 518 ],
      dimensions: [ 75, 75 ],
      get: false,
    },
    greenlight: {
      position: [ 464.5, 197 ],
      dimensions: [ 75, 75 ],
      get: false,
    },
  },
  item: {
    nut: {
      position: [ 502, 367 ],
      dimensions: [ 70, 70 ],
      get: false,
    },
    nut2: {
      position: [ 217, 181 ],
      dimensions: [ 70, 70 ],
      get: false,
    },
    ball: {
      position: [ 215.5, 468.5 ],
      dimensions: [ 70, 70 ],
      get: false,
    },
    candycane: {
      position: [ 536.5, 481 ],
      dimensions: [ 77, 82 ],
      get: false,
    },
  },
  portal: {
    red: {
      position: [ 504.5, 193 ],
      dimensions: [ 77, 82 ],
      get: false,
    },
    blue: {
      position: [ 491.5, 261 ],
      dimensions: [ 77, 82 ],
      get: false,
    },
  },
};

const availability = {
  planet: {
    marble: { get: hasToken('marble') },
    marble2: { get: hasToken('marble2') },
  },
  item: {
    nut: { get: hasToken('nut') },
    nut2: { get: hasToken('nut2') },
  },
  light: {
    redlight: { get: hasToken('redlight') },
    yellowlight: { get: hasToken('yellowlight') },
    greenlight: { get: hasToken('greenlight') },
  },
  portal: {
    red: { get: hasToken('portals') },
    blue: { get: hasToken('portals') },
  },
};

console.log('availability:', availability);

const elevatorLS = getLS('elevatorData') || {};
let elevatorConfig = {};

if (elevatorLS) {
  try {
    elevatorConfig = JSON.parse(elevatorLS);
  } catch(err) {
    clearLS();
  }
}

const state = _.defaultsDeep(availability, elevatorConfig, defaultState);

[ 
  'planet',
  'light',
  'item',
  'portal',
].forEach(category => {
  bodies[category] = {};
  Object.keys(state[category]).forEach(name => {
    const obj = state[category][name];
    const isPortal = category === 'portal' && (name === 'red' || name === 'blue');
    const renderObj = hasToken(name) || (isPortal && hasToken('portals'));
    if (renderObj) {
      const element = document.createElement('div');
      element.classList = `item ${category} ${name}`;
      element.setAttribute('data-type', category);
      element.setAttribute('data-name', name);
      element.style.left = `${ obj.position[0] - obj.dimensions[0] / 2 }px`;
      element.style.top = `${ obj.position[1] - obj.dimensions[1] / 2 }px`;
      boxParent.appendChild(element);
      dragElement(element);

      if (category === 'item' && typeof bodies[name] !== 'undefined') {
        bodies[name].setPosition(planck.Vec2(
          obj.position[0] - 77, 
          obj.position[1],
        ));
      }
    }
  });
});

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

const btn1 = document.querySelector('button[data-floor="1"]');
const btn2 = document.querySelector('button[data-floor="1.5"]');
const btn3 = document.querySelector('button[data-floor="2"]');
const btn4 = document.querySelector('button[data-floor="3"]');
const btnr = document.querySelector('button[data-floor="r"]');

btn1.addEventListener('click', handleBtn);
btn2.addEventListener('click', handleBtn);
btn3.addEventListener('click', handleBtn);
btn4.addEventListener('click', handleBtn4);
btnr.addEventListener('click', handleBtn);

const decoration = {
  'elevator': btn1,
  'elevator2': btn2,
  'elevator3': btn3,
  'elevator4': btn4,
  'elevatorr': btnr,
  'santamode-elevator': btn1,
  'santamode-elevator2': btn2,
  'santamode-elevator3': btn3,
  'santamode-elevator4': btn4,
  'santamode-elevatorr': btnr,  
};

decoration[(getParams.challenge || 'elevator')].classList.add('active');
let tick = 0;

var circle = pl.Circle(4);
var box = world.createBody({
  type : 'dynamic',
  position : Vec2(-40.0, 0.0),
  bullet : false
});

const TRAPS = [
  [
    planck.Vec2(80, 0),
    planck.Vec2(185, 0),
    planck.Vec2(185, 45),
    planck.Vec2(80, 45),
  ],
  [
    planck.Vec2(0, 290),
    planck.Vec2(35, 290),
    planck.Vec2(35, 395),
    planck.Vec2(0, 395),
  ],
  [
    planck.Vec2(315 + 80, 0),
    planck.Vec2(315 + 185, 0),
    planck.Vec2(315 + 185, 45),
    planck.Vec2(315 + 80, 45),
  ],
];

const PARTICLE_COUNTS = [
  [],
  [],
  [],
];

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

startSim(60);

function startSim(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    render();
}

const pruneCounts = () => {
  PARTICLE_COUNTS.forEach((count, countIndex) => {
    PARTICLE_COUNTS[countIndex] = count.filter(item => {
     return window.performance.now() - item < 3000
     });
  });
};

const wireSteps = [
  6,
  9,
  3,
];

const trapTargetCounts = [
  20,
  30,
  10,
];

const wireElements = [
  document.querySelector('.glow.red'),
  document.querySelector('.glow.yellow'),
  document.querySelector('.glow.green'),
];

const ledElements = [
  document.querySelector('.led.red'),
  document.querySelector('.led.yellow'),
  document.querySelector('.led.green'),
];

const powered = {};

const renderTraps = () => {
  TRAPS.forEach((points, index) => {
    const fillLevel = pl.Math.clamp(PARTICLE_COUNTS[index].length / trapTargetCounts[index], 0, 1);
    const steppa = Math.floor(fillLevel / (1 / wireSteps[index]));
    wireElements[index].style.backgroundPosition = `0 ${ -wireElements[index].clientHeight * steppa }px`;
    ledElements[index].classList[fillLevel === 1 ? 'add' : 'remove']('on');
    powered[index] = fillLevel === 1;
  });
  
  btn1.classList[powered[2] ? 'add' : 'remove']('powered');
  btn3.classList[powered[2] ? 'add' : 'remove']('powered');

  btn2.classList[powered[2] && powered[0] && hasToken('workshop-button') ? 'add' : 'remove']('powered');
  btnr.classList[powered[2] && powered[0] ? 'add' : 'remove']('powered');

  btn4.classList[powered[2] && powered[1] && powered[0] ? 'add' : 'remove']('powered');
  
};

function render(newtime) {
    if (stop) {
        return;
    }
    requestAnimationFrame(render);
    now = newtime;
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        
        world.step(1 / 60);
        world.step(1 / 60);
        world.step(1 / 60);

        pruneCounts();

        var pos = Vec2(pl.Math.random(302 - 15, 302 + 15), 556);
        let particle = world.createDynamicBody(pos);
        let pfixture = particle.createFixture(circle, 4);
        particle.setLinearVelocity(Vec2(0.0, pl.Math.random(-90, -150)));
        particle.lifespan = 6 * 60;
        particle.color = 3;
        pfixture.setFilterData({
          groupIndex: -2,
          categoryBits: particleCategory,
          maskBits: itemCategory,
        });
        pfixture.setFriction(0);
        pfixture.setRestitution(0.01);

        clearCanvas(ctx);
        tick++;
        for (var body = world.getBodyList(); body; body = body.getNext()) {
          if (body.lifespan) {
            body.lifespan -= 1;
            let { x, y } = body.getPosition();
            if (!body.lifespan || x < 0 || x > CANVAS_WIDTH || y < 0 || y > CANVAS_HEIGHT) {
              world.destroyBody(body);
            } else {
              let opacity = body.lifespan < 60 ? (Math.random() * (body.lifespan / 60)) : .1 + (Math.random() * .9);
              ctx.globalAlpha = opacity;
              const particleImg = PARTICLE_IMAGES[body.color];
              ctx.drawImage(particleImg, x - (particleImg.width / 2), y - (particleImg.height / 2));
              ctx.globalAlpha = 1;

              TRAPS.forEach((points, trapIndex) => {
                if (vecInRect(planck.Vec2(x, y), points[0].x, points[0].y, points[2].x, points[2].y)) {
                  if (body.color === trapIndex) PARTICLE_COUNTS[trapIndex].push(window.performance.now());
                  world.destroyBody(body);
                }
              });

              Object.keys(state.planet).forEach((planetName, planetIndex) => {
                const planet = state.planet[planetName];
                if (hasToken(planetName) && vecInRect(planck.Vec2(...planet.position), 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)) {
                  const dist = pythag2d(x, y, planet.position[0], planet.position[1]);
                  if (dist < planet.gravity) {
                    const angle = angleBetween(x, y, planet.position[0], planet.position[1]);
                    body.applyForce(planck.Vec2(Math.cos(angle) * (planet.force * (dist / planet.gravity)), Math.sin(angle) * (planet.force * (dist / planet.gravity))), planck.Vec2(x, y));
                  }
                }
              });

              Object.keys(state.portal).forEach((portalName, portalIndex) => {
                const portal = state.portal[portalName];
                if (hasToken('portals') && vecInRect(planck.Vec2(...portal.position), 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)) {
                  if (portalName !== body.__ignore) {
                    const dist = pythag2d(x, y, portal.position[0], portal.position[1]);
                    if (dist < 50) {
                      if (body.__ignore) console.log(body.__ignore);
                      const matchingPortal = state.portal[portalName === 'red' ? 'blue' : 'red' ];
                      body.__ignore = portalName === 'red' ? 'blue' : 'red';
                      const offsetX = portal.position[0] - x;
                      const offsetY = portal.position[1] - y;
                      const destX = matchingPortal.position[0] - offsetX;
                      const destY = matchingPortal.position[1] - offsetY - 20;
                      body.setPosition(planck.Vec2(destX, destY));
                    }
                  }
                }
              }); 

              Object.keys(state.light).forEach((lightName, lightIndex) => {
                const light = state.light[lightName];
                if (light.get) {
                  const lightDist = pythag2d(x, y, light.position[0] - 77, light.position[1]);
                  if (lightDist < 75 / 2 - 3) {
                    body.color = lightIndex;
                  }
                }
              });

              if (hasToken('ball')) {
                const ball = state.item.ball;
                const ballDist = pythag2d(ball.position[0] - 77, ball.position[1], x, y);
                if (ballDist < 75 / 2 + 1) {
                  const angle = angleBetween(x, y, ball.position[0] - 77, ball.position[1]);
                  body.setLinearVelocity(planck.Vec2(Math.cos(angle) * 80, Math.sin(angle) * 80).neg()); 
                }
              }
            }
          }
        }
        renderTraps();
    }
}

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
  if (window.confirm('Are you sure you want to reset your configuration?')) { 
    clearLS();
    location.reload();
  }
});

let helpVisible = false;
const helpOverlay = document.querySelector('.help-overlay');
const helpBtn = document.querySelector('.help-btn');
helpBtn.addEventListener('click', () => {
  helpOverlay.classList.toggle('open');
  helpVisible = !helpVisible;
  helpBtn.innerText = helpVisible ? 'Close Help' : 'Help';
});
