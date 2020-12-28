# 基于 antd 封装 table 组件

# 使用的属性

## 如何在表格中编辑

```tsx
[
    {
        titile: 'name',
        dataIndex: 'name',
        editable: true, // 该列可以被编辑
        inputType: 'number' | 'text' | 'textarea' | 'image', // 输入类型
        rules: [], // 输入规则，遵循antd form
    },
    {
        title: '编辑',
        dataIndex: 'edit',
        // 存在editor属性表示是可以编辑的
        editor:{
            callback: ({ row })=>void; // 处理编辑结果
        }
    }
]
```

## popconfirm 【气泡确认框】的列

```tsx
popconfirm = {
    text: 'text文本内容',
    HintText: '确认框提示内容',
    callback: ({ id, setLoading, deleteData })=>void, // 回调函数
}
```

## 搜索

-   search=true：当前列存在搜索行为

## 支持自定义渲染列对象

-   render: 也是 table 自带的
