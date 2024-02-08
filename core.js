document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Forhindrer formen i at blive indsendt før validering

        let isValid = true;

        // Validerer hvert felt ved at kalde en generisk valideringsfunktion
        form.querySelectorAll('.sb-form__input').forEach(input => {
            const isInputValid = validateInput(input); // Validerer input og opdaterer UI
            if (!isInputValid) {
                isValid = false; // Hvis et felt fejler i valideringen, sæt isValid til false
            }
        });

        if (isValid) {
            // Alle felter er gyldige, form kan indsendes eller anden logik kan udføres
            console.log('Formular er gyldig og klar til at blive indsendt.');
            // form.submit(); // Eller anden indsendelseslogik
        }
    });

    function validateInput(input) {
        const fieldset = input.closest('.sb-form__set');
        const errorText = fieldset.querySelector('.sb-form__error-text');
        
        if (input.validity.valid) {
            fieldset.classList.remove('error'); // Fjerner fejlklasse, hvis feltet er gyldigt
            input.removeAttribute('data-invalid');
            errorText.style.display = 'none'; // Skjuler fejlmeddelelse
            return true;
        } else {
            fieldset.classList.add('error'); // Tilføjer fejlklasse, hvis feltet ikke er gyldigt
            input.setAttribute('data-invalid', '');
            errorText.style.display = 'block'; // Viser fejlmeddelelse
            return false;
        }
    }
});
