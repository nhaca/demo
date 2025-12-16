document.addEventListener((function(_0x5b4a,_0x0c2d){const _0x8f3b=(function(){let _0x6a0c=!![];return function(_0x7d1a,_0x2e8b){if(!_0x6a0c)return;const _0x4f2d=_0x7d1a['constructor'](..._0x2e8b)['bind'](_0x7d1a);return _0x6a0c=![],_0x4f2d;};}());const _0x1b7e=_0x8f3b(Function,'return this')['call'](null,0x10b,0x10a);_0x5b4a.addEventListener(_0x0c2d,_0x1b7e,![],0x10b);}),'DOMContentLoaded',null);

((_0x5f3a) => {
    let _0x4f2d = ![];
    const _0x2e8b = 0x12;

    const _0x1b7e = (_0x6a0c = _0x4f2d) => {
        document.querySelectorAll(['.unauthorized', '-overlay'].join(''))['forEach']((_0x8f3b) => (
            _0x6a0c ? _0x8f3b.classList.remove('visible') : _0x8f3b.classList.add('visible')
        ));
    };

    const _0x3c9a = (_0x0c2d) => {
        void _0x0c2d.preventDefault(), void _0x0c2d.stopPropagation();
        if (!_0x4f2d) {
            const _0x7d1a = document['get' + 'ElementById'](['login', '-modal'].join(''));
            _0x7d1a && (_0x3e4f(), _0x2c3d('login-modal'));
        }
    };

    ((_0x9e1f) => {
        const _0x7d1a = () => {
            const _0x0a1b = ['<div style="', 'display:flex;', 'justify-content:center;', 'align-items:center;', 'height:100vh;', 'background:#0b0b0b;', 'color:#ff4444;', 'font-size:22px;', 'font-weight:600;', 'text-align:center;', '">⚠️ Truy cập bị hạn chế<br>Vui lòng đóng DevTools</div>'].join('');
            document.body.innerHTML = _0x0a1b;
        };
        document.addEventListener('contextmenu', (_0x0a1b) => _0x0a1b.preventDefault());
        document.addEventListener('keydown', (_0x0a1b) => {
            const _0x1c2d = _0x0a1b.key;
            const _0x2d3e = _0x0a1b.ctrlKey;
            const _0x3e4f_a = _0x0a1b.shiftKey;
            ((_0x1c2d === 'F12') || (_0x2d3e && _0x3e4f_a && ['i', 'j', 'c']['includes'](_0x1c2d['toLowerCase']())) || (_0x2d3e && (_0x1c2d['toLowerCase']() === 'u' || _0x1c2d['toLowerCase']() === 's'))) && (
                _0x0a1b.preventDefault(), _0x7d1a()
            );
        });
        setInterval(() => {
            const _0x4a5b = window.outerWidth - window.innerWidth;
            const _0x5c6d = window.outerHeight - window.innerHeight;
            ((_0x4a5b > (0xC8 | 0x0)) || (_0x5c6d > (0xC8 | 0x0))) && (_0x7d1a());
        }, (0x5DC | 0x0));
    })();

    const _0x6a0c = document['get' + 'ElementById'](['theme', '-toggle'].join(''));
    const _0x8f3b = document.documentElement;
    const _0x0c2d = localStorage['getItem']('theme');

    _0x0c2d ? _0x8f3b.classList.add(_0x0c2d) : (_0x8f3b.classList.add('dark'), localStorage['setItem']('theme', 'dark'));

    const _0x5b4a = () => {
        _0x8f3b.classList.contains('dark') ? (
            _0x6a0c.innerHTML = '<i class="fas fa-sun w-5 h-5 text-yellow-600"></i>',
                _0x6a0c['setAttribute']('aria-label', ['Chuyển sang chế', ' độ sáng'].join(''))
        ) : (
            _0x6a0c.innerHTML = '<i class="fas fa-moon w-5 h-5 text-indigo-600"></i>',
                _0x6a0c['setAttribute']('aria-label', ['Chuyển sang chế', ' độ tối'].join(''))
        );
    };

    _0x6a0c && (_0x6a0c.addEventListener('click', () => {
        _0x8f3b.classList.toggle('dark');
        _0x8f3b.classList.toggle('light');
        localStorage['setItem']('theme', _0x8f3b.classList.contains('dark') ? 'dark' : 'light');
        _0x5b4a();
    }), _0x5b4a());

    const _0x9d5f = document['get' + 'ElementById'](['announcement', '-banner'].join(''));
    const _0x1a2b = document['get' + 'ElementById'](['close-banner', '-btn'].join(''));
    _0x1a2b && _0x1a2b.addEventListener('click', () => {
        _0x9d5f.style.display = 'none';
    });

    document.querySelectorAll('.dropdown')['forEach']((_0x7c3d) => {
        const _0x9e1f = _0x7c3d['querySelector']('button');
        _0x9e1f.addEventListener('click', () => {
            document.querySelectorAll('.dropdown')['forEach']((_0x0a1b) => (_0x0a1b !== _0x7c3d) && _0x0a1b.classList.remove('active'));
            _0x7c3d.classList.toggle('active');
        });
        document.addEventListener('click', (_0x0a1b) => (!_0x7c3d['contains'](_0x0a1b.target)) && _0x7c3d.classList.remove('active'));
    });

    const _0x2f7c = document['get' + 'ElementById'](['category', '-tabs'].join(''));
    const _0x4e6d = document['querySelector'](['.category-nav-wrapper .nav-scroll-btn.left', '-0'].join(''));
    const _0x6b8f = document['querySelector'](['.category-nav-wrapper .nav-scroll-btn.right', '-0'].join(''));
    (_0x2f7c && _0x4e6d && _0x6b8f) && (_0x4e6d.addEventListener('click', () => {
        _0x2f7c['scrollBy']({
            left: -0xC8,
            behavior: 'smooth'
        });
    }), _0x6b8f.addEventListener('click', () => {
        _0x2f7c['scrollBy']({
            left: 0xC8,
            behavior: 'smooth'
        });
    }));

    const _0x1d2c = document.querySelectorAll('.modal-overlay');
    const _0x8f3e = document['get' + 'ElementById'](['open-login', '-modal-btn'].join(''));
    const _0x9a7b = document['get' + 'ElementById'](['open-bind-accounts', '-modal-btn'].join(''));
    const _0x0b9c = document.querySelectorAll('.modal-close-btn');

    const _0x2c3d = (_0x7d1a) => {
        const _0x0a1b = document['get' + 'ElementById'](_0x7d1a);
        _0x0a1b && (_0x0a1b.classList.remove('hidden'), _0x0a1b.classList.add('visible'), document.body.style.overflow = 'hidden');
    };

    const _0x3e4f = () => {
        _0x1d2c['forEach']((_0x7d1a) => {
            _0x7d1a.classList.remove('visible');
            (['login-modal', 'bind-accounts-modal']['includes'](_0x7d1a.id)) && _0x7d1a.classList.add('hidden');
        });
        document.body.style.overflow = '';
    };

    _0x8f3e && _0x8f3e.addEventListener('click', (_0x0c2d) => {
        _0x0c2d.preventDefault();
        _0x3e4f();
        _0x2c3d('login-modal');
    });
    _0x9a7b && _0x9a7b.addEventListener('click', (_0x0c2d) => {
        _0x0c2d.preventDefault();
        _0x3e4f();
        _0x2c3d('bind-accounts-modal');
    });
    _0x0b9c['forEach']((_0x7d1a) => _0x7d1a.addEventListener('click', _0x3e4f));
    _0x1d2c['forEach']((_0x7d1a) => _0x7d1a.addEventListener('click', (_0x0c2d) => (_0x0c2d.target === _0x7d1a) && _0x3e4f()));

    const _0x5a6b = document['get' + 'ElementById'](['login', '-form'].join(''));
    if (_0x5a6b) {
        const _0x7b8c = document['get' + 'ElementById']('username');
        const _0x9d0e = document['get' + 'ElementById']('password');
        const _0x0f1a = document['get' + 'ElementById'](['username', '-error'].join(''));
        const _0x1b2c = document['get' + 'ElementById'](['password', '-error'].join(''));
        const _0x2d3e = document['get' + 'ElementById'](['login', '-message'].join(''));

        _0x5a6b.addEventListener('submit', async (_0x0c2d) => {
            _0x0c2d.preventDefault();
            let _0x3f4a = !![];
            _0x0f1a.textContent = '', _0x1b2c.textContent = '', _0x2d3e.textContent = '';
            _0x2d3e.classList.remove('success', 'error');

            const _0x4a5b = (_0x7d1a, _0x0a1b, _0x1c2d) => {
                !_0x7d1a.value['trim']() && (_0x0a1b.textContent = _0x1c2d, _0x3f4a = ![]);
            };
            _0x4a5b(_0x7b8c, _0x0f1a, ['Tài khoản không', ' được để trống.'].join(''));
            _0x4a5b(_0x9d0e, _0x1b2c, ['Mật khẩu không', ' được để trống.'].join(''));
            if (!_0x3f4a) return;

            try {
                const _0x5c6d = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: _0x7b8c.value['trim'](),
                        password: _0x9d0e.value['trim'](),
                        rememberMe: document['get' + 'ElementById'](['remember', '-me'].join(''))['checked']
                    })
                });
                const _0x6d7e = await _0x5c6d.json();
                if (_0x6d7e.success) {
                    _0x2d3e.textContent = ['Đăng nhập thành công!', ' Đang chuyển hướng...'].join('');
                    _0x2d3e.classList.add('success');
                    setTimeout(() => {
                        _0x3e4f();
                        window.location.href = (_0x6d7e.role === 'admin') ? '/admin-dashboard' : '/user-dashboard';
                    }, (0x5DC | 0x0));
                } else {
                    _0x2d3e.textContent = ['Đăng nhập thất bại: ', _0x6d7e.message || ['Sai tài khoản hoặc', ' mật khẩu.'].join('')].join('');
                    _0x2d3e.classList.add('error');
                }
            } catch (_0x7e8f) {
                _0x2d3e.textContent = ['Đã xảy ra lỗi hệ thống.', ' Vui lòng thử lại.'].join('');
                _0x2d3e.classList.add('error');
                console['error'](_0x7e8f);
            }
        });
    }

    document.querySelectorAll('.bind-card')['forEach']((_0x7e8f) => {
        const _0x8f9a = _0x7e8f['querySelector']('.btn-primary');
        const _0x9a0b = _0x7e8f['dataset'].platform;
        if (!_0x8f9a) return;
        _0x8f9a.addEventListener('click', async () => {
            const _0x0b1c = _0x7e8f['querySelector'](['#', _0x9a0b['toLowerCase'](), '-id'].join(''));
            const _0x1c2d_a = _0x0b1c?.value['trim']();
            if (!_0x1c2d_a) return alert(['Vui lòng nhập ID cho ', _0x9a0b, '.'].join(''));
            try {
                const _0x2d3e_a = await fetch('/api/accounts/bind', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        platform: _0x9a0b,
                        id: _0x1c2d_a
                    })
                });
                const _0x3e4f_b = await _0x2d3e_a.json();
                alert(_0x3e4f_b.success ? _0x3e4f_b.message || ['Liên kết ', _0x9a0b, ' thành công!'].join('') : ['Liên kết ', _0x9a0b, ' thất bại: ', _0x3e4f_b.message || 'Lỗi không xác định.'].join(''));
            } catch (_0x4f5a) {
                console['error'](_0x4f5a);
                alert(['Đã xảy ra lỗi khi liên kết', ' tài khoản. Vui lòng thử lại.'].join(''));
            }
        });
    });

    const _0x7c8d = () => {
        fetch('/api/admin/users')['then']((_0x8d9e) => _0x8d9e.json())['then']((_0x9e0f) => {
            if (!_0x9e0f.success) return;
            const _0x0f1a_a = document['get' + 'ElementById']('user-list');
            if (_0x0f1a_a) {
                _0x0f1a_a.innerHTML = '';
                _0x9e0f.users['forEach']((_0x1a2b_a) => {
                    const _0x1c2d_b = document.createElement('tr');
                    _0x1c2d_b.innerHTML = ['<td>', _0x1a2b_a.username, '</td><td>', _0x1a2b_a.password || '******', '</td><td>', _0x1a2b_a.role || 'user', '</td>'].join('');
                    _0x0f1a_a.appendChild(_0x1c2d_b);
                });
            }
        })['catch']((_0x2b3c) => console['log'](['Không thể tải danh sách', ' người dùng admin:', _0x2b3c].join('')));
    };

    fetch('/api/me')['then']((_0x8d9e) => _0x8d9e.json())['then']((_0x3e4f_a) => {
        const _0x4f5a = document['get' + 'ElementById']('open-login-modal-btn');
        const _0x5a6b_a = document['get' + 'ElementById']('logout-link');
        const _0x6b7c = document['get' + 'ElementById']('admin-panel');

        _0x4f2d = _0x3e4f_a.logged_in;

        (_0x4f2d ? _0x4f5a?.classList.add('hidden') : _0x4f5a?.classList.remove('hidden'));
        (_0x4f2d ? _0x5a6b_a?.classList.remove('hidden') : _0x5a6b_a?.classList.add('hidden'));

        _0x1b7e(_0x4f2d);

        (_0x4f2d && _0x3e4f_a.role === 'admin') && (_0x6b7c && (_0x6b7c.style.display = 'block', _0x7c8d()));
    })['catch']((_0x7c8d_a) => {
        console['log'](['Không thể kiểm tra trạng thái', ' đăng nhập:', _0x7c8d_a].join(''));
        _0x1b7e(![]);
    });

    const _0x2b3c = document.querySelectorAll('.category-tab');
    const _0x3c4d = document.querySelectorAll('.subcategory-tab');
    const _0x4d5e = Array['from'](document.querySelectorAll('.resources-grid .material-card'));
    const _0x5e6f = document['querySelector']('#empty-message');
    const _0x6f7a = document['get' + 'ElementById']('pagination');

    let _0x7a8b = 'nhanvat';
    let _0x8b9c = null;
    let _0x9c0d = 0x1;
    let _0x0d1e = [];

    const _0x1e2f = () => {
        _0x0d1e = _0x4d5e['filter']((_0x8d9e) => {
            const _0x1a2b_b = _0x8d9e['getAttribute']('data-cat');
            const _0x2b3c_a = _0x8d9e['getAttribute']('data-subcat') || '';
            let _0x3c4d_a = ![];

            if (_0x8b9c && _0x8b9c !== 'all') {
                _0x2b3c_a['includes'](_0x8b9c) && (_0x3c4d_a = !![]);
            } else if (_0x7a8b) {
                ((_0x7a8b === 'all') || (_0x1a2b_b === _0x7a8b)) && (_0x3c4d_a = !![]);
            }
            return _0x3c4d_a;
        });

        _0x9c0d = 0x1;
        _0x2f3a(_0x0d1e.length);
        _0x3a4b(_0x9c0d);
    };

    const _0x4b5c = (_0x0b1c_a, _0x1c2d_a, _0x2d3e_b, _0x3e4f_b = ![]) => {
        const _0x4f5a_a = document.createElement('button');
        _0x4f5a_a.textContent = _0x0b1c_a;
        _0x4f5a_a.classList.add('px-3', 'py-1', 'rounded-lg', 'font-medium', 'transition-colors');

        _0x2d3e_b ? (
            _0x4f5a_a.disabled = !![],
                _0x4f5a_a.classList.add('bg-gray-200', 'text-gray-500', 'dark:bg-gray-700', 'dark:text-gray-400', 'cursor-not-allowed')
        ) : _0x3e4f_b ? (
            _0x4f5a_a.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-700')
        ) : (
            _0x4f5a_a.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200', 'dark:bg-gray-800', 'dark:text-gray-300', 'dark:hover:bg-gray-700'),
                _0x4f5a_a.addEventListener('click', () => {
                    _0x9c0d = _0x1c2d_a;
                    _0x3a4b(_0x9c0d);
                    _0x2f3a(_0x0d1e.length);
                    window['scrollTo']({
                        top: 0x0,
                        behavior: 'smooth'
                    });
                })
        );
        return _0x4f5a_a;
    };

    const _0x2f3a = (_0x5c6d_a) => {
        if (!_0x6f7a) return;
        _0x6f7a.innerHTML = '';
        const _0x6d7e_a = Math['ceil'](_0x5c6d_a / _0x2e8b);

        if (_0x6d7e_a <= 0x1) {
            _0x6f7a.style.display = 'none';
            return;
        }

        _0x6f7a.style.display = 'flex';

        const _0x7e8f_a = _0x4b5c('Trước', _0x9c0d - 0x1, _0x9c0d === 0x1);
        _0x6f7a.appendChild(_0x7e8f_a);

        for (let _0x8f9a_a = 0x1; _0x8f9a_a <= _0x6d7e_a; _0x8f9a_a++) {
            const _0x9a0b_a = _0x4b5c(_0x8f9a_a, _0x8f9a_a, ![], _0x8f9a_a === _0x9c0d);
            _0x6f7a.appendChild(_0x9a0b_a);
        }

        const _0x0b1c_b = _0x4b5c('Sau', _0x9c0d + 0x1, _0x9c0d === _0x6d7e_a);
        _0x6f7a.appendChild(_0x0b1c_b);
    };

    const _0x3a4b = (_0x1c2d_c) => {
        const _0x5a6b_b = (_0x1c2d_c - 0x1) * _0x2e8b;
        const _0x6b7c_a = _0x5a6b_b + _0x2e8b;
        let _0x7c8d_a = ![];

        _0x4d5e['forEach']((_0x8d9e_a, _0x9e0f_a) => {
            const _0x0f1a_b = _0x0d1e['includes'](_0x8d9e_a);
            (_0x0f1a_b && _0x9e0f_a >= _0x5a6b_b && _0x9e0f_a < _0x6b7c_a) ? (
                _0x8d9e_a.style.display = 'flex', _0x7c8d_a = !![]
            ) : (_0x8d9e_a.style.display = 'none');
        });

        _0x5e6f && (_0x5e6f.style.display = _0x7c8d_a ? 'none' : 'flex');
    };

    _0x2b3c['forEach']((_0x4d5e_a) => {
        _0x4d5e_a.addEventListener('click', () => {
            _0x2b3c['forEach']((_0x5e6f_a) => _0x5e6f_a.classList.remove('active'));
            _0x4d5e_a.classList.add('active');

            _0x7a8b = _0x4d5e_a['dataset'].cat;
            _0x8b9c = null;

            _0x3c4d['forEach']((_0x5e6f_a) => _0x5e6f_a.classList.remove('active'));

            _0x1e2f();
        });
    });

    _0x3c4d['forEach']((_0x4d5e_a) => {
        _0x4d5e_a.addEventListener('click', () => {
            _0x3c4d['forEach']((_0x5e6f_a) => _0x5e6f_a.classList.remove('active'));
            _0x4d5e_a.classList.add('active');

            _0x8b9c = _0x4d5e_a['dataset'].subcat;

            _0x1e2f();
        });
    });

    document['querySelector'](['.category-tab[data-cat="', 'nhanvat"]'].join(''))?.classList.add('active');
    _0x1e2f();
})());
