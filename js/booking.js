document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;

    // Dynamic form fields based on purpose
    const purposeSelect = document.getElementById('purpose');
    const sewingTypeGroup = document.getElementById('sewing-type-group');
    const trainingTypeGroup = document.getElementById('training-type-group');

    function toggleServiceFields() {
        const purpose = purposeSelect.value;
        if (purpose === 'fitting') {
            sewingTypeGroup.style.display = 'block';
            trainingTypeGroup.style.display = 'none';
        } else if (purpose === 'training') {
            sewingTypeGroup.style.display = 'none';
            trainingTypeGroup.style.display = 'block';
        } else {
            sewingTypeGroup.style.display = 'none';
            trainingTypeGroup.style.display = 'none';
        }
    }

    if (purposeSelect) {
        purposeSelect.addEventListener('change', toggleServiceFields);
        toggleServiceFields(); // initial state
    }

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const fullname = document.getElementById('fullname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const purpose = document.getElementById('purpose').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!fullname || !phone || !email || !purpose || !date || !time) {
            alert('Please fill in all required fields.');
            return;
        }

        let sewingType = '', trainingType = '';
        if (purpose === 'fitting') {
            sewingType = document.getElementById('sewing-type').value;
            if (!sewingType) {
                alert('Please select a sewing service.');
                return;
            }
        } else if (purpose === 'training') {
            trainingType = document.getElementById('training-type').value;
            if (!trainingType) {
                alert('Please select a training course.');
                return;
            }
        }

        // Create booking object
        const booking = {
            id: Date.now(),
            fullname,
            phone,
            email,
            purpose,
            sewingType,
            trainingType,
            date,
            time,
            message,
            timestamp: new Date().toISOString()
        };

        // Save to LocalStorage
        let bookings = JSON.parse(localStorage.getItem('eliza_bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('eliza_bookings', JSON.stringify(bookings));

        // Show success popup
        alert('✅ Booking successful! You will now be redirected to WhatsApp.');

        // Prepare WhatsApp message
        let whatsappMessage = `Hello Eliza Couture, I would like to book:%0A`;
        whatsappMessage += `*Name:* ${fullname}%0A`;
        whatsappMessage += `*Phone:* ${phone}%0A`;
        whatsappMessage += `*Email:* ${email}%0A`;
        whatsappMessage += `*Purpose:* ${purpose === 'fitting' ? '📏 Sewing Fitting' : '🎓 Training Enrollment'}%0A`;
        
        if (purpose === 'fitting') {
            whatsappMessage += `*Sewing Service:* ${sewingType}%0A`;
        } else if (purpose === 'training') {
            whatsappMessage += `*Training Course:* ${trainingType}%0A`;
        }
        
        whatsappMessage += `*Preferred Date:* ${date}%0A`;
        whatsappMessage += `*Preferred Time:* ${time}%0A`;
        
        if (message) {
            whatsappMessage += `*Message:* ${message}%0A`;
        }

        // Replace with your WhatsApp number
        const whatsappNumber = '08132030245'; // client number
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        // Redirect to WhatsApp
        window.open(whatsappURL, '_blank');

        // Optionally reset form
        bookingForm.reset();
        toggleServiceFields();
    });
});