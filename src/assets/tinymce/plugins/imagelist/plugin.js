(function () {
    "use strict";
    const global = tinymce.util.Tools.resolve("tinymce.PluginManager");

    function componentRegister (editor) {
        editor.ui.registry.addButton("imagelist", {
            title: "插入图片",
            icon: "image",
            // image : url + '/img/icon.png',
            onAction: () => {
                alert(666);
            }
        });
    };

    global.add("imagelist", function (editor) {
        componentRegister(editor);
    });

    function Plugin() {}

    return Plugin;

})()
