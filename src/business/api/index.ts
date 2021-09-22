import apiProduct from './api-product';

const codeOkList: any = [80007];

/*
* api 总处理函数，统一处理loading、报错文案等信息
* */
const commonApi: any = async (param: any) => {
  const {
    _this,
    api,
    apiParam,
    failFun,
    hideOkMessage = true,
    successMessage = '成功！',
    failMessage,
    loading = false
  } = param;

  let loadingBox: any;
  if (loading) {
    loadingBox = _this.$loading({
      lock: true,
      text: '加载中...',
      background: 'rgba(255, 255, 255, 0)',
      target: '#root-view'
    });
  }

  const [errInfo, response] = await api(apiParam);
  if (errInfo) {
    if (failFun) {
      failFun(errInfo);
      return;
    }
    _this.$message({
      message: errInfo,
      size: 'mini',
      type: 'error',
    });
    return;
  }

  const { code, message } = response;
  // 接口成功信息
  if (code === 0 || codeOkList.includes(code)) {
    if (!hideOkMessage) {
      _this.$message({
        message: successMessage,
        size: 'mini',
        type: 'success',
      });
    }

    if (loadingBox)
      loadingBox.close();

    return response || true;
  }

  // 接口失败
  if (failFun) {
    failFun(message);
  } else {
    _this.$message({
      message: failMessage || message,
      size: 'mini',
      type: 'error',
    });
  }

  if (loadingBox)
    loadingBox.close();
};

export default {
  commonApi,
  ...apiProduct
}
