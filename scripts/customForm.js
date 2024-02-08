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
        if (checkbox.checked) {
            dropzoneContainer.classList.remove('hidden');
            initializeDropzone(); // Initialize Dropzone when the checkbox is checked
        } else {
            dropzoneContainer.classList.add('hidden');
            // If you need to reset or disable Dropzone, do it here
        }
    }

    // Event listener for the checkbox
    checkbox.addEventListener('change', toggleDropzoneVisibility);

    // Call the function initially in case the checkbox is already checked when the page loads
    toggleDropzoneVisibility();
});
