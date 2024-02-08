document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.noValidate = true; // Deaktiver browserens standard validering

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Forhindrer formen i at blive indsendt

        let isValid = true;

        // Tjek hver input for validering
        form.querySelectorAll('.sb-form__input').forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            console.log('Formular er gyldig og klar til at blive indsendt.');
            // Her kan du indsætte logik for at indsende formen, f.eks. via AJAX.
        }
    });

    // Validering ved input-ændring
    form.querySelectorAll('.sb-form__input').forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
});

function validateInput(input) {
    const fieldset = input.closest('.sb-form__set');
    const errorText = fieldset.querySelector('.sb-form__error-text');

    if (!input.checkValidity()) {
        fieldset.classList.add('error');
        input.classList.add('was-invalid');
        errorText.style.display = 'block';
        return false;
    } else {
        fieldset.classList.remove('error');
        errorText.style.display = 'none';
        if (input.classList.contains('was-invalid')) {
            input.classList.add('valid-now');
            setTimeout(() => {
                input.classList.remove('valid-now', 'was-invalid');
            }, 5000);
        }
        return true;
    }
}
