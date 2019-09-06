import request from '@/utils/request.js'

export function fetchList(query){
    return request({
        url:`${[process.env.VUE_APP_BASE_API]}/admin/course/loadmore`,
        method:'get',
        params:query 
    })
}

export function updatename(data){
    return request({
        url:`${[process.env.VUE_APP_BASE_API]}/admin/course/updatename`,
        method:'post',
        data
    })
}

export function update(data){
    return request({
        url:`${[process.env.VUE_APP_BASE_API]}/admin/course/update`,
        method:'post',
        data
    })
}