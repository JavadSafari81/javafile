$(function () {

    $(function () {
        $('#date').datepicker({
            dateFormat: 'yy/mm/dd',
            showOn: 'button',
            buttonImage: '/images/calendar24.png',
            buttonImageOnly: true
        });
    });



});


$(function () {
    $('#fromdatestr').datepicker({
        dateFormat: 'yy/mm/dd',
        showOn: 'button',
        buttonImage: '/images/calendar24.png',
        buttonImageOnly: true,
        onSelect: function (dateText, inst) {
            $('#todatestr').datepicker('option', 'minDate', new JalaliDate(inst['selectedYear'], inst['selectedMonth'], inst['selectedDay']), 'maxDate', new JalaliDate(inst['selectedYear'], inst['selectedMonth'], inst['selectedDay']));
        }
    });
    $('#todatestr').datepicker({
        dateFormat: 'yy/mm/dd',
        showOn: 'button',
        buttonImage: '../images/calendar24.png',
        buttonImageOnly: true
    });
});
$('#datepicker1').datepicker({
    showWeek: true,
    dateFormat: 'yy/mm/dd'
});
//-----------------------------------
// پرکردن فیلد اضافی
$("#datepicker2").datepicker({
    dateFormat: 'dd/mm/yy',
    altField: '#alternate2',
    altFormat: 'DD، d MM yy'
});
//-----------------------------------
// نمایش دکمه ها
$('#datepicker3').datepicker({
    showButtonPanel: true
});
//-----------------------------------
// تغییر قالب نمایش تاریخ و تغییر سایز خودکار فیلد
$("#datepicker4").datepicker({
    dateFormat: 'dd/mm/yy',
    autoSize: true
});
$("#format4").change(function () {
    $('#datepicker4').datepicker('option', {dateFormat: $(this).val()});
});
//-----------------------------------
// استفاده از dropdown
$('#datepicker50').datepicker({
    changeMonth: true,
    changeYear: true
});
//-----------------------------------
// انتخاب با کلیک بر روی عکس
$("#datepicker6").datepicker({
    showOn: 'button',
    buttonImage: '../images/calander.png',
    buttonImageOnly: true
});
//-----------------------------------
// نمایش inline
$('#datepicker7').datepicker();
//-----------------------------------
// نمایش چند ماه
$('#datepicker8').datepicker({
    numberOfMonths: 3,
    showButtonPanel: true
});
//-----------------------------------
// غیرفعال کردن روزها
$('#datepicker9').datepicker({
    beforeShowDay: function (date) {
        if (date.getDay() == 5)
            return [false, '', 'تعطیلات آخر هفته'];
        return [true];
    }
});
//-----------------------------------
// تاریخ پیشفرض
$('#datepicker10').datepicker({
    defaultDate: new JalaliDate(1361, 4, 10)	//this means "1361/05/10"
});


/*
 ====================================================================
 */
jQuery(function ($) {
    $.datepicker.regional['fa'] = {
        calendar: JalaliDate,
        closeText: 'بستن',
        prevText: 'قبل',
        nextText: 'بعد',
        currentText: 'امروز',
        monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        monthNamesShort: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        dayNames: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],
        dayNamesShort: ['یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه', 'شنبه'],
        dayNamesMin: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
        weekHeader: 'ه',
        dateFormat: 'dd/mm/yy',
        firstDay: 6,
        isRTL: true,
        showMonthAfterYear: false,
        yearSuffix: '',
        calculateWeek: function (date) {
            var checkDate = new JalaliDate(date.getFullYear(), date.getMonth(), date.getDate() + (date.getDay() || 7) - 3);
            return Math.floor(Math.round((checkDate.getTime() - new JalaliDate(checkDate.getFullYear(), 0, 1).getTime()) / 86400000) / 7) + 1;
        }
    };
    $.datepicker.setDefaults($.datepicker.regional['fa']);
});

function JalaliDate(p0, p1, p2) {
    var gregorianDate;
    var jalaliDate;

    if (!isNaN(parseInt(p0)) && !isNaN(parseInt(p1)) && !isNaN(parseInt(p2))) {
        var g = jalali_to_gregorian([parseInt(p0, 10), parseInt(p1, 10), parseInt(p2, 10)]);
        setFullDate(new Date(g[0], g[1], g[2]));
    } else {
        setFullDate(p0);
    }

    function jalali_to_gregorian(d) {
        var adjustDay = 0;
        if (d[1] < 0) {
            adjustDay = leap_persian(d[0] - 1) ? 30 : 29;
            d[1]++;
        }
        var gregorian = jd_to_gregorian(persian_to_jd(d[0], d[1] + 1, d[2]) - adjustDay);
        gregorian[1]--;
        return gregorian;
    }

    function gregorian_to_jalali(d) {
        var jalali = jd_to_persian(gregorian_to_jd(d[0], d[1] + 1, d[2]));
        jalali[1]--;
        return jalali;
    }

    function setFullDate(date) {
        if (date && date.getGregorianDate)
            date = date.getGregorianDate();
        gregorianDate = new Date(date);
        gregorianDate.setHours(gregorianDate.getHours() > 12 ? gregorianDate.getHours() + 2 : 0)
        if (!gregorianDate || gregorianDate == 'Invalid Date' || isNaN(gregorianDate || !gregorianDate.getDate())) {
            gregorianDate = new Date();
        }
        jalaliDate = gregorian_to_jalali([
            gregorianDate.getFullYear(),
            gregorianDate.getMonth(),
            gregorianDate.getDate()]);
        return this;
    }

    this.getGregorianDate = function () {
        return gregorianDate;
    }

    this.setFullDate = setFullDate;

    this.setMonth = function (e) {
        jalaliDate[1] = e;
        var g = jalali_to_gregorian(jalaliDate);
        gregorianDate = new Date(g[0], g[1], g[2]);
        jalaliDate = gregorian_to_jalali([g[0], g[1], g[2]]);
    }

    this.setDate = function (e) {
        jalaliDate[2] = e;
        var g = jalali_to_gregorian(jalaliDate);
        gregorianDate = new Date(g[0], g[1], g[2]);
        jalaliDate = gregorian_to_jalali([g[0], g[1], g[2]]);
    };

    this.getFullYear = function () {
        return jalaliDate[0];
    };
    this.getMonth = function () {
        return jalaliDate[1];
    };
    this.getDate = function () {
        return jalaliDate[2];
    };
    this.toString = function () {
        return jalaliDate.join(',').toString();
    };
    this.getDay = function () {
        return gregorianDate.getDay();
    };
    this.getHours = function () {
        return gregorianDate.getHours();
    };
    this.getMinutes = function () {
        return gregorianDate.getMinutes();
    };
    this.getSeconds = function () {
        return gregorianDate.getSeconds();
    };
    this.getTime = function () {
        return gregorianDate.getTime();
    };
    this.getTimeZoneOffset = function () {
        return gregorianDate.getTimeZoneOffset();
    };
    this.getYear = function () {
        return jalaliDate[0] % 100;
    };

    this.setHours = function (e) {
        gregorianDate.setHours(e)
    };
    this.setMinutes = function (e) {
        gregorianDate.setMinutes(e)
    };
    this.setSeconds = function (e) {
        gregorianDate.setSeconds(e)
    };
    this.setMilliseconds = function (e) {
        gregorianDate.setMilliseconds(e)
    };
}
/*
 ==============================================================================
 */
function mod(a, b) {
    return a - (b * Math.floor(a / b));
}
/*
 JavaScript functions for the Fourmilab Calendar Converter

 by John Walker  --  September, MIM
 http://www.fourmilab.ch/documents/calendar/

 This program is in the public domain.
 */
function leap_gregorian(year) {
    return ((year % 4) == 0) &&
        (!(((year % 100) == 0) && ((year % 400) != 0)));
}
var GREGORIAN_EPOCH = 1721425.5;
function gregorian_to_jd(year, month, day) {
    return (GREGORIAN_EPOCH - 1) +
        (365 * (year - 1)) +
        Math.floor((year - 1) / 4) +
        (-Math.floor((year - 1) / 100)) +
        Math.floor((year - 1) / 400) +
        Math.floor((((367 * month) - 362) / 12) +
        ((month <= 2) ? 0 :
            (leap_gregorian(year) ? -1 : -2)
        ) +
        day);
}
function jd_to_gregorian(jd) {
    var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
        yindex, dyindex, year, yearday, leapadj;

    wjd = Math.floor(jd - 0.5) + 0.5;
    depoch = wjd - GREGORIAN_EPOCH;
    quadricent = Math.floor(depoch / 146097);
    dqc = mod(depoch, 146097);
    cent = Math.floor(dqc / 36524);
    dcent = mod(dqc, 36524);
    quad = Math.floor(dcent / 1461);
    dquad = mod(dcent, 1461);
    yindex = Math.floor(dquad / 365);
    year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
    if (!((cent == 4) || (yindex == 4))) {
        year++;
    }
    yearday = wjd - gregorian_to_jd(year, 1, 1);
    leapadj = ((wjd < gregorian_to_jd(year, 3, 1)) ? 0
        :
        (leap_gregorian(year) ? 1 : 2)
    );
    month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
    day = (wjd - gregorian_to_jd(year, month, 1)) + 1;

    return new Array(year, month, day);
}

function leap_islamic(year) {
    return (((year * 11) + 14) % 30) < 11;
}
var ISLAMIC_EPOCH = 1948439.5;
function islamic_to_jd(year, month, day) {
    return (day +
        Math.ceil(29.5 * (month - 1)) +
        (year - 1) * 354 +
        Math.floor((3 + (11 * year)) / 30) +
        ISLAMIC_EPOCH) - 1;
}
function jd_to_islamic(jd) {
    var year, month, day;

    jd = Math.floor(jd) + 0.5;
    year = Math.floor(((30 * (jd - ISLAMIC_EPOCH)) + 10646) / 10631);
    month = Math.min(12,
        Math.ceil((jd - (29 + islamic_to_jd(year, 1, 1))) / 29.5) + 1);
    day = (jd - islamic_to_jd(year, month, 1)) + 1;
    return new Array(year, month, day);
}

function leap_persian(year) {
    return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
}
var PERSIAN_EPOCH = 1948320.5;
function persian_to_jd(year, month, day) {
    var epbase, epyear;

    epbase = year - ((year >= 0) ? 474 : 473);
    epyear = 474 + mod(epbase, 2820);

    return day +
        ((month <= 7) ?
            ((month - 1) * 31) :
            (((month - 1) * 30) + 6)
        ) +
        Math.floor(((epyear * 682) - 110) / 2816) +
        (epyear - 1) * 365 +
        Math.floor(epbase / 2820) * 1029983 +
        (PERSIAN_EPOCH - 1);
}
function jd_to_persian(jd) {
    var year, month, day, depoch, cycle, cyear, ycycle,
        aux1, aux2, yday;


    jd = Math.floor(jd) + 0.5;

    depoch = jd - persian_to_jd(475, 1, 1);
    cycle = Math.floor(depoch / 1029983);
    cyear = mod(depoch, 1029983);
    if (cyear == 1029982) {
        ycycle = 2820;
    } else {
        aux1 = Math.floor(cyear / 366);
        aux2 = mod(cyear, 366);
        ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
        aux1 + 1;
    }
    year = ycycle + (2820 * cycle) + 474;
    if (year <= 0) {
        year--;
    }
    yday = (jd - persian_to_jd(year, 1, 1)) + 1;
    month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
    day = (jd - persian_to_jd(year, month, 1)) + 1;
    return new Array(year, month, day);
}
/*
 ====================================================================================
 */
/*
 JavaScript functions for positional astronomy

 by John Walker  --  September, MIM
 http://www.fourmilab.ch/

 This program is in the public domain.
 */

//  Frequently-used constants

var
    J2000 = 2451545.0, // Julian day of J2000 epoch
    JulianCentury = 36525.0, // Days in Julian century
    JulianMillennium = (JulianCentury * 10), // Days in Julian millennium
    AstronomicalUnit = 149597870.0, // Astronomical unit in kilometres
    TropicalYear = 365.24219878;           // Mean solar tropical year

/*  ASTOR  --  Arc-seconds to radians.  */

function astor(a) {
    return a * (Math.PI / (180.0 * 3600.0));
}

/*  DTR  --  Degrees to radians.  */

function dtr(d) {
    return (d * Math.PI) / 180.0;
}

/*  RTD  --  Radians to degrees.  */

function rtd(r) {
    return (r * 180.0) / Math.PI;
}

/*  FIXANGLE  --  Range reduce angle in degrees.  */

function fixangle(a) {
    return a - 360.0 * (Math.floor(a / 360.0));
}

/*  FIXANGR  --  Range reduce angle in radians.  */

function fixangr(a) {
    return a - (2 * Math.PI) * (Math.floor(a / (2 * Math.PI)));
}

//  DSIN  --  Sine of an angle in degrees

function dsin(d) {
    return Math.sin(dtr(d));
}

//  DCOS  --  Cosine of an angle in degrees

function dcos(d) {
    return Math.cos(dtr(d));
}

/*  MOD  --  Modulus function which works for non-integers.  */

function mod(a, b) {
    return a - (b * Math.floor(a / b));
}

//  AMOD  --  Modulus function which returns numerator if modulus is zero

function amod(a, b) {
    return mod(a - 1, b) + 1;
}

/*  JHMS  --  Convert Julian time to hour, minutes, and seconds,
 returned as a three-element array.  */

function jhms(j) {
    var ij;

    j += 0.5;
    /* Astronomical to civil */
    ij = ((j - Math.floor(j)) * 86400.0) + 0.5;
    return new Array(
        Math.floor(ij / 3600),
        Math.floor((ij / 60) % 60),
        Math.floor(ij % 60));
}

//  JWDAY  --  Calculate day of week from Julian day

var Weekdays = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday");

function jwday(j) {
    return mod(Math.floor((j + 1.5)), 7);
}

/*  OBLIQEQ  --  Calculate the obliquity of the ecliptic for a given
 Julian date.  This uses Laskar's tenth-degree
 polynomial fit (J. Laskar, Astronomy and
 Astrophysics, Vol. 157, admin.page 68 [1986]) which is
 accurate to within 0.01 arc second between AD 1000
 and AD 3000, and within a few seconds of arc for
 +/-10000 years around AD 2000.  If we're outside the
 range in which this fit is valid (deep time) we
 simply return the J2000 value of the obliquity, which
 happens to be almost precisely the mean.  */

var oterms = new Array(
    -4680.93,
    -1.55,
    1999.25,
    -51.38,
    -249.67,
    -39.05,
    7.12,
    27.87,
    5.79,
    2.45
);

