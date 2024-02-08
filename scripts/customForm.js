// Disable Dropzone's auto-discovery feature.
Dropzone.autoDiscover = false;

document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('uploadCheckbox');
    var dropzoneContainer = document.getElementById('dropzoneContainer');
    var myDropzone = null; // Initialize the variable but don't create the Dropzone yet

    // Function to initialize Dropzone
    function initializeDropzone() {
        if (!myDropzone) { // Only initialize if myDropzone hasn't been created yet
            myDropzone = new Dropzone("#my-awesome-dropzone", {
                url: "/file/post",
                autoProcessQueue: false
            });
        }
    }

    // Function to toggle Dropzone visibility
    function toggleDropzoneVisibility() {
        var checkbox = document.getElementById('uploadCheckbox');
        var dropzoneContainer = document.getElementById('dropzoneContainer');
    
        if (checkbox.checked) {
            dropzoneContainer.classList.remove('hidden');
            // Sikrer, at Dropzone er initialiseret
            if (!myDropzone) {
                initializeDropzone();
            }
            // Aktiver validering for Dropzone (kræver mindst én fil)
            myDropzone.options.dictDefaultMessage = "Træk filer herhen for at uploade (påkrævet)";
            myDropzone.required = true; // Dette er mere symbolsk, da Dropzone ikke bruger en 'required' egenskab på samme måde som native input felter.
        } else {
            dropzoneContainer.classList.add('hidden');
            // Deaktiver validering for Dropzone
            if (myDropzone) {
                myDropzone.removeAllFiles(true); // Fjerner alle filer og resetter Dropzone, hvis det er nødvendigt
            }
            myDropzone.options.dictDefaultMessage = "Træk filer herhen for at uploade";
            myDropzone.required = false; // Igen, mere symbolsk
        }
    }

    document.getElementById('dataForm').addEventListener('submit', function(e) {
        var checkbox = document.getElementById('uploadCheckbox');
        // Tjek om checkboxen er markeret, og om der er filer i Dropzone
        if (checkbox.checked && myDropzone.getAcceptedFiles().length === 0) {
            e.preventDefault(); // Forhindrer formen i at blive indsendt
            alert('Du skal uploade mindst én fil, når checkboxen er markeret.');
            // Tilføj yderligere brugerfeedback her, f.eks. visning af en fejlmeddelelse
        }
    });   
    

    // Event listener for the checkbox
    checkbox.addEventListener('change', toggleDropzoneVisibility);

    // Call the function initially in case the checkbox is already checked when the page loads
    toggleDropzoneVisibility();
});
