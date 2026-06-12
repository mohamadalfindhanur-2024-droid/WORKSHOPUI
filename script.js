// Script for EventLite: countdown timer, QR modal, and payment redirection
(function(){
  // 1. Countdown timer untuk halaman keranjang.html
  function startCountdown(durationSeconds, displayId) {
    var display = document.getElementById(displayId);
    if (!display) return;
    var timer = durationSeconds, minutes, seconds;
    var interval = setInterval(function(){
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ":" + seconds;
      if (--timer < 0) {
        clearInterval(interval);
        display.textContent = "00:00";
        var btn = document.querySelector('.cart-summary .btn-accent');
        if (btn) btn.textContent = 'Waktu Habis';
      }
    }, 1000);
  }

  // Jalankan hitung mundur 10 menit jika elemen countdown ditemukan
  if (document.getElementById('countdown')){
    startCountdown(10 * 60, 'countdown');
  }

  // 2. Handler Modal E-Ticket untuk halaman history-transaksi.html
  window.showTicket = function(imgSrc){
    var modal = document.getElementById('qr-modal');
    var img = document.getElementById('qr-image');
    var dl = document.getElementById('download-link');
    if (!modal || !img) return;
    img.src = imgSrc;
    if (dl) dl.href = imgSrc;
    modal.style.display = 'flex';
  }
  
  window.closeTicket = function(){
    var modal = document.getElementById('qr-modal');
    if (modal) modal.style.display = 'none';
  }

  // 3. Logika Filter untuk halaman katalog.html
  function applyFilters() {
    var checkedCities = Array.from(document.querySelectorAll('input[name="kota"]:checked')).map(function(i){return i.value;});
    var checkedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(function(i){return i.value;});
    var cards = document.querySelectorAll('.event-card');
    cards.forEach(function(card){
      var city = card.getAttribute('data-city');
      var genre = card.getAttribute('data-genre');
      var cityMatch = checkedCities.length === 0 || checkedCities.indexOf(city) !== -1;
      var genreMatch = checkedGenres.length === 0 || checkedGenres.indexOf(genre) !== -1;
      if (cityMatch && genreMatch) { card.style.display = ''; } else { card.style.display = 'none'; }
    });
  }

  function applyHomeSearchFilters() {
    var searchInput = document.getElementById('home-search-input');
    var citySelect = document.getElementById('home-city-filter');
    if (!searchInput || !citySelect) return;

    var searchTerm = searchInput.value.trim().toLowerCase();
    var selectedCity = citySelect.value;
    var cards = document.querySelectorAll('.grid-events .event-card');

    cards.forEach(function(card) {
      var city = card.getAttribute('data-city') || '';
      var keywords = card.getAttribute('data-keywords') || '';
      var matchesCity = selectedCity === '' || selectedCity === city;
      var matchesSearch = searchTerm === '' || keywords.toLowerCase().indexOf(searchTerm) !== -1;
      if (matchesCity && matchesSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Aktifkan event listener filter hanya jika berada di halaman katalog yang memiliki sidebar
  if (document.querySelector('.sidebar')){
    var cityInputs = document.querySelectorAll('input[name="kota"]');
    var genreInputs = document.querySelectorAll('input[name="genre"]');
    cityInputs.forEach(function(i){ i.addEventListener('change', applyFilters); });
    genreInputs.forEach(function(i){ i.addEventListener('change', applyFilters); });
    var applyBtn = document.getElementById('apply-filter');
    if (applyBtn) {
      applyBtn.addEventListener('click', applyFilters);
    }
  }

  var homeSearchInput = document.getElementById('home-search-input');
  var homeCityFilter = document.getElementById('home-city-filter');
  var homeFilterBtn = document.getElementById('home-filter-btn');
  if (homeSearchInput && homeCityFilter && homeFilterBtn) {
    homeSearchInput.addEventListener('keyup', applyHomeSearchFilters);
    homeCityFilter.addEventListener('change', applyHomeSearchFilters);
    homeFilterBtn.addEventListener('click', applyHomeSearchFilters);
  }

  // 4. Logika Pilihan Metode Pembayaran untuk halaman pembayaran.html
  if (document.getElementById('payment-methods')){
    document.getElementById('payment-methods').addEventListener('click', function(e){
      var btn = e.target.closest('button[data-method]');
      if (!btn) return;
      var method = btn.getAttribute('data-method');
      var preview = document.getElementById('payment-preview');
      if (!preview) return;
      preview.style.display = '';
      preview.innerHTML = '';
      if (method === 'qris'){
        preview.innerHTML = '<div style="text-align:center;"><img src="https://via.placeholder.com/220x220?text=QRIS" alt="QRIS"><div class="small text-muted">Scan QRIS untuk membayar</div></div>';
      } else if (method === 'va'){
        preview.innerHTML = '<div class="small text-muted">Virtual Account:</div><div style="font-weight:800; font-size:1.1rem;">1234 5678 9012 3456 (Bank Mandiri)</div><div class="small text-muted mt-1">Sertakan nomor transaksi sebagai referensi.</div>';
      }
    });

    // Perbaikan selektor pengalihan form bayar agar aman
    var payNowBtn = document.getElementById('pay-now');
    if (payNowBtn) {
      payNowBtn.addEventListener('click', function(e){
        var preview = document.getElementById('payment-preview');
        if (!preview || preview.innerHTML.trim()===''){
          e.preventDefault(); // Mencegah pindah halaman jika belum pilih metode
          alert('Pilih metode pembayaran terlebih dahulu.');
          return;
        }
        alert('Pembayaran diproses — mengalihkan ke halaman riwayat.');
      });
    }
  }

  // Helper formats
  function formatCurrency(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

function getTicketDetails() {
    var category = document.querySelector('input[name="kategori"]:checked');
    var qty = document.getElementById('ticket-qty');
    
    // Ambil teks kategori (jika tidak ada pilihan, default ke 'Festival A')
    var selectedCategory = category ? category.value : 'Festival A';
    // Ambil jumlah tiket (jika input kosong/tidak ada, default ke 1)
    var quantity = qty ? (parseInt(qty.value, 10) || 1) : 1;
    
    // CARI JUDUL AMAN: Cek apakah elemen h1.title ada, kalau tidak ada pakai nama default
    var titleEl = document.querySelector('h1.title') || document.querySelector('h1') || document.querySelector('h2');
    var eventName = titleEl ? titleEl.textContent.trim() : 'Sheila on 7 — Tunggu Aku Di Surabaya';
    
    var unitPrice = 500000; // default jika atribut data-price tidak ditemukan
    if (category && category.dataset && category.dataset.price) {
      unitPrice = parseInt(category.dataset.price, 10) || unitPrice;
    } else if (selectedCategory === 'VIP') {
      unitPrice = 900000;
    }
    
    return {
      name: eventName,
      category: selectedCategory,
      unitPrice: unitPrice,
      quantity: quantity,
      totalPrice: unitPrice * quantity
    };
  }

  function updateTicketSummary() {
    var details = getTicketDetails();
    if (!details) return;
    var totalPriceEl = document.getElementById('ticket-total-price');
    var infoEl = document.getElementById('ticket-selected-info');
    if (totalPriceEl) totalPriceEl.textContent = formatCurrency(details.totalPrice);
    if (infoEl) infoEl.textContent = details.quantity + ' tiket ' + details.category;
  }

  function saveCartItem(details) {
    if (!details) return;
    // Backward-compatible: add single-item to modern cart array
    var cart = getCart();
    // try to merge by name+category
    var found = cart.find(function(i){ return i.name===details.name && i.category===details.category; });
    if (found) {
      found.quantity = (parseInt(found.quantity,10)||0) + (parseInt(details.quantity,10)||0);
      found.totalPrice = found.unitPrice * found.quantity;
    } else {
      cart.push(details);
    }
    saveCart(cart);
  }

  // Cart helpers: store array under 'eventliteCart'
  function getCart(){
    var raw = sessionStorage.getItem('eventliteCart');
    if (!raw){
      // migrate old single item if present
      var single = sessionStorage.getItem('eventliteCartItem');
      if (single){
        try { var itm = JSON.parse(single); sessionStorage.removeItem('eventliteCartItem'); sessionStorage.setItem('eventliteCart', JSON.stringify([itm])); return [itm]; } catch(e){}
      }
      return [];
    }
    try { return JSON.parse(raw) || []; } catch(e){ return []; }
  }

  function saveCart(cart){ sessionStorage.setItem('eventliteCart', JSON.stringify(cart||[])); }

  function addToCart(details){ if (!details) return; var cart = getCart(); var found = cart.find(function(i){ return i.name===details.name && i.category===details.category; }); if (found){ found.quantity = (parseInt(found.quantity,10)||0) + (parseInt(details.quantity,10)||0); found.totalPrice = found.unitPrice * found.quantity; } else { cart.push(details); } saveCart(cart); }

  // Render multi-item cart into keranjang.html
  function renderCart() {
    var cart = getCart();
    var container = document.getElementById('cart-items');
    var cartTotalEl = document.getElementById('cart-total');
    if (!container) return;
    container.innerHTML = '';
    if (!cart || cart.length===0){
      var empty = document.createElement('div'); empty.className='cart-empty'; empty.textContent='Keranjang kosong. Tambah tiket dari katalog.'; container.appendChild(empty); if (cartTotalEl) cartTotalEl.textContent='Rp 0'; return;
    }
    var list = document.createElement('div'); list.className='cart-items-list';
    cart.forEach(function(item, idx){
      var row = document.createElement('div'); row.className='cart-row'; row.dataset.index = idx;
      row.innerHTML = '<div style="display:flex;gap:0.75rem;align-items:center;"><img src="https://via.placeholder.com/80x60?text=ticket" style="width:80px;height:60px;object-fit:cover;border-radius:6px;">'
        + '<div><div style="font-weight:700;">'+item.name+'</div><div class="small text-muted">'+item.category+'</div></div></div>'
        + '<div style="display:flex;align-items:center;gap:0.5rem;">'
        + '<button class="qty-decrease">-</button><div class="qty" style="min-width:28px;text-align:center;">'+item.quantity+'</div><button class="qty-increase">+</button></div>'
        + '<div style="font-weight:800;">'+formatCurrency(item.unitPrice)+'</div>'
        + '<div style="font-weight:800;">'+formatCurrency(item.totalPrice)+'</div>'
        + '<div><button class="btn btn-ghost remove-item">Hapus</button></div>';
      list.appendChild(row);
    });
    container.appendChild(list);
    // attach listeners
    container.querySelectorAll('.qty-increase').forEach(function(b){ b.addEventListener('click', function(e){ var idx = parseInt(e.target.closest('.cart-row').dataset.index,10); var cart = getCart(); cart[idx].quantity = (parseInt(cart[idx].quantity,10)||0)+1; cart[idx].totalPrice = cart[idx].unitPrice * cart[idx].quantity; saveCart(cart); renderCart(); }); });
    container.querySelectorAll('.qty-decrease').forEach(function(b){ b.addEventListener('click', function(e){ var idx = parseInt(e.target.closest('.cart-row').dataset.index,10); var cart = getCart(); cart[idx].quantity = Math.max(1, (parseInt(cart[idx].quantity,10)||1)-1); cart[idx].totalPrice = cart[idx].unitPrice * cart[idx].quantity; saveCart(cart); renderCart(); }); });
    container.querySelectorAll('.remove-item').forEach(function(b){ b.addEventListener('click', function(e){ var idx = parseInt(e.target.closest('.cart-row').dataset.index,10); var cart = getCart(); cart.splice(idx,1); saveCart(cart); renderCart(); }); });
    // total
    var total = cart.reduce(function(s,i){ return s + (parseInt(i.totalPrice,10)||0); }, 0);
    if (cartTotalEl) cartTotalEl.textContent = formatCurrency(total);
  }

  function renderCartFromStorage() {
    var stored = sessionStorage.getItem('eventliteCartItem');
    var cartItemsContainer = document.getElementById('cart-items');
    var cartTotalEl = document.getElementById('cart-total');
    var cartCount = document.querySelector('.row .small.text-muted');

    if (!stored || !cartItemsContainer || !cartTotalEl) return;
    try {
      var item = JSON.parse(stored);
      cartItemsContainer.innerHTML = '';
      var tr = document.createElement('tr');
      var tdName = document.createElement('td');
      var tdQty = document.createElement('td');
      var tdPrice = document.createElement('td');
      tdName.textContent = item.name + ' — ' + item.category;
      tdQty.textContent = item.quantity;
      tdPrice.textContent = formatCurrency(item.totalPrice);
      tr.appendChild(tdName);
      tr.appendChild(tdQty);
      tr.appendChild(tdPrice);
      cartItemsContainer.appendChild(tr);
      cartTotalEl.textContent = formatCurrency(item.totalPrice);
      if (cartCount && cartCount.textContent.indexOf('tiket') !== -1) {
        cartCount.textContent = item.quantity + ' tiket di keranjang';
      }
    } catch (e) {
      console.error('Invalid cart storage', e);
    }
  }

  var buyBtn = document.getElementById('buy-now');
  if (buyBtn){
    var formInputs = document.querySelectorAll('input[name="kategori"], #ticket-qty');
    formInputs.forEach(function(input){ input.addEventListener('change', updateTicketSummary); });
    updateTicketSummary();

    buyBtn.addEventListener('click', function(){
      var details = getTicketDetails();
      addToCart(details);
      window.location.href = 'keranjang.html';
    });
  }

  if (document.getElementById('cart-items')){
    // render modern multi-item cart
    renderCart();
    if (document.getElementById('countdown')) startCountdown(10*60,'countdown');
    // checkout guard (link already points to pembayaran.html)
    var checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn){
      checkoutBtn.addEventListener('click', function(e){
        var cart = getCart(); if (!cart || cart.length===0){ e.preventDefault(); alert('Keranjang kosong.'); }
      });
    }
  }
})();