function obliqeq(jd) {
    var eps, u, v, i;

    v = u = (jd - J2000) / (JulianCentury * 100);

    eps = 23 + (26 / 60.0) + (21.448 / 3600.0);

    if (Math.abs(u) < 1.0) {
        for (i = 0; i < 10; i++) {
            eps += (oterms[i] / 3600.0) * v;
            v *= u;
        }
    }
    return eps;
}

/* Periodic terms for nutation in longiude (delta \Psi) and
 obliquity (delta \Epsilon) as given in table 21.A of
 Meeus, "Astronomical Algorithms", first edition. */

var nutArgMult = new Array(
    0, 0, 0, 0, 1,
    -2, 0, 0, 2, 2,
    0, 0, 0, 2, 2,
    0, 0, 0, 0, 2,
    0, 1, 0, 0, 0,
    0, 0, 1, 0, 0,
    -2, 1, 0, 2, 2,
    0, 0, 0, 2, 1,
    0, 0, 1, 2, 2,
    -2, -1, 0, 2, 2,
    -2, 0, 1, 0, 0,
    -2, 0, 0, 2, 1,
    0, 0, -1, 2, 2,
    2, 0, 0, 0, 0,
    0, 0, 1, 0, 1,
    2, 0, -1, 2, 2,
    0, 0, -1, 0, 1,
    0, 0, 1, 2, 1,
    -2, 0, 2, 0, 0,
    0, 0, -2, 2, 1,
    2, 0, 0, 2, 2,
    0, 0, 2, 2, 2,
    0, 0, 2, 0, 0,
    -2, 0, 1, 2, 2,
    0, 0, 0, 2, 0,
    -2, 0, 0, 2, 0,
    0, 0, -1, 2, 1,
    0, 2, 0, 0, 0,
    2, 0, -1, 0, 1,
    -2, 2, 0, 2, 2,
    0, 1, 0, 0, 1,
    -2, 0, 1, 0, 1,
    0, -1, 0, 0, 1,
    0, 0, 2, -2, 0,
    2, 0, -1, 2, 1,
    2, 0, 1, 2, 2,
    0, 1, 0, 2, 2,
    -2, 1, 1, 0, 0,
    0, -1, 0, 2, 2,
    2, 0, 0, 2, 1,
    2, 0, 1, 0, 0,
    -2, 0, 2, 2, 2,
    -2, 0, 1, 2, 1,
    2, 0, -2, 0, 1,
    2, 0, 0, 0, 1,
    0, -1, 1, 0, 0,
    -2, -1, 0, 2, 1,
    -2, 0, 0, 0, 1,
    0, 0, 2, 2, 1,
    -2, 0, 2, 0, 1,
    -2, 1, 0, 2, 1,
    0, 0, 1, -2, 0,
    -1, 0, 1, 0, 0,
    -2, 1, 0, 0, 0,
    1, 0, 0, 0, 0,
    0, 0, 1, 2, 0,
    -1, -1, 1, 0, 0,
    0, 1, 1, 0, 0,
    0, -1, 1, 2, 2,
    2, -1, -1, 2, 2,
    0, 0, -2, 2, 2,
    0, 0, 3, 2, 2,
    2, -1, 0, 2, 2
);

var nutArgCoeff = new Array(
    -171996, -1742, 92095, 89, /*  0,  0,  0,  0,  1 */
    -13187, -16, 5736, -31, /* -2,  0,  0,  2,  2 */
    -2274, -2, 977, -5, /*  0,  0,  0,  2,  2 */
    2062, 2, -895, 5, /*  0,  0,  0,  0,  2 */
    1426, -34, 54, -1, /*  0,  1,  0,  0,  0 */
    712, 1, -7, 0, /*  0,  0,  1,  0,  0 */
    -517, 12, 224, -6, /* -2,  1,  0,  2,  2 */
    -386, -4, 200, 0, /*  0,  0,  0,  2,  1 */
    -301, 0, 129, -1, /*  0,  0,  1,  2,  2 */
    217, -5, -95, 3, /* -2, -1,  0,  2,  2 */
    -158, 0, 0, 0, /* -2,  0,  1,  0,  0 */
    129, 1, -70, 0, /* -2,  0,  0,  2,  1 */
    123, 0, -53, 0, /*  0,  0, -1,  2,  2 */
    63, 0, 0, 0, /*  2,  0,  0,  0,  0 */
    63, 1, -33, 0, /*  0,  0,  1,  0,  1 */
    -59, 0, 26, 0, /*  2,  0, -1,  2,  2 */
    -58, -1, 32, 0, /*  0,  0, -1,  0,  1 */
    -51, 0, 27, 0, /*  0,  0,  1,  2,  1 */
    48, 0, 0, 0, /* -2,  0,  2,  0,  0 */
    46, 0, -24, 0, /*  0,  0, -2,  2,  1 */
    -38, 0, 16, 0, /*  2,  0,  0,  2,  2 */
    -31, 0, 13, 0, /*  0,  0,  2,  2,  2 */
    29, 0, 0, 0, /*  0,  0,  2,  0,  0 */
    29, 0, -12, 0, /* -2,  0,  1,  2,  2 */
    26, 0, 0, 0, /*  0,  0,  0,  2,  0 */
    -22, 0, 0, 0, /* -2,  0,  0,  2,  0 */
    21, 0, -10, 0, /*  0,  0, -1,  2,  1 */
    17, -1, 0, 0, /*  0,  2,  0,  0,  0 */
    16, 0, -8, 0, /*  2,  0, -1,  0,  1 */
    -16, 1, 7, 0, /* -2,  2,  0,  2,  2 */
    -15, 0, 9, 0, /*  0,  1,  0,  0,  1 */
    -13, 0, 7, 0, /* -2,  0,  1,  0,  1 */
    -12, 0, 6, 0, /*  0, -1,  0,  0,  1 */
    11, 0, 0, 0, /*  0,  0,  2, -2,  0 */
    -10, 0, 5, 0, /*  2,  0, -1,  2,  1 */
    -8, 0, 3, 0, /*  2,  0,  1,  2,  2 */
    7, 0, -3, 0, /*  0,  1,  0,  2,  2 */
    -7, 0, 0, 0, /* -2,  1,  1,  0,  0 */
    -7, 0, 3, 0, /*  0, -1,  0,  2,  2 */
    -7, 0, 3, 0, /*  2,  0,  0,  2,  1 */
    6, 0, 0, 0, /*  2,  0,  1,  0,  0 */
    6, 0, -3, 0, /* -2,  0,  2,  2,  2 */
    6, 0, -3, 0, /* -2,  0,  1,  2,  1 */
    -6, 0, 3, 0, /*  2,  0, -2,  0,  1 */
    -6, 0, 3, 0, /*  2,  0,  0,  0,  1 */
    5, 0, 0, 0, /*  0, -1,  1,  0,  0 */
    -5, 0, 3, 0, /* -2, -1,  0,  2,  1 */
    -5, 0, 3, 0, /* -2,  0,  0,  0,  1 */
    -5, 0, 3, 0, /*  0,  0,  2,  2,  1 */
    4, 0, 0, 0, /* -2,  0,  2,  0,  1 */
    4, 0, 0, 0, /* -2,  1,  0,  2,  1 */
    4, 0, 0, 0, /*  0,  0,  1, -2,  0 */
    -4, 0, 0, 0, /* -1,  0,  1,  0,  0 */
    -4, 0, 0, 0, /* -2,  1,  0,  0,  0 */
    -4, 0, 0, 0, /*  1,  0,  0,  0,  0 */
    3, 0, 0, 0, /*  0,  0,  1,  2,  0 */
    -3, 0, 0, 0, /* -1, -1,  1,  0,  0 */
    -3, 0, 0, 0, /*  0,  1,  1,  0,  0 */
    -3, 0, 0, 0, /*  0, -1,  1,  2,  2 */
    -3, 0, 0, 0, /*  2, -1, -1,  2,  2 */
    -3, 0, 0, 0, /*  0,  0, -2,  2,  2 */
    -3, 0, 0, 0, /*  0,  0,  3,  2,  2 */
    -3, 0, 0, 0           /*  2, -1,  0,  2,  2 */
);

/*  NUTATION  --  Calculate the nutation in longitude, deltaPsi, and
 obliquity, deltaEpsilon for a given Julian date
 jd.  Results are returned as a two element Array
 giving (deltaPsi, deltaEpsilon) in degrees.  */

function nutation(jd) {
    var deltaPsi, deltaEpsilon,
        i, j,
        t = (jd - 2451545.0) / 36525.0, t2, t3, to10,
        ta = new Array,
        dp = 0, de = 0, ang;

    t3 = t * (t2 = t * t);

    /* Calculate angles.  The correspondence between the elements
     of our array and the terms cited in Meeus are:

     ta[0] = D  ta[0] = M  ta[2] = M'  ta[3] = F  ta[4] = \Omega

     */

    ta[0] = dtr(297.850363 + 445267.11148 * t - 0.0019142 * t2 +
    t3 / 189474.0);
    ta[1] = dtr(357.52772 + 35999.05034 * t - 0.0001603 * t2 -
    t3 / 300000.0);
    ta[2] = dtr(134.96298 + 477198.867398 * t + 0.0086972 * t2 +
    t3 / 56250.0);
    ta[3] = dtr(93.27191 + 483202.017538 * t - 0.0036825 * t2 +
    t3 / 327270);
    ta[4] = dtr(125.04452 - 1934.136261 * t + 0.0020708 * t2 +
    t3 / 450000.0);

    /* Range reduce the angles in case the sine and cosine functions
     don't do it as accurately or quickly. */

    for (i = 0; i < 5; i++) {
        ta[i] = fixangr(ta[i]);
    }

    to10 = t / 10.0;
    for (i = 0; i < 63; i++) {
        ang = 0;
        for (j = 0; j < 5; j++) {
            if (nutArgMult[(i * 5) + j] != 0) {
                ang += nutArgMult[(i * 5) + j] * ta[j];
            }
        }
        dp += (nutArgCoeff[(i * 4) + 0] + nutArgCoeff[(i * 4) + 1] * to10) * Math.sin(ang);
        de += (nutArgCoeff[(i * 4) + 2] + nutArgCoeff[(i * 4) + 3] * to10) * Math.cos(ang);
    }

    /* Return the result, converting from ten thousandths of arc
     seconds to radians in the process. */

    deltaPsi = dp / (3600.0 * 10000.0);
    deltaEpsilon = de / (3600.0 * 10000.0);

    return new Array(deltaPsi, deltaEpsilon);
}

/*  ECLIPTOEQ  --  Convert celestial (ecliptical) longitude and
 latitude into right ascension (in degrees) and
 declination.  We must supply the time of the
 conversion in order to compensate correctly for the
 varying obliquity of the ecliptic over time.
 The right ascension and declination are returned
 as a two-element Array in that order.  */

function ecliptoeq(jd, Lambda, Beta) {
    var eps, Ra, Dec;

    /* Obliquity of the ecliptic. */

    eps = dtr(obliqeq(jd));
    log += "Obliquity: " + rtd(eps) + "\n";

    Ra = rtd(Math.atan2((Math.cos(eps) * Math.sin(dtr(Lambda)) -
        (Math.tan(dtr(Beta)) * Math.sin(eps))),
        Math.cos(dtr(Lambda))));
    log += "RA = " + Ra + "\n";
    Ra = fixangle(rtd(Math.atan2((Math.cos(eps) * Math.sin(dtr(Lambda)) -
        (Math.tan(dtr(Beta)) * Math.sin(eps))),
        Math.cos(dtr(Lambda)))));
    Dec = rtd(Math.asin((Math.sin(eps) * Math.sin(dtr(Lambda)) * Math.cos(dtr(Beta))) +
    (Math.sin(dtr(Beta)) * Math.cos(eps))));

    return new Array(Ra, Dec);
}


/*  DELTAT  --  Determine the difference, in seconds, between
 Dynamical time and Universal time.  */

/*  Table of observed Delta T values at the beginning of
 even numbered years from 1620 through 2002.  */

var deltaTtab = new Array(
    121, 112, 103, 95, 88, 82, 77, 72, 68, 63, 60, 56, 53, 51, 48, 46,
    44, 42, 40, 38, 35, 33, 31, 29, 26, 24, 22, 20, 18, 16, 14, 12,
    11, 10, 9, 8, 7, 7, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10,
    10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13,
    13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16,
    16, 16, 15, 15, 14, 13, 13.1, 12.5, 12.2, 12, 12, 12, 12, 12, 12,
    11.9, 11.6, 11, 10.2, 9.2, 8.2, 7.1, 6.2, 5.6, 5.4, 5.3, 5.4, 5.6,
    5.9, 6.2, 6.5, 6.8, 7.1, 7.3, 7.5, 7.6, 7.7, 7.3, 6.2, 5.2, 2.7,
    1.4, -1.2, -2.8, -3.8, -4.8, -5.5, -5.3, -5.6, -5.7, -5.9, -6,
    -6.3, -6.5, -6.2, -4.7, -2.8, -0.1, 2.6, 5.3, 7.7, 10.4, 13.3, 16,
    18.2, 20.2, 21.1, 22.4, 23.5, 23.8, 24.3, 24, 23.9, 23.9, 23.7,
    24, 24.3, 25.3, 26.2, 27.3, 28.2, 29.1, 30, 30.7, 31.4, 32.2,
    33.1, 34, 35, 36.5, 38.3, 40.2, 42.2, 44.5, 46.5, 48.5, 50.5,
    52.2, 53.8, 54.9, 55.8, 56.9, 58.3, 60, 61.6, 63, 65, 66.6
);

function deltat(year) {
    var dt, f, i, t;

    if ((year >= 1620) && (year <= 2000)) {
        i = Math.floor((year - 1620) / 2);
        f = ((year - 1620) / 2) - i;
        /* Fractional part of year */
        dt = deltaTtab[i] + ((deltaTtab[i + 1] - deltaTtab[i]) * f);
    } else {
        t = (year - 2000) / 100;
        if (year < 948) {
            dt = 2177 + (497 * t) + (44.1 * t * t);
        } else {
            dt = 102 + (102 * t) + (25.3 * t * t);
            if ((year > 2000) && (year < 2100)) {
                dt += 0.37 * (year - 2100);
            }
        }
    }
    return dt;
}

/*  EQUINOX  --  Determine the Julian Ephemeris Day of an
 equinox or solstice.  The "which" argument
 selects the item to be computed:

 0   March equinox
 1   June solstice
 2   September equinox
 3   December solstice

 */

//  Periodic terms to obtain true time

