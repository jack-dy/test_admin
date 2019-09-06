import request from '@/utils/request.js'

export function login(data){
    return request({
        url:`${[process.env.VUE_APP_BASE_API]}/admin/user/login`,
        method:'post',
        data
    })
}