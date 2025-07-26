       let currentPage = 1;
        const productsPerPage = 9;
        let currentCategory = null;

        const productsGrid = document.querySelector('.products-grid');
        const pagination = document.querySelector('.page-navigation');
        const prevPageBtn = document.getElementById('prevPage');
        const nextPageBtn = document.getElementById('nextPage');
        const pageButtons = pagination.querySelectorAll('.page-btn');
        const displayOptions = document.querySelectorAll('.view-toggle-buttons button');
        const sortSelect = document.getElementById('sort-select');
        const brandSelect = document.getElementById('brand-select');
        const collectionCards = document.querySelectorAll('.collection-card');
        const snackbar = document.getElementById('snackbar');

        const productItems = Array.from(document.querySelectorAll('.product-item'));

        function showSnackbar(message) {
            snackbar.textContent = message;
            snackbar.classList.add('show');
            setTimeout(() => {
                snackbar.classList.remove('show');
            }, 3000);
        }

        function filterProducts(category) {
            currentCategory = category;
            renderProducts(1);
            showSnackbar(`Đã chọn danh mục: ${category || 'Tất cả'}`);
        }

        function renderProducts(page = 1) {
            let filteredProducts = currentCategory
                ? productItems.filter(item => item.dataset.category === currentCategory)
                : productItems;

            const start = (page - 1) * productsPerPage;
            const paginatedProducts = filteredProducts.slice(start, start + productsPerPage);

            productsGrid.innerHTML = '';

            paginatedProducts.forEach(product => {
                productsGrid.appendChild(product);
            });

            currentPage = page;
            pageButtons.forEach((btn, idx) => {
                btn.classList.toggle('active', idx + 1 === page);
                btn.setAttribute('aria-current', (idx + 1 === page) ? 'page' : 'false');
            });
            prevPageBtn.disabled = (page === 1);
            nextPageBtn.disabled = (page >= Math.ceil(filteredProducts.length / productsPerPage));
        }

        pagination.addEventListener('click', e => {
            if (e.target.classList.contains('page-btn')) {
                const pageNum = Number(e.target.textContent);
                if (!isNaN(pageNum)) {
                    renderProducts(pageNum);
                }
            }
            if (e.target === prevPageBtn && currentPage > 1) {
                renderProducts(currentPage - 1);
            }
            if (e.target === nextPageBtn && currentPage < Math.ceil(productItems.filter(item => !currentCategory || item.dataset.category === currentCategory).length / productsPerPage)) {
                renderProducts(currentPage + 1);
            }
        });

        displayOptions.forEach(btn => {
            btn.addEventListener('click', () => {
                displayOptions.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');

                switch (btn.id) {
                    case 'display-1':
                        productsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                        break;
                    case 'display-2':
                        productsGrid.style.gridTemplateColumns = '1fr';
                        break;
                    case 'display-3':
                        productsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                        break;
                }
            });
        });

        sortSelect.addEventListener('change', e => {
            const val = e.target.value;
            let sortedProducts = [...productItems];

            if (val === 'price-low') {
                sortedProducts.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.product-price').textContent.match(/\$([\d.]+)/)[1]);
                    const priceB = parseFloat(b.querySelector('.product-price').textContent.match(/\$([\d.]+)/)[1]);
                    return priceA - priceB;
                });
            } else if (val === 'price-high') {
                sortedProducts.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.product-price').textContent.match(/\$([\d.]+)/)[1]);
                    const priceB = parseFloat(b.querySelector('.product-price').textContent.match(/\$([\d.]+)/)[1]);
                    return priceB - priceA;
                });
            } else if (val === 'newest') {
                sortedProducts.reverse();
            }

            productItems.length = 0;
            productItems.push(...sortedProducts);
            renderProducts(1);
        });

        brandSelect.addEventListener('change', e => {
            showSnackbar(`Filter by brand: ${e.target.value || 'Any Brand'} (filter not implemented in demo)`);
        });

        collectionCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                filterProducts(category);
            });
        });

        document.querySelector('.btn-buy-now').addEventListener('click', () => {
            showSnackbar('Đi đến trang mua sắm (chưa triển khai trong demo)');
        });

        renderProducts(currentPage);