var EquinoxpTerms = new Array(
    485, 324.96, 1934.136,
    203, 337.23, 32964.467,
    199, 342.08, 20.186,
    182, 27.85, 445267.112,
    156, 73.14, 45036.886,
    136, 171.52, 22518.443,
    77, 222.54, 65928.934,
    74, 296.72, 3034.906,
    70, 243.58, 9037.513,
    58, 119.81, 33718.147,
    52, 297.17, 150.678,
    50, 21.02, 2281.226,
    45, 247.54, 29929.562,
    44, 325.15, 31555.956,
    29, 60.93, 4443.417,
    18, 155.12, 67555.328,
    17, 288.79, 4562.452,
    16, 198.04, 62894.029,
    14, 199.76, 31436.921,
    12, 95.39, 14577.848,
    12, 287.11, 31931.756,
    12, 320.81, 34777.259,
    9, 227.73, 1222.114,
    8, 15.45, 16859.074
);

JDE0tab1000 = new Array(
    new Array(1721139.29189, 365242.13740, 0.06134, 0.00111, -0.00071),
    new Array(1721233.25401, 365241.72562, -0.05323, 0.00907, 0.00025),
    new Array(1721325.70455, 365242.49558, -0.11677, -0.00297, 0.00074),
    new Array(1721414.39987, 365242.88257, -0.00769, -0.00933, -0.00006)
);

JDE0tab2000 = new Array(
    new Array(2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057),
    new Array(2451716.56767, 365241.62603, 0.00325, 0.00888, -0.00030),
    new Array(2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078),
    new Array(2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032)
);

function equinox(year, which) {
    var deltaL, i, j, JDE0, JDE, JDE0tab, S, T, W, Y;

    /*  Initialise terms for mean equinox and solstices.  We
     have two sets: one for years prior to 1000 and a second
     for subsequent years.  */

    if (year < 1000) {
        JDE0tab = JDE0tab1000;
        Y = year / 1000;
    } else {
        JDE0tab = JDE0tab2000;
        Y = (year - 2000) / 1000;
    }

    JDE0 = JDE0tab[which][0] +
    (JDE0tab[which][1] * Y) +
    (JDE0tab[which][2] * Y * Y) +
    (JDE0tab[which][3] * Y * Y * Y) +
    (JDE0tab[which][4] * Y * Y * Y * Y);

//document.debug.log.value += "JDE0 = " + JDE0 + "\n";

    T = (JDE0 - 2451545.0) / 36525;
//document.debug.log.value += "T = " + T + "\n";
    W = (35999.373 * T) - 2.47;
//document.debug.log.value += "W = " + W + "\n";
    deltaL = 1 + (0.0334 * dcos(W)) + (0.0007 * dcos(2 * W));
//document.debug.log.value += "deltaL = " + deltaL + "\n";

    //  Sum the periodic terms for time T

    S = 0;
    for (i = j = 0; i < 24; i++) {
        S += EquinoxpTerms[j] * dcos(EquinoxpTerms[j + 1] + (EquinoxpTerms[j + 2] * T));
        j += 3;
    }

//document.debug.log.value += "S = " + S + "\n";
//document.debug.log.value += "Corr = " + ((S * 0.00001) / deltaL) + "\n";

    JDE = JDE0 + ((S * 0.00001) / deltaL);

    return JDE;
}

/*  SUNPOS  --  Position of the Sun.  Please see the comments
 on the return statement at the end of this function
 which describe the array it returns.  We return
 intermediate values because they are useful in a
 variety of other contexts.  */

function sunpos(jd) {
    var T, T2, L0, M, e, C, sunLong, sunAnomaly, sunR,
        Omega, Lambda, epsilon, epsilon0, Alpha, Delta,
        AlphaApp, DeltaApp;

    T = (jd - J2000) / JulianCentury;
//document.debug.log.value += "Sunpos.  T = " + T + "\n";
    T2 = T * T;
    L0 = 280.46646 + (36000.76983 * T) + (0.0003032 * T2);
//document.debug.log.value += "L0 = " + L0 + "\n";
    L0 = fixangle(L0);
//document.debug.log.value += "L0 = " + L0 + "\n";
    M = 357.52911 + (35999.05029 * T) + (-0.0001537 * T2);
//document.debug.log.value += "M = " + M + "\n";
    M = fixangle(M);
//document.debug.log.value += "M = " + M + "\n";
    e = 0.016708634 + (-0.000042037 * T) + (-0.0000001267 * T2);
//document.debug.log.value += "e = " + e + "\n";
    C = ((1.914602 + (-0.004817 * T) + (-0.000014 * T2)) * dsin(M)) +
    ((0.019993 - (0.000101 * T)) * dsin(2 * M)) +
    (0.000289 * dsin(3 * M));
//document.debug.log.value += "C = " + C + "\n";
    sunLong = L0 + C;
//document.debug.log.value += "sunLong = " + sunLong + "\n";
    sunAnomaly = M + C;
//document.debug.log.value += "sunAnomaly = " + sunAnomaly + "\n";
    sunR = (1.000001018 * (1 - (e * e))) / (1 + (e * dcos(sunAnomaly)));
//document.debug.log.value += "sunR = " + sunR + "\n";
    Omega = 125.04 - (1934.136 * T);
//document.debug.log.value += "Omega = " + Omega + "\n";
    Lambda = sunLong + (-0.00569) + (-0.00478 * dsin(Omega));
//document.debug.log.value += "Lambda = " + Lambda + "\n";
    epsilon0 = obliqeq(jd);
//document.debug.log.value += "epsilon0 = " + epsilon0 + "\n";
    epsilon = epsilon0 + (0.00256 * dcos(Omega));
//document.debug.log.value += "epsilon = " + epsilon + "\n";
    Alpha = rtd(Math.atan2(dcos(epsilon0) * dsin(sunLong), dcos(sunLong)));
//document.debug.log.value += "Alpha = " + Alpha + "\n";
    Alpha = fixangle(Alpha);
////document.debug.log.value += "Alpha = " + Alpha + "\n";
    Delta = rtd(Math.asin(dsin(epsilon0) * dsin(sunLong)));
////document.debug.log.value += "Delta = " + Delta + "\n";
    AlphaApp = rtd(Math.atan2(dcos(epsilon) * dsin(Lambda), dcos(Lambda)));
//document.debug.log.value += "AlphaApp = " + AlphaApp + "\n";
    AlphaApp = fixangle(AlphaApp);
//document.debug.log.value += "AlphaApp = " + AlphaApp + "\n";
    DeltaApp = rtd(Math.asin(dsin(epsilon) * dsin(Lambda)));
//document.debug.log.value += "DeltaApp = " + DeltaApp + "\n";

    return new Array(//  Angular quantities are expressed in decimal degrees
        L0, //  [0] Geometric mean longitude of the Sun
        M, //  [1] Mean anomaly of the Sun
        e, //  [2] Eccentricity of the Earth's orbit
        C, //  [3] Sun's equation of the Centre
        sunLong, //  [4] Sun's true longitude
        sunAnomaly, //  [5] Sun's true anomaly
        sunR, //  [6] Sun's radius vector in AU
        Lambda, //  [7] Sun's apparent longitude at true equinox of the date
        Alpha, //  [8] Sun's true right ascension
        Delta, //  [9] Sun's true declination
        AlphaApp, // [10] Sun's apparent right ascension
        DeltaApp                      // [11] Sun's apparent declination
    );
}

/*  EQUATIONOFTIME  --  Compute equation of time for a given moment.
 Returns the equation of time as a fraction of
 a day.  */

function equationOfTime(jd) {
    var alpha, deltaPsi, E, epsilon, L0, tau

    tau = (jd - J2000) / JulianMillennium;
//document.debug.log.value += "equationOfTime.  tau = " + tau + "\n";
    L0 = 280.4664567 + (360007.6982779 * tau) +
    (0.03032028 * tau * tau) +
    ((tau * tau * tau) / 49931) +
    (-((tau * tau * tau * tau) / 15300)) +
    (-((tau * tau * tau * tau * tau) / 2000000));
//document.debug.log.value += "L0 = " + L0 + "\n";
    L0 = fixangle(L0);
//document.debug.log.value += "L0 = " + L0 + "\n";
    alpha = sunpos(jd)[10];
//document.debug.log.value += "alpha = " + alpha + "\n";
    deltaPsi = nutation(jd)[0];
//document.debug.log.value += "deltaPsi = " + deltaPsi + "\n";
    epsilon = obliqeq(jd) + nutation(jd)[1];
//document.debug.log.value += "epsilon = " + epsilon + "\n";
    E = L0 + (-0.0057183) + (-alpha) + (deltaPsi * dcos(epsilon));
//document.debug.log.value += "E = " + E + "\n";
    E = E - 20.0 * (Math.floor(E / 20.0));
//document.debug.log.value += "Efixed = " + E + "\n";
    E = E / (24 * 60);
//document.debug.log.value += "Eday = " + E + "\n";

    return E;
}

/*
 JavaScript functions for the Fourmilab Calendar Converter

 by John Walker  --  September, MIM
 http://www.fourmilab.ch/documents/calendar/

 This program is in the public domain.
 */

/*  You may notice that a variety of array variables logically local
 to functions are declared globally here.  In JavaScript, construction
 of an array variable from source code occurs as the code is
 interpreted.  Making these variables pseudo-globals permits us
 to avoid overhead constructing and disposing of them in each
 call on the function in which whey are used.  */

var J0000 = 1721424.5;                // Julian date of Gregorian epoch: 0000-01-01
var J1970 = 2440587.5;                // Julian date at Unix epoch: 1970-01-01
var JMJD = 2400000.5;                // Epoch of Modified Julian Date system
var J1900 = 2415020.5;                // Epoch (day 1) of Excel 1900 date system (PC)
var J1904 = 2416480.5;                // Epoch (day 0) of Excel 1904 date system (Mac)

var NormLeap = new Array("Normal year", "Leap year");

/*  WEEKDAY_BEFORE  --  Return Julian date of given weekday (0 = Sunday)
 in the seven days ending on jd.  */

function weekday_before(weekday, jd) {
    return jd - jwday(jd - weekday);
}

/*  SEARCH_WEEKDAY  --  Determine the Julian date for: 

 weekday      Day of week desired, 0 = Sunday
 jd           Julian date to begin search
 direction    1 = next weekday, -1 = last weekday
 offset       Offset from jd to begin search
 */

function search_weekday(weekday, jd, direction, offset) {
    return weekday_before(weekday, jd + (direction * offset));
}

//  Utility weekday functions, just wrappers for search_weekday

function nearest_weekday(weekday, jd) {
    return search_weekday(weekday, jd, 1, 3);
}

function next_weekday(weekday, jd) {
    return search_weekday(weekday, jd, 1, 7);
}

function next_or_current_weekday(weekday, jd) {
    return search_weekday(weekday, jd, 1, 6);
}

function previous_weekday(weekday, jd) {
    return search_weekday(weekday, jd, -1, 1);
}

function previous_or_current_weekday(weekday, jd) {
    return search_weekday(weekday, jd, 1, 0);
}

function TestSomething() {
}

//  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year ?

function leap_gregorian(year) {
    return ((year % 4) == 0) &&
        (!(((year % 100) == 0) && ((year % 400) != 0)));
}

//  GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date

var GREGORIAN_EPOCH = 1721425.5;

function gregorian_to_jd(year, month, day) {
    return (GREGORIAN_EPOCH - 1) +
        (365 * (year - 1)) +
        Math.floor((year - 1) / 4) +
        (-Math.floor((year - 1) / 100)) +
        Math.floor((year - 1) / 400) +
        Math.floor((((367 * month) - 362) / 12) +
        ((month <= 2) ? 0 :
            (leap_gregorian(year) ? -1 : -2)
        ) +
        day);
}

//  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day

function jd_to_gregorian(jd) {
    var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
        yindex, dyindex, year, yearday, leapadj;

    wjd = Math.floor(jd - 0.5) + 0.5;
    depoch = wjd - GREGORIAN_EPOCH;
    quadricent = Math.floor(depoch / 146097);
    dqc = mod(depoch, 146097);
    cent = Math.floor(dqc / 36524);
    dcent = mod(dqc, 36524);
    quad = Math.floor(dcent / 1461);
    dquad = mod(dcent, 1461);
    yindex = Math.floor(dquad / 365);
    year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
    if (!((cent == 4) || (yindex == 4))) {
        year++;
    }
    yearday = wjd - gregorian_to_jd(year, 1, 1);
    leapadj = ((wjd < gregorian_to_jd(year, 3, 1)) ? 0
        :
        (leap_gregorian(year) ? 1 : 2)
    );
    month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
    day = (wjd - gregorian_to_jd(year, month, 1)) + 1;

    return new Array(year, month, day);
}

//  ISO_TO_JULIAN  --  Return Julian day of given ISO year, week, and day

function n_weeks(weekday, jd, nthweek) {
    var j = 7 * nthweek;

    if (nthweek > 0) {
        j += previous_weekday(weekday, jd);
    } else {
        j += next_weekday(weekday, jd);
    }
    return j;
}

function iso_to_julian(year, week, day) {
    return day + n_weeks(0, gregorian_to_jd(year - 1, 12, 28), week);
}

//  JD_TO_ISO  --  Return array of ISO (year, week, day) for Julian day

function jd_to_iso(jd) {
    var year, week, day;

    year = jd_to_gregorian(jd - 3)[0];
    if (jd >= iso_to_julian(year + 1, 1, 1)) {
        year++;
    }
    week = Math.floor((jd - iso_to_julian(year, 1, 1)) / 7) + 1;
    day = jwday(jd);
    if (day == 0) {
        day = 7;
    }
    return new Array(year, week, day);
}

//  ISO_DAY_TO_JULIAN  --  Return Julian day of given ISO year, and day of year

function iso_day_to_julian(year, day) {
    return (day - 1) + gregorian_to_jd(year, 1, 1);
}

//  JD_TO_ISO_DAY  --  Return array of ISO (year, day_of_year) for Julian day

function jd_to_iso_day(jd) {
    var year, day;

    year = jd_to_gregorian(jd)[0];
    day = Math.floor(jd - gregorian_to_jd(year, 1, 1)) + 1;
    return new Array(year, day);
}

/*  PAD  --  Pad a string to a given length with a given fill character.  */

function pad(str, howlong, padwith) {
    var s = str.toString();

    while (s.length < howlong) {
        s = padwith + s;
    }
    return s;
}

//  JULIAN_TO_JD  --  Determine Julian day number from Julian calendar date

var JULIAN_EPOCH = 1721423.5;

function leap_julian(year) {
    return mod(year, 4) == ((year > 0) ? 0 : 3);
}

function julian_to_jd(year, month, day) {

    /* Adjust negative common era years to the zero-based notation we use.  */

    if (year < 1) {
        year++;
    }

    /* Algorithm as given in Meeus, Astronomical Algorithms, Chapter 7, admin.page 61 */

    if (month <= 2) {
        year--;
        month += 12;
    }

    return ((Math.floor((365.25 * (year + 4716))) +
    Math.floor((30.6001 * (month + 1))) +
    day) - 1524.5);
}

