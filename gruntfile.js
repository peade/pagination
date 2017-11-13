module.exports = function(grunt) {
    grunt.initConfig({});
    var deleteCompile=function () {
        var dirList=['pdPaging']
        var deletedNum=0;
        for(var i=0;i<dirList.length;i++){
            grunt.file.recurse(dirList[i], function (abspath, rootdir, subdir, filename) {
                if(/-compile-compile/.test(filename)){
                    grunt.file.delete(abspath)
                    deletedNum++
                }
            })
        }
        grunt.file.delete('gruntfile-compile.js')
        grunt.file.delete('gruntfile-compile.js.map')
        console.log('delete '+deletedNum+ ' files')
    }
    //自定义任务
    grunt.registerTask('default', 'custom task', function() {
        deleteCompile()
    });

};