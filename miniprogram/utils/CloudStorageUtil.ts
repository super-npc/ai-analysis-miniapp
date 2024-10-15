
/**
 * 云托管.对象存储相关工具类
 */
export default class CloudStorageUtil {
  
  static convertFileIdToUrl = (cloudFileId: string): string => { 
    if (!cloudFileId) return '';
    if (cloudFileId.substring(0, 5) !== 'cloud') return cloudFileId;
    const arr = cloudFileId.split('/');
    arr[0] = 'https:';
    arr[2] = arr[2].split('.')[1] + '.tcb.qcloud.la';
    return arr.join('/');
  }
}