//  JD_TO_JULIAN  --  Calculate Julian calendar date from Julian day

function jd_to_julian(td) {
    var z, a, alpha, b, c, d, e, year, month, day;

    td += 0.5;
    z = Math.floor(td);

    a = z;
    b = a + 1524;
    c = Math.floor((b - 122.1) / 365.25);
    d = Math.floor(365.25 * c);
    e = Math.floor((b - d) / 30.6001);

    month = Math.floor((e < 14) ? (e - 1) : (e - 13));
    year = Math.floor((month > 2) ? (c - 4716) : (c - 4715));
    day = b - d - Math.floor(30.6001 * e);

    /*  If year is less than 1, subtract one to convert from
     a zero based date system to the common era system in
     which the year -1 (1 B.C.E) is followed by year 1 (1 C.E.).  */

    if (year < 1) {
        year--;
    }

    return new Array(year, month, day);
}

//  HEBREW_TO_JD  --  Determine Julian day from Hebrew date

var HEBREW_EPOCH = 347995.5;

//  Is a given Hebrew year a leap year ?

function hebrew_leap(year) {
    return mod(((year * 7) + 1), 19) < 7;
}

//  How many months are there in a Hebrew year (12 = normal, 13 = leap)

function hebrew_year_months(year) {
    return hebrew_leap(year) ? 13 : 12;
}

//  Test for delay of start of new year and to avoid
//  Sunday, Wednesday, and Friday as start of the new year.

function hebrew_delay_1(year) {
    var months, days, parts;

    months = Math.floor(((235 * year) - 234) / 19);
    parts = 12084 + (13753 * months);
    day = (months * 29) + Math.floor(parts / 25920);

    if (mod((3 * (day + 1)), 7) < 3) {
        day++;
    }
    return day;
}

//  Check for delay in start of new year due to length of adjacent years

function hebrew_delay_2(year) {
    var last, present, next;

    last = hebrew_delay_1(year - 1);
    present = hebrew_delay_1(year);
    next = hebrew_delay_1(year + 1);

    return ((next - present) == 356) ? 2 :
        (((present - last) == 382) ? 1 : 0);
}

//  How many days are in a Hebrew year ?

function hebrew_year_days(year) {
    return hebrew_to_jd(year + 1, 7, 1) - hebrew_to_jd(year, 7, 1);
}

//  How many days are in a given month of a given year

function hebrew_month_days(year, month) {
    //  First of all, dispose of fixed-length 29 day months

    if (month == 2 || month == 4 || month == 6 ||
        month == 10 || month == 13) {
        return 29;
    }

    //  If it's not a leap year, Adar has 29 days

    if (month == 12 && !hebrew_leap(year)) {
        return 29;
    }

    //  If it's Heshvan, days depend on length of year

    if (month == 8 && !(mod(hebrew_year_days(year), 10) == 5)) {
        return 29;
    }

    //  Similarly, Kislev varies with the length of year

    if (month == 9 && (mod(hebrew_year_days(year), 10) == 3)) {
        return 29;
    }

    //  Nope, it's a 30 day month

    return 30;
}

//  Finally, wrap it all up into...

function hebrew_to_jd(year, month, day) {
    var jd, mon, months;

    months = hebrew_year_months(year);
    jd = HEBREW_EPOCH + hebrew_delay_1(year) +
    hebrew_delay_2(year) + day + 1;

    if (month < 7) {
        for (mon = 7; mon <= months; mon++) {
            jd += hebrew_month_days(year, mon);
        }
        for (mon = 1; mon < month; mon++) {
            jd += hebrew_month_days(year, mon);
        }
    } else {
        for (mon = 7; mon < month; mon++) {
            jd += hebrew_month_days(year, mon);
        }
    }

    return jd;
}

/*  JD_TO_HEBREW  --  Convert Julian date to Hebrew date
 This works by making multiple calls to
 the inverse function, and is this very
 slow.  */

function jd_to_hebrew(jd) {
    var year, month, day, i, count, first;

    jd = Math.floor(jd) + 0.5;
    count = Math.floor(((jd - HEBREW_EPOCH) * 98496.0) / 35975351.0);
    year = count - 1;
    for (i = count; jd >= hebrew_to_jd(i, 7, 1); i++) {
        year++;
    }
    first = (jd < hebrew_to_jd(year, 1, 1)) ? 7 : 1;
    month = first;
    for (i = first; jd > hebrew_to_jd(year, i, hebrew_month_days(year, i)); i++) {
        month++;
    }
    day = (jd - hebrew_to_jd(year, month, 1)) + 1;
    return new Array(year, month, day);
}

/*  EQUINOXE_A_PARIS  --  Determine Julian day and fraction of the
 September equinox at the Paris meridian in
 a given Gregorian year.  */

function equinoxe_a_paris(year) {
    var equJED, equJD, equAPP, equParis, dtParis;

    //  September equinox in dynamical time
    equJED = equinox(year, 2);

    //  Correct for delta T to obtain Universal time
    equJD = equJED - (deltat(year) / (24 * 60 * 60));

    //  Apply the equation of time to yield the apparent time at Greenwich
    equAPP = equJD + equationOfTime(equJED);

    /*  Finally, we must correct for the constant difference between
     the Greenwich meridian and that of Paris, 2°20'15" to the
     East.  */

    dtParis = (2 + (20 / 60.0) + (15 / (60 * 60.0))) / 360;
    equParis = equAPP + dtParis;

    return equParis;
}

/*  PARIS_EQUINOXE_JD  --  Calculate Julian day during which the
 September equinox, reckoned from the Paris
 meridian, occurred for a given Gregorian
 year.  */

function paris_equinoxe_jd(year) {
    var ep, epg;

    ep = equinoxe_a_paris(year);
    epg = Math.floor(ep - 0.5) + 0.5;

    return epg;
}

/*  ANNEE_DE_LA_REVOLUTION  --  Determine the year in the French
 revolutionary calendar in which a
 given Julian day falls.  Returns an
 array of two elements:

 [0]  Année de la Révolution
 [1]  Julian day number containing
 equinox for this year.
 */

var FRENCH_REVOLUTIONARY_EPOCH = 2375839.5;

function annee_da_la_revolution(jd) {
    var guess = jd_to_gregorian(jd)[0] - 2,
        lasteq, nexteq, adr;

    lasteq = paris_equinoxe_jd(guess);
    while (lasteq > jd) {
        guess--;
        lasteq = paris_equinoxe_jd(guess);
    }
    nexteq = lasteq - 1;
    while (!((lasteq <= jd) && (jd < nexteq))) {
        lasteq = nexteq;
        guess++;
        nexteq = paris_equinoxe_jd(guess);
    }
    adr = Math.round((lasteq - FRENCH_REVOLUTIONARY_EPOCH) / TropicalYear) + 1;

    return new Array(adr, lasteq);
}

/*  JD_TO_FRENCH_REVOLUTIONARY  --  Calculate date in the French Revolutionary
 calendar from Julian day.  The five or six
 "sansculottides" are considered a thirteenth
 month in the results of this function.  */

function jd_to_french_revolutionary(jd) {
    var an, mois, decade, jour,
        adr, equinoxe;

    jd = Math.floor(jd) + 0.5;
    adr = annee_da_la_revolution(jd);
    an = adr[0];
    equinoxe = adr[1];
    mois = Math.floor((jd - equinoxe) / 30) + 1;
    jour = (jd - equinoxe) % 30;
    decade = Math.floor(jour / 10) + 1;
    jour = (jour % 10) + 1;

    return new Array(an, mois, decade, jour);
}

/*  FRENCH_REVOLUTIONARY_TO_JD  --  Obtain Julian day from a given French
 Revolutionary calendar date.  */

function french_revolutionary_to_jd(an, mois, decade, jour) {
    var adr, equinoxe, guess, jd;

    guess = FRENCH_REVOLUTIONARY_EPOCH + (TropicalYear * ((an - 1) - 1));
    adr = new Array(an - 1, 0);

    while (adr[0] < an) {
        adr = annee_da_la_revolution(guess);
        guess = adr[1] + (TropicalYear + 2);
    }
    equinoxe = adr[1];

    jd = equinoxe + (30 * (mois - 1)) + (10 * (decade - 1)) + (jour - 1);
    return jd;
}

//  LEAP_ISLAMIC  --  Is a given year a leap year in the Islamic calendar ?

function leap_islamic(year) {
    return (((year * 11) + 14) % 30) < 11;
}

//  ISLAMIC_TO_JD  --  Determine Julian day from Islamic date

var ISLAMIC_EPOCH = 1948439.5;
var ISLAMIC_WEEKDAYS = new Array("al-'ahad", "al-'ithnayn",
    "ath-thalatha'", "al-'arb`a'",
    "al-khamis", "al-jum`a", "as-sabt");

function islamic_to_jd(year, month, day) {
    return (day +
        Math.ceil(29.5 * (month - 1)) +
        (year - 1) * 354 +
        Math.floor((3 + (11 * year)) / 30) +
        ISLAMIC_EPOCH) - 1;
}

//  JD_TO_ISLAMIC  --  Calculate Islamic date from Julian day

function jd_to_islamic(jd) {
    var year, month, day;

    jd = Math.floor(jd) + 0.5;
    year = Math.floor(((30 * (jd - ISLAMIC_EPOCH)) + 10646) / 10631);
    month = Math.min(12,
        Math.ceil((jd - (29 + islamic_to_jd(year, 1, 1))) / 29.5) + 1);
    day = (jd - islamic_to_jd(year, month, 1)) + 1;
    return new Array(year, month, day);
}

//  LEAP_PERSIAN  --  Is a given year a leap year in the Persian calendar ?

function leap_persian(year) {
    return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
}

//  PERSIAN_TO_JD  --  Determine Julian day from Persian date

var PERSIAN_EPOCH = 1948320.5;
var PERSIAN_WEEKDAYS = new Array("Yekshanbeh", "Doshanbeh",
    "Seshhanbeh", "Chaharshanbeh",
    "Panjshanbeh", "Jomeh", "Shanbeh");

function persian_to_jd(year, month, day) {
    var epbase, epyear;

    epbase = year - ((year >= 0) ? 474 : 473);
    epyear = 474 + mod(epbase, 2820);

    return day +
        ((month <= 7) ?
            ((month - 1) * 31) :
            (((month - 1) * 30) + 6)
        ) +
        Math.floor(((epyear * 682) - 110) / 2816) +
        (epyear - 1) * 365 +
        Math.floor(epbase / 2820) * 1029983 +
        (PERSIAN_EPOCH - 1);
}

//  JD_TO_PERSIAN  --  Calculate Persian date from Julian day

function jd_to_persian(jd) {
    var year, month, day, depoch, cycle, cyear, ycycle,
        aux1, aux2, yday;


    jd = Math.floor(jd) + 0.5;

    depoch = jd - persian_to_jd(475, 1, 1);
    cycle = Math.floor(depoch / 1029983);
    cyear = mod(depoch, 1029983);
    if (cyear == 1029982) {
        ycycle = 2820;
    } else {
        aux1 = Math.floor(cyear / 366);
        aux2 = mod(cyear, 366);
        ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
        aux1 + 1;
    }
    year = ycycle + (2820 * cycle) + 474;
    if (year <= 0) {
        year--;
    }
    yday = (jd - persian_to_jd(year, 1, 1)) + 1;
    month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
    day = (jd - persian_to_jd(year, month, 1)) + 1;
    return new Array(year, month, day);
}

//  MAYAN_COUNT_TO_JD  --  Determine Julian day from Mayan long count

var MAYAN_COUNT_EPOCH = 584282.5;

function mayan_count_to_jd(baktun, katun, tun, uinal, kin) {
    return MAYAN_COUNT_EPOCH +
        (baktun * 144000) +
        (katun * 7200) +
        (tun * 360) +
        (uinal * 20) +
        kin;
}

//  JD_TO_MAYAN_COUNT  --  Calculate Mayan long count from Julian day

function jd_to_mayan_count(jd) {
    var d, baktun, katun, tun, uinal, kin;

    jd = Math.floor(jd) + 0.5;
    d = jd - MAYAN_COUNT_EPOCH;
    baktun = Math.floor(d / 144000);
    d = mod(d, 144000);
    katun = Math.floor(d / 7200);
    d = mod(d, 7200);
    tun = Math.floor(d / 360);
    d = mod(d, 360);
    uinal = Math.floor(d / 20);
    kin = mod(d, 20);

    return new Array(baktun, katun, tun, uinal, kin);
}

//  JD_TO_MAYAN_HAAB  --  Determine Mayan Haab "month" and day from Julian day

var MAYAN_HAAB_MONTHS = new Array("Pop", "Uo", "Zip", "Zotz", "Tzec", "Xul",
    "Yaxkin", "Mol", "Chen", "Yax", "Zac", "Ceh",
    "Mac", "Kankin", "Muan", "Pax", "Kayab", "Cumku", "Uayeb");

function jd_to_mayan_haab(jd) {
    var lcount, day;

    jd = Math.floor(jd) + 0.5;
    lcount = jd - MAYAN_COUNT_EPOCH;
    day = mod(lcount + 8 + ((18 - 1) * 20), 365);

    return new Array(Math.floor(day / 20) + 1, mod(day, 20));
}

//  JD_TO_MAYAN_TZOLKIN  --  Determine Mayan Tzolkin "month" and day from Julian day

var MAYAN_TZOLKIN_MONTHS = new Array("Imix", "Ik", "Akbal", "Kan", "Chicchan",
    "Cimi", "Manik", "Lamat", "Muluc", "Oc",
    "Chuen", "Eb", "Ben", "Ix", "Men",
    "Cib", "Caban", "Etznab", "Cauac", "Ahau");

function jd_to_mayan_tzolkin(jd) {
    var lcount;

    jd = Math.floor(jd) + 0.5;
    lcount = jd - MAYAN_COUNT_EPOCH;
    return new Array(amod(lcount + 20, 20), amod(lcount + 4, 13));
}

//  BAHAI_TO_JD  --  Determine Julian day from Bahai date

var BAHAI_EPOCH = 2394646.5;
var BAHAI_WEEKDAYS = new Array("Jamal", "Kamal", "Fidal", "Idal",
    "Istijlal", "Istiqlal", "Jalal");

function bahai_to_jd(major, cycle, year, month, day) {
    var gy;

    gy = (361 * (major - 1)) + (19 * (cycle - 1)) + (year - 1) +
    jd_to_gregorian(BAHAI_EPOCH)[0];
    return gregorian_to_jd(gy, 3, 20) + (19 * (month - 1)) +
        ((month != 20) ? 0 : (leap_gregorian(gy + 1) ? -14 : -15)) +
        day;
}

