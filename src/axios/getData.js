import getInfo from './index'

/**
 * 获取新歌banner
 */
var getBanner = params => getInfo('/api/',params,'GET');

/**
 * 获取歌曲
 * @param {*} params 
 */
var getSong = params => getInfo('/bproxy/yy/index.php',params,'GET');

/**
 * 获取排行列表
 * @param {*} params 
 */
var getRank = params => getInfo('/api/rank/list',params,'GET');


export {
    getBanner,
    getSong,
    getRank
}