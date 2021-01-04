const cart = [];
let taxRate = 0;
const HEIGHT = 768;
const WIDTH = 1024;

const redrawCart = () => {
  let total = 0;

  const cartElement = document.getElementById('cart');
  while(cartElement.lastChild) {
    cartElement.removeChild(cartElement.lastChild);
  }

  cart.forEach((item) => {
    const newNode = document.createElement('div');

    const itemName = item.name;
    const itemPrice = item.price.toFixed(2);
    let dashLength = 25 - itemName.length - itemPrice.length;
    if(dashLength < 0) {
      dashLength = 0;
    }

    newNode.innerText = `${ itemName } ${ '-'.repeat(dashLength) } $${ itemPrice }`;
    total += item.price;

    cartElement.appendChild(newNode);
  });

  document.getElementById('subtotal').innerText = `Subtotal $${ total.toFixed(2) }`;
  document.getElementById('tax').innerText = `Tax $${ total.toFixed(2) } @ ${ (taxRate * 100) }% = $${ (total * taxRate).toFixed(2) }`;
  document.getElementById('total').innerText = `Total $${ (total * (1 + taxRate)).toFixed(2) }`;
};

const refreshTax = () => {
  window.ipcRenderer.invoke('tax').then((result) => {
    taxRate = result.rate;

    redrawCart();
  });
};

const refreshProducts = () => {
  window.ipcRenderer.invoke('products').then((result) => {
    // Get the product list
    const products = document.getElementById('products');

    // Remove all children
    while(products.lastChild) {
      products.removeChild(products.lastChild);
    }

    // Loop through the result and add them
    result.forEach((product) => {
      // Define this here so we can capture the product each time
      const addToCart = () => {
        // Push a copy of the product onto the cart
        cart.push({ ...product });
        redrawCart();
      };

      const newNode = document.createElement('button');
      newNode.addEventListener('click', addToCart);
      newNode.className = 'product green-button';

      const name = document.createElement('div');
      name.innerText = product.name;
      newNode.appendChild(name);

      const price = document.createElement('div');
      price.innerText = `$${ product.price }`;
      newNode.appendChild(price);

      products.appendChild(newNode);
    });

    redrawCart();
  });
};

const refresh = () => {
  refreshTax();
  refreshProducts();
};

setInterval(refresh, 10000);

const voidTransaction = () => {
  cart.length = 0;
  redrawCart();
};

const closeOverlay = () => {
  document.getElementById('overlay-content-inner').style.display = 'none';
  document.getElementById('overlay-content-outer').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
};

const showOverlay = ({ width, height, html, timeout = undefined, canDismiss = true }) => {
  const left = (WIDTH / 2) - (width / 2);
  const top = (HEIGHT / 2) - (height / 2);

  // Innermost box
  const inner = document.getElementById('overlay-content-inner');
  inner.innerHTML = html;
  inner.style.left = left + 'px';
  inner.style.top = top + 'px';
  inner.style.width = width + 'px';
  inner.style.height = height + 'px';

  const outer = document.getElementById('overlay-content-outer');
  outer.style.left = (left - 5) + 'px';
  outer.style.top = (top - 5) + 'px';
  // Add 20 because of the padding (10 on each side)
  outer.style.width = (width + 10 + 20) + 'px';
  outer.style.height = (height + 10 + 20) + 'px';

  const overlay = document.getElementById('overlay');

  if(canDismiss) {
    overlay.addEventListener('click', () => {
      closeOverlay();
    });
  }

  if(timeout) {
    setTimeout(() => {
      closeOverlay();
    }, timeout);
  }

  // Turn them all on
  inner.style.display = 'block';
  outer.style.display = 'block';
  overlay.style.display = 'block';
};

const checkPassword = (event) => {
  event.preventDefault();

  const theirPassword = document.getElementById('password').value;

  window.ipcRenderer.invoke('unlock', theirPassword).then((result) => {
    if(result) {
      closeOverlay();
    } else {
      document.getElementById('password-message').innerText = 'Invalid password!';
      setTimeout(() => {
        document.getElementById('password-message').innerText = '';
      }, 2000);
    }
  });
};

const checkout = () => {
  showOverlay({
    width: 300,
    height: 200,
    html: `
      <p>Amount: <span id="payment-total">${ document.getElementById('total').innerText }</span></p>
      <p>How are they paying?</p>
      <p>
        <button class="payment=button" id="cash">Cash</button>
        <button class="payment-button" id="credit" disabled>Credit</button>
        <button class="payment-button" id="debit" disabled>Debit</button>
      </p>
    `,
    canDismiss: true,
  });

  document.getElementById('cash').addEventListener('click', () => {
    closeOverlay();
    setTimeout(() => {
      showOverlay({
        width: 300,
        height: 200,
        html: `
          <p>Transaction complete!</p>
        `,
        canDismiss: true,
        timeout: 3000,
      });
      voidTransaction();
    }, 200);
  });
};

window.addEventListener('load', () => {
  refresh();

  document.getElementById('checkout').addEventListener('click', checkout);
  document.getElementById('voidTransaction').addEventListener('click', voidTransaction);

  showOverlay({
    width: 300,
    height: 200,
    html: `
      <p>This terminal is locked. Please enter the supervisor password to continue</p>
      <form id="password-form">
        <p><input type="password" id="password" /></p>
        <p><input type="submit" id="submit-password"></p>
        <p><span id="password-message"></span></p>
      </form>
    `,
    timeout: undefined,
    canDismiss: false,
  });

  document.getElementById('password-form').addEventListener('submit', checkPassword);
  document.getElementById('password').focus();

  setInterval(() => {
    window.ipcRenderer.invoke('checkNetwork').then((result) => {
      document.getElementById('network').src = `img/network${ result }.png`;
    });
  }, 1000);
});