//  JD_TO_BAHAI  --  Calculate Bahai date from Julian day

function jd_to_bahai(jd) {
    var major, cycle, year, month, day,
        gy, bstarty, bys, days, bld;

    jd = Math.floor(jd) + 0.5;
    gy = jd_to_gregorian(jd)[0];
    bstarty = jd_to_gregorian(BAHAI_EPOCH)[0];
    bys = gy - (bstarty + (((gregorian_to_jd(gy, 1, 1) <= jd) && (jd <= gregorian_to_jd(gy, 3, 20))) ? 1 : 0));
    major = Math.floor(bys / 361) + 1;
    cycle = Math.floor(mod(bys, 361) / 19) + 1;
    year = mod(bys, 19) + 1;
    days = jd - bahai_to_jd(major, cycle, year, 1, 1);
    bld = bahai_to_jd(major, cycle, year, 20, 1);
    month = (jd >= bld) ? 20 : (Math.floor(days / 19) + 1);
    day = (jd + 1) - bahai_to_jd(major, cycle, year, month, 1);

    return new Array(major, cycle, year, month, day);
}

//  INDIAN_CIVIL_TO_JD  --  Obtain Julian day for Indian Civil date

var INDIAN_CIVIL_WEEKDAYS = new Array(
    "ravivara", "somavara", "mangalavara", "budhavara",
    "brahaspativara", "sukravara", "sanivara");

function indian_civil_to_jd(year, month, day) {
    var Caitra, gyear, leap, start, jd, m;

    gyear = year + 78;
    leap = leap_gregorian(gyear);     // Is this a leap year ?
    start = gregorian_to_jd(gyear, 3, leap ? 21 : 22);
    Caitra = leap ? 31 : 30;

    if (month == 1) {
        jd = start + (day - 1);
    } else {
        jd = start + Caitra;
        m = month - 2;
        m = Math.min(m, 5);
        jd += m * 31;
        if (month >= 8) {
            m = month - 7;
            jd += m * 30;
        }
        jd += day - 1;
    }

    return jd;
}

//  JD_TO_INDIAN_CIVIL  --  Calculate Indian Civil date from Julian day

function jd_to_indian_civil(jd) {
    var Caitra, Saka, greg, greg0, leap, start, year, yday, mday;

    Saka = 79 - 1;                    // Offset in years from Saka era to Gregorian epoch
    start = 80;                       // Day offset between Saka and Gregorian

    jd = Math.floor(jd) + 0.5;
    greg = jd_to_gregorian(jd);       // Gregorian date for Julian day
    leap = leap_gregorian(greg[0]);   // Is this a leap year?
    year = greg[0] - Saka;            // Tentative year in Saka era
    greg0 = gregorian_to_jd(greg[0], 1, 1); // JD at start of Gregorian year
    yday = jd - greg0;                // Day number (0 based) in Gregorian year
    Caitra = leap ? 31 : 30;          // Days in Caitra this year

    if (yday < start) {
        //  Day is at the end of the preceding Saka year
        year--;
        yday += Caitra + (31 * 5) + (30 * 3) + 10 + start;
    }

    yday -= start;
    if (yday < Caitra) {
        month = 1;
        day = yday + 1;
    } else {
        mday = yday - Caitra;
        if (mday < (31 * 5)) {
            month = Math.floor(mday / 31) + 2;
            day = (mday % 31) + 1;
        } else {
            mday -= 31 * 5;
            month = Math.floor(mday / 30) + 7;
            day = (mday % 30) + 1;
        }
    }

    return new Array(year, month, day);
}
/*
 ============================================================
 */
/*!
 * jQuery UI 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function (c, j) {
    function k(a, b) {
        var d = a.nodeName.toLowerCase();
        if ("area" === d) {
            b = a.parentNode;
            d = b.name;
            if (!a.href || !d || b.nodeName.toLowerCase() !== "map")
                return false;
            a = c("img[usemap=#" + d + "]")[0];
            return !!a && l(a)
        }
        return (/input|select|textarea|button|object/.test(d) ? !a.disabled : "a" == d ? a.href || b : b) && l(a)
    }

    function l(a) {
        return !c(a).parents().andSelf().filter(function () {
            return c.curCSS(this, "visibility") === "hidden" || c.expr.filters.hidden(this)
        }).length
    }

    c.ui = c.ui || {};
    if (!c.ui.version) {
        c.extend(c.ui, {
            version: "1.8.14",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        c.fn.extend({
            _focus: c.fn.focus, focus: function (a, b) {
                return typeof a === "number" ? this.each(function () {
                    var d = this;
                    setTimeout(function () {
                        c(d).focus();
                        b && b.call(d)
                    }, a)
                }) : this._focus.apply(this, arguments)
            }, scrollParent: function () {
                var a;
                a = c.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(c.curCSS(this, "position", 1)) && /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function () {
                    return /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this,
                        "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !a.length ? c(document) : a
            }, zIndex: function (a) {
                if (a !== j)
                    return this.css("zIndex", a);
                if (this.length) {
                    a = c(this[0]);
                    for (var b; a.length && a[0] !== document;) {
                        b = a.css("position");
                        if (b === "absolute" || b === "relative" || b === "fixed") {
                            b = parseInt(a.css("zIndex"), 10);
                            if (!isNaN(b) && b !== 0)
                                return b
                        }
                        a = a.parent()
                    }
                }
                return 0
            }, disableSelection: function () {
                return this.bind((c.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection",
                    function (a) {
                        a.preventDefault()
                    })
            }, enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        });
        c.each(["Width", "Height"], function (a, b) {
            function d(f, g, m, n) {
                c.each(e, function () {
                    g -= parseFloat(c.curCSS(f, "padding" + this, true)) || 0;
                    if (m)
                        g -= parseFloat(c.curCSS(f, "border" + this + "Width", true)) || 0;
                    if (n)
                        g -= parseFloat(c.curCSS(f, "margin" + this, true)) || 0
                });
                return g
            }

            var e = b === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], h = b.toLowerCase(), i = {
                innerWidth: c.fn.innerWidth, innerHeight: c.fn.innerHeight, outerWidth: c.fn.outerWidth,
                outerHeight: c.fn.outerHeight
            };
            c.fn["inner" + b] = function (f) {
                if (f === j)
                    return i["inner" + b].call(this);
                return this.each(function () {
                    c(this).css(h, d(this, f) + "px")
                })
            };
            c.fn["outer" + b] = function (f, g) {
                if (typeof f !== "number")
                    return i["outer" + b].call(this, f);
                return this.each(function () {
                    c(this).css(h, d(this, f, true, g) + "px")
                })
            }
        });
        c.extend(c.expr[":"], {
            data: function (a, b, d) {
                return !!c.data(a, d[3])
            }, focusable: function (a) {
                return k(a, !isNaN(c.attr(a, "tabindex")))
            }, tabbable: function (a) {
                var b = c.attr(a, "tabindex"), d = isNaN(b);
                return (d || b >= 0) && k(a, !d)
            }
        });
        c(function () {
            var a = document.body, b = a.appendChild(b = document.createElement("div"));
            c.extend(b.style, {minHeight: "100px", height: "auto", padding: 0, borderWidth: 0});
            c.support.minHeight = b.offsetHeight === 100;
            c.support.selectstart = "onselectstart"in b;
            a.removeChild(b).style.display = "none"
        });
        c.extend(c.ui, {
            plugin: {
                add: function (a, b, d) {
                    a = c.ui[a].prototype;
                    for (var e in d) {
                        a.plugins[e] = a.plugins[e] || [];
                        a.plugins[e].push([b, d[e]])
                    }
                }, call: function (a, b, d) {
                    if ((b = a.plugins[b]) && a.element[0].parentNode)
                        for (var e =
                            0; e < b.length; e++)
                            a.options[b[e][0]] && b[e][1].apply(a.element, d)
                }
            }, contains: function (a, b) {
                return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
            }, hasScroll: function (a, b) {
                if (c(a).css("overflow") === "hidden")
                    return false;
                b = b && b === "left" ? "scrollLeft" : "scrollTop";
                var d = false;
                if (a[b] > 0)
                    return true;
                a[b] = 1;
                d = a[b] > 0;
                a[b] = 0;
                return d
            }, isOverAxis: function (a, b, d) {
                return a > b && a < b + d
            }, isOver: function (a, b, d, e, h, i) {
                return c.ui.isOverAxis(a, d, h) && c.ui.isOverAxis(b, e, i)
            }
        })
    }
})(jQuery);
/*
 ===================================================================
 */
