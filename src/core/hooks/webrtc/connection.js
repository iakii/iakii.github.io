class VideoCall {
  constructor() {
    this.localStream = null;
    this.peerConnection = null;
    this.configuration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    };
  }

  async startLocalVideo() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const videoElement = document.getElementById("localVideo");
      videoElement.srcObject = this.localStream;
    } catch (error) {
      console.error("获取媒体设备失败:", error);
    }
  }

  createPeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.configuration);

    // 添加本地流
    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    // 处理远程流
    this.peerConnection.ontrack = (event) => {
      const remoteVideo = document.getElementById("remoteVideo");
      remoteVideo.srcObject = event.streams[0];
    };

    // ICE候选处理
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // 发送候选到对等端
        this.sendSignal({ type: "candidate", candidate: event.candidate });
      }
    };
  }

  /**
   * 示例2：屏幕共享
   */
  async startScreenShare() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
          displaySurface: "window",
        },
        audio: true,
      });

      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      document.body.appendChild(videoElement);

      // 监听停止共享
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.onended = () => {
        console.log("屏幕共享已停止");
        videoElement.remove();
      };
    } catch (error) {
      console.error("屏幕共享失败:", error);
    }
  }
}

/**
 * @description 数据通道通信
 * @author 熊凯(一只熊猫🐼)
 * @date 19/11/2025
 * @class DataChannelManager
 */
class DataChannelManager {
  constructor(peerConnection) {
    this.peerConnection = peerConnection;
    this.dataChannel = null;
    this.setupDataChannel();
  }

  setupDataChannel() {
    this.dataChannel = this.peerConnection.createDataChannel("chat");

    this.dataChannel.onopen = () => {
      console.log("数据通道已建立");
    };

    this.dataChannel.onmessage = (event) => {
      this.handleMessage(JSON.parse(event.data));
    };

    this.dataChannel.onclose = () => {
      console.log("数据通道已关闭");
    };
  }

  sendMessage(message) {
    if (this.dataChannel && this.dataChannel.readyState === "open") {
      this.dataChannel.send(JSON.stringify(message));
    }
  }

  handleMessage(message) {
    switch (message.type) {
      case "text":
        this.displayMessage(message.content);
        break;
      case "file":
        this.handleFile(message);
        break;
      case "command":
        this.executeCommand(message);
        break;
    }
  }
}
