import _ from 'lodash';
import zh from './zh_CN';
import english from './english';

interface Lang {
  zh?: any,
  english?: any,

  [propName: string]: any;
}

const langInfo: Lang = {
  zh,
  english
};

/**
 * 当前 的 语言，默认值为 zh，如果环境变量有设置 语言类型，则优先使用该语言
 * */
let currentLang = langInfo.zh;
const init = (): void => {
  if (process.env.LANG) {
    // eslint-disable-next-line
    currentLang = langInfo[process.env.LANG];
  }
};

/**
 * 解析当前的 keys
 * @param keys：字符串，key的路径; 例如：'common.btnMsg.submit'
 * @param params
 * */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-unused-vars
const it = (keys: string, params?: any): string => {
  const currentLabel: string = getLabelByKeys(keys);
  return replaceParam(currentLabel, params);
};

/**
 * 根据keys，查询最后一级的 label 文案
 * @param keys：字符串，key的路径; 例如：'common.btnMsg.submit'
 * @return<string>
 * */
const getLabelByKeys = (keys: string): string => {
  const keyList: Array<string> = keys.split('.');
  let item: any = currentLang;
  _.each(keyList, (o: string) => {
    item = item[o];
  });

  return item || '';
};

/**
 * 替换当前文案中的变量
 * @param value 当前的 文案
 * @param params ,对象，例如：{phone: '13444444444'}
 * */
const replaceParam = (value: string, params: any) => {
  if (!params || !_.isObject(params)) {
    return value;
  }
  for (const p in params) {
    value = value.replace(new RegExp('{' + p + '}', 'g'), params[p]);
  }
  return value;
};

export default {
  init,
  it
};
