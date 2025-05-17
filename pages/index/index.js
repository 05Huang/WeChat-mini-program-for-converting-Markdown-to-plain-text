Page({
  data: {
    markdownText: '',
    plainText: ''
  },

  onInput(e) {
    this.setData({
      markdownText: e.detail.value
    });
  },

  convertToPlainText() {
    let text = this.data.markdownText;
    
    // 转换标题
    text = text.replace(/#{1,6}\s+/g, '');
    
    // 转换粗体和斜体
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(\*|_)(.*?)\1/g, '$2');
    
    // 转换链接
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
    
    // 转换列表
    text = text.replace(/^[\*\-\+]\s+/gm, '');
    text = text.replace(/^\d+\.\s+/gm, '');
    
    // 转换代码块
    text = text.replace(/```[\s\S]*?```/g, '');
    text = text.replace(/`([^`]+)`/g, '$1');
    
    // 转换水平线
    text = text.replace(/(?:^|\n)([-*_]){3,}(?:\n|$)/g, '\n');
    
    // 清理多余的空行
    text = text.replace(/\n{3,}/g, '\n\n');
    
    this.setData({
      plainText: text.trim()
    });
  },

  copyText() {
    wx.setClipboardData({
      data: this.data.plainText,
      success: () => {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        });
      }
    });
  }
}); 