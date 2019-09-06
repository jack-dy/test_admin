module.exports={
    baseUrl:'/', //根路径
    outputDir:"dist",//构建输出目录
    assetsDir:'assets',//静态资源目录
    devServer:{
        // 设置主机地址
        host:"localhost",
        https:false,
        hotOnly:false,
        // 设置默认端口
        port: 3030,
        proxy:{
            [process.env.VUE_APP_BASE_API]:{
                target:'http://localhost/blog/index.php',
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    ['^' + process.env.VUE_APP_BASE_API]:''
                }
            }
        }
    }
}