/**
 * Created by HUI on 2017/3/15.
 */
$(function() {
    $.ajaxSetup({
        complete: function(jqXHR, exception) {
            if (jqXHR.status === 400) {
                console.log('Unauthorized.');
            }
        }
    });
});