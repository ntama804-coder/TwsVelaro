// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function selectColor(element, imageUrl) {
    // Remove the 'active' class from all color choices
    const colorChoices = document.querySelectorAll('.color-choice');
    colorChoices.forEach(choice => {
        choice.classList.remove('active');
    });
    
    // Add the 'active' class to the clicked color choice
    element.classList.add('active');

    // Store the selected image URL in local storage
    localStorage.setItem('selectedProductImage', imageUrl);
}

// Handle Gopay payment method selection and Complete Purchase button logic
document.addEventListener('DOMContentLoaded', function() {
    // --- Logic for Index.html to load selected color and activate color choice ---
    if (window.location.pathname.includes('Index.html') || window.location.pathname === '/') {
        const storedImageUrl = localStorage.getItem('selectedProductImage');
        const colorChoices = document.querySelectorAll('.color-choice');

        if (storedImageUrl) {
            // Update the active class for the color choice
            colorChoices.forEach(choice => {
                // Ensure comparison is only for the filename, as path might differ slightly
                const storedFilename = storedImageUrl.substring(storedImageUrl.lastIndexOf('/') + 1);
                const choiceFilename = choice.src.substring(choice.src.lastIndexOf('/') + 1);

                if (choiceFilename === storedFilename) {
                    choice.classList.add('active');
                } else {
                    choice.classList.remove('active');
                }
            });
        } else if (colorChoices.length > 0) {
            // If no image is stored, set the first color option as active by default
            const firstColorChoice = colorChoices[0];
            firstColorChoice.classList.add('active');
            localStorage.setItem('selectedProductImage', firstColorChoice.src);
        }
    }


    // --- Logic for Checkout.html to display selected color and payment methods/Complete Purchase button ---
    if (window.location.pathname.includes('checkout.html')) {
        const storedImageUrl = localStorage.getItem('selectedProductImage');
        const productImageCheckout = document.getElementById('productImageCheckout');
        const selectedColorText = document.getElementById('selectedColorText');

        if (storedImageUrl && productImageCheckout) {
            productImageCheckout.src = storedImageUrl;
            // Attempt to extract color from filename for display
            const filename = storedImageUrl.substring(storedImageUrl.lastIndexOf('/') + 1);
            let colorName = "Unknown";
            if (filename.includes('White.png')) colorName = "White";
            else if (filename.includes('Black.png')) colorName = "Black";
            else if (filename.includes('Blue.png')) colorName = "Blue";
            else if (filename.includes('Pink.png')) colorName = "Pink";
            
            if (selectedColorText) {
                selectedColorText.textContent = `Selected Color: ${colorName}`;
            }
        }
    }


    const gopayRadio = document.getElementById('gopay');
    const codRadio = document.getElementById('cod');
    const completePurchaseButton = document.getElementById('completePurchaseButton');

    // Ensure that Bootstrap's Modal is available before trying to instantiate it
    let gopayModalInstance;
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const gopayModalElement = document.getElementById('gopayModal');
        if (gopayModalElement) {
            gopayModalInstance = new bootstrap.Modal(gopayModalElement);
        }

        // console.error("Bootstrap's Modal JavaScript component is not loaded."); // Commented out to avoid console clutter
    }
// 1. Ambil referensi tombol Complete Purchase
    const completeBtn = document.getElementById('completePurchaseButton');

    if (completeBtn) {
        // 2. Pasang fungsi HANYA pada klik tombol ini
        completeBtn.addEventListener('click', function() {
            // Ambil pilihan pembayaran
            const isGopay = document.getElementById('gopay').checked;
            const isCod = document.getElementById('cod').checked;

            if (isGopay) {
              // Ganti baris 113-115 dengan ini:
const modalElement = document.getElementById('gopayModal');
const gopayModalInstance = new bootstrap.Modal(modalElement);
gopayModalInstance.show();
            } else if (isCod) {
                // Jika pilih COD, arahkan ke WhatsApp
                window.location.href = 'https://wa.me/62818625671?text=Saya%20ingin%20pesan%20TWS%20lewat%20COD.';
            } else {
                // Jika belum pilih apa-apa tapi sudah klik tombol
                alert('Silakan pilih metode pembayaran terlebih dahulu!');
            }
        });
    }
}); // Ini penutup DOMContentLoaded di baris paling bawah