window.onload = function () {
  const lengthUnits = [
    { name: "Planck Length", abbreviation: "ℓₚ", valueInMeters: 1.616255e-35, valueInMillimeters: 1.616255e-32 },
    { name: "Yoctometer", abbreviation: "ym", valueInMeters: 1e-24, valueInMillimeters: 1e-21 },
    { name: "Zeptometer", abbreviation: "zm", valueInMeters: 1e-21, valueInMillimeters: 1e-18 },
    { name: "Attometer", abbreviation: "am", valueInMeters: 1e-18, valueInMillimeters: 1e-15 },
    { name: "Femtometer (Fermi)", abbreviation: "fm", valueInMeters: 1e-15, valueInMillimeters: 1e-12 },
    { name: "Picometer", abbreviation: "pm", valueInMeters: 1e-12, valueInMillimeters: 1e-9 },
    { name: "Angstrom", abbreviation: "Å", valueInMeters: 1e-10, valueInMillimeters: 1e-7 }, // 0.1 nanometer
    { name: "Nanometer", abbreviation: "nm", valueInMeters: 1e-9, valueInMillimeters: 1e-6 },
    { name: "Micrometer (Micron)", abbreviation: "µm", valueInMeters: 1e-6, valueInMillimeters: 0.001 },
    { name: "Millimeter", abbreviation: "mm", valueInMeters: 0.001, valueInMillimeters: 1 },
    { name: "Centimeter", abbreviation: "cm", valueInMeters: 0.01, valueInMillimeters: 10 },
    { name: "Decimeter", abbreviation: "dm", valueInMeters: 0.1, valueInMillimeters: 100 },
    { name: "Meter", abbreviation: "m", valueInMeters: 1, valueInMillimeters: 1000 },
    { name: "Dekameter", abbreviation: "dam", valueInMeters: 10, valueInMillimeters: 10000 },
    { name: "Hectometer", abbreviation: "hm", valueInMeters: 100, valueInMillimeters: 100000 },
    { name: "Kilometer", abbreviation: "km", valueInMeters: 1000, valueInMillimeters: 1000000 },
    { name: "Megameter", abbreviation: "Mm", valueInMeters: 1e6, valueInMillimeters: 1e9 },
    { name: "Gigameter", abbreviation: "Gm", valueInMeters: 1e9, valueInMillimeters: 1e12 },
    { name: "Terameter", abbreviation: "Tm", valueInMeters: 1e12, valueInMillimeters: 1e15 },
    { name: "Petameter", abbreviation: "Pm", valueInMeters: 1e15, valueInMillimeters: 1e18 },
    { name: "Exameter", abbreviation: "Em", valueInMeters: 1e18, valueInMillimeters: 1e21 },
    { name: "Zettameter", abbreviation: "Zm", valueInMeters: 1e21, valueInMillimeters: 1e24 },
    { name: "Yottameter", abbreviation: "Ym", valueInMeters: 1e24, valueInMillimeters: 1e27 },
    { name: "Thou", abbreviation: "thou", valueInMeters: 2.54e-5, valueInMillimeters: 0.0254 },
    { name: "Line", abbreviation: "line", alueInMeters: 2.116666e-3, valueInMillimeters: 2.116666 },
    { name: "Inch", abbreviation: "inch", valueInMeters: 0.0254, valueInMillimeters: 25.4 },
    { name: "Foot", abbreviation: "foot", valueInMeters: 0.3048, valueInMillimeters: 304.8 },
    { name: "Yard", abbreviation: "yard", valueInMeters: 0.9144, valueInMillimeters: 914.4 },
    { name: "Fathom", abbreviation: "fathom", valueInMeters: 1.8288, valueInMillimeters: 1828.8 },
    { name: "Rod (Pole, Perch)", abbreviation: "rod", valueInMeters: 5.0292, valueInMillimeters: 5029.2 },
    { name: "Chain", abbreviation: "chain", valueInMeters: 20.1168, valueInMillimeters: 20116.8 },
    { name: "Furlong", abbreviation: "fur", valueInMeters: 201.168, valueInMillimeters: 201168 },
    { name: "Mile", abbreviation: "mile", valueInMeters: 1609.344, valueInMillimeters: 1609344 },
    { name: "Nautical Mile", abbreviation: "nmi", valueInMeters: 1852, valueInMillimeters: 1852000 },
    { name: "Astronomical Unit", abbreviation: "AU", valueInMeters: 1.495978707e11, valueInMillimeters: 1.495978707e14 },
    { name: "Light-year", abbreviation: "ly", valueInMeters: 9.4607e15, valueInMillimeters: 9.4607e18 },
    { name: "Parsec", abbreviation: "parsec", valueInMeters: 3.0857e16, valueInMillimeters: 3.0857e19 },
    { name: "Fingerbreadth", abbreviation: "fb", valueInMeters: 0.019, valueInMillimeters: 19 },
    { name: "Palm", abbreviation: "palm", valueInMeters: 0.076, valueInMillimeters: 76 },
    { name: "Hand", abbreviation: "hand", valueInMeters: 0.1016, valueInMillimeters: 101.6 },
    { name: "Span", abbreviation: "span", valueInMeters: 0.2286, valueInMillimeters: 228.6 },
    { name: "Cubit", abbreviation: "cubit", valueInMeters: 0.4572, valueInMillimeters: 457.2 },
    { name: "Royal Egyptian Cubit", abbreviation: "rcubit", valueInMeters: 0.523, valueInMillimeters: 523 },
    { name: "Pace (Roman)", abbreviation: "pace", valueInMeters: 1.48, valueInMillimeters: 1480 },
    { name: "League (Land)", abbreviation: "lea", valueInMeters: 4828.03, valueInMillimeters: 4828030 },
    { name: "League (Nautical)", abbreviation: "nlea", valueInMeters: 5556, valueInMillimeters: 5556000 },
  ];
  var canvas = document.getElementById('three-canvas'), scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000), renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  var ambientLight = new THREE.AmbientLight(0x404040, 5);
  scene.add(ambientLight);
  var pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);
  var spheres = [], sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  for (let i = 0; i < 20; i++) {
    var color = new THREE.Color().setHSL(Math.random(), 1, 0.5), material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.5,
      roughness: 0.5
    });
    var sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.x = (Math.random() - 0.5) * 50;
    sphere.position.y = (Math.random() - 0.5) * 50;
    sphere.position.z = (Math.random() - 0.5) * 50;
    scene.add(sphere);
    spheres.push(sphere);
  }
  camera.position.z = 20;
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });
  function animate() {
    requestAnimationFrame(animate);
    spheres.forEach(sphere => {
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
    });
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  animate();
  let currentMode = 'basic', expression = '0', result = '', history = {
    basic: [], scientific: [], sip: [], currency: [], length: [], calculus: [], matrix: [], financial: []
  }, selectedHistory = [], historyMode = 'basic', currencyData = null;
  var displayElement = document.getElementById('result-text'), historyTextElement = document.getElementById('history-text'), keypadContainer = document.getElementById('keypad-container'), topBar = document.getElementById('top-bar'), historyModal = document.getElementById('history-modal'), modalCloseBtn = document.getElementById('modal-close'), historyList = document.getElementById('history-list'), historyModeSelect = document.getElementById('history-mode-select'), deleteAllBtn = document.getElementById('delete-all-btn'), deleteSelectedBtn = document.getElementById('delete-selected-btn');
  function safeEval(expr) {
    let sanitizedExpr = expr.replace(/ /g, '');
    sanitizedExpr = sanitizedExpr.replace(/X/g, '*');
    sanitizedExpr = sanitizedExpr.replace(/\%/g, '/100*');
    sanitizedExpr = sanitizedExpr.replace(/π/g, 'Math.PI');
    sanitizedExpr = sanitizedExpr.replace(/e/g, 'Math.E');
    sanitizedExpr = sanitizedExpr.replace(/sin/g, 'Math.sin(');
    sanitizedExpr = sanitizedExpr.replace(/cos/g, 'Math.cos(');
    sanitizedExpr = sanitizedExpr.replace(/tan/g, 'Math.tan(');
    sanitizedExpr = sanitizedExpr.replace(/log/g, 'Math.log10(');
    sanitizedExpr = sanitizedExpr.replace(/ln/g, 'Math.log(');
    sanitizedExpr = sanitizedExpr.replace(/√/g, 'Math.sqrt(');
    sanitizedExpr = sanitizedExpr.replace(/\^/g, '**');
    sanitizedExpr = sanitizedExpr.replace(/\÷/g, '/');
    sanitizedExpr = sanitizedExpr.replace(/\)(?=[^xX+\-*/%)(])/, ')*');
    sanitizedExpr = sanitizedExpr.replace(/([^xXsincostanlogln√e+\-*/%)(])(?=\()/, '$1*');
    var openParentheses = (sanitizedExpr.match(/\(/g) || []).length, closeParentheses = (sanitizedExpr.match(/\)/g) || []).length;
    if (openParentheses > closeParentheses) {
      for (let i = 0; i < openParentheses - closeParentheses; i++) {
        sanitizedExpr += ')';
      }
    }
    sanitizedExpr = sanitizedExpr.replace(/(\d+)!/g, (match, p1) => {
      var num = parseInt(p1);
      if (num < 0) return 'NaN';
      if (num === 0) return '1';
      let res = 1;
      for (let i = 2; i <= num; i++) {
        res *= i;
      }
      return res.toString();
    });
    try {
      return Function(`"use strict"; return (${sanitizedExpr})`)();
    } catch (e) {
      console.error("Calculation Error:", e);
      return "Error";
    }
  }
  function loadHistory() {
    try {
      var storedHistory = localStorage.getItem('calcHistory');
      if (storedHistory) {
        history = JSON.parse(storedHistory);
      }
    } catch (e) {
      console.error("Error loading history:", e);
    }
  }
  function saveHistory() {
    try {
      localStorage.setItem('calcHistory', JSON.stringify(history));
    } catch (e) {
      console.error("Error saving history:", e);
    }
  }
  function handleButtonClick(value) {
    if (value === '(') {
      document.querySelector('.btn.brak[data-value="("]').setAttribute('data-value', ')');
    } else if (value === ')') {
      document.querySelector('.btn.brak[data-value=")"]').setAttribute('data-value', '(')
    }
    if (value === 'C' || value === 'Delete') {
      expression = '0';
      result = '';
    } else if (value === '←' || value === 'Backspace') {
      expression = expression.length > 1 ? expression.slice(0, -1) : '0';
      result = '';
    } else if (value === '=') {
      if (expression) {
        let tempExpression = expression;
        var openParentheses = (tempExpression.match(/\(/g) || []).length, closeParentheses = (tempExpression.match(/\)/g) || []).length;
        if (openParentheses > closeParentheses) {
          for (let i = 0; i < openParentheses - closeParentheses; i++) {
            tempExpression += ')';
          }
        }
        var calculatedResult = safeEval(tempExpression);
        result = calculatedResult;
        history[currentMode].push({ expression: tempExpression, result: result, timestamp: new Date().toISOString() });
        saveHistory();
        expression = '0';
      }
    } else {
      if ((expression === '0' && !['.', 'sin', 'cos', 'tan', 'log', 'ln', '√'].includes(value)) || expression === '0' && ['.', 'sin', 'cos', 'tan', 'log', 'ln', '√'].includes(value)) {
        expression = value;
      } else {
        expression += value;
      }
      result = '';
    }
    updateDisplay();
  }
  function updateDisplay() {
    if (expression === '0') {
      historyTextElement.textContent = '';
    } else {
      historyTextElement.textContent = expression;
    }
    let displayValue;
    if (result) {
      displayValue = result;
    } else {
      displayValue = expression;
      displayValue = displayValue.replace(/X/g, '×');
      displayValue = displayValue.replace(/\^([-\d.]+)/g, '<sup>($1)</sup>');
    }
    displayElement.innerHTML = displayValue;
  }
  displayElement.addEventListener('input', (e) => {
    expression = displayElement.textContent;
    result = '';
    setTimeout(updateDisplay, 100);
  });
  function renderKeypad() {
    keypadContainer.innerHTML = '';
    let buttons = [], keypadHTML = '';
    switch (currentMode) {
      case 'basic':
        buttons = ['C', '←', '%', '÷', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '='];
        keypadHTML = `<div class="keypad">`;
        buttons.forEach(btn => {
          var className = `btn ${['+', '-', 'X', '÷', '%'].includes(btn) ? 'operator' : ''} ${btn === 'C' || btn === '←' || btn === 'xʸ' ? 'function' : ''} ${btn === '=' ? 'equal' : ''}`;
          let value = btn;
          if (btn === '←') value = 'Backspace';
          if (btn === 'xʸ') value = '^';
          if (btn === 'C') value = 'Delete';
          keypadHTML += `<button class="${className}" data-value="${value}">${btn === '←' ? '&larr;' : btn === 'xʸ' ? 'x<sup>y</sup>' : btn}</button>`;
        });
        keypadHTML += `</div>`;
        break;
      case 'scientific':
        buttons = ['C', '←', 'sin', 'cos', '%', '÷', 'tan', 'log', '7', '8', '9', 'X', 'ln', '√', '4', '5', '6', '-', 'xʸ', 'π', '1', '2', '3', '+', 'e', '( )', '.', '0', '=',];
        keypadHTML = `<div class="keypad scientific-keypad">`;
        buttons.forEach(btn => {
          var className = `btn ${['+', '-', 'X', '÷', '^', '%', '( )'].includes(btn) ? 'operator' : ''} ${btn === 'C' || btn === '←' || ['sin', 'cos', 'tan', 'log', 'ln', '√', 'xʸ', 'π', 'e'].includes(btn) ? 'function' : ''} ${btn === '=' ? 'equal' : ''}`;
          let value = btn;
          if (btn === '←') value = 'Backspace';
          if (btn === 'xʸ') value = '^';
          if (btn === '( )') { value = '('; className += ' brak' }
          if (btn === 'C') value = 'Delete';
          keypadHTML += `<button class="${className}" data-value="${value}">${btn === '←' ? '&larr;' : btn === 'xʸ' ? 'x<sup>y</sup>' : btn}</button>`;
        });
        keypadHTML += `</div>`;
        break;
      case 'currency':
        keypadHTML = renderCurrencyKeypad();
        break;
      case 'length':
        keypadHTML = renderLengthKeypad();
        break;
      case 'calculus':
        keypadHTML = renderCalculusKeypad();
        break;
      case 'matrix':
        keypadHTML = renderMatrixKeypad();
        break;
      case 'financial':
        keypadHTML = renderFinancialKeypad();
        break;
      case 'sip':
        keypadHTML = renderSipKeypad();
        break;
    }
    keypadContainer.innerHTML = keypadHTML;
    document.querySelector('.keypad').style.setProperty('--i', Math.ceil(buttons.length / 5));
    attachKeypadListeners();
  }
  function renderCurrencyKeypad() {
    var currencies = Object.keys(currencyData || {});
    return `<div class="keypad currency-keypad"><input type="number" placeholder="Amount" id="currency-input" class="input-display"/><div class="flex items-center justify-center">${!currencyData ? `<div class="loader"></div>` : ''}</div><div class="flex justify-between items-center gap-2"><select id="from-currency" class="select-unit w-full">    ${currencies.map(c => `<option value="${c}" ${c === 'INR' ? 'selected' : ''}>${c}</option>`).join('')}</select><span>to</span><select id="to-currency" class="select-unit w-full">    ${currencies.map(c => `<option value="${c}" ${c === 'USD' ? 'selected' : ''}>${c}</option>`).join('')}</select></div><button class="btn equal" id="convert-currency">Convert</button></div>
                `;
  }

  function handleCurrencyConvert() {
    var input = document.getElementById('currency-input').value, from = document.getElementById('from-currency').value, to = document.getElementById('to-currency').value;
    if (!currencyData || !input) return;
    var rate = (currencyData[to] / currencyData[from]), res = (parseFloat(input) * rate).toFixed(2);
    history[currentMode].push({ expression: `${input} ${from} to ${to}`, result: res, timestamp: new Date().toISOString() });
    saveHistory();
    result = res;
    expression = `0`;
    updateDisplay();
  }
  async function fetchCurrencyData() {
    try {
      var response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'), data = await response.json();
      currencyData = data.rates;
    } catch (error) {
      console.error('Failed to fetch currency data:', error);
    }
  }
  function renderLengthKeypad() {
    var units = lengthUnits.map(c => c.abbreviation);
    return `<div class="keypad length-keypad"><input type="number" placeholder="Enter value" id="length-input" class="input-display" /><div class="flex justify-between items-center gap-2"> <select id="from-unit" class="select-unit w-full">     ${units.map(u => `<option value="${u}" ${u === 'm' ? 'selected' : ''}>${u}</option>`).join('')} </select> <span>to</span> <select id="to-unit" class="select-unit w-full">     ${units.map(u => `<option value="${u}" ${u === 'cm' ? 'selected' : ''}>${u}</option>`).join('')} </select></div><button class="btn equal" id="convert-length">Convert</button></div>
                `;
  }
  function handleLengthConvert() {
    var input = document.getElementById('length-input').value, fromUnit = document.getElementById('from-unit').value, toUnit = document.getElementById('to-unit').value, factors = {}; lengthUnits.forEach(c => { factors[c.abbreviation] = c.valueInMillimeters; })
    if (!input) return;
    var resultValue = (parseFloat(input) * factors[fromUnit]) / factors[toUnit];
    result = resultValue.toFixed(4);
    expression = `0`;
    history[currentMode].push({ expression: `${input} ${fromUnit} to ${toUnit}`, result: result, timestamp: new Date().toISOString() });
    saveHistory();
    updateDisplay();
  }
  function renderCalculusKeypad() {
    return `<div class="keypad calculus-keypad"><div class="flex gap-2"> <button class="btn function flex-1" data-op="differentiate">d/dx</button> <button class="btn function flex-1" data-op="integrate">∫dx</button></div><div class="flex flex-col gap-2"><input type="text" placeholder="e.g., 2x^2+3x" id="calculus-input" class="input-display"/></div></div>
                `;
  }
  function handleCalculus(operation) {
    var expr = document.getElementById('calculus-input').value.replace(/ /g, '');
    if (!expr) {
      result = 'Error';
      expression = '0';
      updateDisplay();
      return;
    }
    var parts = expr.match(/([+-]?\s*\d*x\^?\d*)|([+-]?\s*\d+)/g) || [];
    let res = '';
    if (operation === 'differentiate') {
      var differentiatedParts = parts.map(part => {
        part = part.trim();
        var sign = part.startsWith('-') ? -1 : 1, absPart = part.replace(/[+-]/g, ''), match = absPart.match(/(\d*)x\^(\d+)/);
        if (match) {
          var a = parseInt(match[1] || 1), n = parseInt(match[2]);
          if (n === 0) return '0';
          var newCoeff = sign * a * n, newPower = n - 1;
          if (newPower === 1) return `${newCoeff}x`;
          if (newPower === 0) return `${newCoeff}`;
          return `${newCoeff}x^${newPower}`;
        }
        var matchX = absPart.match(/(\d*)x/);
        if (matchX) {
          var a = parseInt(matchX[1] || 1);
          return `${sign * a}`;
        }
        return '0';
      });
      res = differentiatedParts.filter(p => p !== '0').join('');
    } else {
      var integratedParts = parts.map(part => {
        part = part.trim();
        var sign = part.startsWith('-') ? -1 : 1, absPart = part.replace(/[+-]/g, ''), match = absPart.match(/(\d*)x\^(\d+)/);
        if (match) {
          var a = parseInt(match[1] || 1), n = parseInt(match[2]), newPower = n + 1, newCoeff = (sign * a) / newPower;
          return `(${(newCoeff).toFixed(2)})x^${newPower}`;
        }
        var matchX = absPart.match(/(\d*)x/);
        if (matchX) {
          var a = parseInt(matchX[1] || 1), newCoeff = (sign * a) / 2;
          return `(${(newCoeff).toFixed(2)})x^2`;
        }
        if (absPart !== '0' && !isNaN(parseFloat(absPart))) {
          return `${sign * parseFloat(absPart)}x`;
        }
        return '';
      });
      res = integratedParts.filter(p => p !== '').join('') + ' + C';
    }
    result = res.replace(/\+-/g, '-');
    expression = '0';
    history[currentMode].push({ expression: operation === 'differentiate' ? `d/dx(${expr})` : `∫(${expr})dx`, result: result, timestamp: new Date().toISOString() });
    saveHistory();
    updateDisplay();
  }
  function renderMatrixKeypad() {
    return `<div class="keypad matrix-keypad"><h3 class="text-xl font-bold text-center">Matrix A</h3><div class="matrix-grid"><input type="number" class="matrix-input" id="a00" value="0"/><input type="number" class="matrix-input" id="a01" value="0"/><input type="number" class="matrix-input" id="a10" value="0"/><input type="number" class="matrix-input" id="a11" value="0"/></div><div class="matrix-op-btns flex gap-2 justify-center my-4"><button class="btn function w-16" data-op="+">+</button><button class="btn function w-16" data-op="-">-</button></div><h3 class="text-xl font-bold text-center">Matrix B</h3><div class="matrix-grid"> <input type="number" class="matrix-input" id="b00" value="0"/> <input type="number" class="matrix-input" id="b01" value="0"/> <input type="number" class="matrix-input" id="b10" value="0"/> <input type="number" class="matrix-input" id="b11" value="0"/></div><button class="btn equal" id="calculate-matrix">Calculate</button></div>`;
  }
  function handleMatrixCalculation(op) {
    var matrixA = [
      [parseFloat(document.getElementById('a00').value), parseFloat(document.getElementById('a01').value)],
      [parseFloat(document.getElementById('a10').value), parseFloat(document.getElementById('a11').value)]
    ], matrixB = [
      [parseFloat(document.getElementById('b00').value), parseFloat(document.getElementById('b01').value)],
      [parseFloat(document.getElementById('b10').value), parseFloat(document.getElementById('b11').value)]
    ];
    let resMatrix;
    if (op === '+') {
      resMatrix = matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
    } else if (op === '-') {
      resMatrix = matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
    }
    result = JSON.stringify(resMatrix);
    expression = '0';
    history[currentMode].push({ expression: `Matrix A ${op} Matrix B`, result: result, timestamp: new Date().toISOString() });
    saveHistory();
    updateDisplay();
  }
  function renderFinancialKeypad() {
    return ` <div class="keypad financial-keypad"> <input type="number" placeholder="Principal" id="principal-input" class="input-display"/> <input type="number" placeholder="Rate (%)" id="rate-input" class="input-display"/> <input type="number" placeholder="Time (years)" id="time-input" class="input-display"/> <button class="btn equal" id="calculate-emi">Calculate EMI</button> </div>`;
  }
  function handleCalculateEMI() {
    var principal = parseFloat(document.getElementById('principal-input').value), rate = parseFloat(document.getElementById('rate-input').value), time = parseFloat(document.getElementById('time-input').value);
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) return;
    var r = rate / 1200, n = time * 12, emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    result = emi.toFixed(2);
    expression = '0';
    history[currentMode].push({ expression: `EMI(P:${principal}, R:${rate}%, T:${time}yr)`, result: result, timestamp: new Date().toISOString() });
    saveHistory();
    updateDisplay();
  }
  function renderSipKeypad() {
    return `<div class="keypad sip-keypad"><input type="number" placeholder="Monthly Investment" id="principal-input" class="input-display"/><input type="number" placeholder="Annual Return (%)" id="rate-input" class="input-display"/><input type="number" placeholder="Investment Duration (years)" id="time-input" class="input-display"/><button class="btn equal" id="calculate-sip">Calculate SIP</button> </div>
                `;
  }
  function handlesipCalculation() {
    var p = parseFloat(document.getElementById('principal-input').value), rate = parseFloat(document.getElementById('rate-input').value), time = parseFloat(document.getElementById('time-input').value);
    if (isNaN(p) || isNaN(rate) || isNaN(time)) return;
    var r = rate / 1200, n = time * 12, SIP = p * (Math.pow(1 + r, n) - 1) / r * (1 + r);
    result = SIP.toFixed(2);
    expression = '0';
    if (history[currentMode]) {
      history[currentMode].push({ expression: `SIP(P:${p}, R:${rate}%, T:${time}yr)`, result: result, timestamp: new Date().toISOString() });
    } else {
      history[currentMode] = { expression: `SIP(P:${p}, R:${rate}%, T:${time}yr)`, result: result, timestamp: new Date().toISOString() };
    }
    saveHistory();
    updateDisplay();
  }
  function renderHistoryModal() {
    historyList.innerHTML = '';
    var currentHistory = history[historyMode];
    if (currentHistory && currentHistory.length > 0) {
      currentHistory.forEach((item, index) => {
        var li = document.createElement('li');
        li.className = `history-item ${selectedHistory.includes(index) ? 'selected' : ''}`;
        li.innerHTML = `<div class="history-item-expression">${item.expression}</div><div class="history-item-result">= ${item.result}</div>`;
        li.addEventListener('click', () => {
          if (selectedHistory.includes(index)) {
            selectedHistory = selectedHistory.filter(i => i !== index);
          } else {
            selectedHistory.push(index);
          }
          renderHistoryModal();
        });
        historyList.appendChild(li);
      });
    } else {
      historyList.innerHTML = `<div class="no-history-msg">No history for this calculator yet.</div>`;
    }
    historyModeSelect.innerHTML = Object.keys(history).map(key =>
      `<option value="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</option>`
    ).join('');
    historyModeSelect.value = historyMode;
  }
  function attachKeypadListeners() {
    var buttons = keypadContainer.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        var value = button.dataset.value, operation = button.dataset.op;
        if (value) {
          handleButtonClick(value);
        } else {
          if (operation) {
            if (currentMode === 'calculus') {
              handleCalculus(operation);
            } else if (currentMode === 'matrix') {
              handleMatrixCalculation(operation);
            }
          } else {
            if (button.id === 'convert-currency') handleCurrencyConvert();
            if (button.id === 'convert-length') handleLengthConvert();
            if (button.id === 'calculate-emi') handleCalculateEMI();
            if (button.id === 'calculate-sip') handlesipCalculation();
            if (button.id === 'calculate-matrix') handleMatrixCalculation('+'); // default to addition
          }
        }
      });
    });
  }
  topBar.addEventListener('click', async (e) => {
    var btn = e.target.closest('.top-bar-btn');
    if (btn) {
      var newMode = btn.dataset.mode;
      if (newMode === 'history') {
        historyModal.classList.add('visible');
        historyMode = currentMode;
        selectedHistory = [];
        renderHistoryModal();
      } else {
        currentMode = newMode;
        expression = '0';
        result = '';
        updateDisplay();
        if (newMode === 'currency' && !currencyData) {
          await fetchCurrencyData();
        }
        renderKeypad();
        document.querySelectorAll('.top-bar-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    }
  });
  keypadContainer.addEventListener('input', (e) => {
    var inputField = e.target;
    if (inputField.id === 'currency-input' || inputField.id === 'length-input' || inputField.id === 'calculus-input' || inputField.id === 'principal-input' || inputField.id === 'rate-input' || inputField.id === 'time-input') {
    } else if (inputField.classList.contains('matrix-input')) {
    }
  });
  modalCloseBtn.addEventListener('click', () => historyModal.classList.remove('visible'));
  historyModeSelect.addEventListener('change', (e) => {
    historyMode = e.target.value;
    selectedHistory = [];
    renderHistoryModal();
  });
  deleteAllBtn.addEventListener('click', () => {
    history[historyMode] = [];
    selectedHistory = [];
    saveHistory();
    renderHistoryModal();
  });
  deleteSelectedBtn.addEventListener('click', () => {
    if (selectedHistory.length === 0) return;
    let currentHistory = history[historyMode];
    var newHistory = currentHistory.filter((_, idx) => !selectedHistory.includes(idx));
    history[historyMode] = newHistory;
    selectedHistory = [];
    saveHistory();
    renderHistoryModal();
  });
  loadHistory();
  renderKeypad();
  document.addEventListener('keydown', (e) => { if (e.keyCode === 13) { handleButtonClick('='); } });
  document.addEventListener('keyup', (e) => { let f = document.querySelector(`.btn[data-value="${e.key}"]`); if (e.key === '/') f = document.querySelector(`.btn[data-value="÷"]`); else if (e.key === '*') f = document.querySelector(`.btn[data-value="X"]`); f?.click(); f?.classList.add('active'); setTimeout(() => { document.querySelectorAll(`.btn`).forEach(e => e.classList.remove('active')) }, 230); });
  setTimeout(() => { document.querySelector('.loader').style.display = 'none'; }, 3000);
};
