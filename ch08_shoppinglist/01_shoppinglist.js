// 1. HTML 요소 선택
const shoppingForm = document.getElementById('shopping-form');
const shoppingList = document.getElementById('shopping-list');
const totalPriceDisplay = document.getElementById('total-price');

const nameInput = document.getElementById('item-name');
const qtyInput = document.getElementById('item-qty');
const unitInput = document.getElementById('item-unit');
const priceInput = document.getElementById('item-price');

let totalAmount = 0;

// 2. 합계 업데이트 함수
function updateTotalPrice() {
  totalPriceDisplay.innerText = `${totalAmount.toLocaleString()}원`;
}

// 3. 파티클 효과 (시각적 피드백)
function createParticles(x, y) {
  const particleCount = 12;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti';
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 40 + 20;
    const tx = Math.cos(angle) * distance + 'px';
    const ty = Math.sin(angle) * distance + 'px';

    particle.style.setProperty('--tx', tx);
    particle.style.setProperty('--ty', ty);
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = `hsl(${Math.random() * 40 + 320}, 100%, 75%)`;

    particle.onanimationend = () => particle.remove();
  }
}

// 4. 메인 담기 로직
shoppingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const qty = parseFloat(qtyInput.value);
  const unit = unitInput.value;
  const price = parseInt(priceInput.value);

  // 유효성 검사
  if (!name || isNaN(qty) || isNaN(price) || qty <= 0) {
    alert("내용을 정확히 입력해주세요! 😊");
    return;
  }

  // --- [지능형 금액 계산 로직] ---
  let itemTotal;
  let priceDetailText;

  // g이나 kg 단위는 보통 '무게 대비 총액'을 적으므로 곱셈 제외
  if (unit === 'g' || unit === 'kg') {
    itemTotal = price; 
    priceDetailText = `${qty}${unit} / 합계 ${price.toLocaleString()}원`;
  } else {
    // 개, 팩, 봉지는 '단가 x 수량'으로 계산
    itemTotal = Math.round(qty * price);
    priceDetailText = `${qty}${unit} x ${price.toLocaleString()}원`;
  }
  // ----------------------------

  // 합계 누적
  totalAmount += itemTotal;

  // 파티클 좌표 설정
  const rect = e.target.querySelector('button').getBoundingClientRect();
  const x = e.clientX || rect.left + rect.width / 2;
  const y = e.clientY || rect.top + rect.height / 2;
  createParticles(x, y);

  // 리스트 아이템 생성
  const li = document.createElement('li');
  li.className = 'shopping__item';
  li.innerHTML = `
    <div class="item-info">
      <strong>${name}</strong>
      <small>${priceDetailText}</small>
    </div>
    <div class="item-right">
      <span class="item-price-sum">${itemTotal.toLocaleString()}원</span>
      <button type="button" class="shopping__delete-btn" title="삭제">✕</button>
    </div>
  `;

  // 삭제 버튼 기능
  li.querySelector('.shopping__delete-btn').addEventListener('click', () => {
    totalAmount -= itemTotal;
    li.remove();
    updateTotalPrice();
  });

  // 화면 반영 및 초기화
  shoppingList.appendChild(li);
  updateTotalPrice();
  shoppingForm.reset();
  nameInput.focus();
});