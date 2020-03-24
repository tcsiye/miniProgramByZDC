<template>
<uni-shadow-root class="trtc-room-template-custom-custom"><template name="custom">
  <view class="template-custom">
    <view class="players-container">
      <view v-for="(item,index) in (streamList)" :key="item.streamID" v-if="item.src && (item.hasVideo || item.hasAudio)" :class="'view-container player-container '+(item.isVisible?'':'none')" :style="'left:'+(item.xAxis)+';top:'+(item.yAxis)+';width:'+(item.width)+';height:'+(item.height)+';zindex:'+(item.zIndex)+';'">
        <live-player class="player" :id="item.streamID" :data-userid="item.userID" :data-streamid="item.streamID" :data-streamtype="item.streamType" :src="item.src" :mode="item.mode" :autoplay="item.autoplay" :mute-audio="item.muteAudio" :mute-video="item.muteVideo" :orientation="item.orientation" :object-fit="item.objectFit" :background-mute="item.enableBackgroundMute" :min-cache="item.minCache" :max-cache="item.maxCache" :sound-mode="item.soundMode" :enable-recv-message="item.enableRecvMessage" :auto-pause-if-navigate="item.autoPauseIfNavigate" :auto-pause-if-open-native="item.autoPauseIfOpenNative" :debug="debug" @statechange="_playerStateChange" @fullscreenchange="_playerFullscreenChange" @netstatus="_playerNetStatus" @audiovolumenotify="_playerAudioVolumeNotify"></live-player>
      </view>
    </view>
    <view :class="'view-container pusher-container '+(pusher.isVisible?'':'none')" :style="'left:'+(pusher.xAxis)+';top:'+(pusher.yAxis)+';width:0px;height:0px;zindex:'+(pusher.zindex)+';'">
      <live-pusher class="pusher" :url="pusher.url" :mode="pusher.mode" :autopush="pusher.autopush" :enable-camera="pusher.enableCamera" :enable-mic="pusher.enableMic" :enable-agc="pusher.enableAgc" :enable-ans="pusher.enableAns" :enable-ear-monitor="pusher.enableEarMonitor" :auto-focus="pusher.enableAutoFocus" :zoom="pusher.enableZoom" :min-bitrate="pusher.minBitrate" :max-bitrate="pusher.maxBitrate" :video-width="pusher.videoWidth" :video-height="pusher.videoHeight" :beauty="pusher.beautyLevel" :whiteness="pusher.whitenessLevel" :orientation="pusher.videoOrientation" :aspect="pusher.videoAspect" :device-position="pusher.frontCamera" :remote-mirror="pusher.enableRemoteMirror" :local-mirror="pusher.localMirror" :background-mute="pusher.enableBackgroundMute" :audio-quality="pusher.audioQuality" :audio-volume-type="pusher.audioVolumeType" :audio-reverb-type="pusher.audioReverbType" :waiting-image="pusher.waitingImage" :debug="debug" @statechange="_pusherStateChangeHandler" @netstatus="_pusherNetStatusHandler" @error="_pusherErrorHandler" @bgmstart="_pusherBGMStartHandler" @bgmprogress="_pusherBGMProgressHandler" @bgmcomplete="_pusherBGMCompleteHandler"></live-pusher>
    </view>
  </view>
</template></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'trtc-room/template/custom/custom'

Component({})

export default global['__wxComponents']['trtc-room/template/custom/custom']
</script>
<style platform="mp-weixin">
/* 通过方法自定义模式 */
.template-custom{
  /* 绝对定位模式 pusher 和 player 都用绝对定位*/
  width: 100vw;
  height: 100vh;
  position: relative;
}
.template-custom .pusher-container,
.template-custom .player-container{
  position: absolute;
  z-index: 999999;
}
.player{position: fixed; width: 50vh;height: 50vh; z-index: 99999999;}
</style>