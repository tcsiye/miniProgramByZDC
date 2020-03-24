<template>
<uni-shadow-root class="trtc-room-template-grid-grid"><template name="grid">
  <view :class="'template-grid '+(visibleStreamList.length < 9 ? 'stream-' + visibleStreamList.length : 'stream-8')">
    <view v-for="(item,index) in (visibleStreamList)" :key="item.streamID" :class="'view-container player-container '+(item.isVisible?'':'none')" :data-userid="item.userID" :data-streamtype="item.streamType" @click="_doubleTabToggleFullscreen">
      <live-player class="player" :id="item.streamID" :data-userid="item.userID" :data-streamid="item.streamID" :data-streamtype="item.streamType" :src="item.src" mode="RTC" :autoplay="item.autoplay" :mute-audio="item.muteAudio" :mute-video="item.muteVideo" :orientation="item.orientation" :object-fit="item.objectFit" :background-mute="item.enableBackgroundMute" :min-cache="item.minCache" :max-cache="item.maxCache" :sound-mode="item.soundMode" :enable-recv-message="item.enableRecvMessage" :auto-pause-if-navigate="item.autoPauseIfNavigate" :auto-pause-if-open-native="item.autoPauseIfOpenNative" :debug="debug" @statechange="_playerStateChange" @fullscreenchange="_playerFullscreenChange" @netstatus="_playerNetStatus" @audiovolumenotify="_playerAudioVolumeNotify"></live-player>
      <view class="operation-bar">
        <view class="btn-normal" @click="_handleSubscribeRemoteAudio" :data-user-i-d="item.userID" :data-stream-type="item.streamType">
          <image class="btn-image" :src="item.muteAudio? './static/speaker-false.png': './static/speaker-true.png'"></image>
        </view>
        <view class="btn-normal" @click="_handleSubscribeRemoteVideo" :data-user-i-d="item.userID" :data-stream-type="item.streamType">
          <image class="btn-image" :src="item.muteVideo? './static/camera-false.png': './static/camera-true.png'"></image>
        </view>
        <view class="btn-normal" @click="_toggleFullscreen" :data-user-i-d="item.userID" :data-stream-type="item.streamType">
          <image class="btn-image" src="./static/fullscreen.png"></image>
        </view>
      </view>
      <progress class="volume-progress" :percent="item.volume" stroke-width="4"></progress>
    </view>
    <view :class="'view-container pusher-container '+(pusher.isVisible?'':'none')">
      <live-pusher class="pusher" :url="pusher.url" :mode="pusher.mode" :autopush="pusher.autopush" :enable-camera="pusher.enableCamera" :enable-mic="pusher.enableMic" :enable-agc="pusher.enableAgc" :enable-ans="pusher.enableAns" :enable-ear-monitor="pusher.enableEarMonitor" :auto-focus="pusher.enableAutoFocus" :zoom="pusher.enableZoom" :min-bitrate="pusher.minBitrate" :max-bitrate="pusher.maxBitrate" :video-width="pusher.videoWidth" :video-height="pusher.videoHeight" :beauty="pusher.beautyLevel" :whiteness="pusher.whitenessLevel" :orientation="pusher.videoOrientation" :aspect="pusher.videoAspect" :device-position="pusher.frontCamera" :remote-mirror="pusher.enableRemoteMirror" :local-mirror="pusher.localMirror" :background-mute="pusher.enableBackgroundMute" :audio-quality="pusher.audioQuality" :audio-volume-type="pusher.audioVolumeType" :audio-reverb-type="pusher.audioReverbType" :waiting-image="pusher.waitingImage" :debug="debug" @statechange="_pusherStateChangeHandler" @netstatus="_pusherNetStatusHandler" @error="_pusherErrorHandler" @bgmstart="_pusherBGMStartHandler" @bgmprogress="_pusherBGMProgressHandler" @bgmcomplete="_pusherBGMCompleteHandler"></live-pusher>
      <view class="operation-bar">
        <view class="btn-normal" @click="_switchMemberListPanel">
          <image class="btn-image" src="./static/list.png"></image>
        </view>
        <view class="btn-normal" @click="_switchSettingPanel">
          <image class="btn-image" src="./static/setting.png"></image>
        </view>
        <view class="btn-normal btn-hangup" @click="_hangUp">
          <image class="btn-image" src="./static/hangup.png"></image>
        </view>
        <view class="btn-normal" @click="_toggleIMPanel">
        <image class="btn-image" src="./static/im.png"></image>
      </view>
      </view>
    </view>
    <view :class="'panel memberlist-panel '+(panelName === 'memberlist-panel' ? '' : 'none')">
      <view @click="_handleMaskerClick" class="close-btn">X</view>
      <view class="panel-header">成员列表</view>
      <view class="panel-body">
        <view class="panel-tips" v-if="streamList.length === 0">暂无成员</view>
        <scroll-view class="scroll-container" scroll-y="true">
          <view v-for="(item,index) in (streamList)" :key="item.streamID" class="member-item">
            <view class="member-id">{{item.userID}}</view>
            <view class="member-btns">
              <button class="btn" hover-class="btn-hover" :data-userid="item.userID" :data-streamtype="item.streamType" data-key="objectFit" data-value="fillCrop|contain" @click="_setPlayerProperty">{{item.objectFit === 'fillCrop'? '填充':'适应'}}</button>
              <button class="btn" hover-class="btn-hover" :data-userid="item.userID" :data-streamtype="item.streamType" data-key="orientation" data-value="vertical|horizontal" @click="_setPlayerProperty">{{item.orientation === 'vertical'? '竖屏':'横屏'}}</button>
              <button class="btn" hover-class="btn-hover" :data-userid="item.userID" :data-streamtype="item.streamType" @click="_switchStreamType" v-if="item.streamType === 'main'">{{item._definitionType === 'small'? '小画面':'主画面'}}</button>
              <button class="btn" hover-class="btn-hover" :data-userid="item.userID" :data-streamtype="item.streamType" @click="_handleSnapshotClick">截屏</button>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view :class="'panel setting-panel '+(panelName === 'setting-panel' ? '' : 'none')">
      <view @click="_handleMaskerClick" class="close-btn">X</view>
      <view class="panel-header">推流设置</view>
      <view class="panel-body">
        <scroll-view class="scroll-container" scroll-y="true">
        <view class="setting-option">
          <view class="label">启用摄像头</view>
          <view class="btn-normal" @click="_toggleVideo">
            <image class="btn-image" :src="pusher.enableCamera? './static/camera-true.png': './static/camera-false.png'"></image>
          </view>
        </view>
        <view class="setting-option">
          <view class="label">启用麦克风</view>
          <view class="btn-normal" @click="_toggleAudio">
            <image class="btn-image" :src="pusher.enableMic? './static/audio-true.png': './static/audio-false.png'"></image>
          </view>
        </view>
        <view class="setting-option">
          <view class="label">切换摄像头</view>
          <view class="btn-normal" @click="switchCamera">
            <image class="btn-image" src="./static/switch.png"></image>
          </view>
        </view>
        <view class="setting-option">
          <view class="label">开启美颜</view>
          <switch class="setting-switch" color="#006eff" :checked="pusher.beautyLevel == 9 ? true: false" data-key="beautyLevel" data-value="9|0" data-value-type="number" @change="_setPuserProperty"></switch>
        </view>
        <view class="setting-option">
          <view class="label">开启AGC</view>
          <switch class="setting-switch" color="#006eff" :checked="pusher.enableAgc" data-key="enableAgc" data-value="true" data-value-type="boolean" @change="_setPuserProperty"></switch>
        </view>
        <view class="setting-option">
          <view class="label">开启ANS</view>
          <switch class="setting-switch" color="#006eff" :checked="pusher.enableAns" data-key="enableAns" data-value="true" data-value-type="boolean" @change="_setPuserProperty"></switch>
        </view>
        <view class="setting-option">
          <view class="label">开启横屏推流</view>
          <switch class="setting-switch" color="#006eff" :checked="pusher.videoOrientation === 'vertical' ? false: true" data-key="videoOrientation" data-value="horizontal|vertical" data-value-type="string" @change="_setPuserProperty"></switch>
        </view>
        </scroll-view>
      </view>
    </view>
    <view :class="'masker '+(panelName =='' ? 'none' : '')" @click="_handleMaskerClick"></view>
  </view>
