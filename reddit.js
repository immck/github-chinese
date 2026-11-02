// Reddit UI adapter. GPL-3.0-or-later. Original local implementation.
(() => {
  "use strict";
  const WORDS = {
  "Home": "首页",
  "Popular": "热门",
  "News": "新闻",
  "Explore": "探索",
  "All": "全部",
  "Communities": "社区",
  "Custom Feeds": "自定义信息流",
  "Recent": "最近访问",
  "Resources": "资源",
  "Settings": "设置",
  "Chat": "聊天",
  "Messages": "消息",
  "Notifications": "通知",
  "Inbox": "收件箱",
  "Log In": "登录",
  "Log in": "登录",
  "Sign Up": "注册",
  "Sign up": "注册",
  "Log Out": "退出登录",
  "Log out": "退出登录",
  "Search": "搜索",
  "Search Reddit": "搜索 Reddit",
  "Create a post": "发布帖子",
  "Create Post": "发布帖子",
  "Create post": "发布帖子",
  "Create": "发布",
  "Post": "发布",
  "Posts": "帖子",
  "Comments": "评论",
  "Comment": "评论",
  "Reply": "回复",
  "Share": "分享",
  "Save": "收藏",
  "Saved": "已收藏",
  "Unsave": "取消收藏",
  "Hide": "隐藏",
  "Unhide": "取消隐藏",
  "Report": "举报",
  "Block": "屏蔽",
  "Follow": "关注",
  "Following": "已关注",
  "Join": "加入",
  "Joined": "已加入",
  "Leave": "退出社区",
  "Upvote": "赞同",
  "Downvote": "反对",
  "Vote": "投票",
  "Votes": "票",
  "Award": "奖励",
  "Awards": "奖励",
  "Edit": "编辑",
  "Delete": "删除",
  "Cancel": "取消",
  "Confirm": "确认",
  "Submit": "提交",
  "Send": "发送",
  "Close": "关闭",
  "Back": "返回",
  "Next": "下一页",
  "Previous": "上一页",
  "Done": "完成",
  "More": "更多",
  "More options": "更多选项",
  "Show more": "显示更多",
  "Show less": "收起",
  "See more": "查看更多",
  "View more": "查看更多",
  "Read more": "继续阅读",
  "Add a comment": "添加评论",
  "Add a comment...": "添加评论…",
  "Join the conversation": "参与讨论",
  "Sort by:": "排序：",
  "Sort by": "排序方式",
  "Best": "最佳",
  "Hot": "热门",
  "New": "最新",
  "Top": "最高赞",
  "Rising": "上升",
  "Controversial": "争议",
  "Old": "最早",
  "Q&A": "问答",
  "Everywhere": "所有地区",
  "Today": "今天",
  "Now": "现在",
  "This Week": "本周",
  "This Month": "本月",
  "This Year": "今年",
  "All Time": "全部时间",
  "All time": "全部时间",
  "Card": "卡片",
  "Compact": "紧凑",
  "Community highlights": "社区精选",
  "Community Details": "社区详情",
  "Community Guide": "社区指南",
  "Community rules": "社区规则",
  "Rules": "规则",
  "Moderators": "版主",
  "Members": "成员",
  "Online": "在线",
  "About": "关于",
  "About Reddit": "关于 Reddit",
  "Popular Communities": "热门社区",
  "Create a community": "创建社区",
  "Get the Reddit app": "获取 Reddit 应用",
  "Get app": "获取应用",
  "Help": "帮助",
  "Help Center": "帮助中心",
  "Privacy Policy": "隐私政策",
  "User Agreement": "用户协议",
  "Reddit Rules": "Reddit 规则",
  "Accessibility": "无障碍",
  "Profile": "个人资料",
  "View profile": "查看个人资料",
  "Edit profile": "编辑个人资料",
  "User Settings": "用户设置",
  "User settings": "用户设置",
  "Dark Mode": "深色模式",
  "Dark mode": "深色模式",
  "Preferences": "偏好设置",
  "Account": "账号",
  "Security": "安全",
  "Privacy": "隐私",
  "Language": "语言",
  "Display language": "界面语言",
  "Open menu": "打开菜单",
  "Open navigation": "打开导航",
  "Go to Reddit Home": "前往 Reddit 首页",
  "Expand user menu": "展开用户菜单",
  "Open settings menu": "打开设置菜单",
  "Open sort options": "打开排序选项",
  "Change post view": "切换帖子视图",
  "Skip to main content": "跳至主要内容",
  "Copy link": "复制链接",
  "Copy Link": "复制链接",
  "Mark all as read": "全部标为已读",
  "View all comments": "查看全部评论",
  "Load more comments": "加载更多评论",
  "Continue this thread": "继续查看讨论",
  "View discussions in other communities": "查看其他社区的讨论",
  "Promoted": "推广",
  "Spoiler": "剧透",
  "Brand Affiliate": "品牌合作",
  "Mature content": "成人内容",
  "Continue with Google": "使用 Google 继续",
  "Continue with Apple": "使用 Apple 继续",
  "Continue with Email": "使用邮箱继续",
  "Continue with Phone Number": "使用手机号继续",
  "Username": "用户名",
  "Password": "密码",
  "Forgot password?": "忘记密码？"
};
  const BLOCKED = 'script,style,noscript,pre,code,textarea,input,[contenteditable]:not([contenteditable="false"]),.md,.usertext-body,.usertext-edit,[slot="text-body"],[slot="comment"],[slot="title"],[slot="post-media-container"],[id$="-post-rtjson-content"],[id$="-comment-rtjson-content"],[data-testid="post-title"],[data-testid="comment"],a.title,a.author,a[href^="/user/"],a[href^="/u/"],a[href^="/r/"]:not([role="menuitem"]),[data-testid="post_author_link"]';
  const roots = new Set();
  const pending = new Set();
  let scheduled = false;
  let enhanced = true;
  function protectedNode(node) {
    let element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    while (element) {
      if (element.closest(BLOCKED)) return true;
      element = element.getRootNode().host;
    }
    return false;
  }
  function translate(text) {
    const key = text.trim().replace(/\s+/g, ' ');
    let value = Object.hasOwn(WORDS, key) ? WORDS[key] : null;
    if (!value && enhanced) {
      const match = key.match(/^([\d,.]+(?:[kKmM])?) (comments?|replies|members|online|votes?)$/i);
      if (match) value = match[1] + ' ' + ({comment:'条评论',comments:'条评论',replies:'条回复',members:'位成员',online:'人在线',vote:'票',votes:'票'})[match[2].toLowerCase()];
    }
    return value ? text.replace(/\S[\s\S]*\S|\S/, value) : text;
  }
  function visit(node) {
    if (node.nodeType === Node.ELEMENT_NODE && node.matches("input,textarea")) {
      for (const attr of ["placeholder", "aria-label", "title"]) {
        const value = node.getAttribute(attr);
        if (value && translate(value) !== value) node.setAttribute(attr, translate(value));
      }
      return;
    }
    if (protectedNode(node)) return;
    if (node.nodeType === Node.TEXT_NODE) {
      const translated = translate(node.nodeValue);
      if (translated !== node.nodeValue) node.nodeValue = translated;
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      for (const attr of ['aria-label', 'title', 'placeholder']) {
        // Inputs stay untouched except their UI hints.
        const value = node.getAttribute(attr);
        if (value) {
          const translated = translate(value);
          if (translated !== value) node.setAttribute(attr, translated);
        }
      }
      if (node.shadowRoot) observe(node.shadowRoot);
    }
    for (const child of node.childNodes) visit(child);
  }
  function queue(node) {
    pending.add(node);
    if (scheduled) return;
    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      const nodes = [...pending];
      pending.clear();
      for (const item of nodes) if (item.isConnected) visit(item);
    }, 40);
  }
  function observe(root) {
    if (roots.has(root)) return;
    roots.add(root);
    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'childList') record.addedNodes.forEach(queue);
        else queue(record.target);
      }
    });
    observer.observe(root, {subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']});
    visit(root);
  }
  chrome.storage.local.get({enabled:true,redditEnabled:true,regex:true,siteSettingsVersion:1}, settings => {
    const enabled = settings.siteSettingsVersion >= 2
      ? settings.redditEnabled : settings.enabled && settings.redditEnabled;
    if (!enabled) return;
    enhanced = settings.regex;
    observe(document);
    // Custom elements can attach open shadow roots after their host was inserted.
    setInterval(() => {
      for (const root of [...roots]) {
        if (root.host && !root.host.isConnected) { roots.delete(root); continue; }
        for (const host of root.querySelectorAll('*')) {
          if (host.shadowRoot) observe(host.shadowRoot);
        }
      }
    }, 2500);
  });
})();
