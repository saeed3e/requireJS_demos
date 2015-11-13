require.config({
    baseURL: "/js/",
    paths: {
        jquery: "lib/jquery",
        plugins: "modules/plugins",
        pluginsSubM: "modules/pluginsSubM_v12.min",
        ims: "modules/ims2.1.0.min",
        //        jCommonPlugins: "modules/jCommonPlugins_v29.min",
        //      jdPlugs: "modules/jdPlugs_v5.min",
        ncAdvancedUploader: "modules/ncAdvancedUploader_v2.min"
    },
});



// Load the main app module to start the app
require(['jquery', "plugins", "ims", "ncAdvancedUploader"], function($) {
    //    $('h1').html('This is just a dummy text for demo1');
})
