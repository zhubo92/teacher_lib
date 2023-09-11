<script setup lang="ts">
const {
  form,
  codeState,

  changeForm,
  revisePassword,
  sendCode
} = useStore('login');
</script>

<template>
  <div class="forget-password fp">
    <div class="fp-title">找回密码</div>
    <div class="fp-form">
      <input
        :value="form.account"
        type="text"
        placeholder="请输入手机号"
        @input="changeForm('account', $event.target?.value)"
      />
      <div class="fp-form-code">
        <input
          :value="form.password"
          type="text"
          placeholder="请输入验证码"
          @input="changeForm('password', $event.target?.value)"
        />
        <span class="cp" @click="sendCode">{{ codeState.text }}</span>
      </div>
      <input
        :value="form.newPassword"
        type="password"
        placeholder="请输入新密码"
        @input="changeForm('newPassword', $event.target?.value)"
      />
    </div>
    <div class="fp-btn cp" @click="revisePassword">登录</div>
  </div>
</template>

<style scoped lang="scss">
.fp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 680px;
  height: 538px;
  background: #ffffff;
  box-shadow: 0 6px 50px 12px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  overflow: hidden;

  &-title {
    margin-top: 70px;
    margin-bottom: 38px;
    width: 360px;
    font-size: 22px;
    color: #333333;
  }

  &-form {
    input {
      padding-left: 20px;
      width: 360px;
      height: 60px;
      line-height: 60px;
      background: #f6f6f6;
      border-radius: 30px;
      font-size: 16px;
      outline: none;
      box-sizing: border-box;
    }

    &-code {
      position: relative;
      margin: 24px 0;

      > span {
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

    input:focus {
      border: 2px solid #ff6f5b;
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
    margin-top: 50px;
    width: 360px;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    font-size: 26px;
    color: #ffffff;
    background: #ff6f5b;
    border-color: #ffffff;
  }
}
</style>
