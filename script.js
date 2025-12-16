document.addEventListener('DOMContentLoaded', () => {
    // Hàm hiển thị/ẩn lớp phủ "Đăng nhập để xem"
    function updateUnauthorizedOverlays() {
        const overlays = document.querySelectorAll('.unauthorized-overlay');
        if (isLoggedIn) {
            overlays.forEach(overlay => {
                overlay.classList.remove('visible');
            });
        } else {
            overlays.forEach(overlay => {
                overlay.classList.add('visible');
            });
        }
    }
    function handleUnauthorizedClick(event) {
        event.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
        event.stopPropagation(); // Ngăn sự kiện lan truyền
        if (!isLoggedIn) {
            // Gọi hàm mở modal đăng nhập
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                closeAllModals(); // Đảm bảo đóng các modal khác
                openModal('login-modal');
            }
        }
    }
    let isLoggedIn = false; // <--- KHAI BÁO BIẾN TRẠNG THÁI ĐĂNG NHẬP
    const ITEMS_PER_PAGE = 18;

    // ===== Anti-DevTools (ĐÃ SỬA CHỮA) =====
    (function antiDevToolsLight() {
        function stopSite() {
            document.body.innerHTML = `
                <div style="
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:100vh;
                    background:#0b0b0b;
                    color:#ff4444;
                    font-size:22px;
                    font-weight:600;
                    text-align:center;
                ">
                    ⚠️ Truy cập bị hạn chế<br>
                    Vui lòng đóng DevTools
                </div>
            `;
        }
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase())) ||
                (e.ctrlKey && (e.key.toLowerCase() === 'u' || e.key.toLowerCase() === 's')) // Đã sửa cú pháp và thêm chặn Ctrl+S
            ) {
                e.preventDefault();
                stopSite();
            }
        });
        setInterval(() => {
            const gapW = window.outerWidth - window.innerWidth;
            const gapH = window.outerHeight - window.innerHeight;
            if (gapW > 200 || gapH > 200) { // Đã tăng ngưỡng từ 160 lên 200 để giảm false positive
                stopSite();
            }
        }, 1500);
    })();

    // ===== Theme Toggle (GIỮ NGUYÊN) =====
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) htmlElement.classList.add(currentTheme);
    else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

    function updateThemeButton() {
        if (htmlElement.classList.contains('dark')) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun w-5 h-5 text-yellow-600"></i>';
            themeToggleBtn.setAttribute('aria-label', 'Chuyển sang chế độ sáng');
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon w-5 h-5 text-indigo-600"></i>';
            themeToggleBtn.setAttribute('aria-label', 'Chuyển sang chế độ tối');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            htmlElement.classList.toggle('light');
            localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
            updateThemeButton();
        });
        updateThemeButton();
    }

    // ===== Announcement Banner (GIỮ NGUYÊN) =====
    const announcementBanner = document.getElementById('announcement-banner');
    const closeBannerBtn = document.getElementById('close-banner-btn');
    if (closeBannerBtn) closeBannerBtn.addEventListener('click', () => { announcementBanner.style.display = 'none'; });

    // ===== Dropdown Menus (GIỮ NGUYÊN) =====
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('button');
        button.addEventListener('click', () => {
            dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('active'); });
            dropdown.classList.toggle('active');
        });
        document.addEventListener('click', e => { if (!dropdown.contains(e.target)) dropdown.classList.remove('active'); });
    });

    // ===== Category Tabs Scrolling (GIỮ NGUYÊN) =====
    const categoryTabs = document.getElementById('category-tabs');
    const scrollLeftBtn = document.querySelector('.category-nav-wrapper .nav-scroll-btn.left-0');
    const scrollRightBtn = document.querySelector('.category-nav-wrapper .nav-scroll-btn.right-0');
    if (categoryTabs && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => { categoryTabs.scrollBy({ left: -200, behavior: 'smooth' }); });
        scrollRightBtn.addEventListener('click', () => { categoryTabs.scrollBy({ left: 200, behavior: 'smooth' }); });
    }

    // ===== Modal Login & Bind (GIỮ NGUYÊN) =====
    const modals = document.querySelectorAll('.modal-overlay');
    const openLoginModalBtn = document.getElementById('open-login-modal-btn');
    const openBindAccountsModalBtn = document.getElementById('open-bind-accounts-modal-btn');
    const closeButtons = document.querySelectorAll('.modal-close-btn');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) { modal.classList.remove('hidden'); modal.classList.add('visible'); document.body.style.overflow = 'hidden'; }
    }

    function closeAllModals() {
        modals.forEach(modal => { modal.classList.remove('visible'); if (['login-modal','bind-accounts-modal'].includes(modal.id)) modal.classList.add('hidden'); });
        document.body.style.overflow = '';
    }

    if (openLoginModalBtn) openLoginModalBtn.addEventListener('click', e => { e.preventDefault(); closeAllModals(); openModal('login-modal'); });
    if (openBindAccountsModalBtn) openBindAccountsModalBtn.addEventListener('click', e => { e.preventDefault(); closeAllModals(); openModal('bind-accounts-modal'); });
    closeButtons.forEach(btn => btn.addEventListener('click', closeAllModals));
    modals.forEach(modal => modal.addEventListener('click', e => { if (e.target === modal) closeAllModals(); }));

    // ===== Login Form (GIỮ NGUYÊN) =====
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const usernameError = document.getElementById('username-error');
        const passwordError = document.getElementById('password-error');
        const loginMessage = document.getElementById('login-message');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let valid = true;
            usernameError.textContent = ''; passwordError.textContent = ''; loginMessage.textContent = '';
            loginMessage.classList.remove('success','error');

            if (!usernameInput.value.trim()) { usernameError.textContent = 'Tài khoản không được để trống.'; valid=false; }
            if (!passwordInput.value.trim()) { passwordError.textContent = 'Mật khẩu không được để trống.'; valid=false; }
            if (!valid) return;

            try {
                // Giả định có API endpoint /api/login
                const response = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ username: usernameInput.value.trim(), password: passwordInput.value.trim(), rememberMe: document.getElementById('remember-me').checked }) });
                const data = await response.json();
                if (data.success) {
                    loginMessage.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
                    loginMessage.classList.add('success');
                    setTimeout(() => { closeAllModals(); window.location.href = data.role==='admin'?"/admin-dashboard":"/user-dashboard"; },1500);
                } else {
                    loginMessage.textContent = `Đăng nhập thất bại: ${data.message||'Sai tài khoản hoặc mật khẩu.'}`;
                    loginMessage.classList.add('error');
                }
            } catch (err) { loginMessage.textContent='Đã xảy ra lỗi hệ thống. Vui lòng thử lại.'; loginMessage.classList.add('error'); console.error(err);}
        });
    }

    // ===== Bind Accounts (GIỮ NGUYÊN) =====
    document.querySelectorAll('.bind-card').forEach(card => {
        const submitBtn = card.querySelector('.btn-primary');
        const platform = card.dataset.platform;
        if (!submitBtn) return;
        submitBtn.addEventListener('click', async () => {
            const idInput = card.querySelector(`#${platform.toLowerCase()}-id`);
            const id = idInput?.value.trim();
            if (!id) return alert(`Vui lòng nhập ID cho ${platform}.`);
            try {
                // Giả định có API endpoint /api/accounts/bind
                const res = await fetch('/api/accounts/bind', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ platform,id }) });
                const data = await res.json();
                alert(data.success ? data.message||`Liên kết ${platform} thành công!` : `Liên kết ${platform} thất bại: ${data.message||'Lỗi không xác định.'}`);
            } catch (err) { console.error(err); alert('Đã xảy ra lỗi khi liên kết tài khoản. Vui lòng thử lại.'); }
        });
    });

    // ===== Login/Logout UI & Admin User Load (GIỮ NGUYÊN) =====
    // ===== Login/Logout UI & Admin User Load (CẬP NHẬT) =====
    fetch('/api/me').then(r=>r.json()).then(me=>{
        const loginLink=document.getElementById('open-login-modal-btn');
        const logoutLink=document.getElementById('logout-link');
        const adminPanel=document.getElementById('admin-panel');

        isLoggedIn = me.logged_in; // <-- CẬP NHẬT TRẠNG THÁI ĐĂNG NHẬP

        // Cập nhật giao diện nút Đăng nhập/Đăng xuất
        if(isLoggedIn){ loginLink?.classList.add('hidden'); logoutLink?.classList.remove('hidden'); }
        else { loginLink?.classList.remove('hidden'); logoutLink?.classList.add('hidden'); }

        // Cập nhật giao diện lớp phủ
        updateUnauthorizedOverlays(); // <--- GỌI HÀM CẬP NHẬT LỚP PHỦ

        if(isLoggedIn && me.role==='admin'){ if(adminPanel){ adminPanel.style.display='block'; loadUsers(); } }
    }).catch(err => {
        console.log("Không thể kiểm tra trạng thái đăng nhập:", err);
        updateUnauthorizedOverlays(); // Đảm bảo lớp phủ vẫn hiển thị nếu API lỗi
    });

    // ... (Giữ nguyên các hàm loadUsers, filterCards,...)

    function loadUsers(){
        fetch('/api/admin/users').then(res=>res.json()).then(data=>{
            if(!data.success) return;
            const tbody=document.getElementById('user-list');
            if (tbody) {
                tbody.innerHTML='';
                data.users.forEach(u=>{
                    const tr=document.createElement('tr');
                    tr.innerHTML=`<td>${u.username}</td><td>${u.password||'******'}</td><td>${u.role||'user'}</td>`;
                    tbody.appendChild(tr);
                });
            }
        }).catch(err => console.log("Không thể tải danh sách người dùng admin:", err));
    }


    // -------------------------------------------------------------
    // START: LỌC TÀI NGUYÊN VÀ PHÂN TRANG (GIỮ NGUYÊN)
    // -------------------------------------------------------------

    const categoryTabsAll = document.querySelectorAll('.category-tab');
    const subcategoryTabsAll = document.querySelectorAll('.subcategory-tab');

    const allCards = Array.from(document.querySelectorAll('.resources-grid .material-card'));
    const emptyMessage = document.querySelector('#empty-message');
    const paginationContainer = document.getElementById('pagination');

    let currentCat = 'nhanvat';
    let currentSubcat = null;
    let currentPage = 1;
    let filteredCards = [];

    // 1. Hàm lọc thẻ (Filter)
    function filterCards() {
        // Lọc tất cả các thẻ dựa trên category/subcategory hiện tại
        filteredCards = allCards.filter(card => {
            const cardCat = card.getAttribute('data-cat');
            const cardSub = card.getAttribute('data-subcat') || '';

            let shouldShow = false;

            // A. Nếu đang chọn Subcategory (Ưu tiên Subcat)
            if (currentSubcat && currentSubcat !== 'all') {
                if (cardSub.includes(currentSubcat)) {
                    shouldShow = true;
                }
            }
            // B. Nếu đang chọn Category
            else if (currentCat) {
                if (currentCat === 'all' || cardCat === currentCat) {
                    shouldShow = true;
                }
            }
            return shouldShow;
        });

        currentPage = 1; // Reset về trang 1 sau khi lọc
        setupPagination(filteredCards.length); // Cài đặt lại phân trang
        displayCards(currentPage); // Hiển thị trang đầu tiên
    }

    // 2. Hàm thiết lập nút chuyển trang (Pagination)
    function setupPagination(totalItems) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(totalItems / ITEMS_PER_PAGE); // Tính tổng số trang

        if (pageCount <= 1) { // Ẩn phân trang nếu chỉ có 1 trang
            paginationContainer.style.display = 'none';
            return;
        }

        paginationContainer.style.display = 'flex';

        // Nút Prev
        const prevBtn = createPageButton('Trước', currentPage - 1, currentPage === 1);
        paginationContainer.appendChild(prevBtn);

        // Các nút số trang
        for (let i = 1; i <= pageCount; i++) {
            const pageBtn = createPageButton(i, i, false, i === currentPage);
            paginationContainer.appendChild(pageBtn);
        }

        // Nút Next
        const nextBtn = createPageButton('Sau', currentPage + 1, currentPage === pageCount);
        paginationContainer.appendChild(nextBtn);
    }

    // Hàm tạo nút phân trang
    function createPageButton(text, pageNumber, isDisabled, isActive = false) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('px-3', 'py-1', 'rounded-lg', 'font-medium', 'transition-colors');

        if (isDisabled) {
            button.disabled = true;
            button.classList.add('bg-gray-200', 'text-gray-500', 'dark:bg-gray-700', 'dark:text-gray-400', 'cursor-not-allowed');
        } else if (isActive) {
            button.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-700');
        } else {
            button.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200', 'dark:bg-gray-800', 'dark:text-gray-300', 'dark:hover:bg-gray-700');
            button.addEventListener('click', () => {
                currentPage = pageNumber;
                displayCards(currentPage);
                setupPagination(filteredCards.length); // Cập nhật lại trạng thái nút
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
            });
        }
        return button;
    }


    // 3. Hàm hiển thị các thẻ trên trang hiện tại
    function displayCards(page) {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        let hasVisible = false;

        allCards.forEach((card, index) => {
            // Kiểm tra xem card có nằm trong danh sách đã lọc VÀ trong phạm vi trang hiện tại không
            const isFiltered = filteredCards.includes(card);

            if (isFiltered && index >= startIndex && index < endIndex) {
                card.style.display = 'flex';
                hasVisible = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Xử lý thông báo rỗng
        if (emptyMessage) {
            emptyMessage.style.display = hasVisible ? 'none' : 'flex';
        }
    }


    // 4. SỰ KIỆN CLICK CATEGORY (Cập nhật để gọi filterCards)
    categoryTabsAll.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabsAll.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            currentCat = tab.dataset.cat;
            currentSubcat = null;

            subcategoryTabsAll.forEach(t => t.classList.remove('active'));

            filterCards(); // Chỉ gọi filterCards
        });
    });

    // 5. SỰ KIỆN CLICK SUBCATEGORY (Cập nhật để gọi filterCards)
    subcategoryTabsAll.forEach(tab => {
        tab.addEventListener('click', () => {
            subcategoryTabsAll.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            currentSubcat = tab.dataset.subcat;

            filterCards(); // Chỉ gọi filterCards
        });
    });

    // 6. CHẠY LẦN ĐẦU KHI TẢI TRANG
    document.querySelector('.category-tab[data-cat="nhanvat"]')?.classList.add('active');
    filterCards(); // Bắt đầu bằng việc lọc và hiển thị trang đầu tiên
});
