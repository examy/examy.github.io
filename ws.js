// Initialize the service worker
try{
    if (navigator.serviceWorker) {
        console.log('Examy PWA: check ');
        navigator.serviceWorker.register('serviceworker.js', {
            scope: '.'
        }).then(function(registration) {
            // Registration was successful
            console.log('Examy PWA: ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('Examy PWA: ServiceWorker registration failed: ', err);
        });
    }
}catch (e) {
    
}