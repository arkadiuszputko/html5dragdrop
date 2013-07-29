var holder = document.getElementById('holder'),
    tests = {
        filereader: typeof FileReader != 'undefined',
        formdata: !!window.FormData
    }, 
    acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/jpg': true
    },
    fileupload = document.getElementById('upload'),
    thumbnails = document.getElementById('thumbnails');
//for every uploaded image, create link, add image, resize it and ads click to link that opens new window
function previewfile(file) {
    if (tests.filereader === true && acceptedTypes[file.type] === true) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var link = document.createElement('a'),
                image = new Image(),
                wWidth = 0,
                wHeight = 0;
            image.src = event.target.result;
            image.onload = function () {
                wWidth = this.width;
                wHeight = this.height;
                this.width = 150;
                this.height = 150;
            };
            link.setAttribute('href', image.src);
            link.setAttribute('target', '_blank');
            thumbnails.appendChild(link);
            link.appendChild(image);

            link.onclick = function (e) {
                e.preventDefault();
                window.open(this.href,  null, 'height=' + wHeight + ', width=' + wWidth + ', toolbar=0, location=0, status=0, scrollbars=0, resizable=0');
            };
        };

    reader.readAsDataURL(file);
};
//read files from dropdown area, or input type file
function readfiles(files) {
    var data = tests.formdata ? new FormData() : null,
        i,
        length = files.length;
    for (i = 0; i < length; i++) {
        if (tests.formdata) {
            data.append('file', files[i]);
        }
        previewfile(files[i]);
    }
}
//ondrop handler, start reading files
holder.ondrop = function (e) {
    e.preventDefault();
    readfiles(e.dataTransfer.files);
};
//start reading files when input files has been changed
fileupload.onchange = function () {
    readfiles(this.files);
};
