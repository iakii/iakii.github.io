import CryptoJS from 'crypto-js';

/**
 * Taro小程序专用AES-CBC加解密工具类
 * 基于crypto-js实现，兼容所有小程序平台
 */
class CryptoUtil {
  static KEY = 'lHL9GBoSZBpJI8q4PZpdbSRpJstbd0GrSys/BlHS/tc=';
  /**
   * 生成安全的AES密钥（128/256位），支持随机或通过密码+盐派生
   * @param {string} [hospitalId] - 可选，密码字符串
   * @param {string} [patientId] - 可选，盐字符串（Base64或普通字符串）
   * @returns {string} Base64编码的密钥
   */
  static generateKey(hospitalId = '', patientId = '') {
    const keySize = 256 / 32; // 8
    if (hospitalId && patientId) {
      // salt 必须用原始字符串
      const saltWord = CryptoJS.enc.Utf8.parse(patientId);
      const keyBytes = CryptoJS.PBKDF2(hospitalId, saltWord, {
        keySize: keySize,
        iterations: 10000,
        hasher: CryptoJS.algo.SHA256
      });
      return keyBytes.toString(CryptoJS.enc.Base64);
    } else {
      const keyBytes = CryptoJS.lib.WordArray.random(32);
      return keyBytes.toString(CryptoJS.enc.Base64);
    }
  }
  /**
   * 加密报文（支持字符串/对象）
   * @param {string|object} data - 待加密数据
   * @param {string} keyBase64 - Base64编码的AES密钥
   * @returns {string} 加密结果（格式：IV:密文，均为Base64）
   */
  static encrypt(data, keyBase64) {
    try {
      // 1. 处理输入数据：对象转为JSON字符串
      const plaintext = typeof data === 'object' ? JSON.stringify(data) : String(data);

      // 2. 解码Base64密钥（转为CryptoJS可识别的WordArray）
      const key = CryptoJS.enc.Base64.parse(keyBase64);

      // 3. 生成16字节（128位）IV（CBC模式下IV长度固定为128位）
      const iv = CryptoJS.lib.WordArray.random(16);

      // 4. AES-CBC加密
      const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      // 5. 提取密文（转为Base64）
      const ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
      const ivBase64 = iv.toString(CryptoJS.enc.Base64);

      // 6. 拼接结果（与原Web Crypto方案格式一致，便于前后端交互）
      return `${ivBase64}:${ciphertext}`;
    } catch (error) {
      console.error('加密失败:', error);
      throw new Error('加密异常，请检查密钥和输入数据');
    }
  }

  /**
   * 解密密文
   * @param {string} encryptedStr - 加密字符串（格式：IV:密文）
   * @param {string} keyBase64 - Base64编码的AES密钥
   * @param {boolean} isJson - 是否解析为JSON对象（默认true）
   * @returns {string|object} 解密后的原始数据
   */
  static decrypt(encryptedStr, keyBase64, isJson = true) {
    try {
      // 1. 解析加密字符串（分割IV、密文）
      const [ivBase64, ciphertextBase64] = encryptedStr.split(':');
      if (!ivBase64 || !ciphertextBase64) {
        throw new Error('密文格式错误，需满足 IV:密文 格式');
      }

      // 2. 解码各部分（转为CryptoJS可识别的WordArray）
      const key = CryptoJS.enc.Base64.parse(keyBase64);
      const iv = CryptoJS.enc.Base64.parse(ivBase64);

      // 3. AES-CBC解密
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(ciphertextBase64) },
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );

      // 4. 解码明文（UTF-8格式）
      const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
      if (!plaintext) {
        throw new Error('解密失败，密钥错误或密文被篡改');
      }

      // 5. 按需解析为JSON对象
      return isJson ? JSON.parse(plaintext) : plaintext;
    } catch (error) {
      console.error('解密失败:', error);
      if (error instanceof SyntaxError) {
        throw new Error('解密结果不是JSON格式，请设置isJson=false');
      }
      throw new Error('解密异常，可能是密钥错误或密文被篡改');
    }
  }

  /**
   * 辅助方法：验证密钥是否有效（避免传入非法密钥）
   * @param {string} keyBase64 - Base64编码的密钥
   * @returns {boolean} 密钥是否有效
   */
  static isValidKey(keyBase64) {
    try {
      const key = CryptoJS.enc.Base64.parse(keyBase64);
      // 128位密钥=16字节，256位=32字节
      return [16, 32].includes(key.sigBytes);
    } catch (error) {
      return false;
    }
  }
}

export default CryptoUtil;

// 待加密的报文（对象形式）
const requestData = JSON.stringify({
  userId: '123456',
  username: 'test',
  timestamp: Date.now()
});

const aesKey = CryptoUtil.KEY;//('123', '456');
console.log('生成的密钥:', aesKey);
// 加密（使用生成的密钥）
const encryptedStr = CryptoUtil.encrypt(requestData, aesKey);
console.log('加密后:', encryptedStr);
// 解密
const decryptedData = CryptoUtil.decrypt(encryptedStr, aesKey, false);
console.log('解密后:', decryptedData);

