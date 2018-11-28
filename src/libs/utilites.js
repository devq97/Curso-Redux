// --- Funciones y otros snippets utilitarios
// --- Da formato de 00 a un número n
export const leftPad = n => `0${n}`.substr(-2)

// --- Da formato 00 : 00 (min : seg) a una cantidad de segundos dada
export const formatTime = secs => `${leftPad(~~(secs/60))}:${leftPad(~~(secs%60))}`

// --- Validar document is fullscreen
export const fullScreen = {
    // --- Preguntar si el SullScreen esta activado
    isFullScreen: () => {
        console.log(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen)
        return document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen
    },

    // --- solicitar FullScreen al navegador para el elemento dado
    requestFullScreen: element => {
        try { element.requestFullscreen() } catch (e) {
            try { element.webkitRequestFullscreen() } catch (e) {
                try { element.mozRequestFullScreen() } catch (e) {
                    try { element.msRequestFullscreen() } catch (e) {
                        console.log(e)
                    }
                }
            }
        }
    },

    // --- salir del FullScreen
     exitFullScreen: () => {
        try { document.exitFullscreen() } catch (e) {
            try { document.webkitExitFullscreen() } catch (e) {
                try { document.mozCancelFullScreen() } catch (e) {
                    try { document.msExitFullscreen() } catch (e) {
                        console.log(e)
                    }
                }
            }
        }
    }
}