(function ($, undefined) {

    $.extend($.ui, {datepicker: {version: "1.8.14"}});

    var PROP_NAME = 'datepicker';
    var dpuuid = new Date().getTime();
    var instActive;

    /* Date picker manager.
     Use the singleton instance of this class, $.datepicker, to interact with the date picker.
     Settings for (groups of) date pickers are maintained in an instance object,
     allowing multiple different settings on the same admin.page. */

    function Datepicker() {
        this.debug = false; // Change this to true to start debugging
        this._curInst = null; // The current instance in use
        this._keyEvent = false; // If the last event was a key event
        this._disabledInputs = []; // List of date picker inputs that have been disabled
        this._datepickerShowing = false; // True if the popup picker is showing , false if not
        this._inDialog = false; // True if showing within a "dialog", false if not
        this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
        this._inlineClass = 'ui-datepicker-inline'; // The name of the inline marker class
        this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
        this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
        this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
        this._disableClass = 'ui-datepicker-disabled'; // The name of the disabled covering marker class
        this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
        this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
        this._dayOverClass = 'ui-datepicker-days-cell-over'; // The name of the day hover marker class
        this.regional = []; // Available regional settings, indexed by language code
        this.regional[''] = {// Default regional settings
            calendar: Date, //[CC]
            closeText: 'Done', // Display text for close link
            prevText: 'Prev', // Display text for previous month link
            nextText: 'Next', // Display text for next month link
            currentText: 'Today', // Display text for current month link
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'], // Names of months for drop-down and formatting
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], // Column headings for days starting at Sunday
            weekHeader: 'Wk', // Column header for week of the year
            dateFormat: 'mm/dd/yy', // See format options on parseDate
            firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
            isRTL: false, // True if right-to-left language, false if left-to-right
            showMonthAfterYear: false, // True if the year select precedes month, false for month then year
            yearSuffix: '' // Additional text to append to the year in the month headers
        };
        this._defaults = {// Global defaults for all the date picker instances
            showOn: 'focus', // 'focus' for popup on focus,
            // 'button' for trigger button, or 'both' for either
            showAnim: 'fadeIn', // Name of jQuery animation for popup
            showOptions: {}, // Options for enhanced animations
            defaultDate: null, // Used when field is blank: actual date,
            // +/-number for offset from today, null for today
            appendText: '', // Display text following the input box, e.g. showing the format
            buttonText: '...', // Text for trigger button
            buttonImage: '', // URL for trigger button image
            buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
            hideIfNoPrevNext: false, // True to hide next/previous month links
            // if not applicable, false to just disable them
            navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
            gotoCurrent: false, // True if today link goes back to current selection instead
            changeMonth: false, // True if month can be selected directly, false if only prev/next
            changeYear: false, // True if year can be selected directly, false if only prev/next
            yearRange: 'c-10:c+10', // Range of years to display in drop-down,
            // either relative to today's year (-nn:+nn), relative to currently displayed year
            // (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
            showOtherMonths: false, // True to show dates in other months, false to leave blank
            selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
            showWeek: false, // True to show week of the year, false to not show it
            calculateWeek: this.iso8601Week, // How to calculate the week of the year,
            // takes a Date and returns the number of the week for it
            shortYearCutoff: '+10', // Short year values < this are in the current century,
            // > this are in the previous century,
            // string value starting with '+' for current year + value
            minDate: null, // The earliest selectable date, or null for no limit
            maxDate: null, // The latest selectable date, or null for no limit
            duration: 'fast', // Duration of display/closure
            beforeShowDay: null, // Function that takes a date and returns an array with
            // [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
            // [2] = cell title (optional), e.g. $.datepicker.noWeekends
            beforeShow: null, // Function that takes an input field and
            // returns a set of custom settings for the date picker
            onSelect: null, // Define a callback function when a date is selected
            onChangeMonthYear: null, // Define a callback function when the month or year is changed
            onClose: null, // Define a callback function when the datepicker is closed
            numberOfMonths: 1, // Number of months to show at a time
            showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
            stepMonths: 1, // Number of months to step back/forward
            stepBigMonths: 12, // Number of months to step back/forward for the big links
            altField: '', // Selector for an alternate field to store selected dates into
            altFormat: '', // The date format to use for the alternate field
            constrainInput: true, // The input is constrained by the current date format
            showButtonPanel: false, // True to show button panel, false to not show it
            autoSize: false // True to size the input for the date format, false to leave as is
        };
        $.extend(this._defaults, this.regional['']);
        this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
    }

    $.extend(Datepicker.prototype, {
        /* Class name added to elements to indicate already configured with a date picker. */
        markerClassName: 'hasDatepicker',
        //Keep track of the maximum number of rows displayed (see #7043)
        maxRows: 4,
        /* Debug logging (if enabled). */
        log: function () {
            if (this.debug)
                console.log.apply('', arguments);
        },
        // TODO rename to "widget" when switching to widget factory
        _widgetDatepicker: function () {
            return this.dpDiv;
        },
        /* Override the default settings for all instances of the date picker.
         @param  settings  object - the new settings to use as defaults (anonymous object)
         @return the manager object */
        setDefaults: function (settings) {
            extendRemove(this._defaults, settings || {});
            return this;
        },
        /* Attach the date picker to a jQuery selection.
         @param  target    element - the target input field or division or span
         @param  settings  object - the new settings to use for this date picker instance (anonymous) */
        _attachDatepicker: function (target, settings) {
            // check for settings on the control itself - in namespace 'date:'
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute('date:' + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue);
                    } catch (err) {
                        inlineSettings[attrName] = attrValue;
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == 'div' || nodeName == 'span');
            if (!target.id) {
                this.uuid += 1;
                target.id = 'dp' + this.uuid;
            }
            var inst = this._newInst($(target), inline);
            var regional = $.extend({}, settings && this.regional[settings['regional']] || {});//[CC]
            inst.settings = $.extend(regional, settings || {}, inlineSettings || {});//[CC]
            if (nodeName == 'input') {
                this._connectDatepicker(target, inst);
            } else if (inline) {
                this._inlineDatepicker(target, inst);
            }
        },
        /* Create a new instance object. */
        _newInst: function (target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars
            return {
                id: id, input: target, // associated target
                selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
                drawMonth: 0, drawYear: 0, // month being drawn
                inline: inline, // is datepicker inline or not
                dpDiv: (!inline ? this.dpDiv : // presentation div
                    bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))
            };
        },
        /* Attach the date picker to an input field. */
        _connectDatepicker: function (target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName))
                return;
            this._attachments(input, inst);
            input.addClass(this.markerClassName).keydown(this._doKeyDown).
                keypress(this._doKeyPress).keyup(this._doKeyUp).
                bind("setData.datepicker", function (event, key, value) {
                    inst.settings[key] = value;
                }).bind("getData.datepicker", function (event, key) {
                    return this._get(inst, key);
                });
            this._autoSize(inst);
            $.data(target, PROP_NAME, inst);
        },
        /* Make attachments based on settings. */
        _attachments: function (input, inst) {
            var appendText = this._get(inst, 'appendText');
            var isRTL = false; //[CC] old code was: this._get(inst, 'isRTL');
            if (inst.append)
                inst.append.remove();
            if (appendText) {
                inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
                input[isRTL ? 'before' : 'after'](inst.append);
            }
            input.unbind('focus', this._showDatepicker);
            if (inst.trigger)
                inst.trigger.remove();
            var showOn = this._get(inst, 'showOn');
            if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
                input.focus(this._showDatepicker);
            if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
                var buttonText = this._get(inst, 'buttonText');
                var buttonImage = this._get(inst, 'buttonImage');
                inst.trigger = $(this._get(inst, 'buttonImageOnly') ?
                    $('<img/>').addClass(this._triggerClass).
                        attr({src: buttonImage, alt: buttonText, title: buttonText}) :
                    $('<button type="button"></button>').addClass(this._triggerClass).
                        html(buttonImage == '' ? buttonText : $('<img/>').attr(
                            {src: buttonImage, alt: buttonText, title: buttonText})));
                input[isRTL ? 'before' : 'after'](inst.trigger);
                inst.trigger.click(function () {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
                        $.datepicker._hideDatepicker();
                    else
                        $.datepicker._showDatepicker(input[0]);
                    return false;
                });
            }
        },
        /* Apply the maximum length for the date format. */
        _autoSize: function (inst) {
            if (this._get(inst, 'autoSize') && !inst.inline) {
                var date = new Date(2009, 12 - 1, 20); // Ensure double digits
                var dateFormat = this._get(inst, 'dateFormat');
                if (dateFormat.match(/[DM]/)) {
                    var findMax = function (names) {
                        var max = 0;
                        var maxI = 0;
                        for (var i = 0; i < names.length; i++) {
                            if (names[i].length > max) {
                                max = names[i].length;
                                maxI = i;
                            }
                        }
                        return maxI;
                    };
                    date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
                        'monthNames' : 'monthNamesShort'))));
                    date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
                        'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
                }
                inst.input.attr('size', this._formatDate(inst, date).length);
            }
        },
        /* Attach an inline date picker to a div. */
        _inlineDatepicker: function (target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName))
                return;
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).
                bind("setData.datepicker", function (event, key, value) {
                    inst.settings[key] = value;
                }).bind("getData.datepicker", function (event, key) {
                    return this._get(inst, key);
                });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst), true);
            this._updateDatepicker(inst);
            this._updateAlternate(inst);
            inst.dpDiv.show();
        },
        /* Pop-up the date picker in a "dialog" box.
         @param  input     element - ignored
         @param  date      string or Date - the initial date to display
         @param  onSelect  function - the function to call when a date is selected
         @param  settings  object - update the dialog date picker instance's settings (anonymous object)
         @param  pos       int[2] - coordinates for the dialog's position within the screen or
         event - with x/y coordinates or
         leave empty for default (screen centre)
         @return the manager object */
        _dialogDatepicker: function (input, date, onSelect, settings, pos) {
            var inst = this._dialogInst; // internal instance
            if (!inst) {
                this.uuid += 1;
                var id = 'dp' + this.uuid;
                this._dialogInput = $('<input type="text" id="' + id +
                '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $('body').append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst);
            }
            extendRemove(inst.settings, settings || {});
            date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
            this._dialogInput.val(date);

            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = document.documentElement.clientWidth;
                var browserHeight = document.documentElement.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = // should use actual width/height below
                    [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
            }

            // move input on screen for focus, but hidden behind dialog
            this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI)
                $.blockUI(this.dpDiv);
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this;
        },
        /* Detach a datepicker from its control.
         @param  target    element - the target input field or division or span */
        _destroyDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == 'input') {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).
                    unbind('focus', this._showDatepicker).
                    unbind('keydown', this._doKeyDown).
                    unbind('keypress', this._doKeyPress).
                    unbind('keyup', this._doKeyUp);
            } else if (nodeName == 'div' || nodeName == 'span')
                $target.removeClass(this.markerClassName).empty();
        },
        /* Enable the date picker to a jQuery selection.
         @param  target    element - the target input field or division or span */
        _enableDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == 'input') {
                target.disabled = false;
                inst.trigger.filter('button').
                    each(function () {
                        this.disabled = false;
                    }).end().
                    filter('img').css({opacity: '1.0', cursor: ''});
            }
            else if (nodeName == 'div' || nodeName == 'span') {
                var inline = $target.children('.' + this._inlineClass);
                inline.children().removeClass('ui-state-disabled');
                inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
                    removeAttr("disabled");
            }
            this._disabledInputs = $.map(this._disabledInputs,
                function (value) {
                    return (value == target ? null : value);
                }); // delete entry
        },
        /* Disable the date picker to a jQuery selection.
         @param  target    element - the target input field or division or span */
        _disableDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == 'input') {
                target.disabled = true;
                inst.trigger.filter('button').
                    each(function () {
                        this.disabled = true;
                    }).end().
                    filter('img').css({opacity: '0.5', cursor: 'default'});
            }
            else if (nodeName == 'div' || nodeName == 'span') {
                var inline = $target.children('.' + this._inlineClass);
                inline.children().addClass('ui-state-disabled');
                inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
                    attr("disabled", "disabled");
            }
            this._disabledInputs = $.map(this._disabledInputs,
                function (value) {
                    return (value == target ? null : value);
                }); // delete entry
            this._disabledInputs[this._disabledInputs.length] = target;
        },
        /* Is the first field in a jQuery collection disabled as a datepicker?
         @param  target    element - the target input field or division or span
         @return boolean - true if disabled, false if enabled */
        _isDisabledDatepicker: function (target) {
            if (!target) {
                return false;
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target)
                    return true;
            }
            return false;
        },
        /* Retrieve the instance data for the target control.
         @param  target  element - the target input field or division or span
         @return  object - the associated instance data
         @throws  error if a jQuery problem getting data */
        _getInst: function (target) {
            try {
                return $.data(target, PROP_NAME);
            }
            catch (err) {
                throw 'Missing instance data for this datepicker';
            }
        },
        /* Update or retrieve the settings for a date picker attached to an input field or division.
         @param  target  element - the target input field or division or span
         @param  name    object - the new settings to update or
         string - the name of the setting to change or retrieve,
         when retrieving also 'all' for all instance settings or
         'defaults' for all global defaults
         @param  value   any - the new value for the setting
         (omit if above is an object or to retrieve a value) */
        _optionDatepicker: function (target, name, value) {
            var inst = this._getInst(target);
            if (arguments.length == 2 && typeof name == 'string') {
                return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) :
                    (inst ? (name == 'all' ? $.extend({}, inst.settings) :
                        this._get(inst, name)) : null));
            }
            var settings = name || {};
            if (typeof name == 'string') {
                settings = {};
                settings[name] = value;
            }
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker();
                }
                var date = this._getDateDatepicker(target, true);
                var minDate = this._getMinMaxDate(inst, 'min');
                var maxDate = this._getMinMaxDate(inst, 'max');
                extendRemove(inst.settings, settings);
                // reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
                if (minDate !== null && settings['dateFormat'] !== undefined && settings['minDate'] === undefined)
                    inst.settings.minDate = this._formatDate(inst, minDate);
                if (maxDate !== null && settings['dateFormat'] !== undefined && settings['maxDate'] === undefined)
                    inst.settings.maxDate = this._formatDate(inst, maxDate);
                this._attachments($(target), inst);
                this._autoSize(inst);
                this._setDate(inst, date);
                this._updateAlternate(inst);
                this._updateDatepicker(inst);
            }
        },
        // change method deprecated
        _changeDatepicker: function (target, name, value) {
            this._optionDatepicker(target, name, value);
        },
        /* Redraw the date picker attached to an input field or division.
         @param  target  element - the target input field or division or span */
        _refreshDatepicker: function (target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst);
            }
        },
        /* Set the dates for a jQuery selection.
         @param  target   element - the target input field or division or span
         @param  date     Date - the new date */
        _setDateDatepicker: function (target, date) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date);
                this._updateDatepicker(inst);
                this._updateAlternate(inst);
            }
        },
        /* Get the date(s) for the first entry in a jQuery selection.
         @param  target     element - the target input field or division or span
         @param  noDefault  boolean - true if no default date is to be used
         @return Date - the current date */
        _getDateDatepicker: function (target, noDefault) {
            var inst = this._getInst(target);
            if (inst && !inst.inline)
                this._setDateFromField(inst, noDefault);
            return (inst ? this._getDate(inst) : null);
        },
        /* Handle keystrokes. */
        _doKeyDown: function (event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing)
                switch (event.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker();
                        handled = false;
                        break; // hide on tab out
                    case 13:
                        var sel = $('td.' + $.datepicker._dayOverClass + ':not(.' +
                        $.datepicker._currentClass + ')', inst.dpDiv);
                        if (sel[0])
                            $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                        else
                            $.datepicker._hideDatepicker();
                        return false; // don't submit the form
                        break; // select the value on enter
                    case 27:
                        $.datepicker._hideDatepicker();
                        break; // hide on escape
                    case 33:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ?
                            -$.datepicker._get(inst, 'stepBigMonths') :
                            -$.datepicker._get(inst, 'stepMonths')), 'M');
                        break; // previous month/year on admin.page up/+ ctrl
                    case 34:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ?
                            +$.datepicker._get(inst, 'stepBigMonths') :
                            +$.datepicker._get(inst, 'stepMonths')), 'M');
                        break; // next month/year on admin.page down/+ ctrl
                    case 35:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._clearDate(event.target);
                        handled = event.ctrlKey || event.metaKey;
                        break; // clear on ctrl or command +end
                    case 36:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._gotoToday(event.target);
                        handled = event.ctrlKey || event.metaKey;
                        break; // current on ctrl or command +home
                    case 37:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
                        handled = event.ctrlKey || event.metaKey;
                        // -1 day on ctrl or command +left
                        if (event.originalEvent.altKey)
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ?
                                -$.datepicker._get(inst, 'stepBigMonths') :
                                -$.datepicker._get(inst, 'stepMonths')), 'M');
                        // next month/year on alt +left on Mac
                        break;
                    case 38:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._adjustDate(event.target, -7, 'D');
                        handled = event.ctrlKey || event.metaKey;
                        break; // -1 week on ctrl or command +up
                    case 39:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
                        handled = event.ctrlKey || event.metaKey;
                        // +1 day on ctrl or command +right
                        if (event.originalEvent.altKey)
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ?
                                +$.datepicker._get(inst, 'stepBigMonths') :
                                +$.datepicker._get(inst, 'stepMonths')), 'M');
                        // next month/year on alt +right
                        break;
                    case 40:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._adjustDate(event.target, +7, 'D');
                        handled = event.ctrlKey || event.metaKey;
                        break; // +1 week on ctrl or command +down
                    default:
                        handled = false;
                }
            else if (event.keyCode == 36 && event.ctrlKey) // display the date picker on ctrl+home
                $.datepicker._showDatepicker(this);
            else {
                handled = false;
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        /* Filter entered characters - based on date format. */
        _doKeyPress: function (event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, 'constrainInput')) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
            }
        },
        /* Synchronise manual entry and field/alternate field. */
        _doKeyUp: function (event) {
            var inst = $.datepicker._getInst(event.target);
            if (inst.input.val() != inst.lastVal) {
                try {
                    var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
                        (inst.input ? inst.input.val() : null),
                        $.datepicker._getFormatConfig(inst));
                    if (date) { // only if valid
                        $.datepicker._setDateFromField(inst);
                        $.datepicker._updateAlternate(inst);
                        $.datepicker._updateDatepicker(inst);
                    }
                }
                catch (event) {
                    $.datepicker.log(event);
                }
            }
            return true;
        },
        /* Pop-up the date picker for a given input field.
         @param  input  element - the input field attached to the date picker or
         event - if triggered by focus */
        _showDatepicker: function (input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
                input = $('input', input.parentNode)[0];
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
                return;
            var inst = $.datepicker._getInst(input);
            if ($.datepicker._curInst && $.datepicker._curInst != inst) {
                if ($.datepicker._datepickerShowing) {
                    $.datepicker._triggerOnClose($.datepicker._curInst);
                }
                $.datepicker._curInst.dpDiv.stop(true, true);
            }
            var beforeShow = $.datepicker._get(inst, 'beforeShow');
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            inst.lastVal = null;
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog) // hide cursor
                input.value = '';
            if (!$.datepicker._pos) { // position below input
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight; // add the height
            }
            var isFixed = false;
            $(input).parents().each(function () {
                isFixed |= $(this).css('position') == 'fixed';
                return !isFixed;
            });
            if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
                $.datepicker._pos[0] -= document.documentElement.scrollLeft;
                $.datepicker._pos[1] -= document.documentElement.scrollTop;
            }
            var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
            $.datepicker._pos = null;
            //to avoid flashes on Firefox
            inst.dpDiv.empty();
            // determine sizing offscreen
            inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
            $.datepicker._updateDatepicker(inst);
            // fix width for dynamic number of date pickers
            // and adjust position before showing
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ?
                    'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
                left: offset.left + 'px', top: offset.top + 'px'
            });
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, 'showAnim');
                var duration = $.datepicker._get(inst, 'duration');
                var postProcess = function () {
                    var cover = inst.dpDiv.find('iframe.ui-datepicker-cover'); // IE6- only
                    if (!!cover.length) {
                        var borders = $.datepicker._getBorders(inst.dpDiv);
                        cover.css({
                            left: -borders[0], top: -borders[1],
                            width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()
                        });
                    }
                };
                inst.dpDiv.zIndex($(input).zIndex() + 1);
                $.datepicker._datepickerShowing = true;
                if ($.effects && $.effects[showAnim])
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
                else
                    inst.dpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess);
                if (!showAnim || !duration)
                    postProcess();
                if (inst.input.is(':visible') && !inst.input.is(':disabled'))
                    inst.input.focus();
                $.datepicker._curInst = inst;
            }
        },
        /* Generate the date picker content. */
        _updateDatepicker: function (inst) {
            var self = this;
            self.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
            var borders = $.datepicker._getBorders(inst.dpDiv);
            instActive = inst; // for delegate hover events
            inst.dpDiv.empty().append(this._generateHTML(inst));
            var cover = inst.dpDiv.find('iframe.ui-datepicker-cover'); // IE6- only
            if (!!cover.length) { //avoid call to outerXXXX() when not in IE6
                cover.css({
                    left: -borders[0],
                    top: -borders[1],
                    width: inst.dpDiv.outerWidth(),
                    height: inst.dpDiv.outerHeight()
                })
            }
            inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
            if (cols > 1)
                inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
            'Class']('ui-datepicker-multi');
            inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
            'Class']('ui-datepicker-rtl');
            if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input &&
                    // #6694 - don't focus the input if it's already focused
                    // this breaks the change event in IE
                inst.input.is(':visible') && !inst.input.is(':disabled') && inst.input[0] != document.activeElement)
                inst.input.focus();
            // deffered render of the years select (to avoid flashes on Firefox) 
            if (inst.yearshtml) {
                var origyearshtml = inst.yearshtml;
                setTimeout(function () {
                    //assure that inst.yearshtml didn't change.
                    if (origyearshtml === inst.yearshtml && inst.yearshtml) {
                        inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
                    }
                    origyearshtml = inst.yearshtml = null;
                }, 0);
            }
        },
        /* Retrieve the size of left and top borders for an element.
         @param  elem  (jQuery object) the element of interest
         @return  (number[2]) the left and top borders */
        _getBorders: function (elem) {
            var convert = function (value) {
                return {thin: 1, medium: 2, thick: 3}[value] || value;
            };
            return [parseFloat(convert(elem.css('border-left-width'))),
                parseFloat(convert(elem.css('border-top-width')))];
        },
        /* Check positioning to remain on screen. */
        _checkOffset: function (inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
            var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();

            offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

            // now check if datepicker is showing outside window viewport - move to a better place if so.
            offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
                Math.abs(offset.left + dpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
                Math.abs(dpHeight + inputHeight) : 0);

            return offset;
        },
        /* Find an object's position on the screen. */
        _findPos: function (obj) {
            var inst = this._getInst(obj);
            var isRTL = this._get(inst, 'isRTL');
            while (obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
                obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
            }
            var position = $(obj).offset();
            return [position.left, position.top];
        },
        /* Trigger custom callback of onClose. */
        _triggerOnClose: function (inst) {
            var onClose = this._get(inst, 'onClose');
            if (onClose)
                onClose.apply((inst.input ? inst.input[0] : null),
                    [(inst.input ? inst.input.val() : ''), inst]);
        },
        /* Hide the date picker from view.
         @param  input  element - the input field attached to the date picker */
        _hideDatepicker: function (input) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME)))
                return;
            if (this._datepickerShowing) {
                var showAnim = this._get(inst, 'showAnim');
                var duration = this._get(inst, 'duration');
                var postProcess = function () {
                    $.datepicker._tidyDialog(inst);
                    this._curInst = null;
                };
                if ($.effects && $.effects[showAnim])
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
                else
                    inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
                        (showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess);
                if (!showAnim)
                    postProcess();
                $.datepicker._triggerOnClose(inst);
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({position: 'absolute', left: '0', top: '-100px'});
                    if ($.blockUI) {
                        $.unblockUI();
                        $('body').append(this.dpDiv);
                    }
                }
                this._inDialog = false;
            }
        },
        /* Tidy up after a dialog display. */
        _tidyDialog: function (inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
        },
        /* Close date picker if clicked elsewhere. */
        _checkExternalClick: function (event) {
            if (!$.datepicker._curInst)
                return;
            var $target = $(event.target);
            if ($target[0].id != $.datepicker._mainDivId &&
                $target.parents('#' + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) &&
                $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))
                $.datepicker._hideDatepicker();
        },
        /* Adjust one of the date sub-fields. */
        _adjustDate: function (id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return;
            }
            this._adjustInstDate(inst, offset +
                (period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
                period);
            this._updateDatepicker(inst);
        },
        /* Action for current link. */
        _gotoToday: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear;
            }
            else {
                var date = new this.CDate();//[CC]
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear();
            }
            this._notifyChange(inst);
            this._adjustDate(target);
        },
        /* Action for selecting a new month/year. */
        _selectMonthYear: function (id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst._selectingMonthYear = false;
            inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
                inst['draw' + (period == 'M' ? 'Month' : 'Year')] =
                    parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target);
        },
        /* Restore input focus after not changing month/year. */
        _clickMonthYear: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (inst.input && inst._selectingMonthYear) {
                setTimeout(function () {
                    inst.input.focus();
                }, 0);
            }
            inst._selectingMonthYear = !inst._selectingMonthYear;
        },
        /* Action for selecting a day. */
        _selectDay: function (id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return;
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $('a', td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            this._selectDate(id, this._formatDate(inst,
                inst.currentDay, inst.currentMonth, inst.currentYear));
        },
        /* Erase the input field and hide the date picker. */
        _clearDate: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            this._selectDate(target, '');
        },
        /* Update the input field with the selected date. */
        _selectDate: function (id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input)
                inst.input.val(dateStr);
            this._updateAlternate(inst);
            var onSelect = this._get(inst, 'onSelect');
            if (onSelect)
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
            else if (inst.input)
                inst.input.trigger('change'); // fire the change event
            if (inst.inline)
                this._updateDatepicker(inst);
            else {
                this._hideDatepicker();
                this._lastInput = inst.input[0];
                if (typeof (inst.input[0]) != 'object')
                    inst.input.focus(); // restore focus
                this._lastInput = null;
            }
        },
        /* Update any alternate field to synchronise with the main field. */
        _updateAlternate: function (inst) {
            var altField = this._get(inst, 'altField');
            if (altField) { // update alternate field too
                var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
                var date = this._getDate(inst);
                var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function () {
                    $(this).val(dateStr);
                });
            }
        },
        /* Set as beforeShowDay function to prevent selection of weekends.
         @param  date  Date - the date to customise
         @return [boolean, string] - is this date selectable?, what is its CSS class? */
        noWeekends: function (date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ''];
        },
        /* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
         @param  date  Date - the date to get the week for
         @return  number - the number of the week within the year that contains this date */
        iso8601Week: function (date) {
            var checkDate = new Date(date.getTime());
            // Find Thursday of this week starting on Monday
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0); // Compare with Jan 1
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
        },
        /* Parse a string value into a date object.
         See formatDate below for the possible formats.

         @param  format    string - the expected format of the date
         @param  value     string - the date in the above format
         @param  settings  Object - attributes include:
         shortYearCutoff  number - the cutoff year for determining the century (optional)
         dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
         dayNames         string[7] - names of the days from Sunday (optional)
         monthNamesShort  string[12] - abbreviated names of the months (optional)
         monthNames       string[12] - names of the months (optional)
         @return  Date - the extracted date value or null if value is blank */
        parseDate: function (format, value, settings) {
            if (format == null || value == null)
                throw 'Invalid arguments';
            value = (typeof value == 'object' ? value.toString() : value + '');
            if (value == '')
                return null;
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
            new this.CDate().getFullYear() % 100 + parseInt(shortYearCutoff, 10));//[CC]
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            // Check whether a format character is doubled
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            // Extract a number from the string value
            var getNumber = function (match) {
                var isDoubled = lookAhead(match);
                var size = (match == '@' ? 14 : (match == '!' ? 20 :
                    (match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
                var digits = new RegExp('^\\d{1,' + size + '}');
                var num = value.substring(iValue).match(digits);
                if (!num)
                    throw 'Missing number at position ' + iValue;
                iValue += num[0].length;
                return parseInt(num[0], 10);
            };
            // Extract a name from the string value and convert to an index
            var getName = function (match, shortNames, longNames) {
                var names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
                    return [[k, v]];
                }).sort(function (a, b) {
                    return -(a[1].length - b[1].length);
                });
                var index = -1;
                $.each(names, function (i, pair) {
                    var name = pair[1];
                    if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
                        index = pair[0];
                        iValue += name.length;
                        return false;
                    }
                });
                if (index != -1)
                    return index + 1;
                else
                    throw 'Unknown name at position ' + iValue;
            };
            // Confirm that a literal character matches the string value
            var checkLiteral = function () {
                if (value.charAt(iValue) != format.charAt(iFormat))
                    throw 'Unexpected literal at position ' + iValue;
                iValue++;
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = false;
                    else
                        checkLiteral();
                else
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            day = getNumber('d');
                            break;
                        case 'D':
                            getName('D', dayNamesShort, dayNames);
                            break;
                        case 'o':
                            doy = getNumber('o');
                            break;
                        case 'm':
                            month = getNumber('m');
                            break;
                        case 'M':
                            month = getName('M', monthNamesShort, monthNames);
                            break;
                        case 'y':
                            year = getNumber('y');
                            break;
                        case '@':
                            var date = new this.CDate(getNumber('@'));//[CC]
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case '!':
                            var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "'":
                            if (lookAhead("'"))
                                checkLiteral();
                            else
                                literal = true;
                            break;
                        default:
                            checkLiteral();
                    }
            }
            if (iValue < value.length) {
                throw "Extra/unparsed characters found in date: " + value.substring(iValue);
            }
            if (year == -1)
                year = new this.CDate().getFullYear();//[CC]
            else if (year < 100)
                year += new this.CDate().getFullYear() - new this.CDate().getFullYear() % 100 + //[CC]
                (year <= shortYearCutoff ? 0 : -100);
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim)
                        break;
                    month++;
                    day -= dim;
                } while (true);
            }
            var date = this._daylightSavingAdjust(new this.CDate(year, month - 1, day));//[CC]
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
                throw 'Invalid date'; // E.g. 31/02/00
            return date;
        },
        /* Standard date formats. */
        ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
        COOKIE: 'D, dd M yy',
        ISO_8601: 'yy-mm-dd',
        RFC_822: 'D, d M y',
        RFC_850: 'DD, dd-M-y',
        RFC_1036: 'D, d M y',
        RFC_1123: 'D, d M yy',
        RFC_2822: 'D, d M yy',
        RSS: 'D, d M y', // RFC 822
        TICKS: '!',
        TIMESTAMP: '@',
        W3C: 'yy-mm-dd', // ISO 8601

        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
        Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        /* Format a date object into a string value.
         The format can be combinations of the following:
         d  - day of month (no leading zero)
         dd - day of month (two digit)
         o  - day of year (no leading zeros)
         oo - day of year (three digit)
         D  - day name short
         DD - day name long
         m  - month of year (no leading zero)
         mm - month of year (two digit)
         M  - month name short
         MM - month name long
         y  - year (two digit)
         yy - year (four digit)
         @ - Unix timestamp (ms since 01/01/1970)
         ! - Windows ticks (100ns since 01/01/0001)
         '...' - literal text
         '' - single quote

         @param  format    string - the desired format of the date
         @param  date      Date - the date value to format
         @param  settings  Object - attributes include:
         dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
         dayNames         string[7] - names of the days from Sunday (optional)
         monthNamesShort  string[12] - abbreviated names of the months (optional)
         monthNames       string[12] - names of the months (optional)
         @return  string - the date in the above format */
        formatDate: function (format, date, settings) {
            if (!date)
                return '';
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            // Check whether a format character is doubled
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            // Format a number, with leading zero if necessary
            var formatNumber = function (match, value, len) {
                var num = '' + value;
                if (lookAhead(match))
                    while (num.length < len)
                        num = '0' + num;
                return num;
            };
            // Format a name, short or long as requested
            var formatName = function (match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value]);
            };
            var output = '';
            var literal = false;
            if (date)
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal)
                        if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                            literal = false;
                        else
                            output += format.charAt(iFormat);
                    else
                        switch (format.charAt(iFormat)) {
                            case 'd':
                                output += formatNumber('d', date.getDate(), 2);
                                break;
                            case 'D':
                                output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                                break;
                            case 'o':
                                output += formatNumber('o',
                                    Math.round((new this.CDate(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new this.CDate(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);//[CC]
                                break;
                            case 'm':
                                output += formatNumber('m', date.getMonth() + 1, 2);
                                break;
                            case 'M':
                                output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
                                break;
                            case 'y':
                                output += (lookAhead('y') ? date.getFullYear() :
                                (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                                break;
                            case '@':
                                output += date.getTime();
                                break;
                            case '!':
                                output += date.getTime() * 10000 + this._ticksTo1970;
                                break;
                            case "'":
                                if (lookAhead("'"))
                                    output += "'";
                                else
                                    literal = true;
                                break;
                            default:
                                output += format.charAt(iFormat);
                        }
                }
            return output;
        },
        /* Extract all possible characters from the date format. */
        _possibleChars: function (format) {
            var chars = '';
            var literal = false;
            // Check whether a format character is doubled
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            for (var iFormat = 0; iFormat < format.length; iFormat++)
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = false;
                    else
                        chars += format.charAt(iFormat);
                else
                    switch (format.charAt(iFormat)) {
                        case 'd':
                        case 'm':
                        case 'y':
                        case '@':
                            chars += '0123456789';
                            break;
                        case 'D':
                        case 'M':
                            return null; // Accept anything
                        case "'":
                            if (lookAhead("'"))
                                chars += "'";
                            else
                                literal = true;
                            break;
                        default:
                            chars += format.charAt(iFormat);
                    }
            return chars;
        },
        /* Get a setting value, defaulting if necessary. */
        _get: function (inst, name) {
            return inst.settings[name] !== undefined ?
                inst.settings[name] : this._defaults[name];
        },
        /* Parse existing date and initialise date picker. */
        _setDateFromField: function (inst, noDefault) {
            if (inst.input.val() == inst.lastVal) {
                return;
            }
            var dateFormat = this._get(inst, 'dateFormat');
            var dates = inst.lastVal = inst.input ? inst.input.val() : null;
            var date, defaultDate;
            date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate;
            } catch (event) {
                this.log(event);
                dates = (noDefault ? '' : dates);
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst);
        },
        /* Retrieve the default date shown on opening. */
        _getDefaultDate: function (inst) {
            this.CDate = this._get(inst, 'calendar');//[CC]
            return this._restrictMinMax(inst,
                this._determineDate(inst, this._get(inst, 'defaultDate'), new this.CDate()));//[CC]
        },
        /* A date may be specified as an exact value or a relative one. */
        _determineDate: function (inst, date, defaultDate) {
            var Date = this.CDate;//[CC]
            var offsetNumeric = function (offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date;
            };
            var offsetString = function (offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
                        offset, $.datepicker._getFormatConfig(inst));
                }
                catch (e) {
                    // Ignore
                }
                var date = (offset.toLowerCase().match(/^c/) ?
                        $.datepicker._getDate(inst) : null) || new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || 'd') {
                        case 'd' :
                        case 'D' :
                            day += parseInt(matches[1], 10);
                            break;
                        case 'w' :
                        case 'W' :
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case 'm' :
                        case 'M' :
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break;
                        case 'y':
                        case 'Y' :
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break;
                    }
                    matches = pattern.exec(offset);
                }
                return new Date(year, month, day);
            };
            var newDate = (date == null || date === '' ? defaultDate : (typeof date == 'string' ? offsetString(date) :
                (typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
            newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
            if (newDate) {
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
                newDate.setMilliseconds(0);
            }
            return this._daylightSavingAdjust(newDate);
        },
        /* Handle switch to/from daylight saving.
         Hours may be non-zero on daylight saving cut-over:
         > 12 when midnight changeover, but then cannot generate
         midnight datetime, so jump to 1AM, otherwise reset.
         @param  date  (Date) the date to check
         @return  (Date) the corrected date */
        _daylightSavingAdjust: function (date) {
            if (!date)
                return null;
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date;
        },
        /* Set the date(s) directly. */
        _setDate: function (inst, date, noChange) {
            var clear = !date;
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            this.CDate = this._get(inst, 'calendar');//[CC]
            var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new this.CDate()));//[CC]
            inst.selectedDay = inst.currentDay = newDate.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
            if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
                this._notifyChange(inst);
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? '' : this._formatDate(inst));
            }
        },
        /* Retrieve the date(s) directly. */
        _getDate: function (inst) {
            this.CDate = this._get(inst, 'calendar');//[CC]
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
                this._daylightSavingAdjust(new this.CDate(//[CC]
                    inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate;
        },
        /* Generate the HTML for the current state of the date picker. */
        _generateHTML: function (inst) {
            var today = new this.CDate();//[CC]
            today = this._daylightSavingAdjust(
                new this.CDate(today.getFullYear(), today.getMonth(), today.getDate())); // clear time //[CC]
            var isRTL = this._get(inst, 'isRTL');
            var showButtonPanel = this._get(inst, 'showButtonPanel');
            var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
            var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
            var stepMonths = this._get(inst, 'stepMonths');
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
                new this.CDate(inst.currentYear, inst.currentMonth, inst.currentDay)));//[CC]
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--;
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new this.CDate(maxDate.getFullYear(), //[CC]
                    maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
                maxDraw = (minDate && this._compareDate(maxDraw, '<', minDate) ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new this.CDate(drawYear, drawMonth, 1)) > maxDraw) {//[CC]
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--;
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, 'prevText');
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
                this._daylightSavingAdjust(new this.CDate(drawYear, drawMonth - stepMonths, 1)), //[CC]
                this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
            '<a style="direction:ltr" class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + //[CC]: direction:ltr
            '.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' +
            ' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' :
                (hideIfNoPrevNext ? '' : '<a style="direction:ltr" class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));//[CC]: direction:ltr
            var nextText = this._get(inst, 'nextText');
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
                this._daylightSavingAdjust(new this.CDate(drawYear, drawMonth + stepMonths, 1)), //[CC]
                this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
            '<a style="direction:ltr" class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + //[CC]: direction:ltr
            '.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' +
            ' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' :
                (hideIfNoPrevNext ? '' : '<a style="direction:ltr" class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));//[CC]: direction:ltr
            var currentText = this._get(inst, 'currentText');
            var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText :
                this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid +
            '.datepicker._hideDatepicker();">' + this._get(inst, 'closeText') + '</button>' : '');
            var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
            (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid +
            '.datepicker._gotoToday(\'#' + inst.id + '\');"' +
            '>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
            var firstDay = parseInt(this._get(inst, 'firstDay'), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var showWeek = this._get(inst, 'showWeek');
            var dayNames = this._get(inst, 'dayNames');
            var dayNamesShort = this._get(inst, 'dayNamesShort');
            var dayNamesMin = this._get(inst, 'dayNamesMin');
            var monthNames = this._get(inst, 'monthNames');
            var monthNamesShort = this._get(inst, 'monthNamesShort');
            var beforeShowDay = this._get(inst, 'beforeShowDay');
            var showOtherMonths = this._get(inst, 'showOtherMonths');
            var selectOtherMonths = this._get(inst, 'selectOtherMonths');
            var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
            var defaultDate = this._getDefaultDate(inst);
            var html = '';
            for (var row = 0; row < numMonths[0]; row++) {
                var group = '';
                this.maxRows = 4;
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new this.CDate(drawYear, drawMonth, inst.selectedDay));//[CC]
                    var cornerClass = ' ui-corner-all';
                    var calender = '';
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group';
                        if (numMonths[1] > 1)
                            switch (col) {
                                case 0:
                                    calender += ' ui-datepicker-group-first';
                                    cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left');
                                    break;
                                case numMonths[1] - 1:
                                    calender += ' ui-datepicker-group-last';
                                    cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right');
                                    break;
                                default:
                                    calender += ' ui-datepicker-group-middle';
                                    cornerClass = '';
                                    break;
                            }
                        calender += '">';
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
                    (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
                    (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
                    this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
                        row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
                    '</div><table class="ui-datepicker-calendar"><thead>' +
                    '<tr>';
                    var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
                    for (var dow = 0; dow < 7; dow++) { // days of the week
                        var day = (dow + firstDay) % 7;
                        thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
                        '<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
                    }
                    calender += thead + '</tr></thead><tbody>';
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
                    var numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
                    this.maxRows = numRows;
                    var printDate = this._daylightSavingAdjust(new this.CDate(drawYear, drawMonth, 1 - leadDays));//[CC]
                    for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
                        calender += '<tr>';
                        var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' +
                        this._get(inst, 'calculateWeek')(printDate) + '</td>');
                        for (var dow = 0; dow < 7; dow++) { // create date picker days
                            var daySettings = (beforeShowDay ?
                                beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
                                ((minDate && this._compareDate(printDate, '<', minDate)) || (maxDate && this._compareDate(printDate, '>', maxDate)));//[CC]
                            tbody += '<td class="' +
                            ((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
                            (otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
                            ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
                            (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
                                // or defaultDate is current printedDate and defaultDate is selectedDate
                            ' ' + this._dayOverClass : '') + // highlight selected day
                            (unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + // highlight unselectable days
                            (otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
                            (printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
                            (printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
                            ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
                            (unselectable ? '' : ' onclick="DP_jQuery_' + dpuuid + '.datepicker._selectDay(\'#' +
                            inst.id + '\',' + printDate.getMonth() + ',' + printDate.getFullYear() + ', this);return false;"') + '>' + // actions
                            (otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
                                (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' +
                                (printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
                                (printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
                                (otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
                                '" href="#">' + printDate.getDate() + '</a>')) + '</td>'; // display selectable date
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate);
                        }
                        calender += tbody + '</tr>';
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++;
                    }
                    calender += '</tbody></table>' + (isMultiMonth ? '</div>' +
                    ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
                    group += calender;
                }
                html += group;
            }
            html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ?
                '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
            inst._keyEvent = false;
            return html;
        },
        /* Generate the month and year header. */
        _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate,
                                            secondary, monthNames, monthNamesShort) {
            var changeMonth = this._get(inst, 'changeMonth');
            var changeYear = this._get(inst, 'changeYear');
            var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = '';
            // month selection
            if (secondary || !changeMonth)
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
            else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" ' +
                'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' +
                'onclick="DP_jQuery_' + dpuuid + '.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
                '>';
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) &&
                        (!inMaxYear || month <= maxDate.getMonth()))
                        monthHtml += '<option value="' + month + '"' +
                        (month == drawMonth ? ' selected="selected"' : '') +
                        '>' + monthNamesShort[month] + '</option>';
                }
                monthHtml += '</select>';
            }
            if (!showMonthAfterYear)
                html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
            // year selection
            if (!inst.yearshtml) {
                inst.yearshtml = '';
                if (secondary || !changeYear)
                    html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
                else {
                    // determine range of years to display
                    var years = this._get(inst, 'yearRange').split(':');
                    var thisYear = new this.CDate().getFullYear();//[CC]
                    var determineYear = function (value) {
                        var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
                            (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
                                parseInt(value, 10)));
                        return (isNaN(year) ? thisYear : year);
                    };
                    var year = determineYear(years[0]);
                    var endYear = Math.max(year, determineYear(years[1] || ''));
                    year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                    endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                    inst.yearshtml += '<select class="ui-datepicker-year" ' +
                    'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' +
                    'onclick="DP_jQuery_' + dpuuid + '.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
                    '>';
                    for (; year <= endYear; year++) {
                        inst.yearshtml += '<option value="' + year + '"' +
                        (year == drawYear ? ' selected="selected"' : '') +
                        '>' + year + '</option>';
                    }
                    inst.yearshtml += '</select>';

                    html += inst.yearshtml;
                    inst.yearshtml = null;
                }
            }
            html += this._get(inst, 'yearSuffix');
            if (showMonthAfterYear)
                html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
            html += '</div>'; // Close datepicker_header
            return html;
        },
        /* Adjust one of the date sub-fields. */
        _adjustInstDate: function (inst, offset, period) {
            var year = inst.drawYear + (period == 'Y' ? offset : 0);
            var month = inst.drawMonth + (period == 'M' ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
                (period == 'D' ? offset : 0);
            var date = this._restrictMinMax(inst,
                this._daylightSavingAdjust(new this.CDate(year, month, day)));//[CC]
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == 'M' || period == 'Y')
                this._notifyChange(inst);
        },
        /* Ensure a date is within any min/max bounds. */
        _restrictMinMax: function (inst, date) {
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            var newDate = (minDate && this._compareDate(date, '<', minDate)) ? minDate : date;//[CC]
            newDate = (maxDate && this._compareDate(newDate, '>', maxDate)) ? maxDate : newDate;//[CC]
            return newDate;
        },
        /* Notify change of month/year. */
        _notifyChange: function (inst) {
            var onChange = this._get(inst, 'onChangeMonthYear');
            if (onChange)
                onChange.apply((inst.input ? inst.input[0] : null),
                    [inst.selectedYear, inst.selectedMonth + 1, inst]);
        },
        /* Determine the number of months to show. */
        _getNumberOfMonths: function (inst) {
            var numMonths = this._get(inst, 'numberOfMonths');
            return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
        },
        /* Determine the current maximum date - ensure no time components are set. */
        _getMinMaxDate: function (inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
        },
        /* Find the number of days in a given month. */
        _getDaysInMonth: function (year, month) {
            return 32 - this._daylightSavingAdjust(new this.CDate(year, month, 32)).getDate();//[CC]
        },
        /* Find the day of the week of the first of a month. */
        _getFirstDayOfMonth: function (year, month) {
            return new this.CDate(year, month, 1).getDay();//[CC]
        },
        /* Determines if we should allow a "next/prev" month display change. */
        _canAdjustMonth: function (inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new this.CDate(curYear, //[CC]
                curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
            if (offset < 0)
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
            return this._isInRange(inst, date);
        },
        /* Is the given date in the accepted range? */
        _isInRange: function (inst, date) {
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            return ((!minDate || date.getTime() >= minDate.getTime()) &&
            (!maxDate || date.getTime() <= maxDate.getTime()));
        },
        /* Provide the configuration settings for formatting/parsing. */
        _getFormatConfig: function (inst) {
            var shortYearCutoff = this._get(inst, 'shortYearCutoff');
            this.CDate = this._get(inst, 'calendar');//[CC]
            shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
            new this.CDate().getFullYear() % 100 + parseInt(shortYearCutoff, 10));//[CC]
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
                monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')
            };
        },
        /* Format the given date for display. */
        _formatDate: function (inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear;
            }
            var date = (day ? (typeof day == 'object' ? day :
                this._daylightSavingAdjust(new this.CDate(year, month, day))) : //[CC]
                this._daylightSavingAdjust(new this.CDate(inst.currentYear, inst.currentMonth, inst.currentDay)));//[CC]
            return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
        }, //[CC]

        /* [CC]Compare two dates */
        _compareDate: function (d1, op, d2) {//[CC]
            if (d1 && d2) {//[CC]
                if (d1.getGregorianDate)
                    d1 = d1.getGregorianDate();//[CC]
                if (d2.getGregorianDate)
                    d2 = d2.getGregorianDate();//[CC]
                if (op == '<')
                    return d1 < d2;//[CC]
                return d1 > d2;//[CC]
            } else {//[CC]
                return null;//[CC]
            }//[CC]
        }//[CC]
    });

    /*
     * Bind hover events for datepicker elements.
     * Done via delegate so the binding only occurs once in the lifetime of the parent div.
     * Global instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
     */
    function bindHover(dpDiv) {
        var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
        return dpDiv.bind('mouseout', function (event) {
            var elem = $(event.target).closest(selector);
            if (!elem.length) {
                return;
            }
            elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover");
        })
            .bind('mouseover', function (event) {
                var elem = $(event.target).closest(selector);
                if ($.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0]) || !elem.length) {
                    return;
                }
                elem.parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
                elem.addClass('ui-state-hover');
                if (elem.hasClass('ui-datepicker-prev'))
                    elem.addClass('ui-datepicker-prev-hover');
                if (elem.hasClass('ui-datepicker-next'))
                    elem.addClass('ui-datepicker-next-hover');
            });
    }

    /* jQuery extend now ignores nulls! */
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props)
            if (props[name] == null || props[name] == undefined)
                target[name] = props[name];
        return target;
    }
    ;

    /* Determine whether an object is an array. */
    function isArray(a) {
        return (a && (($.browser.safari && typeof a == 'object' && a.length) ||
        (a.constructor && a.constructor.toString().match(/\Array\(\)/))));
    }
    ;

    /* Invoke the datepicker functionality.
     @param  options  string - a command, optionally followed by additional parameters or
     Object - settings for attaching new datepicker functionality
     @return  jQuery object */
    $.fn.datepicker = function (options) {

        /* Verify an empty collection wasn't passed - Fixes #6976 */
        if (!this.length) {
            return this;
        }

        /* Initialise the date picker. */
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).
                find('body').append($.datepicker.dpDiv);
            $.datepicker.initialized = true;
        }

        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
            return $.datepicker['_' + options + 'Datepicker'].
                apply($.datepicker, [this[0]].concat(otherArgs));
        if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
            return $.datepicker['_' + options + 'Datepicker'].
                apply($.datepicker, [this[0]].concat(otherArgs));
        return this.each(function () {
            typeof options == 'string' ?
                $.datepicker['_' + options + 'Datepicker'].
                    apply($.datepicker, [this].concat(otherArgs)) :
                $.datepicker._attachDatepicker(this, options);
        });
    };

    $.datepicker = new Datepicker(); // singleton instance
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.8.14";

// Workaround for #4055
// Add another global to avoid noConflict issues with inline event handlers
    window['DP_jQuery_' + dpuuid] = $;

})(jQuery);
