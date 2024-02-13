Dropzone.autoDiscover = false;

var boBehandling = {
    checkbox: null,
    dropzoneContainer: null,
    dropzoneValidation: null,  //.dropzoneCustomValidation
    dropzoneField: null,       //.dz-default
    myDropzone: null,

    //validation
    //filesRequired: null,
    dropzoneValidationFieldValue: null,

    init: function() {
        this.checkbox = document.getElementById('uploadCheckbox');
        this.dropzoneContainer = document.getElementById('dropzoneContainer');

        this.checkbox.addEventListener('change', this.toggleDropzoneVisibility.bind(this));
        this.toggleDropzoneVisibility();
        document.getElementById('dataForm').addEventListener('submit', this.handleSubmit.bind(this));
    },

    toggleDropzoneVisibility: function() {
        if (this.checkbox.checked) {
            this.dropzoneContainer.classList.remove('hidden');
            //this.filesRequired = true;
            //console.log( 'files required value: '+  this.filesRequired);
            this.initializeDropzone();
        } else {
            this.dropzoneContainer.classList.add('hidden');
            //this.filesRequired = false;
            //console.log( 'files required value: '+  this.filesRequired);
            //console.log(this.dropzoneValidation);

            if (this.myDropzone) {
                this.myDropzone.removeAllFiles(true);
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

                document.getElementById('dropzoneValidationField').value = '1'; // Indicate that a file has been added

                // Hide dropzone validation error as soon as a file is added
                self.hideDropzoneValidation();
            });

            this.myDropzone.on("removedfile", function(file) {
                if (self.myDropzone.files.length === 0) {
                    document.getElementById('dropzoneValidationField').value = ''; // Reset if no files are present
                }
            });
        }
    },
    
    


    handleSubmit: function(e) {
        if (this.checkbox.checked && this.myDropzone.getAcceptedFiles().length === 0) {
            e.preventDefault();
            console.log('zero files was added to the dropzone');
            this.showDropzoneValidation();
        }
    },

    showDropzoneValidation: function() {
        console.log( 'time to show custom dropzone validation error');
        // Vis dropzone invalid ValideringsFelt
        this.dropzoneValidation = document.querySelector('.dropzoneCustomValidation');
        this.dropzoneValidation.classList.remove('hidden');
        //console.log(this.dropzoneValidation);

        // Vis Dropzone felt error
        this.dropzoneField = document.querySelector('.dz-default');
        this.dropzoneField.classList.add('error');
        //console.log(this.dropzoneField);
    },

    hideDropzoneValidation: function() {
        console.log( 'time to hide custom dropzone validation error');
        // skjul dropzone invalid ValideringsFelt
        this.dropzoneValidation = document.querySelector('.dropzoneCustomValidation');
        this.dropzoneValidation.classList.add('hidden');
        //console.log(this.dropzoneValidation);

        // Skjul Dropzone felt error
        this.dropzoneField = document.querySelector('.dz-default');
        this.dropzoneField.classList.remove('error');
    },

};

document.addEventListener('DOMContentLoaded', function() {
    boBehandling.init();
});