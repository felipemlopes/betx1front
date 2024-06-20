import Vue from 'vue';
import Ably from 'ably';
export default ({}, inject) => {
  let ably = new Ably.Realtime({
    key:process.env.ABLY,
  });
  inject('ably', ably)
}
