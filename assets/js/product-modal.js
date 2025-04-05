/**
 * Bootstrap-style Modal Functionality for Product Page
 * Lightweight, performance-focused implementation
 */
(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing modal...');
        initProductModal();
    });

    function initProductModal() {
        // Get all required elements
        const modal = document.getElementById('fullscreen-modal');
        const showBtn = document.getElementById('show-modal-btn');

        // Exit if essential elements don't exist
        if (!modal || !showBtn) {
            console.error('Modal or button not found:', { modal: !!modal, button: !!showBtn });
            return;
        }

        const modalContent = modal.querySelector('.modal-content');
        const modalBody = modal.querySelector('.modal-body');
        const closeBtn = modal.querySelector('.close-modal');

        // Create SEO content if it doesn't exist
        let seoContent = document.querySelector('.seo-content');
        if (!seoContent) {
            console.log('Creating SEO content element');
            seoContent = document.createElement('div');
            seoContent.className = 'seo-content hidden-content';
            seoContent.innerHTML = `
                <h2>جزئیات محصول نصرتی دکور</h2>
                <p>این محصول با کیفیت ترین محصول در دسته بندی خود می باشد که با استفاده از بهترین متریال ها و توسط ماهرترین استادکاران تولید شده است.</p>

                <div class="product-details">
                    <h3>ویژگی های محصول:</h3>
                    <ul>
                        <li>طراحی منحصر به فرد و مدرن</li>
                        <li>استفاده از مواد اولیه درجه یک</li>
                        <li>دوام و ماندگاری بالا</li>
                        <li>قابلیت سفارشی سازی بر اساس نیاز مشتری</li>
                        <li>گارانتی ۵ ساله محصول</li>
                    </ul>

                    <h3>مشخصات فنی:</h3>
                    <table>
                        <tr>
                            <th>ابعاد</th>
                            <td>۱۲۰×۸۰×۴۵ سانتی متر</td>
                        </tr>
                        <tr>
                            <th>وزن</th>
                            <td>۳۵ کیلوگرم</td>
                        </tr>
                        <tr>
                            <th>جنس</th>
                            <td>چوب راش، MDF روکش دار</td>
                        </tr>
                        <tr>
                            <th>رنگ های موجود</th>
                            <td>طبیعی، گردویی، مشکی، سفید</td>
                        </tr>
                    </table>

                    <h3>نحوه سفارش:</h3>
                    <p>برای سفارش این محصول می توانید از طریق شماره تماس ۰۲۱-۱۲۳۴۵۶۷۸ با کارشناسان ما در ارتباط باشید یا فرم سفارش آنلاین را در وبسایت تکمیل نمایید.</p>

                    <h3>زمان تحویل:</h3>
                    <p>زمان تحویل این محصول بین ۷ تا ۱۰ روز کاری می باشد.</p>
                </div>
            `;
            document.body.appendChild(seoContent);
        }

        // State variables
        let isModalOpen = false;
        let scrollPosition = 0;

        // Show modal function - Bootstrap style
        function showModal(e) {
            if (e) e.preventDefault();
            if (isModalOpen) return;

            console.log('Opening modal');

            // Save scroll position
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            // Copy SEO content to modal
            if (modalBody && seoContent) {
                modalBody.innerHTML = seoContent.innerHTML;
            }

            // Show modal with optimized animation
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling

            // Ensure modal is visible in current viewport
            window.scrollTo({
                top: window.scrollY,
                behavior: 'auto'
            });

            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                modal.classList.add('show');
                isModalOpen = true;

                // Force browser to recognize the modal in the current viewport
                setTimeout(() => {
                    window.scrollTo({
                        top: window.scrollY,
                        behavior: 'auto'
                    });
                }, 50);
            });
        }

        // Close modal function
        function closeModal() {
            if (!isModalOpen) return;

            console.log('Closing modal');
            modal.classList.remove('show');
            isModalOpen = false;

            // Hide modal after animation completes
            setTimeout(() => {
                modal.style.display = 'none';
                if (modalBody) modalBody.innerHTML = '';
                document.body.style.overflow = ''; // Restore scrolling

                // Restore scroll position
                window.scrollTo(0, scrollPosition);
            }, 300);
        }

        // Event listeners - using passive where possible for better performance
        showBtn.addEventListener('click', showModal, { passive: false });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal, { passive: true });
        }

        // Close when clicking outside content
        modal.addEventListener('click', function(e) {
            if (modalContent && !modalContent.contains(e.target)) {
                closeModal();
            }
        }, { passive: true });

        // Close with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        }, { passive: true });

        // Allow scrolling within modal content
        if (modalBody) {
            modalBody.addEventListener('wheel', function(e) {
                e.stopPropagation();
            }, { passive: true });

            modalBody.addEventListener('touchmove', function(e) {
                e.stopPropagation();
            }, { passive: true });
        }

        console.log('Modal initialized successfully');
    }
})();