</template></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'trtc-room/template/grid/grid'

Component({})

export default global['__wxComponents']['trtc-room/template/grid/grid']
</script>
<style platform="mp-weixin">
/* 9人 会议模版 */
.template-grid{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.template-grid .view-container {
  position: relative;
}

.stream-0 .view-container{
   width: 100%;
   height: 100%;
}

.stream-1 .view-container{
   width: 100vw;
   height: 50vh;
}

.stream-2 .view-container{
   width: 50vw;
   height: 50vh;
}

.stream-2 .view-container:nth-child(1){
   width: 100vw;
   height: 50vh;
}

.stream-3 .view-container{
   width: 50vw;
   height: 50vh;
}

.stream-4 .view-container{
   width: 50vw;
   height: 33.3vh;
}

.stream-4 .view-container:nth-child(1){
   width: 100vw;
   height: 33.3vh;
}

.stream-5 .view-container {
   width: 50vw;
   height: 33.3vh;
}

.stream-6 .view-container{
   width: 33.3vw;
   height: 33.3vh;
}

.stream-6 .view-container:nth-child(1){
   width: 100vw;
   height: 33.3vh;
}

.stream-7 .view-container{
   width: 33.3vw;
   height: 33.3vh;
}

.stream-7 .view-container:nth-child(1){
   width: 50vw;
   height: 33.3vh;
}

.stream-7 .view-container:nth-child(2){
   width: 50vw;
   height: 33.3vh;
}

.stream-8 .view-container{
   width: 33.3vw;
   height: 33.3vh;
}

.template-grid .operation-bar {
  position: absolute;
  bottom: 5%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.template-grid .volume-progress {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.template-grid .btn-normal {
  width: 64rpx;
  height: 64rpx;
  margin: 0 6rpx;
  box-sizing: border-box;
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.template-grid .btn-normal .btn-image{
  width: 36rpx;
  height: 36rpx;
}

.template-grid .btn-hangup {
  background: #f75c45;
}

.template-grid .panel{
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  width: 80vw;
  height: auto;
  z-index: 999;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20rpx 0;
  border-radius: 10rpx;
  box-sizing: border-box;
}
.panel .close-btn {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
}
.panel .panel-header{
  text-align: center;
  padding-bottom: 20rpx;
}
.panel .panel-tips {
  color: #999;
  text-align: center;
}
.panel .panel-body{
  flex: 1;
  height: 40vh;
}
.panel .panel-body .scroll-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.memberlist-panel .member-item {
  display: flex;
  /* border-bottom: 1px solid #999; */
  margin: 16rpx 16rpx 16rpx 32rpx;
}

.memberlist-panel .member-id {
  width: 30%;
  font-size: 12px;
  line-height: 64rpx;
}

.memberlist-panel .member-btns{
  width: 70%;
  display: flex;
  justify-content: flex-end;
}
.memberlist-panel .member-btns .btn-normal{
  margin-left: 0;
}
.memberlist-panel .member-btns .btn{
  margin-right: 0;
}
.setting-panel .setting-option{
  display: flex;
  justify-content: space-between;
  margin: 16rpx 16rpx 16rpx 32rpx;
  /* box-sizing: border-box;
  padding: 12rpx 16rpx 12rpx 32rpx; */
}
.setting-panel .setting-option .label{
  line-height: 64rpx;
}
/* .setting-panel .setting-option .btn-normal{
  margin-right: 0;
} */
.setting-panel .setting-switch {
  transform:scale(0.8);
  margin-right: -12rpx;
}
.template-grid .masker{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
}
</style>