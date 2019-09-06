import jwt_decode from 'jwt-decode'
import {asyncRouterMap} from '../router'

const actions ={
    async setUser({state,commit},user){
        const decoded = jwt_decode(user);
        commit('SET_USER',decoded);
        const {key}=decoded;
        // console.log(key);
        let accessedRouters = filterAsyncRouter(asyncRouterMap, key);
        commit('SET_ROUTERS', accessedRouters);
    }
}

function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
      // console.log(route);
      if (hasPermission(roles, route)) {
        if (route.children && route.children.length) {
          route.children = filterAsyncRouter(route.children, roles);
        }
        return true;
      }
      return false;
    });
  
    return accessedRouters;
  }

//是否有权限
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
      // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
      return route.meta.roles.some(role => role.indexOf(roles) >= 0);
    } else {
      // 默认不设置有权限
      return true;
    }
  }

export default actions;