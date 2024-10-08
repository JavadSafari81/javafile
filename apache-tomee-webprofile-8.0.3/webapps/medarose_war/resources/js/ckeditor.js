ClassicEditor.create(document.querySelector('.editor'), {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
            'alignment'
        ]
    },
    language: 'fa',
    image: {
        toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    licenseKey: '',

})
    .then(editor => {
        window.editor = editor;
    })
    .catch(error => {
        console.error('Oops, something gone wrong!');
        console.error('Please, report the following error in the https://github.com/ckeditor/ckeditor5 with the build id and the error stack trace:');
        console.warn('Build id: f70extkcm4jr-ncpei71nr563');
        console.error(error);
    });