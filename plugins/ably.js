import Vue from 'vue';
import Ably from 'ably';
export default ({}, inject) => {
  let ably = new Ably.Realtime({
    key:"Qd259w.d97xeg:fYaqLTQWIpCQ7ppgLENwCa8BC1k78VmWfgc8MlIasXs",
  });
  inject('ably', ably)
}
