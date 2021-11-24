import { Modal } from 'ant-design-vue'
import router from '@/router'

export default{
    install(Vue, options){
        // 获取接口地址
        Vue.prototype.urlTest = function(text, key) {
            var ret = null
            try {
                ret = JSON.parse(text)
                return ret[key]
            } catch {
                text = text + ''
                var begin = text.lastIndexOf('{')
                var end = text.indexOf('}')
                if (begin > -1 && end > -1) {
                text = text.substring(begin + 1, end)
                    var arr = text.split(',')
                    for (var i = 0;i < arr.length;i++) {
                        if (arr[i].indexOf(key) > -1) {
                            ret = arr[i].split(':')[1]
                            break
                        }
                    }
                }
            }
            return ret.replace(/\'/g, "").replace(" ", "")
        };
        // listen的余额
        Vue.prototype.listenMoney = ''
        // 优惠申请按钮
        Vue.prototype.applyClick = function () {
            if(localStorage.getItem('access_token')){
                Modal.info({
                    title: '信息',
                    content: '内容',
                })
            }else{
                Modal.info({
                    title: '信息',
                    content: '请登入后再进行申请！',
                    onOk() {
                        router.push('/login')
                    }
                })
            }
        }
    }
}

export const isElementNotInViewport = function(el) {
	if (el) {
        let rect;
        if(el.$el){
            rect = el.$el.getBoundingClientRect();
        }else{
            rect = el.getBoundingClientRect();
        }
		return (rect.top <= ((window.innerHeight || document.documentElement.clientHeight)-150));
	}
};