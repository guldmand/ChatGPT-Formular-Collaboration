Dropzone.autoDiscover = false;

var boBehandling = {
    checkbox: null,
    dropzoneContainer: null,
    myDropzone: null,

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
            this.initializeDropzone();
        } else {
            this.dropzoneContainer.classList.add('hidden');
            if (this.myDropzone) {
                this.myDropzone.removeAllFiles(true);
            }
        }
    },

    initializeDropzone: function() {
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
        }
    },

    handleSubmit: function(e) {
        if (this.checkbox.checked && this.myDropzone.getAcceptedFiles().length === 0) {
            e.preventDefault();
            alert('Du skal uploade mindst én fil, når checkboxen er markeret.');
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    boBehandling.init();
});