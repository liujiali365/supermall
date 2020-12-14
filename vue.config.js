module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //'@': 'src'   新建时默认有这个别名
        'assets': '@/assets', 
        'common': '@/common', 
        'components': '@/components', 
        'network': '@/network', 
        'views': '@/views' 
      }
    }
  }
}