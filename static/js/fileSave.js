var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (-1 === index) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if ("Trident" === this.versionSearchString && -1 !== rv) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [{
            string: navigator.userAgent,
            subString: "Edge",
            identity: "MS Edge"
    }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer"
    }, {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "Explorer"
    }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
    }, {
            string: navigator.userAgent,
            subString: "Opera",
            identity: "Opera"
    }, {
            string: navigator.userAgent,
            subString: "OPR",
            identity: "Opera"
    },

        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
    }, {
            string: navigator.userAgent,
            subString: "Safari",
            identity: "Safari"
    }
  ]
};

function download(name,str) {
    var browser = getUserAgent();
    var fileNameToSaveAs = name;
    if ('undefined' !== typeof str && '' !== str) {

        if (true === browser.ie && 10 > browser.ieVer) {
            // Hide download button || redirect || open blank page with download pixel
            window.location.href = "data:application/x-download;charset=utf-8," + encodeURIComponent(str);
            return;
        }

        if (true === browser.is_safari) {
            // Hide download button || redirect || open blank page with download pixel
            window.location.href = "data:application/x-download;charset=utf-8," + encodeURIComponent(str);
            return;
        }

        var textFileAsBlob = new Blob([str], {
            type: 'text/plain'
        });

        if (-1 < browser.ieVer) {
            window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);
        } else {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));

            element.setAttribute('download', fileNameToSaveAs);
            element.setAttribute('target', '_blank');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
}

function getUserAgent() {
    var answer = {
        ie: false,
        ie11: false,
        ieEDGE: false,
        ieVer: false
    };
    var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/) || false;
    var ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/);
    var ieEDGE = navigator.userAgent.match(/Edge/g);
    var ieVer = (ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));
    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((is_chrome) && (is_safari)) {
        is_safari = false;
    }
    if ((is_chrome) && (is_opera)) {
        is_chrome = false;
    }
    if ('undefined' !== typeof ieVer) {
        answer.ieVer = ieVer;
    }
    if ('undefined' !== typeof ieEDGE) {
        answer.ieEDGE = ieEDGE;
    }
    if ('undefined' !== typeof ie11) {
        answer.ie11 = ie11;
    }
    if ('undefined' !== typeof ie) {
        answer.ie = ie;
    }
    answer.is_chrome = is_chrome;
    answer.is_firefox = is_firefox;
    answer.is_safari = is_safari;
    answer.is_opera = is_opera;
    return answer;
}
