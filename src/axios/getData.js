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

/**
 * 获取排行内容
 * @param {*} params 
 */
var getRankInfo = params => getInfo(`/api/rank/info`,params,'GET');

/**
 * 获取歌单列表
 * @param {*} params 
 */
var getpList = params => getInfo(`/api/plist/index`,params,'GET');

/**
 * 获取歌单内容
 * @param {*} params 
 */
var getpInfo = params => getInfo(`/api/plist/list/${params.id}`,params.data,'GET');

export {
    getBanner,
    getSong,
    getRank,
    getRankInfo,
    getpList,
    getpInfo
}