<script setup lang="ts">
import { LoginMethodEnum } from '@/types/login.d';
import { getImageUrl } from '@/utils';

const {
  form,
  TAB_LIST,
  currentTab,
  signImg,
  subText,
  accountPlaceholder,
  passwordPlaceholder,
  isScan,
  QRCodeRef,
  isExpired,
  content,
  inputType,
  isCode,

  switchTab,
  handleLogin,
  changeForm,
  handleSub,
  makeCode,
  getCodeContent
} = useStore('login');

watch(currentTab, (val) => {
  if (val === LoginMethodEnum.SCAN_CODE) {
    getCodeContent();
  }
});

watch(content, (val) => {
  if (val && val.length > 0) {
    nextTick();
    makeCode();
  }
});

onMounted(() => {
  switchTab(LoginMethodEnum.CODE);
  changeForm('account', '15614410020');
  changeForm('password', '5566');
});
</script>

<template>
  <div class="login">
    <img
      :src="signImg"
      class="login-sign cp"
      alt="sign"
      @click="switchTab(LoginMethodEnum.SCAN_CODE)"
    />
    <img :src="getImageUrl('login_logo')" class="login-logo" alt="logo" />
    <div class="login-title">家校共育</div>
    <div class="login-mark">让儿童能力成长看得见</div>
    <template v-if="isScan">
      <div class="login-code">
        <div ref="QRCodeRef"></div>
        <div v-if="isExpired" class="login-code-mask" @click="getCodeContent">
          <span>二维码已过期</span>
          <span>请点击刷新</span>
        </div>
      </div>
      <div class="login-tips">请用手机-逻辑狗·家园共育APP园所端-扫码登录</div>
    </template>
    <template v-else>
      <div class="login-tab">
        <div
          v-for="item in TAB_LIST"
          :key="item.id"
          :class="['login-tab-item cp', currentTab === item.id && 'isSelected']"
          @click="switchTab(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="login-form">
        <input
          :value="form.account"
          type="text"
          :placeholder="accountPlaceholder"
          @input="changeForm('account', $event.target?.value)"
        />
        <div class="login-form-password">
          <input
            :value="form.password"
            :type="inputType"
            :placeholder="passwordPlaceholder"
            @input="changeForm('password', $event.target?.value)"
          />
          <i v-if="isCode"></i>
          <span class="cp" @click="handleSub">{{ subText }}</span>
        </div>
      </div>
      <div class="login-btn cp" @click="handleLogin">登录</div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 680px;
  height: 630px;
  background: #ffffff;
  box-shadow: 0 6px 50px 12px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  overflow: hidden;

  &-sign {
    position: absolute;
    top: 0;
    right: 0;
    width: 110px;
    height: 110px;
  }

  &-logo {
    margin-top: 34px;
    width: 132px;
    height: 132px;
  }

  &-title {
    margin: -6px 0 10px;
    font-size: 26px;
    font-weight: 600;
    color: #333333;
  }

  &-mark {
    font-weight: normal;
    font-size: 20px;
    color: #666666;
  }

  &-code {
    position: relative;
    margin: 27px 0;

    &-mask {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      cursor: pointer;

      span {
        color: #fff;
        font-size: 20px;
        font-weight: 500;
      }

      span + span {
        margin-top: 10px;
      }
    }
  }

  &-tips {
    position: absolute;
    bottom: 32px;
    font-weight: normal;
    font-size: 20px;
    color: #666666;
  }

  &-tab {
    display: flex;
    align-items: end;
    margin: 34px 0;
    width: 360px;

    &-item {
      font-size: 18px;
      color: #a9a9a9;
    }

    &-item + &-item {
      margin-left: 20px;
    }

    .isSelected {
      font-size: 22px;
      font-weight: 600;
      color: #333333;
    }
  }

  &-form {
    display: flex;
    flex-direction: column;

    input {
      padding-left: 20px;
      width: 360px;
      height: 60px;
      background: #f6f6f6;
      border-radius: 30px;
      border-color: #ffffff;
      outline: none;
      box-sizing: border-box;
      font-size: 18px;
      font-weight: 600;
    }

    input:focus {
      border: 2px solid #ff6f5b;
    }

    &-password {
      position: relative;
      margin-top: 20px;

      i {
        position: absolute;
        top: 50%;
        right: 110px;
        z-index: 3;
        width: 1px;
        height: 25px;
        background-color: #cbcbcb;
        transform: translate(0, -50%);
      }

      span {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        top: 50%;
        right: 2px;
        transform: translateY(-50%);
        padding-right: 20px;
        width: 110px;
        height: calc(100% - 4px);
        font-size: 14px;
        color: #ff6f5b;
        background-color: #f6f6f6;
        border-radius: 0 30px 30px 0;
        box-sizing: border-box;
      }
    }

    /* WebKit, Blink, Edge */
    ::-webkit-input-placeholder {
      font-size: 16px;
      letter-spacing: 0;
      font-weight: 400;
    }

    /* Mozilla Firefox 4 to 18 */
    :-moz-placeholder {
      font-size: 16px;
      letter-spacing: 0;
      font-weight: 400;
    }

    /* Mozilla Firefox 19+ */
    ::-moz-placeholder {
      font-size: 16px;
      letter-spacing: 0;
      font-weight: 400;
    }

    /* Internet Explorer 10-11 */
    :-ms-input-placeholder {
      font-size: 16px;
      letter-spacing: 0;
      font-weight: 400;
    }
  }

  &-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 26px;
    width: 360px;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    border-color: #ffffff;
    box-sizing: border-box;
    font-size: 26px;
    color: #ffffff;
    background: #ff6f5b;
  }
}
</style>
