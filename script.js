document.addEventListener('DOMContentLoaded', () => {
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

        // Chặn chuột phải
        document.addEventListener('contextmenu', e => e.preventDefault());

        // Chặn phím cơ bản
        document.addEventListener('keydown', e => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c', 's'].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && ['u', 's'].includes(e.key.toLowerCase()))
    ) {
        e.preventDefault();
        stopSite();
    }
});


        // Phát hiện DevTools qua size (check chậm)
        setInterval(() => {
            const gapW = window.outerWidth - window.innerWidth;
            const gapH = window.outerHeight - window.innerHeight;
            if (gapW > 160 || gapH > 160) {
                stopSite();
            }
        }, 1500); // 1.5s / lần → rất nhẹ

    })();

    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        htmlElement.classList.add(currentTheme);
    } else {
        // Default to dark mode based on the provided HTML
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon w-5 h-5 text-indigo-600"></i>'; // Moon icon for light mode
            themeToggleBtn.setAttribute('aria-label', 'Chuyển sang chế độ tối');
        } else {
            htmlElement.classList.remove('light');
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun w-5 h-5 text-yellow-600"></i>'; // Sun icon for dark mode
            themeToggleBtn.setAttribute('aria-label', 'Chuyển sang chế độ sáng');
        }
    });

    // Initialize the icon based on current theme
    if (htmlElement.classList.contains('dark')) {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun w-5 h-5 text-yellow-600"></i>';
        themeToggleBtn.setAttribute('aria-label', 'Chuyển sang chế độ sáng');
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon w-5 h-5 text-indigo-600"></i>';
        themeToggleBtn.setAttribute('aria-label', 'Chuyển sang chế độ tối');
    }

    // --- Announcement Banner ---
    const announcementBanner = document.getElementById('announcement-banner');
    const closeBannerBtn = document.getElementById('close-banner-btn');

    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            announcementBanner.style.display = 'none';
        });
    }

    // --- Dropdown Menus ---
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const menu = dropdown.querySelector('.dropdown-menu');

        button.addEventListener('click', () => {
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    });

    // --- Category Tabs Scrolling ---
    const categoryTabs = document.getElementById('category-tabs');
    const scrollLeftBtn = document.querySelector('.category-nav-wrapper .nav-scroll-btn.left-0');
    const scrollRightBtn = document.querySelector('.category-nav-wrapper .nav-scroll-btn.right-0');

    if (categoryTabs && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            categoryTabs.scrollBy({
                left: -200, // Scroll 200px to the left
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            categoryTabs.scrollBy({
                left: 200, // Scroll 200px to the right
                behavior: 'smooth'
            });
        });

        // Add active state to category/subcategory tabs
        const allCategoryTabs = document.querySelectorAll('.category-tab');
        allCategoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                allCategoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // In a real app, this would filter the main content grid
                console.log('Category selected:', tab.textContent);
            });
        });

        const allSubcategoryTabs = document.querySelectorAll('.subcategory-tab');
        allSubcategoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                allSubcategoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                console.log('Subcategory selected:', tab.textContent);
            });
        });
    }

    // --- Modal Functionality ---
    const modals = document.querySelectorAll('.modal-overlay');
    const openLoginModalBtn = document.getElementById('open-login-modal-btn');
    const openVipModalBtn = document.getElementById('open-vip-modal-btn');
    const openBindAccountsModalBtn = document.getElementById('open-bind-accounts-modal-btn');
    const closeButtons = document.querySelectorAll('.modal-close-btn');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            // FIX LỖI: Loại bỏ lớp 'hidden' để modal có thể hiển thị
            modal.classList.remove('hidden');

            modal.classList.add('visible');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    function closeAllModals() {
        modals.forEach(modal => {
            modal.classList.remove('visible');
            // Thêm lại lớp 'hidden' khi đóng để đảm bảo trạng thái ban đầu (nếu nó tồn tại trong HTML)
            if (modal.id === 'login-modal' || modal.id === 'vip-packages-modal' || modal.id === 'payment-warning-modal' || modal.id === 'bind-accounts-modal') {
                modal.classList.add('hidden');
            }
        });
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Attach event listeners to open buttons
    if (openLoginModalBtn) openLoginModalBtn.addEventListener('click', (e) => { e.preventDefault(); closeAllModals(); openModal('login-modal'); });
    if (openVipModalBtn) openVipModalBtn.addEventListener('click', (e) => { e.preventDefault(); closeAllModals(); openModal('vip-packages-modal'); });
    if (openBindAccountsModalBtn) openBindAccountsModalBtn.addEventListener('click', (e) => { e.preventDefault(); closeAllModals(); openModal('bind-accounts-modal'); });

    // Attach event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    // Close modal when clicking outside of modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    // --- Login Modal Form Validation & Submission ---
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const loginMessage = document.getElementById('login-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let valid = true;

            // Clear previous errors
            usernameError.textContent = '';
            passwordError.textContent = '';
            loginMessage.textContent = '';
            loginMessage.classList.remove('success', 'error');

            if (usernameInput.value.trim() === '') {
                usernameError.textContent = 'Tài khoản không được để trống.';
                valid = false;
            }

            if (passwordInput.value.trim() === '') {
                passwordError.textContent = 'Mật khẩu không được để trống.';
                valid = false;
            }

            if (!valid) {
                return;
            }

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            const rememberMe = document.getElementById('remember-me').checked;

            try {
                // Simulate API call
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, rememberMe })
                });

                const data = await response.json();

                if (data.success) {
                    loginMessage.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
                    loginMessage.classList.add('success');

                    // ====================================================
                    // === LOGIC CHUYỂN HƯỚNG TÙY VAI TRÒ (ĐÃ SỬA) ===
                    // ====================================================

                    // Sử dụng setTimeout để người dùng kịp thấy thông báo
                    setTimeout(() => {
                        closeAllModals();

                        if (data.role === 'admin') {
                            // Chuyển hướng tới route Admin Dashboard
                            window.location.href = "/admin-dashboard";
                        } else {
                            // Chuyển hướng tới route User Dashboard (hoặc trang chủ)
                            window.location.href = "/user-dashboard";
                        }
                    }, 1500); // Đợi 1.5 giây

                } else {
                    loginMessage.textContent = `Đăng nhập thất bại: ${data.message || 'Sai tài khoản hoặc mật khẩu.'}`;
                    loginMessage.classList.add('error');
                }
            } catch (error) {
                console.error('Login error:', error);
                loginMessage.textContent = 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại.';
                loginMessage.classList.add('error');
            }
        });
    }

    // --- VIP Packages & Payment Modals ---
    const vipPackagesModal = document.getElementById('vip-packages-modal');
    const paymentWarningModal = document.getElementById('payment-warning-modal');
    const btnSelectPackage = vipPackagesModal.querySelectorAll('.btn-select');
    const orderPackageName = document.getElementById('order-package-name');
    const orderPackageDuration = document.getElementById('order-package-duration');
    const orderOriginalPrice = document.getElementById('order-original-price');
    const orderTotalPrice = document.getElementById('order-total-price');
    const qrAmount = document.getElementById('qr-amount');
    const bankTransferAmount = document.getElementById('bank-transfer-amount');
    const transferContent = document.getElementById('transfer-content');

    btnSelectPackage.forEach(button => {
        button.addEventListener('click', (e) => {
            const packageName = button.getAttribute('data-package-name');
            const packageDuration = button.getAttribute('data-package-duration');
            const packagePrice = button.getAttribute('data-package-price');
            const buttonText = button.textContent.trim();

            if (buttonText === 'Đang dùng' || buttonText === 'Liên hệ') {
                alert(`Bạn đã chọn gói ${buttonText === 'Đang dùng' ? 'Cơ bản' : 'Doanh nghiệp'}. Vui lòng chọn gói khác hoặc liên hệ hỗ trợ.`);
                return;
            }

            // Update payment summary
            if (packageName && packageDuration && packagePrice) {
                const priceFormatted = new Intl.NumberFormat('vi-VN').format(packagePrice) + ' đ';

                orderPackageName.textContent = packageName;
                orderPackageDuration.textContent = packageDuration;
                orderOriginalPrice.textContent = priceFormatted;
                orderTotalPrice.textContent = priceFormatted;
                qrAmount.textContent = priceFormatted;
                bankTransferAmount.textContent = priceFormatted;

                // Simple transfer content generation
                let content = 'VIP_';
                if (packageName === 'Tiêu Chuẩn') content += '1M';
                else if (packageName === 'Tập Vụ') content += '6M';
                else content += 'X'; // Fallback

                // Use a simplified username for transfer content placeholder
                const usernameForTransfer = 'TANUYEN';
                transferContent.textContent = `${usernameForTransfer}_${content}`;


                closeAllModals();
                openModal('payment-warning-modal');
            }
        });
    });

    // Payment method selection logic
    const paymentMethodCards = document.querySelectorAll('.payment-method-card');
    const paymentDetailsSections = document.querySelectorAll('.payment-details-section');

    paymentMethodCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('disabled')) return;

            paymentMethodCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const method = card.getAttribute('data-method');

            paymentDetailsSections.forEach(section => section.classList.add('hidden'));

            if (method === 'qr') {
                document.getElementById('payment-details-qr').classList.remove('hidden');
            } else if (method === 'bank-transfer') {
                document.getElementById('payment-details-bank-transfer').classList.remove('hidden');
            }
        });
    });

    // Simulate discount application
    const applyDiscountBtn = document.getElementById('apply-discount-btn');
    const discountCodeInput = document.getElementById('discount-code-input');

    if (applyDiscountBtn) {
        applyDiscountBtn.addEventListener('click', () => {
            const code = discountCodeInput.value.trim();
            if (code) {
                // Simulate discount logic
                if (code === 'VIPGIFT') {
                    alert('Áp dụng mã giảm giá thành công! Giảm 10%.');
                    // In a real app, update order prices
                } else {
                    alert('Mã giảm giá không hợp lệ.');
                }
            } else {
                alert('Vui lòng nhập mã giảm giá.');
            }
        });
    }

    // Simulate "Payment Complete" button
    const paymentCompleteBtn = document.getElementById('payment-complete-btn');
    if (paymentCompleteBtn) {
        paymentCompleteBtn.addEventListener('click', () => {
            alert('Thông báo: Yêu cầu thanh toán của bạn đã được ghi nhận. Hệ thống sẽ kiểm tra và kích hoạt gói VIP trong vòng 5-15 phút. Cảm ơn!');
            closeAllModals();
        });
    }

    // Simulate copy buttons in payment modal
    const copyButtons = document.querySelectorAll('.bank-info-item .copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetElement = e.currentTarget.previousElementSibling;
            if (targetElement) {
                const textToCopy = targetElement.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    alert(`Đã sao chép: ${textToCopy}`);
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                    alert('Không thể sao chép tự động. Vui lòng sao chép thủ công.');
                });
            }
        });
    });

    // --- Bind Accounts Modal Logic ---
    const bindCards = document.querySelectorAll('.bind-card');
    bindCards.forEach(card => {
        const submitBtn = card.querySelector('.btn-primary');
        const platform = card.getAttribute('data-platform');

        if (submitBtn) {
            submitBtn.addEventListener('click', async () => {
                const idInput = card.querySelector(`#${platform.toLowerCase()}-id`);
                const nicknameInput = card.querySelector(`#${platform.toLowerCase()}-nickname`);

                if (!idInput) {
                    console.error(`ID input not found for platform: ${platform}`);
                    return;
                }

                const id = idInput.value.trim();
                const nickname = nicknameInput ? nicknameInput.value.trim() : '';

                if (!id) {
                    alert(`Vui lòng nhập ID cho ${platform}.`);
                    return;
                }

                try {
                    // Simulate API call
                    const response = await fetch('/api/accounts/bind', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ platform, id, nickname })
                    });
                    const data = await response.json();
                    if (data.success) {
                        alert(data.message || `Liên kết ${platform} thành công!`);
                        // Optionally update UI to show it's bound
                    } else {
                        alert(`Liên kết ${platform} thất bại: ${data.message || 'Lỗi không xác định.'}`);
                    }
                } catch (error) {
                    console.error(`Error binding ${platform} account:`, error);
                    alert('Đã xảy ra lỗi khi liên kết tài khoản. Vui lòng thử lại.');
                }
            });
        }
    });

    // Handle "back" button in payment warning modal
    const paymentWarningBackBtn = paymentWarningModal.querySelector('.back-btn');
    if (paymentWarningBackBtn) {
        paymentWarningBackBtn.addEventListener('click', () => {
            closeAllModals();
            openModal('vip-packages-modal'); // Go back to VIP package selection
        });
    }

    // ====================================================
    // NOTE: HÀM NÀY ĐANG CHẠY LẠI LOGIC antiDevTools
    // HÃY ĐẢM BẢO CHỈ CÓ MỘT LẦN CHẠY antiDevToolsLight()
    // ====================================================
    // ===== LOGIC HIỂN THỊ MENU ĐĂNG NHẬP/ĐĂNG XUẤT =====
    fetch('/api/me')
        .then(r => r.json())
        .then(me => {

            const loginLink = document.getElementById('open-login-modal-btn');
            const logoutLink = document.getElementById('logout-link');
            const adminPanel = document.getElementById('admin-panel');

            if (me.logged_in) {

                if (loginLink) loginLink.classList.add('hidden');
                if (logoutLink) logoutLink.classList.remove('hidden');
            } else {

                if (loginLink) loginLink.classList.remove('hidden');
                if (logoutLink) logoutLink.classList.add('hidden');
            }

            if (me.role !== 'admin') {
            }

            if (me.logged_in && me.role === 'admin') {
                if (adminPanel) {
                    adminPanel.style.display = 'block';
                    loadUsers();
                }
            }
        });

