// document.domain = "localhost";
dialogSingle = "http://localhost/filemanager/filemanager/dialog.php?akey=mySonMichael";
dialog = "http://localhost/filemanager/filemanager/dialog.php?akey=mySonMichael&type=2&popup=1&field_id=";
dialogCkV = "http://localhost/filemanager/filemanager/dialog_full_path.php?akey=mySonMichael&type=2&editor=ckeditor&fldr=";
dialogCkI = "http://localhost/filemanager/filemanager/dialog_full_path.php?akey=mySonMichael&type=1&editor=ckeditor&fldr=";

// document.domain = "raaz.co";
// dialogSingle = "https://files.raaz.co/filemanager/filemanager/dialog.php?akey=mySonMichael";
// dialog = "https://files.raaz.co/filemanager/filemanager/dialog.php?akey=mySonMichael&type=2&popup=1&field_id=";
// dialogCkV = "https://files.raaz.co/filemanager/filemanager/dialog_full_path.php?akey=mySonMichael&type=2&editor=ckeditor&fldr=";
// dialogCkI = "https://files.raaz.co/filemanager/filemanager/dialog_full_path.php?akey=mySonMichael&type=1&editor=ckeditor&fldr=";


function confsave() {

    if (confirm(' ثبت انجام گردد؟')) {
        return true;
    }
    return false;
}

function confsure() {

    if (confirm('آیا مطممئن هستید  ؟')) {
        return true;
    }
    return false;
}

function confsureBlackList(status) {
    if (status == 1) {
        if (confirm('آیا مطمئن هستید؟ ')) {
            return true;
        }
        return false;
    }
    if (confirm('هشدار! اگر این کانال را به black list اضافه کنید نمی تواند در هیچ یک از تبلیغات شما شرکت کند. آیا مطمئن هستید؟ ')) {
        return true;
    }
    return false;
}


function confsave12() {

    if (confirm(' ثبت انجام گردد؟')) {
        return true;
    }
    return false;
}

function confdelete() {

    if (confirm('اطلاعات مورد نظر حذف گردد؟')) {
        return true;
    }
    return false;
}

function confsaveval() {
    if (checkinputval()) {
        if (confirm('ثبت انجام گردد')) {
            return true;
        }
        return false;

    }
    alert('فیلدهای اجباری را پر نمایید');
    return false;
}

function confsavevalforTurnClose() {

    if (checkinputval()) {
        if (confirm('آیا فرآیند بسته شود؟')) {
            return true;
        }
        return false;

    }

}

function checkinputval() {
    var ret = true;
    $("input").each(function () {
        ret = validateInput(this);
        if (ret == false)
            return false;
    });
    if (ret) {
        $("select").each(function () {
            ret = validateInput(this);
            if (ret == false)
                return false;
            ;
        });
    }
    return ret;

}

function getKtsClass(vcl) {
    var classesf = $(vcl).attr('class');
    if (classesf != undefined) {
        if (classesf.indexOf('kts') > -1) {
            var classes = $(vcl).attr('class').split(' ');

            //alert(classes);
            for (c in classes) {
                var idx = classes[c].indexOf('kts')
                if (idx > -1)
                    return classes[c];
            }
        }
    }
    return '';


}

function validateName(vvname, cls) {
    //if it's NOT valid
    var minl = cls.substring(4) - 1;
    var vname = $(vvname);

    if (vname.val().length > minl) {
        vname.removeClass("error");
        vname.css('background-color', '#FFFFFF');

        return true;
    }
    //if it's valid
    else {
        vname.addClass("error");
        vname.css('background-color', '#FFEDEF');
        //alert('فیلدهای اجباری را پر نمایید');
        vname.focus();
        return false;
    }
}

function validateValue(vvname, cls) {
    //if it's NOT valid
    var minl = cls.substring(4);
    var vname = $(vvname);
    if (vname.val() >= minl) {
        vname.removeClass("error");
        vname.css('background-color', '#FFFFFF');
        return true;
    }
    //if it's valid
    else {
        vname.addClass("error");
        vname.css('background-color', '#FFEDEF');
        //alert('فیلدهای اجباری را پر نمایید');
        vname.focus();
        return false;
    }
}

