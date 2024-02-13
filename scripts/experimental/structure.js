Dropzone.autoDiscover = false;
var boBehandling = {
    // Variables
    checkbox : document.getElementById('funeral_checkbox'),
    dropzoneContainer : document.getElementById('dropzoneContainer'),
    sksInput: document.querySelector('input[name="sks_nr"]'),
    apiURL: processEnv.settings.api + '/api/bobehandling/v1/application/submit',
    form: document.getElementById('BobehandlingsForm'),
 
    init : function() {
        // code

    },

    setupDropzone : function() {
        // code
    },
 
    toggleDropzoneDisplay : function() {        
        // code
    },
 
    toggleFuneralBillRequired : function( isRequired ) {
        // code
    },

     setSKSprefix : function() {
        // code
    },

    pasteSKS : function() {
        // code
    },


	error: function( response ) {
        // code
	},


    handleSubmit: function(e){
        // code
    },

};

domReady(function() {
	boBehandling.init();	
});