// Lưu ý: Bạn cần đảm bảo đã thêm ID cho link Đăng xuất:
// <a href="/logout" class="dropdown-item hidden..." id="logout-link">...</a>

    function enableAntiDevTools() {

        setTimeout(() => {

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
            </div>`;
            }

            document.addEventListener('contextmenu', e => e.preventDefault());

            document.addEventListener('keydown', e => {
                if (
                    e.key === 'F12' ||
                    (e.ctrlKey && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase())) ||
                    (e.ctrlKey && e.key.toLowerCase() === 'u')
                ) {
                    e.preventDefault();
                    stopSite();
                }
            });

            setInterval(() => {
                const w = window.outerWidth - window.innerWidth;
                const h = window.outerHeight - window.innerHeight;
                if (w > 180 || h > 180) stopSite();
            }, 3000);

        }, 3000);
    }

// ===== LOAD USERS =====
    function loadUsers() {
        fetch('/api/admin/users')
            .then(res => res.json())
            .then(data => {
                if (!data.success) return;

                const tbody = document.getElementById('user-list');
                tbody.innerHTML = '';

                data.users.forEach(u => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                    <td>${u.username}</td>
                    <td>${u.password || '******'}</td>
                    <td>${u.role || 'user'}</td>
                `;
                    tbody.appendChild(tr);
                });
            });
    }
    // Gỡ bỏ đoạn fetch role lặp lại ở cuối DOMContentLoaded
    // fetch('/api/me')
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data.logged_in && data.role === 'admin') {
    //             document.getElementById('admin-panel').style.display = 'block';
    //             loadUsers();
    //         }
    //     });


});