function validateInput(inpval) {
    var ktcls = getKtsClass(inpval);
    if (ktcls.length > 7) {
        var pfn = ktcls.substring(0, 3);
        if (pfn = 'kts') {
            fn = ktcls.substring(4, 7);
            mn = ktcls.substring(4, 8)
            //ktcls.substring(4);
            if (fn == 'mnl') {
                return validateName(inpval, ktcls.substring(4));
            } else if (fn == 'mnv') {
                return validateValue(inpval, ktcls.substring(4));
            } else if (fn == 'tim') {
                return validateTimeInput(inpval, ktcls.substring(4));
            } else if (mn == 'maxv') {
                return validatemaxValue(inpval, ktcls.substring(10));
            }
        }
    }
    return true;
}


function validatemaxValue(inputField, cls) {
    var mxv = cls.substring(4);
}

function validateTimeInput(inputField, cls) {
    var minl = cls.substring(4) - 1;
    var vname = $(inputField);
    if (vname.val().length > minl) {
        var isValid = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])?$/.test(inputField.value);
        if (isValid) {
            isValid.removeClass("error");
            inputField.style.backgroundColor = '#bfa';
            return true;
        } else {
            isValid.addClass("error");
            inputField.style.backgroundColor = '#fba';
            return false;
        }
    } else {
        vname.addClass("error");
        vname.css('background-color', '#FFEDEF');
        //alert('فیلدهای اجباری را پر نمایید');
        vname.focus();
        return false;
    }
}

function rebindinputkeydown() {
    //var $inp=$(this).find('input,select');
    var $inp = $('input:not(:disabled)');
    $inp.bind('keydown', function (e) {
        var key = e.which;
        validateInput(this);
        if (key == 13) {
            e.preventDefault();
            var nxtIdx = $inp.index(this) + 1;
            $(":input:eq(" + nxtIdx + ")").select();
            $(":input:eq(" + nxtIdx + ")").focus();
        }
    });
}

/*
 $(function() {
 $('input:text:first').focus();
 var $inp=$(this).find('input,select');
 $inp.bind('keydown', function(e) {
 var key = e.which;

 validateInput(this);
 if (key == 13) {
 e.preventDefault();
 var nxtIdx = $inp.index(this) + 1;
 $(":input:eq(" + nxtIdx + ")").select();
 $(":input:eq(" + nxtIdx + ")").focus();
 }
 });
 });
 */
function justNumeric() {
    var key;
    if (window.event) {
        key = window.event.keyCode;
    }

    var isnum = false;
    if (key > 47)
        if (key < 58) {
            isnum = true;
        }

    if (!isnum) {
        if (key != 13)
            window.event.keyCode = '';
    }


}

function renderCalendar() {
    $(function () {
        $('.calendar').datepicker({
            dateFormat: 'yy/mm/dd',
            showOn: 'button',
            changeMonth: true,
            changeYear: true,
            buttonImage: '/resources/icons/calendar24.png',
            buttonImageOnly: true
        });
    });
}

function showCkDefault(editorId) {
    CKEDITOR.replace(editorId, {
        filebrowserBrowseUrl: dialogCkV,
        filebrowserUploadUrl: dialogCkV,
        filebrowserImageBrowseUrl: dialogCkI,
        filebrowserImageUploadUrl: dialogCkI,
        height: '400px'
    });
    CKEDITOR.config.extraPlugins = "html5video";
    CKEDITOR.config.extraPlugins = "lineheight";

    CKEDITOR.config.toolbarGroups = [
        {name: 'document', groups: ['mode', 'document', 'doctools']},
        {name: 'clipboard', groups: ['clipboard', 'undo']},
        {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
        {name: 'forms', groups: ['forms']},
        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
        {name: 'links', groups: ['links']},
        {name: 'insert', groups: ['insert']},
        {name: 'styles', groups: ['styles']},
        {name: 'colors', groups: ['colors']},
        {name: 'tools', groups: ['tools']},
        {name: 'others', groups: ['others']},
        {name: 'about', groups: ['about']},
        '/'
    ];
    CKEDITOR.config.removeButtons = 'Save,NewPage,Preview,Print,Templates,Cut,Copy,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,Textarea,TextField,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Language,Flash,PageBreak,About,ShowBlocks,Font'
}

function ckUpdate() {
    for (instance in CKEDITOR.instances) {
        CKEDITOR.instances[instance].updateElement();
        instance.allowedContent = true;
    }
}