import tinymce from 'tinymce/tinymce'

export default class Plugin {
    constructor() {
        var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

        global.add('image', function () {
            console.warn('testtttt');
        });
    }
}
