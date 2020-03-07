import tinymce from 'tinymce/tinymce';
var Plugin = /** @class */ (function () {
    function Plugin() {
        var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
        global.add('image', function () {
            console.warn('testtttt');
        });
    }
    return Plugin;
}());
export default Plugin;
//# sourceMappingURL=plugin.js.map