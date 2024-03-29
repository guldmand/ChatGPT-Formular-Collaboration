Dropzone.autoDiscover = false;

var boBehandling = {
    checkbox: null,
    dropzoneContainer: null,
    dropzoneValidation: null,
    dropzoneField: null,
    myDropzone: null,
    dropzoneValidationFieldValue: null,

    init: function() {
        this.checkbox = document.getElementById('uploadCheckbox');
        this.dropzoneContainer = document.getElementById('dropzoneContainer');
        this.checkbox.addEventListener('change', this.toggleDropzoneVisibility.bind(this));
        this.toggleDropzoneVisibility();

        // Custom temporary AlertSubmit handling
        this.form = document.getElementById('dataForm');
        
        // if submit is clicked
        document.getElementById('dataForm').addEventListener('submit', this.handleSubmit.bind(this));
    },

    showSubmitAlert: function(e) {
        console.log('showSubmitAlert');
        e.preventDefault(); // Prevent form submission
        var formData = new FormData(this.form);
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object, null, 2);
        alert(json); // Show form data
    },

    toggleDropzoneVisibility: function() {
        if (this.checkbox.checked) {
            this.dropzoneContainer.classList.remove('hidden');
            this.initializeDropzone();
        } else {
            this.dropzoneContainer.classList.add('hidden');
            if (this.myDropzone) {
                this.myDropzone.removeAllFiles(true);
                this.hideDropzoneValidation();
            }
        }
    },

    initializeDropzone: function() {
        var self = this; // Reference to the boBehandling object
        if (!this.myDropzone) {
            this.myDropzone = new Dropzone("#my-awesome-dropzone", {
                url: "/file/post",
                autoProcessQueue: false,
                previewTemplate: '<div class="dz-preview dz-file-preview">' +
                                    '<div class="dz-details">' +
                                    '<div class="dz-filename icon icon--document"><span data-dz-name></span></div>' +
                                    '<div class="dz-size" data-dz-size></div>' +                          
                                    '<a class="dz-remove" data-dz-remove><span>Fjern</span></a>' +
                                    '</div>' +                     
                                 '</div>',
            });
    
            // Add event listener for "addedfile" event
            this.myDropzone.on("addedfile", function(file) {
                console.log(' + file was added to dropzone')
                document.getElementById('dropzoneValidationField').value = '1'; // Indicate that a file has been added
                // Hide dropzone validation error as soon as a file is added
                self.hideDropzoneValidation();
            });

            // Add event listener for "removedfile" event
            this.myDropzone.on("removedfile", function(file) {
                console.log(' - file was removed from dropzone')
                if (self.myDropzone.files.length === 0) {
                    document.getElementById('dropzoneValidationField').value = ''; // Reset if no files are present
                }
            });
        }
    },
    
    handleSubmit: function(e) {
        if (this.checkbox.checked && this.myDropzone.getAcceptedFiles().length === 0) {
            e.preventDefault();
            //console.log('zero files was added to the dropzone');
            this.showDropzoneValidation();
        }

        if (this.checkbox.checked && this.myDropzone.getAcceptedFiles().length > 0) {
            //console.log('Files was added to the dropzone');
            this.hideDropzoneValidation();
    
            // Prepare form data
            var formData = new FormData();
            this.myDropzone.getAcceptedFiles().forEach(function(file) {
                formData.append('files', file);
            });

            e.preventDefault();
            this.showSubmitAlert(e);
    
            /* temporarily disabled because of customALert
            // Send the AJAX request
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:5000/submit-form', true);
            //xhr.setRequestHeader('Content-Type', 'application/json'); // Set Content-Type header
            xhr.setRequestHeader('x-api-key', 'ThisIsJustATest'); // Set x-api-key header
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // Redirect to kvittering.html if the upload was successful
                    window.location.href = 'kvittering.html';
                } else {
                    // Handle error
                    console.error('An error occurred during the upload');
                }
            };
            xhr.send(formData);
            */
        }
    },

    showDropzoneValidation: function() {
        //console.log( 'time to show custom dropzone validation error');
        // Vis dropzone invalid ValideringsFelt
        this.dropzoneValidation = document.querySelector('.dropzoneCustomValidation');
        this.dropzoneValidation.classList.remove('hidden');
        // Vis Dropzone felt error
        this.dropzoneField = document.querySelector('.dz-default');
        this.dropzoneField.classList.add('error');
    },

    hideDropzoneValidation: function() {
        //console.log( 'time to hide custom dropzone validation error');
        // skjul dropzone invalid ValideringsFelt
        this.dropzoneValidation = document.querySelector('.dropzoneCustomValidation');
        this.dropzoneValidation.classList.add('hidden');
        // Skjul Dropzone felt error
        this.dropzoneField = document.querySelector('.dz-default');
        this.dropzoneField.classList.remove('error');
    },

};

document.addEventListener('DOMContentLoaded', function() {
    boBehandling.init();
});