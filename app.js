document.addEventListener('DOMContentLoaded', (event) => {
    let link = document.getElementById('link');

    if (window.addEventListener) {
        link.addEventListener('click', InitiateSpeedDetection, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', InitiateSpeedDetection);
    }

    const imageAddr = "https://4k-uhd.nl/wp-content/uploads/2018/08/4K-3840x2160-Wallpaper-Uitzicht-5.jpg";
    const downloadSize = 5739426; // bytes

    function ShowProgressMessage(msg) {
        const oProgress = document.getElementById("progress");
        if (oProgress) {
            oProgress.innerHTML = msg;
        }
    }

    function showResultMessage(msg) {
        const resultElem = document.getElementById("result");
        const progressElem = document.getElementById("progress");
        if (resultElem) {
            resultElem.innerHTML += msg + "<br>";
        }
        if (progressElem) {
            progressElem.innerHTML = 'Your Internet Speed is';
        }
    }

    function InitiateSpeedDetection() {
        ShowProgressMessage("Calculating Speed ...");
        MeasureUnloadedSpeed();
    }

    function MeasureUnloadedSpeed() {
        let startTime, endTime;
        const download = new Image();

        download.onload = function () {
            endTime = (new Date()).getTime();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = downloadSize * 8;
            const speedBps = (bitsLoaded / duration).toFixed(2);
            const speedKbps = (speedBps / 1024).toFixed(2);
            const speedMbps = (speedKbps / 1024).toFixed(2);
            showResultMessage("Unloaded Speed: " + speedMbps + " Mbps");
            MeasureLoadedSpeed();
        }

        download.onerror = function () {
            ShowProgressMessage("Invalid image, or error downloading");
        }

        startTime = (new Date()).getTime();
        const cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;
    }

    function MeasureLoadedSpeed() {
        let startTime, endTime;
        const download = new Image();
        const backgroundLoad = new Image();

        backgroundLoad.src = imageAddr + "?load=" + (new Date()).getTime();

        download.onload = function () {
            endTime = (new Date()).getTime();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = downloadSize * 8;
            const speedBps = (bitsLoaded / duration).toFixed(2);
            const speedKbps = (speedBps / 1024).toFixed(2);
            const speedMbps = (speedKbps / 1024).toFixed(2);
            showResultMessage("Loaded Speed: " + speedMbps + " Mbps");
            MeasureConnectionSpeed();
        }

        download.onerror = function () {
            ShowProgressMessage("Invalid image, or error downloading");
        }

        startTime = (new Date()).getTime();
        const cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;
    }

    function MeasureConnectionSpeed() {
        let startTime, endTime;
        const download = new Image();

        download.onload = function () {
            endTime = (new Date()).getTime();
            showResults();
        }

        download.onerror = function () {
            ShowProgressMessage("Invalid image, or error downloading");
        }

        startTime = (new Date()).getTime();
        const cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;

        function showResults() {
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = downloadSize * 8;
            const speedBps = (bitsLoaded / duration).toFixed(2);
            const speedKbps = (speedBps / 1024).toFixed(2);
            const speedMbps = (speedKbps / 1024).toFixed(2);
            showResultMessage("Overall Speed: " + speedMbps + " Mbps");
            checkSpeedForSites(speedMbps);
        }
    }

    function checkSpeedForSites(speedMbps) {
        const speed = parseFloat(speedMbps);
        let message = "With your current internet speed, you can comfortably use: <br>";

        if (speed >= 0.5) {
            message += "- Basic web browsing<br>";
        }
        if (speed >= 1) {
            message += "- YouTube at 480p<br>";
        }
        if (speed >= 2.5) {
            message += "- YouTube at 720p<br>";
        }
        if (speed >= 5) {
            message += "- YouTube at 1080p<br>";
            message += "- TikTok in HD<br>";
            message += "- Netflix at 720p<br>";
        }
        if (speed >= 7) {
            message += "- Netflix at 1080p<br>";
        }
        if (speed >= 20) {
            message += "- YouTube at 4K<br>";
        }
        if (speed >= 25) {
            message += "- Netflix at 4K<br>";
        }

        const resultElem = document.getElementById("result");
        if (resultElem) {
            resultElem.innerHTML += "<br>" + message;
        }
    }
});