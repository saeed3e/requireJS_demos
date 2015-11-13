require.config({
    baseURL: "/j/",
    paths: {
        jQuery: "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min",
        ims: "http://static.naukimg.com/s/0/0/j/ims2.1.0.min",
        plugins: 				"http://static.naukimg.com/s/4/101/j/plugins_v18.min",
        pluginsSubM:			"http://static.naukimg.com/s/4/101/j/pluginsSubM_v12.min",
        //jCommonplugins:			"http://static.naukimg.com/s/4/101/j/jCommonPlugins_v29.min",
        //ncAdvancedUploader: 	"http://static.naukimg.com/s/0/0/j/ncAdvancedUploader_v2.min",
        //jdPlugs: 				"http://static.naukimg.com/s/4/121/j/jdPlugs_v5.min",
    },
    //    waitSeconds:10
});



// Load the main app module to start the app
requirejs(["main"]);
