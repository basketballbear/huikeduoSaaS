const menuHtml = `
        <div class="logo">运营平台</div>
        <nav class="main-nav">
            <ul class="menu">
                <li><a href="dashboard.html" class="menu-item">首页</a></li>
                <li class="menu-has-submenu">
                    <a href="#" class="menu-item">商家管理 <span class="arrow">&#9660;</span></a>
                    <ul class="submenu">
                        <li><a href="merchant-basic-info.html">商家基本信息</a></li>
                        <li><a href="merchant-stores.html">商家门店</a></li>
                        <li><a href="merchant-product-auth.html">商家产品授权</a></li>
                        <li><a href="merchant-main-account.html">商家主账号</a></li>
                        <li><a href="merchant-contracts.html">商家合同</a></li>
                    </ul>
                </li>
                <li class="menu-has-submenu">
                    <a href="#" class="menu-item">商家代运营 <span class="arrow">&#9660;</span></a>
                    <ul class="submenu">
                        <li><a href="#">代运营概览</a></li>
                        <li><a href="#">代运营配置</a></li>
                    </ul>
                </li>
                <li class="menu-has-submenu">
                    <a href="#" class="menu-item">数据中心 <span class="arrow">&#9660;</span></a>
                    <ul class="submenu">
                        <li><a href="#">数据概览</a></li>
                        <li><a href="#">报表管理</a></li>
                    </ul>
                </li>
                <li class="menu-has-submenu">
                    <a href="#" class="menu-item">财务结算 <span class="arrow">&#9660;</span></a>
                    <ul class="submenu">
                        <li><a href="#">结算概览</a></li>
                        <li><a href="#">账单管理</a></li>
                    </ul>
                </li>
                <li class="menu-has-submenu">
                    <a href="#" class="menu-item">账户中心 <span class="arrow">&#9660;</span></a>
                    <ul class="submenu">
                        <li><a href="#">个人设置</a></li>
                        <li><a href="#">安全设置</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    `;

function renderMenu() {
    document.querySelector('.sidebar').innerHTML = menuHtml;

    // Menu expand/collapse functionality
    document.querySelectorAll('.menu-has-submenu > .menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                this.classList.toggle('expanded');
                submenu.classList.toggle('open');
            }
        });
    });

    // Handle menu item clicks to load content into iframe
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const title = this.textContent.trim();
            if (href && href !== '#') {
                window.parent.postMessage({ type: 'navigate', href: href, title: title }, '*');
            }
        });
    });

    // Highlight active page based on iframe src on initial load
    window.addEventListener('message', function(event) {
        if (event.data.type === 'highlightMenu') {
            const path = event.data.path;
            document.querySelectorAll('.main-nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === path) {
                    link.classList.add('active');
                    let parentSubmenu = link.closest('.submenu');
                    if (parentSubmenu) {
                        parentSubmenu.classList.add('open');
                        let parentMenuItem = parentSubmenu.previousElementSibling;
                        if (parentMenuItem && parentMenuItem.classList.contains('menu-item')) {
                            parentMenuItem.classList.add('expanded');
                        }
                    }
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', renderMenu);