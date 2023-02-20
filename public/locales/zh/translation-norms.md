# 翻译规范

## 📌 常用术语规范

本节主要包含一些容易出现同义译文的原文，目的是尽量规范地使用一种译文，或者在不同场景下区分使用不同的译文，最大程度上提供一致的语言环境，提升用户体验。

### 单词规范

- "name": "名称". 一般统一译为 "名称" 而非 "名字"、"域名"。
- "subname": "子名称". 不同于 "subdomain"，这里的 "subname" 译为 "子名称" 更合适。
- "parent", "parent name": "父名称"
- "you": "您"
- "your": "您的"
- "registrant": "注册人"
- "controller": "管理员"
- "owner": "所有者"
- "manager": "管理者"
- "extend": "续期"
- "expiry": "有效期", "到期". 与权限期限有关的情况下，译为 "有效期"，其他情况下，译为 "到期"。
- "expires": "到期"
- "expired": "已过期"
- "clamin": "认领"
- "change": "更改"
- "add": "添加"
- "set": "设置"
- "next": "下一步"
- "back": "上一步", "返回".
- "search": "搜索"
- "confirm": "确认". 通常译作 "确认"，而没有使用 "确定"。
- "remove": "移除"
- "delete": "删除"
- "selected": "选中项"
- "gas": "网络费". Metamask 中的译文 "燃料" 过于机械了。
- "sign": "签名"
- "transfer": "转移". 一般用于名称所有权的变化，译作 "转移" 而不是 "转让" 主要是参考了 OpenSea 等主流应用在同等场景下的译文。
- "send": "发送". 一般译作 "发送"；在用于权限所属的变化时，也可译作 "转让"。
- "revoke", "burn": "销毁"
- "wrap": "包装"
- "unwrap": "解除包装"
- "NameWrapper": "名称包装器". 这里特指名称包装器这个智能合约。
- "grant": "授权"
- "fuses": "保险丝"
- "custom": "自定义"
- "filter": "筛选"
- "enable": "启用", "激活". 单纯表示开启动作时，译为 "启用"；由其他事件触发时，译为 "激活"。

### 风格规范

- 在涉及权限的部分，原文中在每个权限前面加了 Can 表示 “可以” 行使某种能力。译文是否需要在权限前面加上 “可以” ？不建议加。
- 这个、这项，等词语，是去掉还是改成诸如 “此”、“该” 等单字? 建议根据语境决定。

## 🔍 针对译文的测试步骤

1. 将译文仔细阅读一遍。检查是否有错字、错词、漏译、语病、标点等问题，是否有需要优化的句子和段落。
2. 版本保存，git commit。
3. 在本地运行测试，pnpm dev。检查是否会产生运行错误，是否存在译文的显示问题。
4. 版本上传，git push。
5. 合并代码，上线测试。

## 🤔 需要复核的译文

- common.json
  - transaction.info.updateEthAddress: "Update ETH address to this address"
- profile.json
  - tabs.permissions.nameChangePermissions.title: "Name Change Permissions"

## 🌏 关于国际化的一些建议

### 同步更新其他语言的文件

建议在修改 /en 文件夹中的内容时，要将变化的内容同步到其他语言的文件夹内，便于译者及时更新译文。

### 考虑不同语言间的语序问题

由于表达习惯的差异，不同语种的句子中的词语顺序有很多差别，建议尽量避免将一个句子的某个词作为变量引入。

比如，MyNames.tsx 文件中的 134 行：

```ts
subtitle={`${t('subtitle.start')} ${isSelf ? t('subtitle.your') : t('subtitle.this')} ${t(
        'subtitle.wallet',
      )}`}
```

建议换成如下形式：

```ts
subtitle={
  `${isSelf ? t('subtitle.start-your-wallet') : t('subtitle.start-this-wallet')}`
  }
```