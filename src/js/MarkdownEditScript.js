$(function () {
    BrowserDetect.init();
    
    var converter = new showdown.Converter();
    converter.setOption('tables', true); // 開啟表格功能
    converter.setOption('tasklists', true); // 開啟 checkbox 功能
    
    var $drop = $('#drop');
    var $openBtn = $('#openBtn');
    var $saveBtn = $('#saveBtn');
    var $editBtn = $('#editBtn');
    var $splitBtn = $('#splitBtn');
    var $previewBtn = $('#previewBtn');
    
    var mFileName;
    var mText, mHtml;

    
    var renderMdPreview = function(){
        mHtml = converter.makeHtml(mText);
        $drop.html(mHtml);
    }

    var dragOverEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.originalEvent.dataTransfer.dropEffect = 'copy';
        $(this).addClass('dragging');
    }
    var fileSelectEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();

        var files = event.originalEvent.dataTransfer.files;
        var file = files[0];
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate.toLocaleDateString(), '</li>');
        }
        
        mFileName = file.name;
        
        var fReader = new FileReader();
        fReader.onload = function (event) {
            mText = event.target.result;
            renderMdPreview();
        };
        fReader.readAsText(files[0]);
    }
    
    $openBtn.off('click').on('click', function () {
        alert('OwO 開啟檔案 ');
    });

    $saveBtn.off('click').on('click', function () {
        download(mFileName,mText);
    });

    $editBtn.off('click').on('click', function () {
        alert('OwO 編輯文字 ');
    });

    $splitBtn.off('click').on('click', function () {
        alert('OwO 分割比對 ');
    });

    $previewBtn.off('click').on('click', function () {
        alert('OwO 預覽文字 ');
    });

    $drop.on('dragover', dragOverEvent);
    $drop.on('drop', fileSelectEvent);

});
